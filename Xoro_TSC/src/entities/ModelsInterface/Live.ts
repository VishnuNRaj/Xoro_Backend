import { Document, ObjectId } from "mongoose"

export default interface LiveInterface extends Document {
    Caption: string;
    Description: string;
    Key: string;
    Live: boolean;
    Duration: string;
    Start: Date;
    End: Date;
    Completed: boolean;
    Views: number;
    Likes: number;
    Dislikes: number;
    RelatedTags: string;
    UserId: ObjectId;
    Listed: boolean;
    Comments: boolean;
    Reports:number;
}