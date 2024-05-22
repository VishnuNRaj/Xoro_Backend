import { Document, ObjectId } from "mongoose";

export default interface UserDocument extends Document {
    Name: string;
    Username:string;
    Followers: number;
    Following: number;
    Streams: ObjectId;
    Profile: string;
    Suspended: boolean;
    Terminated: boolean;
    Connections: ObjectId;
    Wallet: ObjectId;
    Hashtags: string[];
    SuspendedTill?: Date;
    Reason?: string;
    Referral?: string;
    Reports: ObjectId;
    Age?: number;
    Gender?: string;
    Country?: string;
    Description?: string[];
    ProfileLink:string;
    Posts:number;
    CreatedAt: Date;
    Settings:{
        Private:boolean,
        BlockedUsers?:ObjectId,
        Favourites?: ObjectId,
        Notifications:boolean,
    };
    Banner:string;
    Channel:boolean;
    ProfileLock:boolean;
}
