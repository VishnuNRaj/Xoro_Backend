import { getSocketInstance } from "../../frameworks/server/socket";

export const emitNotification: Function = async (data: any, UserId: string) => {
    const io = getSocketInstance()
    if (io) {
        io.to(UserId).emit('notification', data)
    }
}