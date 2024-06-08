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
    user:UserDocument;
    LastClear:{
        UserId:string,
        Time:Date;
    }[]
}