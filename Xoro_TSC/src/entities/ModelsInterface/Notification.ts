import { Document, ObjectId } from "mongoose";

export interface Notification extends Document {
    SenderId: ObjectId;
    Type: string;
    Message: string;
    Time: Date;
    Link: string;
    Seen: boolean;
}

export interface Messages extends Document {
    UserId:ObjectId;
    Messages:Notification[];
}