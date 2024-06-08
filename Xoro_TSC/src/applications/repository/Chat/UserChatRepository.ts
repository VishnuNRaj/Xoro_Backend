import * as DatabaseFunctions from "../../functions/DatabaseFunctions";
import * as Responses from "../../../entities/ResponseInterface/ChatResponseInterface";
import * as ResponseFunctions from "../../responses/ChatResponse";
import * as CommonFunctions from "../../functions/CommonFunctions";
import * as ChatEntity from "../../../controllers/RequestInterface/ChatInterface";
import PostImages from "../../../frameworks/database/models/ImagesPost";
import Reactions from './../../../frameworks/database/models/Reactions';
import UserDocument from "../../../entities/User";
import { Post } from "../../../entities/PostImages";
import { ReactionsInterface } from "../../../entities/Reactions";
import User from "../../../frameworks/database/models/User";
import { Chat, Messages } from "../../../entities/Chat";
import Message from "../../../frameworks/database/models/Messages";
import Chats from "../../../frameworks/database/models/Chat";


export const getChats: Function = async (user: UserDocument): Promise<Responses.getChatsResponse> => {
    try {
        const data: Chat[] = await DatabaseFunctions.getChats(user._id)
        return await ResponseFunctions.getChats(<Responses.getChatsResponse>{
            user: user,
            message: 'Welcome',
            status: 200,
            allChats: data
        })
    } catch (e) {
        return await ResponseFunctions.getChats(<Responses.getChatsResponse>{
            user: user,
            message: 'Internal Server Error',
            status: 500,
            allChats: []
        })
    }
}

export const SendMessage: Function = async (data: ChatEntity.SendMessage): Promise<Responses.SendMessage> => {
    try {
        const [result]: Messages[] = await DatabaseFunctions.insertData(Message, {
            Message: data.Message,
            Files: data.Data,
            Time: new Date(),
            Seen: [data.user._id],
            RoomId: data.RoomId,
            SenderId: data.user._id,
        })
        return await ResponseFunctions.SendMessage(<Responses.SendMessage>{
            message: 'Send',
            status: 200,
            chat: result
        })
    } catch (e) {
        return await ResponseFunctions.SendMessage(<Responses.SendMessage>{
            message: 'Internal Server Error',
            status: 500,
        })
    }
}

export const StartChat: Function = async (data: ChatEntity.StartChat) => {
    try {
        let err: string | null = null
        data.UserId = data.UserId.filter(async (id) => {
            const response: boolean = await DatabaseFunctions.checkObjectId(id)
            if (!response) err = "Invalid Credentials"
            return response
        })
        const users: UserDocument[] = await DatabaseFunctions.findUsers(data.UserId)
        let [newChat]: Chat[] = await DatabaseFunctions.insertData(Chats, data)
        if (data.UserId.length !== users.length || err) return ResponseFunctions.StartChat()
        return ResponseFunctions.StartChat(<Responses.StartChat>{
            message: "Start Chatting",
            status: 200,
            newChat: newChat,
            Users: users
        })
    } catch (e) {
        return ResponseFunctions.StartChat(<Responses.StartChat>{
            message: "Internal Server Error",
            status: 500,
        })
    }
}