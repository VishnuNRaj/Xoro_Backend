export interface JWTCreate {
    Payload: {
        UserId: string;
        Email: string;
        Admin: boolean;
    };
    RememberMe: boolean;
}

export interface JWTVerify {
    token: string;
    refresh:string;
}

export interface JWTVerifyResponse {
    status: boolean;
    user: { 
        UserId: string;
        Email: string;
    } | null;
    error: string | null;
    token:string;
}

