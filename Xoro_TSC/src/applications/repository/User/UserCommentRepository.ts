import * as CommentEntity from '../../../entities/RequestInterface/CommentInterface';
import * as DatabaseFunctions from '../../functions/DatabaseFunctions'
import * as UserFunctions from '../../functions/UserFunctions'
import UserAuth from '../../../frameworks/database/models/UnverifiedUsers';
import * as ResponseFunctions from '../../responses/CommentResponse';
import * as Responses from '../../../entities/ResponseInterface/CommentResponseInterface';
import * as CommonFunctions from '../../functions/CommonFunctions';
import UnverifiedUsers from '../../../entities/ModelsInterface/UnverifiedUsers';
import User from '../../../frameworks/database/models/User';
import auth from '../../../config/auth'
import UserDocument from '../../../entities/ModelsInterface/User';
import CommentModel,{CommentReplies} from "../../../frameworks/database/models/Comments"
import { Comment, CommentReply } from '../../../entities/ModelsInterface/Comments';

export const addComment: Function = async ({Comment,PostId,user,tags}:CommentEntity.addComment):Promise<Responses.addCommentResponse> => {
    try {
        const [comment]:Comment[] = await DatabaseFunctions.insertData(CommentModel,{Comment,PostId,UserId:user._id,Tags:tags})
        console.log(comment)
        // UserFunctions.createNotification
        return ResponseFunctions.addCommentRes(<Responses.addCommentResponse>{
            Comment:comment,
            message:"Commented",
            status:200
        })
    } catch (e) {
        console.log(e)
        return ResponseFunctions.addCommentRes(<Responses.addCommentResponse>{
            message:"Internal Server Error",
            status:500,
        })
    }
}

export const addCommentReply: Function = async ({Comment,CommentId,UserId,tags}:CommentEntity.addCommentReply):Promise<Responses.addReplyResponse> => {
    try {
        const [comment]:CommentReply[] = await DatabaseFunctions.insertData(CommentReplies,{Comment,CommentId,UserId,Tags:tags})
        return ResponseFunctions.addCommentReplyRes(<Responses.addReplyResponse>{
            Comment:comment,
            message:"Reply Sent",
            status:200
        })
    } catch (e) {
        return ResponseFunctions.addCommentRes(<Responses.addReplyResponse>{
            message:"Internal Server Error",
            status:500,
        })
    }
}

export const getComments: Function = async (PostId:string,user:UserDocument) => {
    try {
        const allComments:Comment[] = await DatabaseFunctions.getComments(PostId)
        const newData = allComments.filter((comment)=>comment.UserId === user._id)
        const otherData = allComments.filter((comment)=>comment.UserId !== user._id)
        return ResponseFunctions.getCommentsRes(<Responses.getCommentsResponse>{
            comments:[...newData,...otherData],
            message:"Found",
            status:200
        })
    } catch (e) {
        return ResponseFunctions.getCommentsRes(<Responses.getCommentsResponse>{
            message:"Internal Server Error",
            status:500,
        })
    }
}