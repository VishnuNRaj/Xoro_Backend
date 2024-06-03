import { Worker } from 'bullmq';
import { videoUpload } from '../interfaces/videoUpload';
import { createNotification, updateVideoLink } from '../../../applications/functions/UserFunctions';
import { Notification } from '../../../entities/Notification';
import { emitNotification } from '../../../controllers/Socket/SocketEmits';
import uploadVideoToS3 from '../../../config/s3bucket';
import redis from '../../database/Redis'

redis.on('connect',()=>{
    console.log('Connected')
})

const uploadVideo = async ({ key, userId, video, bucket, thumbnail, videoId }: videoUpload) => {
    try {
        const response = await uploadVideoToS3(bucket, video, key);
        const notification = <Notification>{
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
            await updateVideoLink(videoId, response);
        }
        return response;
    } catch (e) {
        console.error('Error in uploadVideo:', e);
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
