import { Types } from 'mongoose';

export interface CommentReply extends Document {
    Comment: string;
    UserId: typeof Types.ObjectId;
    Likes: number;
    Dislikes: number;
}

export interface Comment extends Document {
    Comment: string;
    UserId: typeof Types.ObjectId;
    Likes: number;
    Dislikes: number;
    Replies: CommentReply[];
}

export interface AllCommments extends Document {
    Comments: Comment[];
    PostId: typeof Types.ObjectId;
}