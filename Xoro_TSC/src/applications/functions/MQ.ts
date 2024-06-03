import VideoUpload from '../../frameworks/mq/queue/videoUploadQueue'
import { videoUpload } from '../../frameworks/mq/interfaces/videoUpload'
import bucketConfig from '../../config/buckets'
export const uploadVideoToMQ: Function = async ({ key, thumbnail, userId, video, videoId }: videoUpload): Promise<boolean> => {
    try {
        const res = await VideoUpload.add('uploadToS3', <videoUpload>{
            bucket: bucketConfig.bucketName,
            key: `${bucketConfig.Videos}${key}`,
            thumbnail: thumbnail,
            userId: userId,
            video: video,
            videoId: videoId
        })
        console.log(res)
        return true
    } catch (e) {
        return false
    }
} 