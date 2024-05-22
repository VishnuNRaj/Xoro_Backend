import { Socket } from "socket.io";
export const joinUserId: Function = (socket: Socket, userId: string) => {
    socket.join(userId)
    console.log("Joined user")
}
export const disconnect: Function = (socket: Socket) => {
    socket.disconnect()
}

export const sendNotifications: Function = (socket: Socket, data: any,UserId:string) => {
    console.log(data)
    socket.to(UserId).emit('notification', data)
}

export const chatRoom: Function = (socket:Socket,UserId:string,data:any) => {
    socket.to(UserId).emit(data)
}