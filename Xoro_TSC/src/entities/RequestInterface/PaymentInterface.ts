import { ObjectId } from "mongoose";
import UserDocument from "../ModelsInterface/User";

export interface Premium {
    PaymentId: string;
    user:UserDocument;
    Type: string;

}

export interface SuperChat {
    PaymentId: string;
    Amount: number;
    UserId: ObjectId;
    LiveId: string;
}

export interface JoinNow {
    ChannelId: string;
    user:UserDocument;
    PaymentId:string;
}

