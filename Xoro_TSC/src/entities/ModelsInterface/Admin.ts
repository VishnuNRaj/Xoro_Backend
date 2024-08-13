import { Document, ObjectId } from "mongoose";
export default interface AdminDocument extends Document {
    Name: string;
    Email: string;
    Password: string;
    User: boolean,
    reports: string[];
    VerificationLink: string;
    LinkTimeout: string;
    Profile: string;
    Phone: string;
}
export interface AdminWallet extends Document {
    balance:number;
    transactions:ObjectId[];
};
