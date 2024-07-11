import { ObjectId, Document } from 'mongoose';
import UserDocument from './User';

export interface CommentReply extends Document {
    Comment: string[];
    CommentId:ObjectId;
    UserId: ObjectId;
    Likes: number;
    user: UserDocument;
    tags: UserDocument[];
    Edited:boolean;
    Tags:ObjectId[];
}


export interface Comments extends Document {
    Comment: string[];
    PostId: ObjectId;
    UserId: ObjectId;
    Likes: number;
    user: UserDocument;
    tags: UserDocument[];
    Edited:boolean;
    Tags:ObjectId[];
}
