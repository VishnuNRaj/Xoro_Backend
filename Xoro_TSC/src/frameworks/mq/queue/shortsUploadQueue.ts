import {Queue} from "bullmq"
const ShortsQueue = new Queue("shortsupload")
import worker from "../worker/shortsUploadWorker"
worker.on('completed',(job)=>{
    console.log(`Completed ${job.id}`)
})
export default ShortsQueue