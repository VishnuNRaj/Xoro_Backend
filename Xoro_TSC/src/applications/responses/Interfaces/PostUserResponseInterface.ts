import { Post } from "../../../entities/PostImages";
import UserDocument from "../../../entities/User";

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