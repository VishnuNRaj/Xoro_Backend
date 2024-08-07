import * as interfaces from "../../entities/ResponseInterface/VideoResponseInterface";

export const uploadVideoRes: Function = (data: interfaces.uploadVideoResponse) => {
    return <interfaces.uploadVideoResponse>{
        message: data.message,
        status: data.status,
    }
}

export const getVideoRes: Function = async (data: interfaces.getVideosResponse) => {
    return <interfaces.getVideosResponse>data
}

export const getVideosRes: Function = async (data: interfaces.getVideoResponse) => {
    return <interfaces.getVideoResponse>data
}
export const likeDislikeRemoveRes: Function = async (data: interfaces.likeDislikeRemoveResponse) => {
    return <interfaces.likeDislikeRemoveResponse>data
}