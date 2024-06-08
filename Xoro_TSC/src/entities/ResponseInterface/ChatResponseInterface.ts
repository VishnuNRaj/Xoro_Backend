import { Chat, Messages } from "../ModelsInterface/Chat";
import UserDocument from "../../entities/ModelsInterface/User";

export interface getChatsResponse {
    user:UserDocument;
    allChats?:Chat[];
    message:string;
    status:number;
}

export interface SendMessage {
    status:number;
    message:string;
    chat?:Messages;
}

export interface StartChat {
    status:number;
    message:string;
    newChat?:Chat;
    Users:UserDocument[];
}