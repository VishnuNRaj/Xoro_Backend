import { Worker } from 'bullmq';
import { videoUpload } from '../interfaces/videoUpload';
import { createNotification, updateVideoLink } from '../../../applications/functions/UserFunctions';
import { Notification } from '../../../entities/ModelsInterface/Notification';
import { emitNotification } from '../../../controllers/Socket/SocketEmits';
import startFFmpegProcess from "../../system/FFmpeg"
import fs from "fs"
import redis from '../../database/Redis'
import path from 'path';
import config from '../../../config/config';

redis.on('connect', () => {
    console.log('Connected')
})


const uploadVideo = async ({ userId, video, thumbnail, videoId }: videoUpload) => {
    try {
        console.log(video.path)
        const videoDir = path.join(__dirname, '../../../../../Public/videos', userId.toString());
        const videoPath = path.join(videoDir, `${videoId}.flv`);
        if (!fs.existsSync(videoDir)) {
            fs.mkdirSync(videoDir, { recursive: true });
        }
        const fileBuffer = fs.readFileSync(video.path);
        fs.writeFileSync(videoPath, fileBuffer);
        console.log(`Video saved at ${videoPath}`);
        const response = await startFFmpegProcess(videoPath, `${config.RTMP}/videos/${videoId}`, videoId.toString(), true);
        const notification = {
            SenderId: userId,
            Link: thumbnail,
            Time: new Date(),
            Message: response ? 'Video Uploaded Successfully' : 'Video Upload Failed',
        };
        await createNotification(notification, userId);
        await emitNotification({
            Message: notification.Message,
            SenderId: '',
            Link: notification.Link,
        });
        if (response) {
            await updateVideoLink(videoId, `${config.LIVE}/videos/${videoId}/index.m3u8`);
        }

        return response;
    } catch (e: any) {
        console.error('Error in uploadVideo:', e.message);
        return null;
    }
};


const worker = new Worker('videoupload', async (job) => {
    console.log('Processing job:', job.id);
    await uploadVideo(job.data);
}, {
    connection: redis,
});

worker.on('ready', () => {
    console.log('Worker is ready and connected to Redis');
});

worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
    console.log(`Job ${job?.id} failed with error: ${err.message}`);
});

export default worker;
