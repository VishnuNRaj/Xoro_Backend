import { Worker } from 'bullmq';
import { videoUpload } from '../interfaces/videoUpload';
import { createNotification, updateVideoLink } from '../../../applications/functions/UserFunctions';
import { Messages, Notification } from '../../../entities/ModelsInterface/Notification';
import sendPushNotifications from "../../system/Webpush"
import startFFmpegProcess from "../../system/FFmpeg"
import fs from "fs"
import redis from '../../database/Redis'
import path from 'path';
import config from '../../../config/config';
import Videos from '../../database/models/Videos';

redis.on('connect', () => {
    console.log('Connected')
})


const uploadVideo = async ({ userId, video, thumbnail, videoId, channelId }: videoUpload) => {
    try {
        const videoData = await Videos.findById(videoId)
        if (videoData) {
            const videoDir = path.join(__dirname, '../../../../../Public/videos', channelId.toString());
            const videoPath = path.join(videoDir, `${videoData.Key}.flv`);
            if (!fs.existsSync(videoDir)) {
                fs.mkdirSync(videoDir, { recursive: true });
            }
            const fileBuffer = fs.readFileSync(video.path);
            fs.writeFileSync(videoPath, fileBuffer);
            const response = await startFFmpegProcess(videoPath, `${config.RTMP}/videos/${videoData.Key}`);
            const notification = {
                SenderId: userId,
                Link: thumbnail,
                Time: new Date(),
                Message: response ? 'Video Uploaded Successfully' : 'Video Upload Failed',
            };
            await createNotification(notification, userId);
            if (response) {
                await updateVideoLink(videoId, `${config.BASE}/videos/${videoData.Key}.flv`);
            }
            sendPushNotifications({ ...notification, type: "videos", Text: "Your Video Has Been Uploaded Successfully", Redirect: `/videos/${videoData.VideoLink}` }, userId)
            return response;
        }
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
