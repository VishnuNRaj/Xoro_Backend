import { Socket } from "socket.io";
import { setMarkAsRead } from "../../frameworks/database/Functions/ChatFunctions";
import CategoryModel from "../../frameworks/database/models/Category";
import Notifications from "../../frameworks/database/models/Notifications";

export const joinUserId: Function = async (socket: Socket, userId: string) => {
    socket.join(userId)
}
export const disconnect: Function = (socket: Socket) => {
    socket.disconnect()
}

export const sendNotifications: Function = (socket: Socket, data: any, UserId: string) => {
    socket.to(UserId).emit('notification', data)
}

export const chatRoom: Function = (socket: Socket, UserId: string, data: any) => {
    socket.to(UserId).emit(data)
}

export const markAsRead: Function = async ({ RoomId, UserId }: { RoomId: string; UserId: string; }) => {
    await setMarkAsRead(RoomId, UserId)
}

export const getUnReadNotifications =  async (UserId: string) => {
    const notifications = await Notifications.find({ UserId: UserId })
    return notifications
}


export const getCategory = async (search: string) => {
    const regex = new RegExp(search, "i")
    const category = await CategoryModel.find({ Name: { $regex: regex } })
    return category
}