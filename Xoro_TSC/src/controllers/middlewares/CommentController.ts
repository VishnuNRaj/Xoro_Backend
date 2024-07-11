import { Request, Response, NextFunction } from 'express';
import { VerifyUserAuthResponse } from '../../entities/ResponseInterface/UserResponsesInterface';
import * as PostEntity from '../../entities/RequestInterface/PostInterface';
import * as UseCases from '../../applications/usecases/Comment';
interface customRequest extends Request {
    result?: VerifyUserAuthResponse,
}
type Middleware = (req: customRequest, res: Response, next: NextFunction) => void;

export const AddComment: Middleware = async (req, res) => {
    try {
        const result = req.result
        const { PostId } = req.params
        const { Comment } = req.body
        const data = await UseCases.AddComment({ Comment, PostId, user: result?.user })
        console.log(data,"commenttttt")
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getComments: Middleware = async (req, res) => {
    try {
        const result = req.result
        const { PostId } = req.params
        const data = await UseCases.getComments(PostId, result?.user)
        console.log(data.comments.length)
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const deleteComment: Middleware = async (req,res) => {
    try {
        const result = req.result
        const {CommentId} = req.params
        const data = await UseCases.deleteComment({CommentId,UserId:result?.user})
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}