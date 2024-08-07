import * as Responses from "../../entities/ResponseInterface/UserResponsesInterface";

export const SignupRes: Function = async (data: Responses.SignUpResponse) => {
    return {
        errors: data.errors,
        message: data.message,
        status: data.status
    };
}

export const LoginRes: Function = async (data:Responses.LoginResponse) => {
    return <Responses.LoginResponse>{
        errors:data.errors,
        message:data.message,
        status:data.status,
        user:data.user || null,
        refresh:data.refresh
    }
}

export const VerifyAccountRes: Function = async (data:Responses.VerifyAccountResponse) => {
    return <Responses.VerifyAccountResponse>{
        message:data.message,
        status:data.status,
        token:data.token,
        user:data.user,
        data:data.data,
        refresh:data.refresh
    }
}

export const AddProfileRes: Function = async (data:Responses.AddProfileResponse) => {
    return <Responses.AddProfileResponse>{
        message:data.message,
        status:data.status,
        token:data.token,
        user:data.user,
        refresh:data.refresh
    }
}

export const OTPVerifyRes: Function = async (data:Responses.OTPVerifyResponse) => {
    return <Responses.OTPVerifyResponse>{
        message:data.message,
        token:data.token,
        user:data.user,
        status:data.status,
        refresh:data.refresh,
    }
}

export const VerityAccountAuthRes: Function = async (data:Responses.VerifyUserAuthResponse) => {
    return <Responses.VerifyUserAuthResponse>{
        message:data.message,
        user:data.user,
        status:data.status,
        token:data.token
    }
}

export const ResendOTPRes: Function = async (data:Responses.UserOTPResponse) => {
    return <Responses.UserOTPResponse>{
        message:data.message,
        status:data.status
    }
}

export const GetSecurityRes: Function = async (data:Responses.GetSecurityResponse) => {
    return <Responses.GetSecurityResponse>{
        user:data.user,
        TwoStepVerification:data.TwoStepVerification,
        message:data.message,
        status:data.status
    }
}

export const EditBannerRes:Function = async(data:Responses.EditBannerResponse) => {
    return <Responses.EditBannerResponse>{
        user:data.user,
        status:data.status,
        message:data.message
    }
}

export const EditProfilePicRes:Function = async(data:Responses.EditProfilePicResponse) => {
    return <Responses.EditProfilePicResponse>{
        user:data.user,
        status:data.status,
        message:data.message
    }
}

export const SecureAccountRes:Function = async (data:Responses.SecureAccountResponse) => {
    return <Responses.SecureAccountResponse>{
        user:data.user,
        status:data.status,
        message:data.message
    }
}

export const ProfileSettingsRes:Function = async (data:Responses.ProfileSettingsResponse) => {
    return <Responses.ProfileSettingsResponse>{
        message:data.message,
        status:data.status,
        user:data.user
    }
}

export const EditProfileDataRes:Function = async (data:Responses.EditProfileDataResponse) => {
    return <Responses.EditProfileDataResponse>{
        message:data.message,
        status:data.status,
        user:data.user,
    }
}

export const FollowUserRes: Function = async (data:Responses.FollowUserResponse) => {
    return <Responses.FollowUserResponse>{
        message:data.message,
        status:data.status,
        user:data.user,
        notification:data.notification
    }
}

export const UnFollowUserRes: Function = async (data:Responses.FollowUserResponse) => {
    return <Responses.FollowUserResponse>{
        message:data.message,
        status:data.status,
        user:data.user
    }
}

export const SearchUserRes: Function = async (data:Responses.SearchUserResponse) => {
    return <Responses.FollowUserResponse>{
        message:data.message,
        status:data.status,
        user:data.user,
        users:data.users
    }
}

export const GetUserProfileRes: Function = async (data:Responses.GetProfileResponse) => {
    return <Responses.GetProfileResponse>{
        message:data.message,
        status:data.status,
        user:data.user,
        userData:data.userData,
        post:data.post
    }
}

export const setTwoStepRes: Function = async (data:Responses.setTwoStepResponse) =>{
    return <Responses.setTwoStepResponse>{
        message:data.message,
        status:data.status,
    }
}

export const createChannelRes: Function = async (data:Responses.createChannelResponse) => {
    return <Responses.createChannelResponse>{
        message:data.message,
        status:data.status
    }
}

export const editChannelRes: Function = async (data:Responses.editChannel) => {
    return <Responses.editChannel>{
        message:data.message,
        status:data.status,
        Channel:data.Channel
    }
}
