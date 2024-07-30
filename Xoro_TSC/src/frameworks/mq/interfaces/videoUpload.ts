import { ObjectId } from "mongoose";

export interface videoUpload {
    video:Express.Multer.File;
    userId:ObjectId;
    key:string;
    bucket:string;
    thumbnail:string;
    videoId:ObjectId;
    channelId:ObjectId;
}