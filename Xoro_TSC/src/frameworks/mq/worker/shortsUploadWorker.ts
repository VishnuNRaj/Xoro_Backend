import { Job, Worker } from "bullmq"
import fs from "fs"
import { createNotification } from "../../../applications/functions/UserFunctions"
import ShortVideos from "../../database/models/Shorts";
import { Notification } from "../../../entities/ModelsInterface/Notification"
import Notifications from "../../database/models/Notifications";
import User from "../../database/models/User"
import { updateShortsLink } from "../../../applications/functions/UserFunctions"
import { shortsUpload } from "../interfaces/shortsUpload"
import startFFmpegProcess from "../../system/FFmpeg";
import path from "path";
import config from "../../../config/config";

export const uploadShorts = async ({ video, key, userId }: shortsUpload) => {
    try {
        const videoData = await ShortVideos.findOne({ Key: key })
        const user = await User.findById(userId)
        if (videoData) {
            const videoDir = path.join(__dirname, '../../../../../Public/videos', userId.toString());
            const videoPath = path.join(videoDir, `${key}.flv`);
            if (!fs.existsSync(videoDir)) {
                fs.mkdirSync(videoDir, { recursive: true });
            }
            const fileBuffer = fs.readFileSync(video.path);
            fs.writeFileSync(videoPath, fileBuffer);
            const response: string = await startFFmpegProcess(videoPath, `${config.RTMP}/shorts/${videoData.Key}`, videoData.toString(), true);
            const notification = {
                SenderId: userId,
                Link: user?.Profile,
                Time: new Date(),
                Message: response ? 'Video Uploaded Successfully' : 'Video Upload Failed',
            };
            await createNotification(notification, userId);
            if (response) {
                await updateShortsLink(videoData._id, videoPath);
            }

            return response;
        }
    } catch (e) {
        await createNotification(<Notification>{ Message: "Video Uploaded Successfully", Link: "", Seen: false, Time: new Date(), Type: "official" }, userId)
        return null
    }
}
const worker = new Worker("shortsUpload", async (job: Job<shortsUpload>) => {
    try {
        await uploadShorts(job.data);
        return true
    } catch (e) {
        console.log(e)
        return false
    }
})

export default worker;