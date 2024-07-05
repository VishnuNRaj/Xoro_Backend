import { ObjectId } from "mongoose";
import UserDocument from "../ModelsInterface/User";

export interface getChats {
    user: UserDocument;
}
export interface SendMessage {
    Message: string;
    user: UserDocument;
    RoomId: string;
    Files: Express.Multer.File[];
    Data: {
        FileType: string;
        FileLink: string;
    }[]
}

export interface StartChat {
    GroupName?:string;
    Profile?:string;
    UserId:string[];
    Users:{
        UserId:string;
        Admin:boolean;
    }[]
    user:UserDocument;
    LastClear:{
        UserId:string,
        Time:Date;
    }[],
    RoomId:string;
}

export interface getChat {
    RoomId:string;
    user:UserDocument;
}