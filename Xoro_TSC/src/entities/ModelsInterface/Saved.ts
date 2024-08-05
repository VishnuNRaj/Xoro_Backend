import { Document, ObjectId } from "mongoose";

export default interface SavedPost {
    PostId:ObjectId[];
    UserId:string;
}

