import { Document,ObjectId } from "mongoose";

export interface ChannelInterface extends Document {
    Name:string,
    UserId:ObjectId;
    Type:string[];
    Subsribers:ObjectId[];
    Reports:number;
    Description:string;
    Logo:string;
    ChannelLink:string;
}

export interface PremiumUsersInterface extends Document {
    ChannelId:ObjectId;
    Users:{
        UserId:ObjectId;
        CreatedAt:Date;
    }[]
}