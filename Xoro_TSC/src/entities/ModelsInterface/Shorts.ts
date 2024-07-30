import { Document, ObjectId } from "mongoose";
import { ReactionsInterface } from "./Reactions"

export interface Shorts extends Document {
    Caption: string;
    Tags: ObjectId[];
    Video: string;
    Key: string;
    Views: number;
    Likes: number;
    Dislikes: number;
    reactions:ReactionsInterface;
    Comments:number;
    ChannelId:ObjectId;
    Hashtags:string[];
    Context:string;
    Settings:{
        Private:boolean;
        CommentsOn:boolean;
    };
    UploadDate:Date;
    Duration:string;
    Uploaded:boolean;
    VideoLink:string;
};