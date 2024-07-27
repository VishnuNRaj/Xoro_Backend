import { Server as SocketIOServer } from 'socket.io';
import * as SocketFunctions from './SocketFunctions';
import { saveChat } from "../../frameworks/database/Functions/ChatFunctions"
import ChannelModel from '../../frameworks/database/models/Channels';
import { CategoryInterface } from '../../entities/ModelsInterface/Category';

const socketRoutes = (io: SocketIOServer): SocketIOServer => {
  if (!io) {
    throw new Error('Socket instance is undefined. Ensure initializeSocketServer is called.');
  }

  io.on('connection', (socket) => {
    console.log('Client connected');



    socket.on('join', (UserId) => SocketFunctions.joinUserId(socket, UserId));
    socket.on('notification', ({ data, UserId }) => SocketFunctions.sendNotifications(socket, data, UserId));
    socket.on('chat', ({ data, UserId }) => SocketFunctions.chatRoom(socket, UserId, data));
    socket.on("markAsRead", (data) => SocketFunctions.markAsRead(data))
    socket.on('disconnect', () => SocketFunctions.disconnect(socket));
    socket.on("join-chat", ({ UserId, RoomId }: { UserId: string[], RoomId: string }) => {
      if (UserId.length > 0) {
        console.log(UserId, RoomId)
        UserId.forEach((usr) => {
          socket.to(usr).emit("start-chat", RoomId)
        })
        socket.join(RoomId)
      }
    })
    socket.on("message", async ({ Message, RoomId, SenderId }: { Message: string, RoomId: string, SenderId: string }) => {
      const message = await saveChat({ Message, RoomId, SenderId })
      socket.send(message)
      socket.to(RoomId).emit("message", message)
    })
    socket.on("typing", (RoomId: string, Username: String, typing: boolean) => {
      console.log(typing, Username)
      socket.to(RoomId).emit("typing", { typing, Username })
    })
    socket.on("get-channel", async (ChannelId: string) => {
      const channel = await ChannelModel.findById(ChannelId)
      socket.send(channel)
    })
  }); 

  return io;
};

export default socketRoutes;
