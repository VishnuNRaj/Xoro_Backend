import { Job, Worker, } from 'bullmq';
import redis from '../../database/Redis'
import { Credentials } from '../interfaces/notificationSend';
import sendPushNotifications from '../../system/Webpush';

redis.on('connect', () => {
    console.log('Connected')
})


const worker = new Worker('notification', async (job: Job<Credentials>) => {
    const { Text, notification, type, userIds, id } = job.data
    const notifications = userIds.map(async (ids) => {
        await sendPushNotifications({
            ...notification,
            type,
            Text,
            Redirect: `/${type}/${id ? id : ""}`
        }, ids);
    });

    await Promise.all(notifications);
    console.log("All notifications sent successfully");
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
