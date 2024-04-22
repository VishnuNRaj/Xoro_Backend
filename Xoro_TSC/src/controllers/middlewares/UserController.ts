import { Request, Response, NextFunction } from 'express';
import * as UserEntity from "../interfaces/UserInterfaces";
import * as UseCases from '../../applications/usecases/User'
import * as Responses from '../../applications/responses/Interfaces/UserResponsesInterface';
import { log } from 'console';
interface CustomRequest extends Request {
    result?: Responses.VerifyUserAuthResponse;
}

type Middleware = (req: CustomRequest, res: Response, next: NextFunction) => void;

export const Register: Middleware = async (req, res) => {
    try {
        const {
            Name,
            Email,
            Password,
            Phone,
        }: UserEntity.Register = req.body
        log(req.body)
        const result: Responses.SignUpResponse = await UseCases.RegisterUser({ Name, Email, Password, Phone })
        log(result)
        res.status(result.status).json(result)
    } catch (e) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const Login: Middleware = async (req, res) => {
    try {
        const {
            Email, Password
        }: UserEntity.Login = req.body
        const result: Responses.LoginResponse = await UseCases.LoginUser({ Email, Password })
        console.log(result);

        res.status(result.status).json(result)
    } catch (e) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const VerifyAccount: Middleware = async (req, res) => {
    try {
        const { VerificationLink, UserId } = req.params
        console.log(req.params);

        const result: Responses.VerifyAccountResponse = await UseCases.VerifyUser({ VerificationLink, UserId })
        res.status(result.status).json(result)
    } catch (e) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const AddProfile: Middleware = async (req, res) => {
    try {
        const file = req.file ? req.file : req.body.Profile
        const { Username, RememberMe }: UserEntity.AddProfileData = req.body
        const { UserId }: UserEntity.UserIds = req.params
        const result: Responses.AddProfileResponse = await UseCases.AddProfileUser({ file }, { Username, RememberMe }, { UserId })
        res.status(result.status).json(result)
    } catch (e) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const OtpVerify: Middleware = async (req, res) => {
    try {
        const { UserId }: UserEntity.UserIds = req.params;
        const { OTP, RememberMe }: UserEntity.OTPData = req.body
        console.log(OTP)
        const result: Responses.OTPVerifyResponse = await UseCases.OTPVerifyLogin({ OTP, RememberMe }, { UserId })
        res.status(result.status).json(result)
    } catch (e) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const VerifyUserAuth: Middleware = async (req, res, next) => {
    try {
        console.log(req.file,req.files)
        const token = req.headers.authorization 
        const result: Responses.VerifyUserAuthResponse = await UseCases.verifyUserAuth(token)
        if (result.status === 200) {
            req.result = result
            return next()
        }
        return res.status(result.status).json(result)
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}


export const VerifyUserResponse: Middleware = (req, res) => {
    try {
        const result = req.result;
        if (result) {
            return res.status(result.status).json(result)
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}



export const ResendOTP: Middleware = async (req, res) => {
    try {
        const { UserId }: UserEntity.UserOTP = req.body
        const result: Responses.UserOTPResponse = await UseCases.ResendUserOTP({ UserId })
        return res.status(result.status).json(result)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

