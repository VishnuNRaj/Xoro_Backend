import * as DatabaseFunctions from "../../functions/DatabaseFunctions";
import * as Responses from "../../../entities/ResponseInterface/ChatResponseInterface";
import * as ResponseFunctions from "../../responses/ChatResponse";
// import * as CommonFunctions from "../../functions/CommonFunctions";
import * as ChatEntity from "../../../entities/RequestInterface/ChatInterface";
import UserDocument from "../../../entities/ModelsInterface/User";
import { Chat, Messages } from "../../../entities/ModelsInterface/Chat";
import Message from "../../../frameworks/database/models/Messages";
import Chats from "../../../frameworks/database/models/Chat";
import { ConnectionsInterface } from "../../../entities/ModelsInterface/Connections";


export const getChats: Function = async (user: UserDocument): Promise<Responses.getChats> => {
    try {
        const data: Chat[] = await DatabaseFunctions.getChats(user._id)
        const users: any = await DatabaseFunctions.getFollowers(user._id)
        return await ResponseFunctions.getChats(<Responses.getChats>{
            user: user,
            message: 'Welcome',
            status: 200,
            allChats: data,
            users: users
        })
    } catch (e) {
        return await ResponseFunctions.getChats(<Responses.getChats>{
            user: user,
            message: 'Internal Server Error',
            status: 500,
            allChats: [],
        })
    }
};

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
};

export const StartChat: Function = async (data: ChatEntity.StartChat) => {
    try {
        let err: string | null = null
        console.log(data)
        data.Users = data.Users.filter(async (id) => {
            const response: boolean = await DatabaseFunctions.checkObjectId(id.UserId)
            if (!response) err = "Invalid Credentials"
            return response
        })
        const users: UserDocument[] = await DatabaseFunctions.findUsers(data.Users)
        const oldData:Chat | null = data.Users.length > 2 ? null : await DatabaseFunctions.checkChat(data.Users.map((val)=>val.UserId))
        if(oldData) {
            return ResponseFunctions.StartChat(<Responses.StartChat>{
                message: "Start Chatting",
                status: 200,
                newChat: oldData,
                users:users
            })
        }
        let [newChat]: Chat[] = await DatabaseFunctions.insertData(Chats, data)
        if (data.Users.length !== users.length || err) {
            return ResponseFunctions.StartChat(<Responses.StartChat>{
                message: err || "",
                status: 201,
            })
        }
        return ResponseFunctions.StartChat(<Responses.StartChat>{
            message: "Start Chatting",
            status: 200,
            newChat: newChat,
            users:users
        })
    } catch (e) {
        console.log(e)
        return ResponseFunctions.StartChat(<Responses.StartChat>{
            message: "Internal Server Error",
            status: 500,
        })
    }
};

export const getChat: Function = async (RoomId: string, user: UserDocument) => {
    try {
        let chat: Chat = await DatabaseFunctions.getChat(RoomId)
        console.log(chat)
        const [date] = chat?.LastClear?.filter((Users) => Users.UserId === user._id)
        chat?.messages?.filter((message) => message.Time > date?.Time)
        return ResponseFunctions.getChat(<Responses.getChat>{
            chat: chat,
            message: 'Found',
            status: 200,
        })
    } catch (e) {
        console.log(e)
        return ResponseFunctions.getChat(<Responses.getChat>{
            message: 'Internal Server Error',
            status: 500,
        })
    }
};