import { Request, Response, NextFunction } from 'express';
import * as AdminEntity from "../interfaces/AdminInterface";
import * as UseCases from '../../applications/usecases/Admin'
import * as Responses from '../../applications/responses/Interfaces/AdminResponseInterface';
import { log } from 'console';
interface customRequest extends Request {
    result?: Responses.AdminVerifyAuthResponse
}
type Middleware = (req: customRequest, res: Response, next: NextFunction) => void;



export const AdminLogin: Middleware = async (req, res) => {
    try {
        const {
            Email,
            Password,
        }: AdminEntity.AdminLogin = req.body
        log(req.body)
        const result: Responses.AdminLoginResponse = await UseCases.AdminLogin({ Email, Password })
        res.status(result.status).json(result)
    } catch (e) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const AdminVerifyOTP: Middleware = async (req, res) => {
    try {
        const { UserId, OTP, RememberMe }: AdminEntity.AdminOTP = req.body
        const result: Responses.AdminOTPResponse = await UseCases.AdminOTPVerify({ UserId, OTP, RememberMe })
        return res.status(result.status).json(result)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


export const ResendOTP: Middleware = async (req, res) => {
    try {
        const { UserId }: AdminEntity.AdminOTP = req.body
        const result: Responses.AdminOTPResponse = await UseCases.ResendAdminOTP({ UserId })
        return res.status(result.status).json(result)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const VerifyAdminAuth: Middleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const result: Responses.AdminVerifyAuthResponse = await UseCases.VerifyAdmin({ token })
        req.result = result
        if (result.status === 200) {
            req.result = result
            return next()
        }
        else return res.status(result.status).json(result)
    } catch (e) {
        return res.status(500).json({ status: true })
    }
}

export const verifyAccountResponse: Middleware = (req, res) => {
    try {
        const result = req.result
        if (result) {
            return res.status(result.status).json(result)
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const getUsers: Middleware = async (req, res) => {
    try {
        const result = req.result
        const data: Responses.getUsersResponse = await UseCases.getUsers()
        return res.status(data.status).json({ users: data.users, admin: result?.admin, status: data.status, message: data.message })
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const ManageUsers: Middleware = async (req, res) => {
    try {
        const { Admin, Terminate, Suspended, SuspendedTill }: AdminEntity.AdminUserManagement = req.body
        const { UserId } = req.params
        console.log(req.body,UserId)
        const result: Responses.UsermanageResponse = await UseCases.ManageUser({ UserId, Admin, Terminate, Suspended, SuspendedTill })
        return res.status(result.status).json(result)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

