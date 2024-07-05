import { Request, Response, NextFunction } from 'express';
import { VerifyUserAuthResponse } from '../../entities/ResponseInterface/UserResponsesInterface';
import * as ChatEntity from '../../entities/RequestInterface/ChatInterface';
import ChatUsecases from '../../entities/Usecases/Chat';
interface customRequest extends Request {
    result?: VerifyUserAuthResponse,
}
type Middleware = (req: customRequest, res: Response, next: NextFunction) => void;

const Middlewares: Function = (UseCases:ChatUsecases) => {
    const getChats: Middleware = async (req, res) => {
        try {
            const result = req?.result
            if (result && result.user) {
                const data = await UseCases.getChats({ user: result.user })
                console.log(data)
                return res.status(data.status).json(data)
            }
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    const SendMessage: Middleware = async (req, res) => {
        try {
            const result = req?.result
            const { RoomId } = req.params
            const files: Express.Multer.File[] | any = req.files
            const { Message }:any = req.body
            if (files && result?.user && Message && RoomId) {
                const data = await UseCases.SendMessage({
                    Files: files, RoomId, user: result?.user, Message: Message,
                    Data: []
                })
                return res.status(data.status).json(data)
            }
        } catch (e) {
            return res.status(500).json({ message: 'Internal Server Error ' })
        }
    }
    const StartChat: Middleware = async (req, res) => {
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


    const getChat: Middleware = async (req, res) => {
        try {
            const result = req?.result;
            const { RoomId } = req.params
            console.log(RoomId)
            if (result?.user) {
                const data = await UseCases.getChat({ RoomId, user: result.user })
                res.status(data.status).json(data)
            }
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: 'Internal Server Error ' })
        }
    }
    return {
        getChats,
        getChat,
        SendMessage,
        StartChat
    }
}

export default Middlewares