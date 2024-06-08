import { Request, Response, NextFunction } from 'express';
import { VerifyUserAuthResponse } from '../../entities/ResponseInterface/UserResponsesInterface';
import * as PostEntity from '../../entities/RequestInterface/PostInterface';
import * as UseCases from '../../applications/usecases/Post';
interface customRequest extends Request {
    result?: VerifyUserAuthResponse,
}
type Middleware = (req: customRequest, res: Response, next: NextFunction) => void;

export const PostImages: Middleware = async (req, res) => {
    try {
        const result = req.result
        const Media = req.files
        // console.log(Media,req.body)
        const { Caption, CommentsOn, Hashtags, Tags, Hidden }: PostEntity.addImagesPost = req.body
        const data = await UseCases.AddPost({ Media, Caption, CommentsOn, Hashtags, Tags, Hidden, user: result?.user })
        console.log(data)
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
            return res.status(data.status).json(data)
        }
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const DeletePost: Middleware = async (req, res) => {
    try {
        const result = req.result
        const { PostId } = req.params
        const data = await UseCases.DeletePost({ PostId, user: result?.user })
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const LikePost: Middleware = (req, res) => {
    try {
        const { PostId, UserId } = req.params
        const data = UseCases.LikePost({ PostId, UserId })
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}


export const DislikePost: Middleware = (req, res) => {
    try {
        const { PostId, UserId } = req.params
        const data = UseCases.DislikePost({ PostId, UserId })
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const RemoveReactions: Middleware = (req, res) => {
    try {
        const { PostId, UserId } = req.params
        const data = UseCases.RemoveReactions({ PostId, UserId })
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

