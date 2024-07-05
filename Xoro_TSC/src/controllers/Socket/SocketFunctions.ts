import { Socket } from "socket.io";
import { setMarkAsRead } from "../../frameworks/database/Functions/ChatFunctions";

export const joinUserId: Function = async (socket: Socket, userId: string) => {
    socket.join(userId)
}
export const disconnect: Function = (socket: Socket) => {
    socket.disconnect()
}

export const sendNotifications: Function = (socket: Socket, data: any, UserId: string) => {
    console.log(data)
    socket.to(UserId).emit('notification', data)
}

export const chatRoom: Function = (socket: Socket, UserId: string, data: any) => {
    socket.to(UserId).emit(data)
}

export const markAsRead: Function = async ({ RoomId, UserId }: { RoomId: string; UserId: string; }) => {
    await setMarkAsRead(RoomId, UserId)
}

export const getUnReadNotifications: Function = (UserId:string) => {
    const notifications = getUnReadNotifications
}