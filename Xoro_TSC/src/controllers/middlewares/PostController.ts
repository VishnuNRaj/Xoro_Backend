import { Request, Response, NextFunction } from 'express';
import { VerifyUserAuthResponse } from '../../applications/responses/Interfaces/UserResponsesInterface';
import * as PostEntity from '../interfaces/PostInterface';
import * as UseCases from '../../applications/usecases/Post';
interface customRequest extends Request {
    result?: VerifyUserAuthResponse,
}
type Middleware = (req: customRequest, res: Response, next: NextFunction) => void;

export const PostImages: Middleware = async (req, res) => {
    try {
        const result = req.result
        const { Images, Caption, CommentsOn, Hashtags, Tags, Hidden }: PostEntity.addImagesPost = req.body
        const data = await UseCases.AddPost({ Images, Caption, CommentsOn, Hashtags, Tags, Hidden, user: result?.user })
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const ShowPostImages: Middleware = async (req, res) => {
    try {
        const result = req.result
        if (result && result.user?._id) {
            const data = await UseCases.ShowPost({ user: result?.user })
            console.log(data)
            return res.status(data.status).json(data)
        }
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}