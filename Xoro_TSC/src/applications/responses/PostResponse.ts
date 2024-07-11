import { connections } from "mongoose";
import * as Responses from "../../entities/ResponseInterface/PostUserResponseInterface";

export const addPostRes = async (data: Responses.addPostResponse) => {
    return <Responses.addPostResponse>{
        message: data.message,
        status: data.status
    }
}

export const showPostRes = async (data: Responses.showImagesResponse) => {
    return <Responses.showImagesResponse>{
        message: data.message,
        post: data.post,
        status: data.status,
        user: data.user,
        connections: data.connections
    }
}

export const deletePostRes = async (data: Responses.deletePostResponse) => {
    return <Responses.deletePostResponse>{
        message: data.message,
        status: data.status
    }
}

export const getPostRes = async (data: Responses.getPostResponse) => {
    return <Responses.getPostResponse>{
        message: data.message,
        status: data.status,
        post: data.post,
        connections: data.connections,
    }
}

export const reportPostRes = async (data: Responses.reportPostResponse):Promise<Responses.reportPostResponse> => {
    return <Responses.reportPostResponse>data
}