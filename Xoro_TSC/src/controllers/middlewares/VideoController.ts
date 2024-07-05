import { Request, Response, NextFunction } from 'express';
import * as UseCases from '../../applications/usecases/Video'
import * as Responses from '../../entities/ResponseInterface/UserResponsesInterface';
import * as VideoEntity from "../../entities/RequestInterface/VideoInterface";
interface CustomRequest extends Request {
    result?: Responses.VerifyUserAuthResponse;
}

type Middleware = (req: CustomRequest, res: Response, next: NextFunction) => void;

export const uploadVideo: Middleware = async (req, res) => {
    try {
        const result = req.result;
        let files = req.file

        const {
            Caption,
            Duration,
            Hashtags,
            RelatedTags,
            Restriction,
            Settings,
            Thumbnail,
            Description
        } = req.body as VideoEntity.uploadVideo;
        console.log()
        const data = await UseCases.uploadVideo({
            Caption,
            Duration,
            Hashtags,
            RelatedTags,
            Restriction,
            Settings,
            Video: files,
            Thumbnail,
            user: result?.user,
            Description
        });
        return res.status(data.status).json({ data });
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getVideos: Middleware = async (req, res) => {
    try {
        const result = req?.result
        const { skip } = req?.params
        const { random } = req?.query
        if (random && typeof random === 'string' && skip) {
            const data = await UseCases.getVideos(result?.user || null, parseInt(skip), parseInt(random))
            return res.status(data.status).json(data)
        }
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const getVideo: Middleware = async (req, res) => {
    try {
        const result = req?.result
        const { VideoLink } = req?.params
        const data = await UseCases.getVideo(VideoLink,result?.user)
        console.log(data)
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}