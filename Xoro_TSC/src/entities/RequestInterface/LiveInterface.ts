import { ObjectId } from "mongoose";
import UserDocument from "../ModelsInterface/User"
export interface createLive {
    Caption:string;
    Thumbnail:Express.Multer.File;
    user:UserDocument;
    RelatedTags:string;
    Restriction:number;
    Description:string;
    Hashtags:string[]
    Link:string;
    Key:string;
}

export interface startLive {
    Key:string;
    user:UserDocument;
}

export interface likeDislikeRemove {
    VideoId:string;
    type:string;
    UserId:ObjectId;
}



