import { Request, Response, NextFunction } from 'express';
import * as ShortsEntity from "../../entities/RequestInterface/ShortsInterface";
import * as UseCases from '../../applications/usecases/Shorts'
import * as Responses from '../../entities/ResponseInterface/UserResponsesInterface';
import { InternalServerError } from '../../frameworks/server/error';
interface CustomRequest extends Request {
    result?: Responses.VerifyUserAuthResponse;
}

type Middleware = (req: CustomRequest, res: Response, next: NextFunction) => void;

export const uploadShorts: Middleware = async (req,res) => {
    try {
        const result = req.result
        const file = req.file
        const {Caption,Context,Private,Hashtags,CommentsOn} = req.body
        const data = await UseCases.uploadShorts(<ShortsEntity.uploadShorts>{Caption,CommentsOn,Context,Private,Hashtags,file,user:result?.user})
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}
