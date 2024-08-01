import { Request, Response, NextFunction } from 'express';
import * as ShortsEntity from "../../entities/RequestInterface/ShortsInterface";
import * as UseCases from '../../applications/usecases/Shorts'
import * as Responses from '../../entities/ResponseInterface/UserResponsesInterface';
import { InternalServerError } from '../../frameworks/server/error';
import { getShortsVideos } from '../../frameworks/database/Functions/ChannelFunctions';
interface CustomRequest extends Request {
    result?: Responses.VerifyUserAuthResponse;
}

type Middleware = (req: CustomRequest, res: Response, next: NextFunction) => void;

export const uploadShorts: Middleware = async (req, res) => {
    try {
        const result = req.result
        const file = req.file
        const { Caption, Context, Private, Hashtags, CommentsOn } = req.body
        const data = await UseCases.uploadShorts(<ShortsEntity.uploadShorts>{ Caption, CommentsOn, Context, Private, Hashtags, file, user: result?.user })
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getShorts: Middleware = async (req, res) => {
    const result = req.result;
    try {
        const { shorts } = req.body
        const data = await UseCases.getShorts(shorts);
        return res.status(data.status).json({ ...data, user: result?.user })
    } catch (e) {
        return res.status(500).json({ user: result?.user, message: "Internal Server Error", shorts: [], total: 0, status: 201 })
    }
}

export const getShortsVideo: Middleware = async (req, res) => {
    const result = req.result;
    try {
        const { id } = req.params;
        console.log(id)
        if (id.length === 32) {
            const data = await getShortsVideos(id)
            return res.status(data.status).json({ ...data, user: result?.user })
        }
    } catch (e) {
        return res.status(500).json({ message: "Internal Server Error", shorts: null, user: result?.user })
    }
}

export const LikeDislikeRemoveVideo: Middleware = async (req, res) => {
    try {
        const result = req.result
        const { VideoId, type } = req.params;
        const array = ["like", "dislike", "remove"]
        if (!array.find((value) => value === type)) return res.status(201).json({ message: "Invalid Credentials" });
        const data = await UseCases.likeDislikeRemove({ VideoId, type, UserId: result?.user?._id })
        return res.status(data.status).json(data)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }

}