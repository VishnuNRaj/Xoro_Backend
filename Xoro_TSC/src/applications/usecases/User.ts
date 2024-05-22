import * as Validations from '../validations/UserValidation';
import * as UserEntity from './../../controllers/interfaces/UserInterfaces';
import * as Responses from '../responses/Interfaces/UserResponsesInterface';
import * as ResponseFunctions from '../responses/Response/UserResponse';
import * as Repository from '../repository/User/UserAuthRepository';
import * as UserFunctions from '../functions/UserFunctions';

import { log } from 'console';
export const RegisterUser: Function = async ({ Name, Email, Password, Phone, Type, Profile }: UserEntity.Register): Promise<Responses.SignUpResponse> => {
    try {
        console.log(Type, '_++_+________________________+_+_+_+_+_+_+_+++++___+++_+')
        let errors = []
        if (Type === 'Email') {
            errors = await Validations.RegisterValidate({ Name, Email, Password, Phone, Type })
        }
        if (errors.length > 0) {
            return ResponseFunctions.SignupRes(<Responses.SignUpResponse>{
                errors: errors,
                status: 201,
                message: 'Invalid Data Provided'
            })
        }
        return await Repository.RegisterRepository({ Name, Email, Password, Phone, Type, Profile })
    } catch (e) {
        return <Responses.SignUpResponse>{
            errors: [],
            message: 'Internal Server Error 1',
            status: 500
        }
    }
}

export const LoginUser: Function = async ({ Email, Password, Type }: UserEntity.Login): Promise<Responses.LoginResponse> => {
    try {
        let errors = []
        if (Type === 'Email') {
            errors = await Validations.LoginValidate(<UserEntity.Login>{ Email, Password })
        }
        if (errors.length > 0) {
            return <Responses.LoginResponse>{
                errors, message: 'Invalid Data Format', status: 201
            }
        }
        return await Repository.LoginRepository({ Email, Password, Type })
    } catch (e) {
        return <Responses.LoginResponse>{
            errors: [],
            message: 'Internal Server Error',
            status: 500
        }
    }
}

export const VerifyUser: Function = async ({ VerificationLink, UserId }: UserEntity.VerifyAccount): Promise<Responses.VerifyAccountResponse> => {
    try {
        log(VerificationLink, UserId)
        if (!VerificationLink) {
            return <Responses.VerifyAccountResponse>{
                message: 'No Link Found',
                status: 201
            }
        }
        if (!UserId) {
            return <Responses.VerifyAccountResponse>{
                message: 'No Link Found',
                status: 201
            }
        }
        return await Repository.VerifyAccountRepository(<UserEntity.VerifyAccount>{ VerificationLink, UserId })

    } catch (e) {
        return <Responses.VerifyAccountResponse>{
            message: 'Internal Server Error',
            status: 500
        }
    }
}


export const AddProfileUser: Function = async ({ file }: UserEntity.FilesSend, { Username, RememberMe }: UserEntity.AddProfileData, { UserId }: UserEntity.UserIds,): Promise<Responses.AddProfileResponse> => {
    try {
        if (!UserId) {
            return <Responses.AddProfileResponse>{
                message: 'Internal Server Error',
                status: 202,
                token: ''
            }
        }
        console.log(typeof file)
        if (typeof file !== 'string') {
            if (!file || !file.mimetype && file.mimetype.startsWith('image/')) {
                return <Responses.AddProfileResponse>{
                    message: 'Please Upload Image Files',
                    status: 202,
                    token: ''
                }
            }
        }
        const result = typeof file !== 'string' ? await UserFunctions.UploadFile(file) : file
        if (!result) {
            return <Responses.AddProfileResponse>{
                message: 'Internal Server Error',
                status: 202,
                token: ''
            }
        }
        return Repository.AddProfilePicRepository({ file: result }, { Username, RememberMe }, { UserId })
    } catch (e) {
        return <Responses.AddProfileResponse>{
            message: 'Internal Server Error',
            status: 500,
            token: ''
        }
    }
}

export const OTPVerifyLogin: Function = async ({ OTP, RememberMe }: UserEntity.OTPData, { UserId }: UserEntity.UserIds): Promise<Responses.OTPVerifyResponse> => {
    try {
        console.log(OTP, typeof OTP)
        if (!OTP || isNaN(OTP) || OTP.toString().length !== 6) {
            console.log('1')
            return <Responses.OTPVerifyResponse>{
                message: 'Invalid OTP',
                status: 202,
                token: ''
            }
        }
        if (!UserId) {
            console.log('2')
            return <Responses.OTPVerifyResponse>{
                message: 'Invalid Link',
                status: 202,
                token: ''
            }
        }
        return await Repository.OTPVerifyRepository({ OTP, RememberMe }, { UserId })
    } catch (e) {
        return <Responses.OTPVerifyResponse>{
            message: 'Internal Server Error',
            status: 500,
            token: ''
        }
    }
}


export const verifyUserAuth: Function = async (token: string): Promise<Responses.VerifyUserAuthResponse> => {
    try {
        console.log(token)
        if (!token || typeof token !== 'string') {
            return <Responses.VerifyUserAuthResponse>{
                message: 'Invalid Token',
                status: 202,
                user: null
            }
        }
        return await Repository.verifyUserAuthRepository(token)
    } catch (e) {
        console.error(e);
        return <Responses.VerifyUserAuthResponse>{
            message: 'Internal Server Error',
            status: 500,
            user: null
        }
    }
}


export const ResendUserOTP: Function = async ({ UserId }: UserEntity.UserOTP) => {
    try {
        return await Repository.ResendOTP({ UserId })
    } catch (e) {
        console.log(e);
        return <Responses.UserOTPResponse>{
            message: 'Internal Server Error',
            status: 500,
            token: ''
        }
    }
}

export const getTwoStep: Function = async ({ user }: UserEntity.GetSecurity) => {
    try {
        return Repository.getTwoStep({ user })
    } catch (e) {
        return <Responses.GetSecurityResponse>{
            message: 'Internal Server Error',
            status: 500,
            user: user,
            TwoStepVerification: false
        }
    }
}

export const setTwoStep: Function = async ({ user }: UserEntity.setSecurity) => {
    try {
        return Repository.setTwoStep({ user })
    } catch (e) {
        return <Responses.setTwoStepResponse>{
            message: 'Internal Server Error',
            status: 500,
        }
    }
}
