import { ChannelInterface } from "../ModelsInterface/Channels";
import { Notification } from "../ModelsInterface/Notification";
import { Post } from "../ModelsInterface/PostImages";
import UnverifiedUsers from "../ModelsInterface/UnverifiedUsers";
import UserDocument from "../ModelsInterface/User";

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
    refresh?:string;
}

export interface VerifyAccountResponse {
    message: string;
    status: number;
    token: string;
    user:UnverifiedUsers
    data?:{
        Message:string;
        Type:string;
        SenderId:string;
        Link:string;
    }
    refresh:string;
}

export interface AddProfileResponse {
    message: string;
    status: number;
    token: string;
    user:UnverifiedUsers;
    refresh?:string;
}

export interface OTPVerifyResponse {
    message: string;
    token:string;
    user:UnverifiedUsers;
    status:number;
    refresh:string;
}

export interface VerifyUserAuthResponse {
    message:string;
    user:UserDocument | null;
    status:number;
    token:string;
}

export interface UserOTPResponse {
    message:string;
    status:number;
}

export interface GetSecurityResponse {
    user:UserDocument;
    TwoStepVerification:boolean;
    message:string;
    status:number;
}

export interface EditBannerResponse {
    user:UserDocument;
    status:number;
    message:string;
}

export interface EditProfilePicResponse {
    user:UserDocument;
    status:number;
    message:string;
}

export interface SecureAccountResponse {
    user:UserDocument;
    status:number;
    message:string;
}

export interface ProfileSettingsResponse {
    user:UserDocument;
    status:number;
    message:string;
}

export interface EditProfileDataResponse {
    user:UserDocument;
    status:number;
    message:string;
}

export interface FollowUserResponse {
    user:UserDocument;
    status:number;
    message:string;
    notification?:{
        SenderId:string;
        Message:string;
        Type:string;
        Time:Date;
        Link:string;
    };
}

export interface UnFollowUserResponse {
    user:UserDocument;
    status:number;
    message:string;
}

export interface SearchUserResponse {
    users:UserDocument[] | null;
    user:UserDocument;
    status:number;
    message:string;
}

export interface GetProfileResponse {
    message:string;
    userData:UserDocument | null;
    user:UserDocument;
    status:number;
    post:{
        Images:Post[]
    }
}

export interface editChannel {
    Channel:ChannelInterface;
    message:string;
    status:number;
}

export interface setTwoStepResponse {
    message:string;
    status:number;
}

export interface createChannelResponse {
    message:string;
    status:number;
}

export interface getChannelResponse {
    channel:ChannelInterface;
    message:string;
    status:number;
}