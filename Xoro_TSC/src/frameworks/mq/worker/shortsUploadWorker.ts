import { Job, Worker } from "bullmq"
import uploadVideoToS3, { generatePresignedUrl } from '../../../config/s3bucket';
import { createNotification } from "../../../applications/functions/UserFunctions"
import ShortVideos from "../../database/models/Shorts";
import { Notification } from "../../../entities/ModelsInterface/Notification"
import Notifications from "../../database/models/Notifications";
import { updateShortsLink } from "../../../applications/functions/UserFunctions"
import { shortsUpload } from "../interfaces/shortsUpload"
import { emitNotification } from "../../../controllers/Socket/SocketEmits"

export const uploadShorts: Function = async ({ bucket, video, key, userId }: shortsUpload): Promise<string | null> => {
    try {
        const data = await ShortVideos.findOne({ Key: key })
        await uploadVideoToS3(bucket, video, key);
        if (!data) {
            throw new Error("Aah shit here we go again")
        } else {
            await createNotification(<Notification>{ Message: "Video Uploaded Successfully", Link: "", Seen: false, Time: new Date(), Type: "official" }, userId)
        }
        const url = await generatePresignedUrl(bucket, key)
        return url
    } catch (e) {
        await createNotification(<Notification>{ Message: "Video Uploaded Successfully", Link: "", Seen: false, Time: new Date(), Type: "official" }, userId)
        return null
    }
}
const worker = new Worker("shortsUpload", async (job: Job<shortsUpload>) => {
    try {
        const response: string | null = await uploadShorts(job.data);
        if (response) {
            await updateShortsLink(job.data.videoId, response)
        }
        const notify: any = await Notifications.aggregate([{ $match: { UserId: job.data.userId } }, { $project: { Messages: 1 } }, { $project: { LastMessage: { $arrayElemAt: ["$Messages", -1] } } }])
        await emitNotification(notify.LastMessage, job.data.userId)
        return true
    } catch (e) {
        console.log(e)
        return false
    }
})

export default worker;