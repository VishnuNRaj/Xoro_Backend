import AdminDocument from "../ModelsInterface/Admin";
import UserDocument from "../ModelsInterface/User";
import {CategoryInterface} from "../ModelsInterface/Category"
export interface normals {
    message:string;
    status:number;
}
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

export interface addCategoryResponse extends normals {
    Category:CategoryInterface;
}