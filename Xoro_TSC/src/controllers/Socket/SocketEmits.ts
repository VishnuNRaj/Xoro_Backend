import { Messages } from "../../entities/ModelsInterface/Chat";
import { getSocketInstance } from "../../frameworks/server/socket";
const io = getSocketInstance()

export const emitNotification: Function = async (data: any, UserId: string) => {
    if (io) {
        io.in(UserId).emit('notification', data)
    }
}

export const sendChat: Function = async (data:Messages) => {
    if(io) {
        io.in(data.RoomId).emit("message",data)
    }
}