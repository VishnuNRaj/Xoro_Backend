import { Comments, CommentReply } from "../ModelsInterface/Comments"
export interface addCommentResponse {
    message: string;
    status: number;
    Comment:Comments;
}

export interface editCommentResponse {
    message: string;
    status: number;
    Comment: Comments;
}

export interface deleteCommentResponse {
    message:string;
    status:number;
}

export interface addReplyResponse {
    message:string;
    status:number;
    Comment:CommentReply;
}

export interface getCommentsResponse {
    message:string;
    comments:Comments[];
    status:number;
}