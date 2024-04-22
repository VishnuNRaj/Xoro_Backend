import UnverifiedUsers from "../../../entities/UnverifiedUsers";
import UserDocument from "../../../entities/User";

export interface SignUpResponse {
    errors?: string[];
    message: string;
    status: number;
}


export interface LoginResponse {
    errors?: string[];
    message: string;
    status: number;
    user?:UnverifiedUsers | null;
}

export interface VerifyAccountResponse {
    message: string;
    status: number;
    token: string;
    user:UnverifiedUsers
}

export interface AddProfileResponse {
    message: string;
    status: number;
    token: string;
    user:UnverifiedUsers;
}

export interface OTPVerifyResponse {
    message: string;
    token:string;
    user:UnverifiedUsers;
    status:number;
}

export interface VerifyUserAuthResponse {
    message:string;
    user:UserDocument | null;
    status:number;
}

export interface UserOTPResponse {
    message:string;
    status:number;
}