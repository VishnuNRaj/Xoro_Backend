import { Document, ObjectId } from "mongoose"

export interface PostReports extends Document {
    UserId: ObjectId;
    Report: ObjectId;
    Message: string;
    VerifiedBy: ObjectId;
    ReportStatus: boolean;
    Type: string;
    Severity: string;
    ReportDate: Date;
    Review: string;
    Action: string;
    Resend:boolean;
    Content:string;
}

export interface VideoReports extends Document {
    UserId: ObjectId;
    Report: ObjectId;
    Message: string;
    VerifiedBy: ObjectId;
    ReportStatus: boolean;
    Type: string;
    Severity: string;
    ReportDate: Date;
    Review: string;
    Action: string;
    Resend:boolean;
    Content:string;
}

export interface CommentReports extends Document {
    UserId: ObjectId;
    Report: ObjectId;
    Message: string;
    VerifiedBy: ObjectId;
    ReportStatus: boolean;
    Type: string;
    Severity: string;
    ReportDate: Date;
    Review: string;
    Action: string;
    Resend:boolean;
    Content:string;
}

export interface UserReports extends Document {
    UserId: ObjectId;
    Report: ObjectId;
    Message: string;
    VerifiedBy: ObjectId;
    ReportStatus: boolean;
    Type: string;
    Severity: string;
    ReportDate: Date;
    Review: string;
    Action: string;
    Resend:boolean;
    Content:string;
}