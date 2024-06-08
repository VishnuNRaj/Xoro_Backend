import { Request, Response, NextFunction } from 'express';
import { VerifyUserAuthResponse } from '../../entities/ResponseInterface/UserResponsesInterface';
import * as ChatEntity from '../../entities/RequestInterface/ChatInterface';
import * as UseCases from '../../applications/usecases/Chat';
interface customRequest extends Request {
    result?: VerifyUserAuthResponse,
}
type Middleware = (req: customRequest, res: Response, next: NextFunction) => void;


export const getChats: Middleware = async (req, res) => {
    try {
        const result = req?.result
        if (result) {
            const data = await UseCases.getChats({ user: result.user })
            return res.status(data.status).json(data)
        }
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const SendMessage: Middleware = async (req, res) => {
    try {
        const result = req?.result
        const { RoomId } = req.params
        const files = req.files
        const { Message } = req.body
        if (files) {
            const data = await UseCases.SendMessage({ Files: files, RoomId, user: result?.user, mMessage: Message })
            return res.status(data.status).json(data)
        }
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error ' })
    }
}
export const StartChat: Middleware = async (req, res) => {
    try {
        const result = req?.result
        const { UserId, Profile, GroupName } = req.body
        const data = await UseCases.StartChat(<ChatEntity.StartChat>{
            user: result?.user,
            UserId: UserId,
            GroupName: GroupName,
            Profile: Profile
        })
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error ' })
    }
}