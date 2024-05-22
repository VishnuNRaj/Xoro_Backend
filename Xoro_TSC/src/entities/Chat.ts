import { Document, ObjectId } from "mongoose";

export interface Messages extends Document {
    SenderId:ObjectId;
    RecieverId:ObjectId;
    FileLink:string;
    FileType:string;
    Message:string;
    Time:Date;
    Seen:boolean;
}

export interface Chat extends Document {
    UserId:ObjectId[];
    Messages:Messages[];
    RoomId:string;
}