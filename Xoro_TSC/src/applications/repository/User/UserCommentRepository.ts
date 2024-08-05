import * as CommentEntity from '../../../entities/RequestInterface/CommentInterface';
import * as DatabaseFunctions from '../../functions/DatabaseFunctions'
import * as ResponseFunctions from '../../responses/CommentResponse';
import * as Responses from '../../../entities/ResponseInterface/CommentResponseInterface';
import UserDocument from '../../../entities/ModelsInterface/User';
import CommentModel, { CommentReplies } from "../../../frameworks/database/models/Comments"
import { Comments, CommentReply } from '../../../entities/ModelsInterface/Comments';

export const addComment: Function = async ({ Comment, PostId, user, tags }: CommentEntity.addComment): Promise<Responses.addCommentResponse> => {
    try {
        const [comment]: Comments[] = await DatabaseFunctions.insertData(CommentModel, { Comment, PostId, UserId: user._id, Tags: tags })
        const [newComment]: Comments[] = await DatabaseFunctions.getComment(comment._id)
        return ResponseFunctions.addCommentRes(<Responses.addCommentResponse>{
            Comment: newComment,
            message: "Commented",
            status: 200
        })
    } catch (e) {
        console.log(e)
        return ResponseFunctions.addCommentRes(<Responses.addCommentResponse>{
            message: "Internal Server Error",
            status: 500,
        })
    }
}

export const addCommentReply: Function = async ({ Comment, CommentId, UserId, tags }: CommentEntity.addCommentReply): Promise<Responses.addReplyResponse> => {
    try {
        const [comment]: CommentReply[] = await DatabaseFunctions.insertData(CommentReplies, { Comment, CommentId, UserId, Tags: tags })
        return ResponseFunctions.addCommentReplyRes(<Responses.addReplyResponse>{
            Comment: comment,
            message: "Reply Sent",
            status: 200
        })
    } catch (e) {
        return ResponseFunctions.addCommentRes(<Responses.addReplyResponse>{
            message: "Internal Server Error",
            status: 500,
        })
    }
}

export const getComments: Function = async (PostId: string, user: UserDocument) => {
    try {
        const allComments: Comments[] = await DatabaseFunctions.getComments(PostId)
        return ResponseFunctions.getCommentsRes(<Responses.getCommentsResponse>{
            comments: allComments,
            message: "Found",
            status: 200
        })
    } catch (e) {
        return ResponseFunctions.getCommentsRes(<Responses.getCommentsResponse>{
            message: "Internal Server Error",
            status: 500,
        })
    }
}

export const deleteComment: Function = async ({ CommentId, UserId }: CommentEntity.deleteComment) => {
    try {
        const comment: Comments = await DatabaseFunctions.findUsingId(CommentId)
        if (!comment || comment.UserId !== UserId) {
            return ResponseFunctions.deleteCommentRes(<Responses.deleteCommentResponse>{ message: "UnAuthorized", status: 201 })
        }
        await comment.deleteOne()
        return ResponseFunctions.deleteCommentRes(<Responses.deleteCommentResponse>{ message: "Deleted Successfully", status: 200 })
    } catch (e) {
        return ResponseFunctions.deleteCommentRes(<Responses.deleteCommentResponse>{
            message: "Internal Server Error",
            status: 500
        })
    }
}