import { PostImage } from "../ModelsInterface/PostImages";
import UserDocument from "../ModelsInterface/User"

export interface searchDataResponse {
    data:{
        user: UserDocument[];
        post:PostImage[];
    } | null;
    message: string;
    status: number;
}