import UserDocument from "../ModelsInterface/User";
import PostVideo from "../ModelsInterface/Videos";

export interface uploadVideoResponse {
    message:string;
    status:number;
}

export interface getVideosResponse {
    Videos:PostVideo[];
    user:UserDocument | null;
    message:string;
    status:number;
}

export interface getVideoResponse {
    Video:PostVideo;
    message:string;
    status:number;
    user:UserDocument
}