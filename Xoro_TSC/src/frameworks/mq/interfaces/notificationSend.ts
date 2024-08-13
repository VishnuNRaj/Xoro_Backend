import { ObjectId } from "mongoose";
import { Notification } from "../../../entities/ModelsInterface/Notification";

export interface Credentials {
    userIds: ObjectId[];
    notification: Notification, type: string, Text: string,
    id?:string;
}
