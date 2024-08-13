import { Queue } from 'bullmq';
import redis from '../../database/Redis'
const NotificationQueue = new Queue('notification', {
    connection: redis,
});

NotificationQueue.on('waiting', () => {
    console.log('chatUploadQueue is ready and connected to Redis');
});

export default NotificationQueue
