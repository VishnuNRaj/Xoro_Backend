import * as Responses from '../../entities/ResponseInterface/ChatResponseInterface';
import * as Repository from '../repository/Chat/UserChatRepository';
import * as UserFunctions from '../functions/UserFunctions';
import * as ChatEntity from '../../entities/RequestInterface/ChatInterface';
import { uploadFileToFirebase } from '../../config/firebase';
import { generateVerificationLink } from '../functions/CommonFunctions';
import ChatUsecases from "../../entities/Usecases/Chat";

class Usecases implements ChatUsecases {
    async getChats({ user }: ChatEntity.getChats): Promise<Responses.getChats> {
        try {
            return await Repository.getChats(user);
        } catch (e) {
            return <Responses.getChats>{
                user: user,
                message: 'Internal Server Error',
                status: 500,
                allChats: [],
            };
        }
    }

    async SendMessage({ Files, Message, RoomId, user }: ChatEntity.SendMessage): Promise<Responses.SendMessage> {
        try {
            if (!RoomId || RoomId.length < 32 || Files.length < 1) {
                return <Responses.SendMessage>{
                    message: 'Invalid Credentials',
                    status: 201,
                };
            }
            const file = await Promise.all(Files.map(async (file) => {
                return {
                    FileType: file.mimetype,
                    FileLink: await uploadFileToFirebase(file, `chats/${RoomId}/`)
                };
            }));
            return await Repository.SendMessage({ user, Message, Data: file, RoomId });
        } catch (e) {
            return <Responses.SendMessage>{
                message: 'Internal Server Error',
                status: 500
            };
        }
    }

    async StartChat({ UserId, user, GroupName, Profile }: ChatEntity.StartChat): Promise<Responses.StartChat> {
        try {
            let error: string | null = null;
            if (GroupName && GroupName.length < 2) {
                error = "Enter Groupname";
            }
            if (UserId.length < 1) {
                error = 'No User Found';
            }
            UserId.push(user._id);
            const filtered = UserId.filter((id, idx, users) => users.indexOf(id) === idx);
            if (filtered.length < 1) {
                error = "No Users Selected";
            }
            if (error) {
                return <Responses.StartChat>{
                    message: "Internal Server Error",
                    status: 201
                };
            }
            const data = UserId.map((id) => {
                return {
                    UserId: id,
                    Time: new Date(),
                };
            });
            return await Repository.StartChat({
                LastClear: data,
                Users: UserId.map((val) => {
                    return {
                        UserId: val,
                        Admin: val === user._id
                    };
                }),
                GroupName: GroupName,
                Profile: Profile && UserId.length > 1 ? await UserFunctions.uploadBase64Image(Profile) : GroupName ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwTyd8_auP0lwN9U9wckV20lHguT89du3tbw&s" : undefined,
                RoomId: generateVerificationLink()
            });
        } catch (e) {
            return <Responses.StartChat>{
                message: "Internal Server Error",
                status: 500,
            };
        }
    }

    async getChat({ RoomId, user }: ChatEntity.getChat): Promise<Responses.getChat> {
        try {
            if (!RoomId || RoomId.length < 32) {
                return <Responses.getChat>{
                    message: "Invalid Credentials",
                    status: 201
                };
            }
            return await Repository.getChat(RoomId, user);
        } catch (e) {
            console.log(e)
            return <Responses.getChat>{
                message: "Internal Server Error",
                status: 500
            };
        }
    }
}

export default Usecases;
