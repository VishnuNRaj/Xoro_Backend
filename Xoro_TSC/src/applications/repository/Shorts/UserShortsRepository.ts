import { uploadShortsToMQ } from "../../functions/MQ"
import * as ShortsEntity from "../../../entities/RequestInterface/ShortsInterface"
import * as Responses from "../../../entities/ResponseInterface/ShortsResponseInterface"
import * as ResponseFunctions from "../../responses/ShortsResponse"
import * as DatabaseFunctions from "../../functions/DatabaseFunctions"
import ShortVideos from "../../../frameworks/database/models/Shorts"
import { shortsUpload } from "../../../frameworks/mq/interfaces/shortsUpload"
import Reactions from "../../../frameworks/database/models/Reactions"
import { ObjectId } from "mongoose"
import { Shorts } from "../../../entities/ModelsInterface/Shorts"
import { ReactionsInterface } from "../../../entities/ModelsInterface/Reactions";
import CommentsModel from '../../../frameworks/database/models/Comments';
export const uploadShortsRepository: Function = async ({ Caption, Context, Hashtags, Link, file, user, CommentsOn, Private }: ShortsEntity.uploadShorts) => {
    try {
        const shorts = new ShortVideos({
            Caption,
            Context, Hashtags, ChannelId: user.Channel, UploadDate: new Date(), VideoLink: Link, Key: Link, Settings: { CommentsOn, Private }
        })

        await shorts.save()
        await Promise.all([
            await uploadShortsToMQ(<shortsUpload>{
                key: Link,
                userId: user._id,
                video: file,
                videoId: shorts._id,
                channelId: user.Channel
            }),
            await DatabaseFunctions.insertData(Reactions, { PostId: shorts._id, _id: shorts._id })
        ])
        return ResponseFunctions.uploadShortsRes(<Responses.uploadShortsResponse>{ message: "Video Uploading", status: 200 })
    } catch (e) {
        return ResponseFunctions.uploadShortsRes(<Responses.uploadShortsResponse>{ message: "Internal Server Error", status: 500 })
    }
}

export const getShorts: Function = async (id: string[]): Promise<Responses.getShortsResponse> => {
    try {
        const { shorts, total }: { total: number, shorts: string[] } = await DatabaseFunctions.getShorts(id)
        return <Responses.getShortsResponse>{ message: "Found", status: shorts.length > 0 ? 200 : 201, total, shorts }
    } catch (e) {
        return <Responses.getShortsResponse>{ message: "Internal Server Error", status: 500, total: 0, shorts: [] }
    }
}

export const LikeVideoRepository: Function = async ({ UserId, VideoId }: ShortsEntity.likeDislikeRemove) => {
    try {
        const video: Shorts = await DatabaseFunctions.findUsingId(ShortVideos, VideoId)
        if (!video) return <Responses.likeDislikeRemoveResponse>{ message: "Invalid Credentials", status: 201 }
        const response: any = await DatabaseFunctions.likeDislikeVideo(video._id, UserId, "Likes", "Dislikes")
        video.Likes = response.Likes.length;
        video.Dislikes = response.Dislikes.length;
        video.Views = response.Views.length;
        await DatabaseFunctions.saveData(video)
        return <Responses.likeDislikeRemoveResponse>{ Dislikes: response.Dislikes.length, Likes: response.Likes.length, message: "Shorts Added to Liked Videos", status: 200 }
    } catch (e) {
        console.log(e)
        return <Responses.likeDislikeRemoveResponse>{ message: "Internal Server Error", status: 500 }
    }
}

export const DislikeVideoRepository: Function = async ({ UserId, VideoId }: ShortsEntity.likeDislikeRemove) => {
    try {
        const video: Shorts = await DatabaseFunctions.findUsingId(ShortVideos, VideoId)
        if (!video) return <Responses.likeDislikeRemoveResponse>{ message: "Invalid Credentials", status: 201 }
        const response: any = await DatabaseFunctions.likeDislikeVideo(video._id, UserId, "Dislikes", "Likes")
        video.Likes = response.Likes.length;
        video.Dislikes = response.Dislikes.length;
        video.Views = response.Views.length;
        await DatabaseFunctions.saveData(video)
        return <Responses.likeDislikeRemoveResponse>{ Dislikes: response.Dislikes.length, Likes: response.Likes.length, message: "Success", status: 200 }
    } catch (e) {
        return <Responses.likeDislikeRemoveResponse>{ message: "Internal Server Error", status: 500 }
    }
}

export const RemoveReactionRepository: Function = async ({ UserId, VideoId }: ShortsEntity.likeDislikeRemove) => {
    try {
        const video: Shorts = await DatabaseFunctions.findUsingId(ShortVideos, VideoId)
        if (!video) return <Responses.likeDislikeRemoveResponse>{ message: "Invalid Credentials", status: 201 }
        const response: ReactionsInterface | null = await DatabaseFunctions.pullVideoReactions(video._id, UserId)
        console.log(response)
        video.Likes = response?.Likes.length || 0;
        video.Dislikes = response?.Dislikes.length || 0;
        video.Views = response?.Views.length || 0;
        await DatabaseFunctions.saveData(video)
        return <Responses.likeDislikeRemoveResponse>{ Dislikes: response?.Dislikes.length, Likes: response?.Likes.length, message: "Success", status: 200 }
    } catch (e) {
        console.log(e)
        return <Responses.likeDislikeRemoveResponse>{ message: "Internal Server Error", status: 500 }
    }
}

export const deleteVideoRepository: Function = async ({ VideoId, UserId }: ShortsEntity.likeDislikeRemove) => {
    try {
        const video: Shorts = await DatabaseFunctions.findUsingId(ShortVideos, VideoId)
        if (!video) return <Responses.likeDislikeRemoveResponse>{ message: "Invalid Credentials", status: 201 }
        if (video.ChannelId !== UserId) return <Responses.likeDislikeRemoveResponse>{ message: "Unauthorized for Deletion", status: 201 }
        await DatabaseFunctions.deleteMany(Reactions, { PostId: video._id })
        await DatabaseFunctions.deleteMany(CommentsModel, { PostId: video._id })
        await video.deleteOne()
        return <Responses.likeDislikeRemoveResponse>{ message: "Success", status: 200 }
    } catch (e) {
        return <Responses.likeDislikeRemoveResponse>{ message: "Internal Server Error", status: 500 }
    }
}