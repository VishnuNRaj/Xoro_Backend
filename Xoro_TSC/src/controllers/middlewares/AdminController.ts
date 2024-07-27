import { Request, Response, NextFunction } from 'express';
import * as AdminEntity from "../../entities/RequestInterface/AdminInterface";
import * as UseCases from '../../applications/usecases/Admin'
import * as Responses from '../../entities/ResponseInterface/AdminResponseInterface';
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
        console.log(result)
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
        const token: string | undefined = req.headers.authorization
        console.log(req.headers, "____")
        if (token) {
            const result: Responses.AdminVerifyAuthResponse = await UseCases.VerifyAdmin({ token })
            console.log(result)
            req.result = result
            if (result.status === 200) {
                req.result = result
                return next()
            }
            else return res.status(result.status).json(result)
        }
        return res.status(202).json({ status: true, message: "Invalid Data" })
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
        console.log(req.body, UserId)
        const result: Responses.UsermanageResponse = await UseCases.ManageUser({ UserId, Admin, Terminate, Suspended, SuspendedTill })
        return res.status(result.status).json(result)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const addCategory: Middleware = async (req, res) => {
    try {
        const result = req.result
        const { Name } = req.body
        const data = await UseCases.addCategory({ AdminId: result?.admin?._id, Name })
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const deleteCategory: Middleware = async (req, res) => {
    try {
        const result = req.result
        const { CategoryId } = req.params
        console.log(CategoryId)
        const data = await UseCases.deleteCategory({ AdminId: result?.admin?._id, CategoryId })
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
export const editCategory: Middleware = async (req, res) => {
    try {
        const result = req.result
        const { Name } = req.body
        const { CategoryId } = req.params
        const data = await UseCases.editCategory({ AdminId: result?.admin?._id, Name, CategoryId })
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const getategory: Middleware = async (req, res) => {
    try {
        const result = req.result
        const { search, skip } = req.params
        const data = await UseCases.getCategory(search !== "null" ? search : "", parseInt(skip))
        console.log(data)
        return res.status(data.status).json({ ...data, admin: result?.admin })
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
