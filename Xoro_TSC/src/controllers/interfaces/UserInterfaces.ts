import UserDocument from "../../entities/User";

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

export interface GetSecurity {
    user:UserDocument;
}

export interface EditBanner {
    Image:Express.Multer.File;
    user:UserDocument;
}

export interface EditProfilePic {
    Image:Express.Multer.File;
    user:UserDocument;
}

export interface SecureAccount {
    user:UserDocument;
    Password:string;
}

export interface ProfileSettings {
    user:UserDocument;
    Private:boolean;
    Notification:boolean;
    ProfileLock:boolean;
}

export interface EditProfileData {
    user:UserDocument;
    Name:string;
    Username:string;
    Gender:string;
    Age:number;
    Country:string;
    Description:string[];
}

export interface FollowUser {
    user:UserDocument;
    UserId:string;
}

export interface UnFollowUser {
    user:UserDocument;
    UserId:string;
}

export interface SearchUser {
    user:UserDocument;
    Search:string;
}

export interface GetUserProfile {
    ProfileLink:string;
    user:UserDocument;
}