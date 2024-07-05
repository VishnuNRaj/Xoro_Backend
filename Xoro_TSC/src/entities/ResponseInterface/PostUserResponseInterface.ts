import { ConnectionsInterface } from "../ModelsInterface/Connections";
import { Post, PostImage } from "../ModelsInterface/PostImages";
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
    connections:ConnectionsInterface
}

export interface deletePostResponse {
    message:string;
    status:number;
}

export interface getPostResponse {
    connections?:ConnectionsInterface;
    post:PostImage[];
    status:number;
    message:string;
}