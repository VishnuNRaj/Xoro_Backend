import { Request, Response, NextFunction } from 'express';
import { VerifyUserAuthResponse } from '../../entities/ResponseInterface/UserResponsesInterface';
import * as PaymentEntity from "../../entities/RequestInterface/PaymentInterface";
import * as Usecases from "../../applications/usecases/Payment"
interface customRequest extends Request {
    result?: VerifyUserAuthResponse,
}
type Middleware = (req: customRequest, res: Response, next: NextFunction) => void;


export const Premium: Middleware = async (req, res) => {
    const result = req.result;
    try {
        const { PaymentId }: PaymentEntity.Premium = req.body
        const { Type } = req.params;
        const data = result && result.user && await Usecases.Premium({ Type, PaymentId, user: result.user })
        return data ? res.status(data.status).json({ ...data }) : res.status(500).json({ message: "Internal Server Error", user: result?.user })
    } catch (e) {
        return res.status(500).json({ message: "Internal Server Error", user: result?.user })
    }
}

export const JoinNow: Middleware = async (req, res) => {
    const result = req.result;
    try {
        const { PaymentId }: PaymentEntity.JoinNow = req.body
        const { ChannelId } = req.params;
        const data = result && result.user && await Usecases.JoinNow({ PaymentId, user: result.user, ChannelId })
        return data ? res.status(data.status).json({ ...data }) : res.status(500).json({ message: "Internal Server Error", user: result?.user })
    } catch (e) {
        return res.status(500).json({ message: "Internal Server Error", user: result?.user })
    }
}


export const SuperChat: Middleware = async (req, res) => {
    const result = req.result;
    try {
        const { PaymentId, Amount }: PaymentEntity.SuperChat = req.body
        const { LiveId } = req.params;
        const data = result && result.user && await Usecases.SuperChat({ PaymentId, UserId: result.user._id, LiveId, Amount })
        return data ? res.status(data.status).json({ ...data }) : res.status(500).json({ message: "Internal Server Error", user: result?.user })
    } catch (e) {
        return res.status(500).json({ message: "Internal Server Error", user: result?.user })
    }
}