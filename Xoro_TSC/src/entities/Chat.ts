import { Document, ObjectId } from "mongoose";

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
}

export interface Chat extends Document {
    UserId: ObjectId[];
    RoomId: string;
}