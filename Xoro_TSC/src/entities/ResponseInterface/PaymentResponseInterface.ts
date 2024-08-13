import UserDocument from "../ModelsInterface/User";

interface Normal {
    message: string;
    status: number;
}
export interface Premium extends Normal {
    user: UserDocument;
}

export interface JoinNow extends Normal { }