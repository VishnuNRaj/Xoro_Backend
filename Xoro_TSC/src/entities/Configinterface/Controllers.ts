import { Request, Response, NextFunction } from 'express';
import { VerifyUserAuthResponse } from '../../entities/ResponseInterface/UserResponsesInterface';
interface customRequest extends Request {
    result?: VerifyUserAuthResponse,
}
type Middleware = (req: customRequest, res: Response, next: NextFunction) => void;

export default Middleware