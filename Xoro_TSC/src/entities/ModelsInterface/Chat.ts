import { Document, ObjectId } from "mongoose";
import UserDocument from "./User";

export interface FilesLink extends Document {
    FileLink: string;
    FileType: string;
}

export interface Messages extends Document {
    RoomId: string;
    SenderId: ObjectId;
    Files: FilesLink[];
    Message: string;
    Time: Date;
    Seen: [ObjectId];
    Redirect: string;
}

export interface Chat extends Document {
    Users: {
        UserId: ObjectId[];
        Admin: boolean;
    }[];
    RoomId: string;
    LastClear: {
        UserId: ObjectId,
        Time: Date
    }[];
    GroupName: string;
    Profile:string;
    messages:Messages[];
    users?:UserDocument[];
}