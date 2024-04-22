import * as Responses from "../Interfaces/AdminResponseInterface";

export const AdminLoginRes: Function = async (data: Responses.AdminLoginResponse) => {
    return <Responses.AdminLoginResponse>{
        message: data.message,
        errors: data.errors,
        status: data.status,
        admin:data.admin
    }
}

export const AdminOTPVerifyRes: Function = async (data: Responses.AdminOTPResponse) => {
    return <Responses.AdminOTPResponse>{
        message: data.message,
        admin: data.admin,
        status: data.status,
        token: data.token
    }
}

export const AdminResendOTPRes: Function = async (data: Responses.AdminOTPResendResponse) => {
    return <Responses.AdminOTPResendResponse>{
        message: data.message,
        status: data.status
    }
}

export const AdminVerifyAuthRes: Function = async (data:Responses.AdminVerifyAuthResponse) => {
    return <Responses.AdminVerifyAuthResponse>{
        message: data.message,
        status: data.status,
        admin:data.admin,
    }
}

export const AdminUserDataRes: Function = async (data: Responses.getUsersResponse) => {
    return <Responses.getUsersResponse>{
        message: data.message,
        status: data.status,
        users:data.users
    }
}

export const AdminUserManagementRes: Function = (data:Responses.UsermanageResponse) => { 
    return <Responses.UsermanageResponse>{
        status: data.status,
        message: data.message
    }
}