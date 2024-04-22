import { File } from "buffer";

export interface Register {
    Name: string;
    Email: string;
    Password: string;
    Phone: number | null;
}


export interface Login {
    Email: string;
    Password: string;
}

export interface VerifyAccount {
    VerificationLink: string;
    UserId: string;
}

export interface FilesSend {
    file: Express.Multer.File | null | string;
}


export interface AddProfileData {
    Username:string | null;
    RememberMe:boolean;
    UserId:string;
    Profile:any;
}

export interface UserIds {
    UserId?:string;
}

export interface OTPData {
    OTP:number ;
    RememberMe:boolean;
}


export interface UserOTP {
    UserId?:string;
}