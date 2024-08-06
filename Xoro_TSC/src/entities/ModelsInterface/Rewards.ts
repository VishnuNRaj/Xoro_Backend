import { Document, ObjectId } from "mongoose";

export interface CoinsInterface extends Document {
    Image:string;
    Name:string;
    From:Date;
    Expiry:Date;
    Expired:boolean;
    Value:number;
    Createdby:ObjectId;
};

export interface UserCoinsInterface extends Document {
    UserId:ObjectId;
    Coins:{
        CoinId:ObjectId;
        Count:number;
        Claimed:boolean;
    }[];
};

export interface RewardsInterface extends Document {
    Task:string;
    Description:string;
    Start:Date;
    End:Date;
    Reward:{
        CoinId:string;
        Count:number;
    };
    Completed:{
        Date:Date;
        UserId:[]
    }[];
}


