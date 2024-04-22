import * as Responses from "../Interfaces/UserResponsesInterface";

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
        user:data.user || null
    }
}

export const VerifyAccountRes: Function = async (data:Responses.VerifyAccountResponse) => {
    return <Responses.VerifyAccountResponse>{
        message:data.message,
        status:data.status,
        token:data.token,
        user:data.user
    }
}

export const AddProfileRes: Function = async (data:Responses.AddProfileResponse) => {
    return <Responses.AddProfileResponse>{
        message:data.message,
        status:data.status,
        token:data.token,
        user:data.user
    }
}

export const OTPVerifyRes: Function = async (data:Responses.OTPVerifyResponse) => {
    return <Responses.OTPVerifyResponse>{
        message:data.message,
        token:data.token,
        user:data.user,
        status:data.status
    }
}

export const VerityAccountAuthRes: Function = async (data:Responses.VerifyUserAuthResponse) => {
    return <Responses.VerifyUserAuthResponse>{
        message:data.message,
        user:data.user,
        status:data.status
    }
}

export const ResendOTPRes: Function = async (data:Responses.UserOTPResponse) => {
    return <Responses.UserOTPResponse>{
        message:data.message,
        status:data.status
    }
}