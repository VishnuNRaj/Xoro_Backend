import * as Responses from '../../entities/ResponseInterface/ChatResponseInterface';
import * as Repository from '../repository/Chat/UserChatRepository';
import * as UserFunctions from '../functions/UserFunctions';
import * as ChatEntity from '../../entities/RequestInterface/ChatInterface';
import { uploadFileToFirebase } from '../../config/firebase';


export const getChats: Function = async ({ user }: ChatEntity.getChats): Promise<Responses.getChatsResponse> => {
    try {
        return await Repository.getChats(user)
    } catch (e) {
        return <Responses.getChatsResponse>{
            user: user,
            message: 'Internal Server Error',
            status: 500,
            allChats: []
        }
    }
}

export const SendMessage: Function = async ({ Files, Message, RoomId, user }: ChatEntity.SendMessage) => {
    try {
        if (!RoomId || RoomId.length < 32 || Files.length < 1) {
            return <Responses.SendMessage>{
                message: 'Invalid Credentials',
                status: 201,
            }
        }
        const file = Files.map(async (file) => {
            return {
                FileType: file.mimetype,
                FileLink: await uploadFileToFirebase(file, `chats/${RoomId}/`)
            }
        })
        return await Repository.SendMessage({ user, Message, Data: file, RoomId })
    } catch (e) {
        return <Responses.SendMessage>{
            message: 'Internal Server Error',
            status: 500
        }
    }
}

export const StartChat: Function = async ({ UserId, user, GroupName, Profile }: ChatEntity.StartChat) => {
    try {
        let error: string | null = null
        if (GroupName && GroupName.length < 2) {
            error = "Enter Groupname"
        }
        if (UserId.length < 1) {
            error = 'No User Found'
        }
        UserId.push(user._id)
        const filtered = UserId.filter((id, idx, users) => users.indexOf(id) === idx)
        if (filtered.length < 1) {
            error = "No Users Selected"
        }
        if (error) return <Responses.StartChat>{
            message: "Internal Server Error",
            status: 201
        }
        const img: string = Profile && UserId.length > 1 ? await UserFunctions.uploadBase64Image(Profile) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwTyd8_auP0lwN9U9wckV20lHguT89du3tbw&s"
        const data = UserId.map((id) => {
            return {
                UserId: id,
                Time: new Date(),
            }
        })
        return await Repository.StartChat(<ChatEntity.StartChat>{
            LastClear: data,
            UserId: UserId,
            GroupName: GroupName,
            Profile: img
        })
    } catch (e) {
        <Responses.StartChat>{
            message:"Internal Server Error",
            status:500,
        }
    }
}