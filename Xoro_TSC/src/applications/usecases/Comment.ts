import * as Responses from '../../entities/ResponseInterface/CommentResponseInterface';
import * as Repository from '../repository/User/UserCommentRepository';
import * as CommentEntity from '../../entities/RequestInterface/CommentInterface';
import { uploadFileToFirebase } from '../../config/firebase';
import * as DatabaseFunctions from '../functions/DatabaseFunctions';
import { ObjectId } from 'mongoose';
import UserDocument from '../../entities/ModelsInterface/User';


export const AddComment: Function = async ({ Comment, PostId, user }: CommentEntity.addComment) => {
    try {
        console.log(Comment)
        if(Comment.length === 0) {
            return <Responses.addCommentResponse>{
                message:"Enter Something",
                status:201,
            }
        }
        const filteredComment:string[] = Comment.filter((str, i, arr) => arr[i - 1] === "@" && DatabaseFunctions.checkObjectId(str))
        const tags:ObjectId[] = filteredComment.length > 0 ? await DatabaseFunctions.findUsersObjectId(filteredComment) : []
        console.log(tags,filteredComment)
        return await Repository.addComment({tags,Comment,PostId,user})
    } catch (e) {
        console.log(e)
        return <Responses.addCommentResponse>{
            message:"Internal Server Erorr",
            status:500
        }
    }
}

export const addCommentReply: Function = async ({ Comment, CommentId, UserId }: CommentEntity.addCommentReply) => {
    try {
        if(Comment.length === 0) {
            return <Responses.addCommentResponse>{
                message:"Enter Something",
                status:201,
            }
        }
        if(!DatabaseFunctions.checkObjectId(CommentId)) {
            return <Responses.addCommentResponse>{
                message:"Invalid Credentials",
                status:201,
            }
        }
        const filteredComment:string[] = Comment.filter((str, i, arr) => arr[i - 1] === "@" && DatabaseFunctions.checkObjectId(str))
        const tags:ObjectId[] = filteredComment.length > 0 ? await DatabaseFunctions.findUsersObjectId() : []
        return await Repository.addComment({tags,Comment,CommentId,UserId})
        
    } catch (e) {

    }
}

export const getComments: Function = async (PostId:string,user:UserDocument) => {
    try {
        if(!PostId) {
            return <Responses.getCommentsResponse>{
                message:"Invalid Credentials",
                status:201
            }
        }
        return await Repository.getComments(PostId,user)
    } catch (error) {
        return <Responses.getCommentsResponse>{
            message:"Internal Server Error",
            status:500
        }   
    }
}