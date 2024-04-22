import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export interface PostImage extends Document {
    UserId: typeof ObjectId;
    Posts: Post[]
}

export interface Post {
    Caption: string;
    Images: string[];
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