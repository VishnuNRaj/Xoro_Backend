import { Comment, CommentReply } from "../ModelsInterface/Comments"
export interface addCommentResponse {
    message: string;
    status: number;
    Comment:Comment;
}

export interface editCommentResponse {
    message: string;
    status: number;
    Comment: Comment;
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
    comments:Comment[];
    status:number;
}