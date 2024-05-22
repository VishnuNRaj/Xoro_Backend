import { Chat } from "../../../entities/Chat";
import UserDocument from "../../../entities/User";

export interface getChatsResponse {
    user:UserDocument;
    allChats?:Chat[];
    message:string;
    status:number;
}