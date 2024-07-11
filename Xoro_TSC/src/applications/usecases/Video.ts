import * as Validations from '../validations/VideoValidations';
import * as VideoEntity from '../../entities/RequestInterface/VideoInterface';
import * as Responses from '../../entities/ResponseInterface/VideoResponseInterface';
import * as Repository from '../repository/Video/UserVideoRepository';
import * as UserFunctions from '../functions/UserFunctions';
import UserDocument from '../../entities/ModelsInterface/User';
import { checkObjectId } from '../functions/DatabaseFunctions';

export const uploadVideo: Function = async (data: VideoEntity.uploadVideo): Promise<Responses.uploadVideoResponse> => {
    try {
        // const errors: {
        //     errors: string;
        //     status: boolean;
        // } = await Validations.uploadVideoValidate(data)
        // if (!errors.status) {
        //     return <Responses.uploadVideoResponse>{
        //         message: errors.errors,
        //         status: 400,
        //     }
        // }
        if (!data.user.Channel) return <Responses.uploadVideoResponse>{
            message: 'Create a Channel For Uploading Videos',
            status: 201,
        }
        const Links = {
            Video: `${data.user.Channel}/${new Date()}-${data.Video.originalname}`,
            Thumbnail: await UserFunctions.uploadBase64Image(data.Thumbnail)
        }
        return Repository.uploadVideoRepository({ ...data, Links: Links })
    } catch (e) {
        console.log(e)
        return <Responses.uploadVideoResponse>{
            message: 'Internal Server Error',
            status: 500,
        }
    }
}

export const getVideos: Function = async (user: UserDocument | null, skip: number, random: number) => {
    try {
        if (typeof skip !== 'number') {
            return <Responses.getVideosResponse>{
                user: user,
                message: 'Fault Queries',
                status: 201,
                Videos: []
            }
        }
        return Repository.getVideosRepository(user, skip, random)
    } catch (e) {
        return <Responses.getVideosResponse>{
            user: user,
            message: 'Internal server Error',
            status: 201,
            Videos: []
        }
    }
}

export const getVideo: Function = async (VideoLink: string, user: UserDocument) => {
    try {
        if (!VideoLink || VideoLink.length < 32) {
            return <Responses.getVideoResponse>{
                message: 'Fault Queries',
                status: 201,
                user: user
            }
        }
        return await Repository.getVideoRepository(VideoLink, user)
    } catch (e) {
        return <Responses.getVideoResponse>{
            message: 'Internal server Error',
            status: 201,
            user: user
        }
    }
}

export const likeDislikeRemove: Function = async ({ UserId, VideoId, type }: VideoEntity.likeDislikeRemove): Promise<Responses.likeDislikeRemoveResponse> => {
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

export const deleteVideo: Function = async ({UserId,VideoId}:VideoEntity.likeDislikeRemove) => {
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