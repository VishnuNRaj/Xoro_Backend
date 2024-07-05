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
        console.log(result)
        if (result && result.user) {
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

export const LikePost: Middleware = async (req, res) => {
    try {
        const result = req.result
        const { PostId } = req.params
        const data = await UseCases.LikePost({ PostId, UserId: result?.user?._id })
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}


export const DislikePost: Middleware = async (req, res) => {
    try {
        const result = req.result
        const { PostId } = req.params
        const data = await UseCases.DislikePost({ PostId, UserId: result?.user?._id })
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const RemoveReactions: Middleware = async (req, res) => {
    try {
        const result = req.result
        const { PostId } = req.params
        const data = await UseCases.RemoveReactions({ PostId, UserId: result?.user?._id })
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}


export const GetPosts: Middleware = async (req, res) => {
    try {
        const result = req.result
        const { skip } = req.params
        const data = await UseCases.GetPosts({ UserId: result?.user?._id, skip: parseInt(skip) })
        return res.status(data.status).json({ ...data, user: result?.user })
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
