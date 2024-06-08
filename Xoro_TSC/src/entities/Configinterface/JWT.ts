export interface JWTCreate {
    Payload: {
        UserId: string;
        Email: string;
        Admin: Boolean
    };
    RememberMe: boolean;
}

export interface JWTVerify {
    token: string;
}

export interface JWTVerifyResponse {
    status: boolean;
    user: { 
        UserId: string;
        Email: string;
    } | null;
    error: string | null;
}