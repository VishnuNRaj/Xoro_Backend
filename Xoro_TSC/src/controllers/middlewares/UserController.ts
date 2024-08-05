import { Request, Response, NextFunction } from 'express';
import * as UserEntity from "../../entities/RequestInterface/UserInterfaces";
import * as UseCases from '../../applications/usecases/User'
import * as Responses from '../../entities/ResponseInterface/UserResponsesInterface';
import { emitNotification } from '../Socket/SocketEmits';
import { getCategory } from '../Socket/SocketFunctions';
import { saveSubscription } from "../../config/web-push"
import { getChannel } from "../../frameworks/database/Functions/ChannelFunctions"
import { getNotifications } from "../../frameworks/database/Functions/NotificationFunctions"
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
            Type,
            Profile
        }: UserEntity.Register = req.body
        const result: Responses.SignUpResponse = await UseCases.RegisterUser({ Profile, Name, Email, Password, Phone, Type })
        res.status(result.status).json(result)
    } catch (e) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const Login: Middleware = async (req, res) => {
    try {
        const {
            Email, Password, Type
        }: UserEntity.Login = req.body
        const result: Responses.LoginResponse = await UseCases.LoginUser({ Email, Password, Type })
        console.log(result.refresh);
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
        if (result.data) await emitNotification(result.data, req.headers['socket-id']);
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
        const token = req.headers.authorization
        const refresh: string | undefined = req.cookies.refresh
        const result: Responses.VerifyUserAuthResponse = await UseCases.verifyUserAuth(token, refresh ? refresh : token)
        if (result.status === 200) {
            res.cookie("token", result.token)
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
export const getSecurity: Middleware = async (req, res) => {
    try {
        const result = req.result
        const data = await UseCases.getTwoStep({ user: result?.user })
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ messsage: 'Internal Server Error' })
    }
}

export const setSecurity: Middleware = async (req, res) => {
    try {
        const result = req.result
        const data = await UseCases.setTwoStep({ user: result?.user?._id })
        return res.status(data.status)
    } catch (e) {
        return res.status(500).json({ messsage: 'Internal Server Error' })
    }
}

export const getCategoryData: Middleware = async (req, res) => {
    try {
        const { search } = req.params;
        const result = await getCategory(search === "null" ? "" : search)
        return res.status(200).json({ category: result })
    } catch (e) {
        return res.status(500).json({ category: [] })
    }
}

export const Subscribe: Middleware = async (req, res) => {
    try {
        const result = req.result
        const sub = req.body
        await saveSubscription(sub, result?.user?._id)
        return res.status(200).json({ message: "Allowed Notifications" })
    } catch (e) {
        return res.status(500).json({ messsage: 'Internal Server Error' })
    }
}

export const GetChannel: Middleware = async (req, res) => {
    try {
        const result = req.result;
        if (result && result.user && result.user.Channel) {
            const channel = await getChannel(result.user.Channel);
            return res.status(200).json({ channel, status: 200 })
        } else return res.status(201).json({ message: "No Channel Created", status: 201 })
    } catch (e) {
        return res.status(500).json({ messsage: 'Internal Server Error', status: 500 })
    }
}

export const getNotification: Middleware = async (req, res) => {
    const result = req.result;
    try {
        const { skip } = req.params
        if (skip && !isNaN(parseInt(skip))) {
            const notifications = await getNotifications(result?.user?._id as any, parseInt(skip))
            return res.status(200).json({ notifications })
        } else return res.status(201).json({ notifications: [] })
    } catch (e) {
        return res.status(500).json({ messsage: 'Internal Server Error', status: 500 })
    }
} 