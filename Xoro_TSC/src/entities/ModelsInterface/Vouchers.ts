import { Document, ObjectId } from "mongoose";

export default interface VoucherInterface extends Document {
    CreatedAt: Date;
    From: Date;
    End: Date;
    Description: string;
    Price: number;
    Discount:number;
    Type: "Monthly" | "Yearly" | "Bi Monthly" | "Special";
    Name: string;
    Features: string[];
    Months: number;
    Thumbnail:string;
}