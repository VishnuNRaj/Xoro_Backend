import * as Responses from "../../entities/ResponseInterface/CommentResponseInterface"

export const addCommentRes: Function = async (data:Responses.addCommentResponse) => {
    return<Responses.addCommentResponse>data
}

export const addCommentReplyRes: Function = async (data:Responses.addReplyResponse) => {
    return<Responses.addReplyResponse>data
}

export const getCommentsRes: Function = async (data:Responses.getCommentsResponse) => {
    return<Responses.getCommentsResponse>data
}