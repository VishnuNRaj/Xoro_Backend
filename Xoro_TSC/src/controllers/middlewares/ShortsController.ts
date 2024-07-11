import { Request, Response, NextFunction } from 'express';
// import * as UserEntity from "../../entities/RequestInterface/UserInterfaces";
// import * as UseCases from '../../applications/usecases/Search'
import * as Responses from '../../entities/ResponseInterface/UserResponsesInterface';
import { InternalServerError } from '../../frameworks/server/error';
interface CustomRequest extends Request {
    result?: Responses.VerifyUserAuthResponse;
}

type Middleware = (req: CustomRequest, res: Response, next: NextFunction) => void;

export const uploadShorts: Middleware = (req,res) => {
    try {
        const file = req.file
        
    } catch (e) {
        // return res.status(500).json({message:"Internal Server Error"})
        throw new InternalServerError("Internal Server Error")
    }
}
