import { Chat, Messages } from "../ModelsInterface/Chat";
import UserDocument from "../../entities/ModelsInterface/User";
import { ConnectionsInterface } from "../ModelsInterface/Connections";

export interface getChats {
    user:UserDocument;
    allChats?:Chat[];
    message:string;
    status:number;
    users?:ConnectionsInterface;
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
    users:UserDocument[];
}

export interface getChat {
    message:string;
    chat:Chat;
    status:number;
}