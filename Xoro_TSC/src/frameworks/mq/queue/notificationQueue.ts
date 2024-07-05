import { Queue } from 'bullmq';
import redis from '../../database/Redis'
export const chatUploadQueue = new Queue('notification', {
    connection: redis,
});

chatUploadQueue.on('waiting', () => {
    console.log('chatUploadQueue is ready and connected to Redis');
});

