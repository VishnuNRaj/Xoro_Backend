import * as ShortsEntity from "../../entities/RequestInterface/ShortsInterface";
import * as Responses from "../../entities/ResponseInterface/ShortsResponseInterface"
import * as Repository from "../repository/Shorts/UserShortsRepository"
import * as CommonFunctions from "../functions/CommonFunctions"
import { checkObjectId, makeObjectId } from "../functions/DatabaseFunctions";
import { ObjectId } from "mongoose";
export const uploadShorts: Function = async ({ Caption, Context, Hashtags, file, user, CommentsOn, Private }: ShortsEntity.uploadShorts) => {
    try {
        if (!file) return <Responses.uploadShortsResponse>{ message: "No video found", status: 201 }
        if (!user.Channel)<Responses.uploadShortsResponse>{ message: "No Channel created", status: 203 }
        const Link = CommonFunctions.generateVerificationLink()
        return await Repository.uploadShortsRepository(<ShortsEntity.uploadShorts>{ Caption, CommentsOn, Context, file, Link, Hashtags, Private, user })
    } catch (e) {
        return <Responses.uploadShortsResponse>{ message: "Internal Server Error", status: 500 }
    }
}

export const getShorts: Function = async (shortsId: string[]) => {
    try {
        const ids: any = shortsId.filter((id) => id.length === 32)
        return await Repository.getShorts(ids)
    } catch (e) {
        return <Responses.getShortsResponse>{ message: "Internal Server Error", status: 500, total: 0 }
    }
}

export const likeDislikeRemove: Function = async ({ UserId, VideoId, type }: ShortsEntity.likeDislikeRemove): Promise<Responses.likeDislikeRemoveResponse> => {
    try {
        const response = checkObjectId(VideoId)
        if (!response) {
            return <Responses.likeDislikeRemoveResponse>{
                message: "Invalid Credentials",
                status: 201
            }
        }
        if (type === "like") return await Repository.LikeVideoRepository({ UserId, VideoId })
        if (type === "dislike") return await Repository.DislikeVideoRepository({ UserId, VideoId })
        if (type === "remove") return await Repository.RemoveReactionRepository({ UserId, VideoId })
        return <Responses.likeDislikeRemoveResponse>{
            message: "Invalid Credentials",
            status: 500
        }
    } catch (e) {
        console.log(e)
        return <Responses.likeDislikeRemoveResponse>{
            message: "Internal Server Error",
            status: 500
        }
    }
}

export const deleteVideo: Function = async ({UserId,VideoId}:ShortsEntity.likeDislikeRemove) => {
    try {
        if(!VideoId || !checkObjectId(VideoId)) {
            return <Responses.likeDislikeRemoveResponse>{
                message:"Invalid Credentials",
                status:201
            }
        }
        return Repository.deleteVideoRepository({UserId,VideoId})
    } catch (e) {
        return <Responses.likeDislikeRemoveResponse>{
            message:"Internal Server Error",
            status:500
        }
    }
}