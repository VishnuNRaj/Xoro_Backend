import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export interface PostImage extends Document {
    UserId: typeof ObjectId;
    Posts: ObjectId[]
}

export interface Post extends Document {
    Caption: string;
    UserId:ObjectId;
    Images: {
        postType:string,
        link:string;
    }[];
    Postdate: Date;
    Tags: string[];
    CommentsOn: boolean;
    Hidden: boolean;
    Likes: number;
    Dislikes: number;
    Comments: number;
    CommentId?: ObjectId;
    Reactions?: ObjectId;
    Hashtags: string[];
    ShareLink?: string;
    ShowReactions:boolean;
}