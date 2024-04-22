import * as Validations from '../validations/UserValidation';
import * as AdminEntity from './../../controllers/interfaces/AdminInterface';
import * as Responses from '../responses/Interfaces/AdminResponseInterface';
import * as Repository from '../repository/Admin/AdminAuthRepository';
import * as AdminUserRepository from '../repository/Admin/AdminUserManagementRepository'
import { checkObjectId } from '../functions/DatabaseFunctions';



export const AdminLogin: Function = async ({ Email, Password }: AdminEntity.AdminLogin): Promise<Responses.AdminLoginResponse> => {
    try {
        const errors = await Validations.LoginValidate(<AdminEntity.AdminLogin>{ Email, Password })
        if (errors.length > 0) {
            return <Responses.AdminLoginResponse>{
                errors, message: 'Invalid Data Format', status: 201
            }
        }
        return await Repository.AdminLoginRepository({ Email, Password })
    } catch (e) {
        console.log(e)
        return <Responses.AdminLoginResponse>{
            message: 'Internal server error',
            errors: [],
            status: 500
        }
    }
}

export const AdminOTPVerify: Function = async ({ OTP, RememberMe, UserId }: AdminEntity.AdminOTP): Promise<Responses.AdminOTPResponse> => {
    try {
        if (!OTP || isNaN(parseInt(OTP)) || OTP.length !== 6) {
            return <Responses.AdminOTPResponse>{
                message: 'Invalid OTP',
                status: 202
            }
        }
        if (!UserId || RememberMe === undefined) {
            return <Responses.AdminOTPResponse>{
                message: 'Invalid Link',
                status: 202
            }
        }
        return await Repository.AdminOTPVerifyRepository({ OTP, RememberMe, UserId })
    } catch (e) {
        return <Responses.AdminOTPResponse>{
            message: 'Internal server error',
            status: 500
        }
    }
}

export const ResendAdminOTP: Function = async ({ UserId }: AdminEntity.AdminResendOTP): Promise<Responses.AdminOTPResendResponse> => {
    try {
        return await Repository.ResendOTPRepository({ UserId })
    } catch (e) {
        return <Responses.AdminOTPResponse>{
            message: 'Internal server error',
            status: 500
        }
    }
}

export const VerifyAdmin: Function = async ({ token }: AdminEntity.AdminVerifyAuth): Promise<Responses.AdminVerifyAuthResponse> => {
    try {
        if (!token || typeof token !== 'string') {
            return <Responses.AdminVerifyAuthResponse>{
                message: 'Invalid Credentials',
                status: 202
            }
        }
        return await Repository.VerifyAdminRepository({ token })
    } catch (e) {
        return <Responses.AdminVerifyAuthResponse>{
            message: 'Internal Server Error',
            status: 500
        }
    }
}

export const getUsers: Function = async () => {
    try {
        return await AdminUserRepository.UserDataRepository()
    } catch (e) {
        return <Responses.getUsersResponse>{
            users: null,
            message: 'Internal Server Error',
            status: 500
        }
    }
}

export const ManageUser: Function = async ({ UserId, Admin, Suspended, SuspendedTill, Terminate }: AdminEntity.AdminUserManagement) => {
    try {
        const result = await checkObjectId(UserId)
        if (!result) {
            return <Responses.UsermanageResponse>{
                message: 'Invalid Credentials',
                status: 203
            }
        }
        if (SuspendedTill && isNaN(SuspendedTill)) {
            return <Responses.UsermanageResponse>{
                message: 'Invalid Data Format',
                status: 203
            }
        }
        return await AdminUserRepository.UserManagementRepository({ UserId, Admin, Suspended, SuspendedTill, Terminate })
    } catch (e) {
        return <Responses.UsermanageResponse>{
            message: 'Internal Server Error',
            status: 500
        }
    }
}


