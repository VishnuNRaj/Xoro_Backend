import { ObjectId } from "mongoose";
import UserDocument from "../ModelsInterface/User";

export interface addComment {
    Comment:string[];
    user:UserDocument;
    PostId:string;
    type:string;
    tags:ObjectId[];
}

export interface addCommentReply {
    Comment:string[];
    UserId:ObjectId;
    CommentId:string;
    tags:ObjectId[];
}

export interface editComment {
    Comment:string[];
    UserId:ObjectId;
    CommentId:string;
    type:string;
}

export interface deleteComment {
    CommentId:string;
    UserId:ObjectId;
}