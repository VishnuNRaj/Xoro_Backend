import * as VideoEntity from '../../../entities/RequestInterface/VideoInterface';
import * as DatabaseFunctions from '../../functions/DatabaseFunctions'
import { videoUpload } from '../../../frameworks/mq/interfaces/videoUpload'
import * as ResponseFunctions from '../../responses/VideoResponse';
import * as Responses from '../../../entities/ResponseInterface/VideoResponseInterface';
import { getRandomVideos, getVideo } from './../../functions/UserFunctions';
import * as CommonFunctions from '../../functions/CommonFunctions';
import UserDocument from '../../../entities/ModelsInterface/User';
import PostVideo from '../../../entities/ModelsInterface/Videos';
import Videos from '../../../frameworks/database/models/Videos'
import Reactions from '../../../frameworks/database/models/Reactions'
import CommentsModel from '../../../frameworks/database/models/Comments'
import { uploadVideoToMQ } from '../../functions/MQ'
import { generatePresignedUrl } from '../../../config/s3bucket';
import { ReactionsInterface } from '../../../entities/ModelsInterface/Reactions';

export const uploadVideoRepository: Function = async ({ Caption, Video, Duration, Hashtags, RelatedTags, Description, Restriction, Settings, Links, user }: VideoEntity.uploadVideo): Promise<Responses.uploadVideoResponse> => {
    try {

        const [video]: PostVideo[] = await DatabaseFunctions.insertData(Videos, {
            Caption: Caption,
            UserId: user.Channel,
            Duration: Duration,
            Hashtags: Hashtags,
            RelatedTags: RelatedTags,
            Restriction: Restriction,
            Settings: Settings,
            Thumbnail: Links.Thumbnail,
            Video: Links.Video,
            Postdate: new Date(),
            Description: Description,
            VideoLink: await CommonFunctions.generateVerificationLink(),
            Key: Links.Video,
        })

        await Promise.all([
            await uploadVideoToMQ(<videoUpload>{
                key: Links.Video,
                thumbnail: Links.Thumbnail,
                userId: user._id,
                videoId: video._id,
                video: Video
            }),
            await DatabaseFunctions.insertData(Reactions, {
                PostId: video._id
            }),
        ])


        return ResponseFunctions.uploadVideoRes(<Responses.uploadVideoResponse>{
            message: 'Video uploaded Sucessfully',
            status: 200
        })
    } catch (e) {
        console.log(e)
        return ResponseFunctions.uploadVideoRes(<Responses.uploadVideoResponse>{
            message: 'Error uploading video',
            status: 500
        })
    }
}


export const getVideosRepository: Function = async (user: UserDocument | null, skip: number, random: number): Promise<Responses.getVideosResponse> => {
    try {
        const videoData: PostVideo[] = await getRandomVideos(skip, random)
        const today = new Date()
        const updated: PostVideo[] = videoData.map((video) => {
            const date = new Date(video.Postdate)
            date.setDate(date.getDate() + 7);
            if (today > date) {
                generatePresignedUrl('xoro-stream.online', video.Key).then((url: string) => {
                    video.Video = url
                })
            }
            return video
        })
        console.log(updated)
        return ResponseFunctions.getVideoRes(<Responses.getVideosResponse>{
            message: 'Found',
            status: 200,
            user: user,
            Videos: updated,
        })
    } catch (e) {
        console.log(e);
        return ResponseFunctions.getVideoRes(<Responses.getVideosResponse>{
            message: 'Internal Server Error',
            status: 500,
            user: user
        })
    }
}


export const getVideoRepository: Function = async (VideoLink: string, user: UserDocument): Promise<Responses.getVideoResponse> => {
    try {
        const videoData: PostVideo = await getVideo(VideoLink,user._id)
        return ResponseFunctions.getVideosRes(<Responses.getVideoResponse>{
            message: 'Found',
            status: 200,
            Video: videoData,
            user: user
        })

    } catch (e) {
        console.log(e);
        return ResponseFunctions.getVideosRes(<Responses.getVideoResponse>{
            message: 'Internal Server Error',
            status: 500,
            user: user
        })
    }
}

export const LikeVideoRepository: Function = async ({ UserId, VideoId }: VideoEntity.likeDislikeRemove) => {
    try {
        const video: PostVideo = await DatabaseFunctions.findUsingId(VideoId)
        if (!video) return ResponseFunctions.likeDislikeRemoveRes(<Responses.likeDislikeRemoveResponse>{ message: "Invalid Credentials", status: 201 })
        const response: ReactionsInterface = await DatabaseFunctions.likeDislikeVideo(video._id, UserId, "Likes", "Dislikes")
        return ResponseFunctions.likeDislikeRemoveRes(<Responses.likeDislikeRemoveResponse>{ Dislikes: response.Dislikes.length, Likes: response.Likes.length, message: "Video Added to Liked Videos", status: 200 })
    } catch (e) {
        return ResponseFunctions.likeDislikeRemoveRes(<Responses.likeDislikeRemoveResponse>{ message: "Internal Server Error", status: 500 })
    }
}

export const DislikeVideoRepository: Function = async ({ UserId, VideoId }: VideoEntity.likeDislikeRemove) => {
    try {
        const video: PostVideo = await DatabaseFunctions.findUsingId(VideoId)
        if (!video) return ResponseFunctions.likeDislikeRemoveRes(<Responses.likeDislikeRemoveResponse>{ message: "Invalid Credentials", status: 201 })
        const response: ReactionsInterface = await DatabaseFunctions.likeDislikeVideo(video._id, UserId, "Dislikes", "Likes")
        return ResponseFunctions.likeDislikeRemoveRes(<Responses.likeDislikeRemoveResponse>{ Dislikes: response.Dislikes.length, Likes: response.Likes.length, message: "Success", status: 200 })
    } catch (e) {
        return ResponseFunctions.likeDislikeRemoveRes(<Responses.likeDislikeRemoveResponse>{ message: "Internal Server Error", status: 500 })
    }
}

export const RemoveReactionRepository: Function = async ({ UserId, VideoId }: VideoEntity.likeDislikeRemove) => {
    try {
        const video: PostVideo = await DatabaseFunctions.findUsingId(VideoId)
        if (!video) return ResponseFunctions.likeDislikeRemoveRes(<Responses.likeDislikeRemoveResponse>{ message: "Invalid Credentials", status: 201 })
        const response: ReactionsInterface | null = await DatabaseFunctions.pullVideoReactions(video._id, UserId)
        return ResponseFunctions.likeDislikeRemoveRes(<Responses.likeDislikeRemoveResponse>{ Dislikes: response?.Dislikes.length, Likes: response?.Likes.length, message: "Success", status: 200 })
    } catch (e) {
        return ResponseFunctions.likeDislikeRemoveRes(<Responses.likeDislikeRemoveResponse>{ message: "Internal Server Error", status: 500 })
    }
}

export const deleteVideoRepository: Function = async ({ VideoId, UserId }: VideoEntity.likeDislikeRemove) => {
    try {
        const video: PostVideo = await DatabaseFunctions.findUsingId(VideoId)
        if (!video) return ResponseFunctions.likeDislikeRemoveRes(<Responses.likeDislikeRemoveResponse>{ message: "Invalid Credentials", status: 201 })
        if (video.UserId !== UserId) return ResponseFunctions.likeDislikeRemoveRes(<Responses.likeDislikeRemoveResponse>{ message: "Unauthorized for Deletion", status: 201 })
        await DatabaseFunctions.deleteMany(Reactions, { PostId: video._id })
        await DatabaseFunctions.deleteMany(CommentsModel, { PostId: video._id })
        await video.deleteOne()
        return ResponseFunctions.likeDislikeRemoveRes(<Responses.likeDislikeRemoveResponse>{ message: "Success", status: 200 })
    } catch (e) {
        return ResponseFunctions.likeDislikeRemoveRes(<Responses.likeDislikeRemoveResponse>{ message: "Internal Server Error", status: 500 })
    }
}
