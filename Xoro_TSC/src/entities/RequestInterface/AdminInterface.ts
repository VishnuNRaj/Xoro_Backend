import { ObjectId } from "mongoose";

export interface AdminLogin {
    Email: string;
    Password: string;
}

export interface AdminOTP {
    OTP: string;
    UserId: string;
    RememberMe: boolean;
}

export interface AdminResendOTP {
    UserId: string;
}

export interface AdminVerifyAuth {
    token: string;
}

export interface AdminUserManagement {
    Suspended: boolean;
    SuspendedTill: number | null;
    Terminate: boolean;
    Admin: boolean;
    UserId:string;
}

export interface addCategory {
    AdminId:ObjectId;
    Name:string;
}