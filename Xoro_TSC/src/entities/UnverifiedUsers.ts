import { Document } from "mongoose";

export default interface UnverifiedUsers extends Document {
    Name: string;
    Email: string;
    Password: string;
    Username: string,
    Phone?: string;
    Verified?: boolean;
    Terminated?: boolean;
    Suspended?: boolean;
    SuspendedTill?: Date;
    Reason?: string;
    VerificationLink: string;
    LinkTimeout: Date;
    Profile:string;
    TwoStepVerification:boolean;
    Banner:string;
}