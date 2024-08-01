import { ObjectId } from "mongoose";
import { Shorts } from "../ModelsInterface/Shorts";

export interface uploadShortsResponse {
    message:string;
    status:number;
}

export interface getShortsResponse {
    shorts:string[];
    total:number;
    message:string;
    status:number;
}

export interface likeDislikeRemoveResponse {
    message:string;
    status:number;
    Likes:number;
    Dislikes:number;
}