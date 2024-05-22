import { Request, Response, NextFunction } from 'express';
import * as UseCases from '../../applications/usecases/Video'
import * as Responses from '../../applications/responses/Interfaces/UserResponsesInterface';
import * as VideoEntity from "../interfaces/VideoInterface";
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
