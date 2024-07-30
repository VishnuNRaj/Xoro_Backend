import { ObjectId } from "mongoose";

export interface shortsUpload {
    video:Express.Multer.File;
    userId:ObjectId;
    videoId:ObjectId;
    bucket:string;
    key:string;
    channelId:ObjectId;
}