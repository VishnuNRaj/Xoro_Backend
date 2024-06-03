import { Queue } from 'bullmq';
import redis from '../../database/Redis'
import worker from '../worker/videoUploadWorker'
worker.on('completed',(job)=>{
    console.log(`Completed ${job.id}`)
})

const VideoUploadQueue = new Queue('videoupload', {
    connection: redis,
});

VideoUploadQueue.on('waiting', () => {
    console.log('VideoUploadQueue is ready and connected to Redis');
});

export default VideoUploadQueue;
