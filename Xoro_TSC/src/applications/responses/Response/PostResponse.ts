import * as Responses from "../Interfaces/PostUserResponseInterface";

export const addPostRes = async (data:Responses.addPostResponse) => {
    return <Responses.addPostResponse>{
        message:data.message,
        status:data.status
    }
}

export const showPostRes = async (data:Responses.showImagesResponse) => {
    return <Responses.showImagesResponse>{
        message:data.message,
        post:data.post,
        status:data.status,
        user:data.user
    }
}

export const deletePostRes = async (data:Responses.deletePostResponse) => {
    return <Responses.deletePostResponse>{
        message:data.message,
        status:data.status
    }
}