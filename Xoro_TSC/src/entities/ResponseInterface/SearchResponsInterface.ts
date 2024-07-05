import { PostImage } from "../ModelsInterface/PostImages";
import UserDocument from "../ModelsInterface/User"
import {ChannelInterface} from "../ModelsInterface/Channels"
export interface searchDataResponse {
    data:{
        users: UserDocument[];
        post:PostImage[];
        channel:ChannelInterface[];
    } | null;
    message: string;
    status: number;
}