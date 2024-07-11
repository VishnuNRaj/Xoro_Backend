import VideoUpload from '../../frameworks/mq/queue/videoUploadQueue'
import ShortsUpload from "../../frameworks/mq/queue/shortsUploadQueue"
import { videoUpload } from '../../frameworks/mq/interfaces/videoUpload'
import {shortsUpload} from "../../frameworks/mq/interfaces/shortsUpload"
import bucketConfig from '../../config/buckets'
export const uploadVideoToMQ: Function = async ({ key, thumbnail, userId, video, videoId }: videoUpload): Promise<boolean> => {
    try {
        await VideoUpload.add('uploadToS3', <videoUpload>{
            bucket: bucketConfig.bucketName,
            key: `${bucketConfig.Videos}${key}`,
            thumbnail: thumbnail,
            userId: userId,
            video: video,
            videoId: videoId
        })
        return true
    } catch (e) {
        return false
    }
} 

export const uploadShortsToMQ: Function = async ({ key, userId, video, videoId }: shortsUpload): Promise<boolean> => {
    try {
        await ShortsUpload.add('uploadToS3', <videoUpload>{
            bucket: bucketConfig.bucketName,
            key: `${bucketConfig.Videos}${key}`,
            userId: userId,
            video: video,
            videoId: videoId
        })
        return true
    } catch (e) {
        return false
    }
} 