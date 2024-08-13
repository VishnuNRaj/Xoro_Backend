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
    UserId: string;
}

export interface addCategory {
    AdminId: ObjectId;
    Name: string;
}

export interface editCategory {
    Name: string;
    AdminId: ObjectId;
    CategoryId: string;
}

export interface addVouchers {
    Name: string;
    From: string;
    End: string;
    Months: string;
    Description: string;
    Discount:number;
    Features: string[];
    Price: number;
    Thumbnail:string;
    Type: "Monthly" | "Yearly" | "Bi Monthly" | "Special";
    Image:Express.Multer.File,
    Id:ObjectId;
}

export interface editVouchers {
    Name: string;
    End: string;
    Months: number;
    Description: string;
    Features: string[];
    Price: number;
    id:string;
    Thumbnail:string;
    Image:Express.Multer.File;
}
