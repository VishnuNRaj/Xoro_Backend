import * as LiveEntity from "../../entities/RequestInterface/LiveInterface";
import { Request, Response, NextFunction } from 'express';
import { VerifyUserAuthResponse } from '../../entities/ResponseInterface/UserResponsesInterface';
import * as UseCases from '../../applications/usecases/Live';
import { likeDislikeRemoveLive, getLiveVideos, getLive } from "../../frameworks/database/Functions/LiveFunctions"
interface customRequest extends Request {
    result?: VerifyUserAuthResponse,
}
type Middleware = (req: customRequest, res: Response, next: NextFunction) => void;


export const createLive: Middleware = async (req, res) => {
    try {
        const result = req.result
        const Thumbnail = req.file
        console.log(Thumbnail)
        const { Caption, Description, RelatedTags, Restriction, Hashtags }: LiveEntity.createLive = req.body
        console.log(Thumbnail, req.body)
        if (Thumbnail && result?.user) {
            const data = await UseCases.createLive(<LiveEntity.createLive>{ Caption, Description, RelatedTags, Restriction, Hashtags, Thumbnail, user: result.user })
            return res.status(data.status).json(data)
        }
    } catch (e) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const LikeDislikeRemoveVideo: Middleware = async (req, res) => {
    try {
        const result = req.result
        const { VideoId, type } = req.params;
        const array = ["like", "dislike", "remove"]
        if (!array.find((value) => value === type)) return res.status(201).json({ message: "Invalid Credentials" });
        if (result && result.user) {
            const data = await likeDislikeRemoveLive(type, VideoId, result?.user._id)
            return res.status(data.status).json(data)
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }

}

export const getLiveVideoFilter: Middleware = async (req, res) => {
    try {
        const result = req.result
        const { category } = req.params
        const { videos, isLive }: { videos: string[], isLive: boolean } = req.body
        const data = await getLiveVideos(isLive, category ? category : null, videos)
        return res.status(data.status).json({ ...data, user: result?.user })
    } catch (e) {
        return res.status(500).json({ message: "Internal Server Error" })

    }
}

export const getLivevideo: Middleware = async (req, res) => {
    const result = req.result;
    try {
        const { key } = req.params;
        if (!key) return res.status(201).json({ user: result?.user, message: "No Stream Found", live: null })
        const data = await getLive(key as string);
        return res.status(data.status).json({...data,user:result?.user})
    } catch (e) {
        return res.status(500).json({ message: "Internal Server Error", user: result?.user, live: null })
    }
}