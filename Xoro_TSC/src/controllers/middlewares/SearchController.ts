import { Request, Response, NextFunction } from 'express';
import * as UserEntity from "../../entities/RequestInterface/UserInterfaces";
import * as UseCases from '../../applications/usecases/User'
import * as Responses from '../../entities/ResponseInterface/UserResponsesInterface';
interface CustomRequest extends Request {
    result?: Responses.VerifyUserAuthResponse;
}

type Middleware = (req: CustomRequest, res: Response, next: NextFunction) => void;

export const searchData: Middleware = (req, res) => {
    try {
        const result = req?.result
        if(result) {
            // const data = 
        }
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}