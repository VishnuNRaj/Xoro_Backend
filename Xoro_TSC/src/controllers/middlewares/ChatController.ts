import { Request, Response, NextFunction } from 'express';
import { VerifyUserAuthResponse } from '../../applications/responses/Interfaces/UserResponsesInterface';
import * as ChatEntity from '../interfaces/PostInterface';
import * as UseCases from '../../applications/usecases/Chat';
interface customRequest extends Request {
    result?: VerifyUserAuthResponse,
}
type Middleware = (req: customRequest, res: Response, next: NextFunction) => void;


export const getChats: Middleware = (req, res) => {
    try {
        const result = req?.result

    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}