import UserDocument from "../../../entities/User";
import PostVideo from "../../../entities/Videos";

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