import { Post } from "../ModelsInterface/PostImages";
import UserDocument from "../ModelsInterface/User";

export interface addPostResponse {
    message:string;
    status:number;
}

export interface showImagesResponse {
    message:string;
    post:Post[] | null;
    status:number;
    user:UserDocument;
}

export interface deletePostResponse {
    message:string;
    status:number;
}