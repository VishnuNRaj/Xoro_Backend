import { Document, ObjectId } from "mongoose";

export interface CategoryInterface extends Document {
    Name:string;
    Videos:number;
    Listed:boolean;
    CreatedBy:ObjectId;
    CreatedAt:Date;
}