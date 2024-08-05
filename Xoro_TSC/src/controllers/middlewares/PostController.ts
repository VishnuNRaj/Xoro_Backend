import { Request, Response, NextFunction } from 'express';
import { VerifyUserAuthResponse } from '../../entities/ResponseInterface/UserResponsesInterface';
import * as PostEntity from '../../entities/RequestInterface/PostInterface';
import * as UseCases from '../../applications/usecases/Post';
import { getPostUser } from '../../applications/functions/UserFunctions';
import { getRandomUser } from '../../frameworks/database/Functions/ChannelFunctions';
import { ObjectId } from 'mongoose';
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


export const ReportPost: Middleware = async (req, res) => {
    try {
        const result = req.result;
        const { PostId } = req.params;
        const { Message, Content } = req.body
        const data = await UseCases.ReportPost({ Message, Content, PostId, UserId: result?.user?._id })
    } catch (e) {
        return res.status(500).json({ Message: "Internal Server Error" })
    }
}

export const GetPost: Middleware = async (req, res) => {
    const result = req.result
    try {
        const { postId } = req.params
        if (result && result.user && postId) {
            const [data] = await getPostUser(result.user._id, true, postId)
            console.log(data)
            return res.status(200).json({ post: data, user: result.user, message: "Found Post", status: 200 })
        } return res.status(200).json({ message: 'No Post Found', user: result?.user })
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error', user: result?.user })
    }
}

export const getRandomUsers: Middleware = async (req, res) => {
    const result = req.result
    try {
        const data = result && result.user ? await getRandomUser(result.user?._id ) : []
        console.log(data)
        return res.status(200).json({users:data})
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}