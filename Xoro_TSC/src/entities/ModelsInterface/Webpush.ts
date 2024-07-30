import { Document,ObjectId } from "mongoose"

export default interface WebpushInterface extends Document {
    UserId: ObjectId;
    endpoint: string;
    keys: {
        p256dh: string;
        auth: string;
    };
    send:boolean;
}