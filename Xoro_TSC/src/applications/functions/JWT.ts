import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import auth, { AuthInterface } from '../../config/auth';
import { JWTCreate, JWTVerify, JWTVerifyResponse } from '../../entities/Configinterface/JWT';

export const CreatePayload = ({ Payload, RememberMe }: JWTCreate): string => {
    try {
        console.log(Payload)
        const { JWT_EXPIRES_IN, JWT_REMEMBER_ME, JWT_SECRET }: AuthInterface = auth;
        return jwt.sign(Payload, JWT_SECRET, { expiresIn: RememberMe ? JWT_REMEMBER_ME : JWT_EXPIRES_IN });
    } catch (e) {
        console.error(e);
        return 'Internal server error';
    }
};

export const VerifyPayload = async ({ token, refresh }: JWTVerify): Promise<JWTVerifyResponse> => {
    const { JWT_SECRET }: AuthInterface = auth;
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        return <JWTVerifyResponse>{
            status: true,
            user: decodedToken as {
                UserId: string;
                Email: string;
            },
            error: null,
            token: token,
        };
    } catch (error: any) {
        console.error(error);
        if (error instanceof TokenExpiredError) {
            if (token === refresh) {
                return <JWTVerifyResponse>{
                    status: false,
                    user: null,
                    error: 'Session Expired'
                };
            }
            try {
                const refreshToken = jwt.verify(refresh, JWT_SECRET) as JwtPayload & {
                    UserId: string;
                    Email: string;
                    Admin: boolean;
                };
                if (refreshToken) {
                    const newToken = CreatePayload({ Payload: refreshToken, RememberMe: true });
                    return <JWTVerifyResponse>{
                        status: true,
                        token: newToken,
                        user: refreshToken,
                        error: null
                    };
                }
            } catch (e: any) {
                if (e instanceof TokenExpiredError) {
                    return <JWTVerifyResponse>{
                        status: false,
                        user: null,
                        error: 'Session Expired'
                    };
                }
            }
        }
        return <JWTVerifyResponse>{
            status: false,
            user: null,
            error: 'Internal server error'
        };
    }
};


export const VerifyPayloadAdmin = async (token: string): Promise<JWTVerifyResponse> => {
    const { JWT_SECRET }: AuthInterface = auth;
    try {
        const decodedToken = await jwt.verify(token, JWT_SECRET);
        return <JWTVerifyResponse>{
            status: true,
            user: decodedToken as {
                UserId: string;
                Email: string;
            },
            error: null,
            token: token,
        };
    } catch (error: any) {
        console.error(error);
        if (error instanceof TokenExpiredError) {
            return <JWTVerifyResponse>{
                error: "Session Expired",
                status: false,
            }
        }
        return <JWTVerifyResponse>{
            status: false,
            user: null,
            error: 'Internal server error'
        };
    }
};