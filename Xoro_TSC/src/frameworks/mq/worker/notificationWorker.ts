import { Worker, } from 'bullmq';
import redis from '../../database/Redis'
import { chatupload } from '../interfaces/chatUpload';
import { deleteChat, saveChat } from '../../database/Functions/ChatFunctions';
import { Messages } from '../../../entities/ModelsInterface/Chat';
import { sendChat } from "../../../controllers/Socket/SocketEmits"
redis.on('connect', () => {
    console.log('Connected')
})


const worker = new Worker('notification', async (job) => {
    console.log('Processing job:', job.id);
    const data: chatupload = job.data
    const response: Messages | null = await saveChat(data)
    if (response) {
        await sendChat(response)
    }
}, {
    connection: redis,
});

export const deleteWorker = new Worker('chatdelete', async (job) => {
    console.log('Processing job:', job.id);
    await deleteChat(job.data)
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
