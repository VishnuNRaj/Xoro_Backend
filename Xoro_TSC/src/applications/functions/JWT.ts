import jwt, { TokenExpiredError } from 'jsonwebtoken';
import auth, { AuthInterface } from '../../config/auth';
import { JWTCreate, JWTVerify, JWTVerifyResponse } from '../../entities/Configinterface/JWT'

export const CreatePayload: Function = ({ Payload, RememberMe }: JWTCreate): string => {
    try {
        const { JWT_EXPIRES_IN, JWT_REMEMBER_ME, JWT_SECRET }: AuthInterface = auth;
        return jwt.sign(Payload, JWT_SECRET, { expiresIn: RememberMe ? JWT_REMEMBER_ME : JWT_EXPIRES_IN });
    } catch (e) {
        console.log(e)
        return 'Internal server error';
    }
};

export const VerifyPayload: Function = async ({ token }: JWTVerify): Promise<JWTVerifyResponse> => {
    try {
        const { JWT_SECRET }: AuthInterface = auth;
        const decodedToken = jwt.verify(token, JWT_SECRET);
        console.log(decodedToken)
        return {
            status: true,
            user: decodedToken as {
                UserId: string;
                Email: string;
            },
            error: null
        };
    } catch (error) {
        console.log(error)
        if (error instanceof TokenExpiredError) {
            return {
                status: false,
                user: null,
                error: 'Session Expired'
            };
        } else {
            return {
                status: false,
                user: null,
                error: 'Internal server error'
            };
        }
    }
};
