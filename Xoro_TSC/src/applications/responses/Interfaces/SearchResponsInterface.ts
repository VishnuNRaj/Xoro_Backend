import { PostImage } from "../../../entities/PostImages";
import UserDocument from "../../../entities/User"

export interface searchDataResponse {
    data:{
        user: UserDocument[];
        post:PostImage[];
    } | null;
    message: string;
    status: number;
}