import * as LiveEntity from "../../entities/RequestInterface/LiveInterface";
import { Request, Response, NextFunction } from 'express';
import { VerifyUserAuthResponse } from '../../entities/ResponseInterface/UserResponsesInterface';
import * as UseCases from '../../applications/usecases/Comment';
interface customRequest extends Request {
    result: VerifyUserAuthResponse,
}
type Middleware = (req: customRequest, res: Response, next: NextFunction) => void;


export const createLive: Middleware = (req, res) => {
    try {
        const result = req.result
        const Thumbnail = req.file
        const {Caption,Description,RelatedTags,Restriction}:LiveEntity.createLive = req.body


    } catch (e) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}