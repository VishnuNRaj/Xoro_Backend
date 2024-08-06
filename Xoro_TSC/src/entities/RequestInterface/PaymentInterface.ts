import { ObjectId } from "mongoose";

export interface Premium {
    PaymentId: string;
    UserId: ObjectId;
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
    UserId: ObjectId;
}