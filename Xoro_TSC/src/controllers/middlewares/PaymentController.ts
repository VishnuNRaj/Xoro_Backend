import { Request, Response, NextFunction } from 'express';
import { VerifyUserAuthResponse } from '../../entities/ResponseInterface/UserResponsesInterface';
import ChatUsecases from '../../entities/Usecases/Chat';
interface customRequest extends Request {
    result?: VerifyUserAuthResponse,
}
type Middleware = (req: customRequest, res: Response, next: NextFunction) => void;


export const JoinNow:Middleware = (req,res) => {
    const result = req.result;
    try {
        const {} = req.body
    } catch (e) {
        
    }
}