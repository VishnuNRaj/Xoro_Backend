import AdminDocument from "../../../entities/Admin";
import UnverifiedUsers from "../../../entities/UnverifiedUsers";
import UserDocument from "../../../entities/User";
import server from './../../../frameworks/server/server';

export interface AdminLoginResponse {
    message: string;
    errors: string[];
    status: number;
    admin?: AdminDocument;
}

export interface AdminOTPResponse {
    message: string;
    admin?: AdminDocument;
    status: number;
    token?: string;
}

export interface AdminOTPResendResponse {
    message: string;
    status: number;
}

export interface AdminVerifyAuthResponse {
    message: string;
    status: number;
    admin?: AdminDocument
}

export interface getUsersResponse {
    message: string;
    status: number;
    users: UserDocument[] | null;
}

export interface UsermanageResponse {
    status: number;
    message: string;
}