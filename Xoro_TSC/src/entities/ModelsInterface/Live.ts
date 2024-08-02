import { Document, ObjectId } from "mongoose"
import {ReactionsInterface} from "./Reactions"
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
    Reports:number;
    Thumbnail:string;
    Restriction:number;
    reactions:ReactionsInterface[];
    from:string;
    Video:string;
}