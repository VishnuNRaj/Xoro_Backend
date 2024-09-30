import { Server as SocketIOServer } from 'socket.io';
import * as SocketFunctions from './SocketFunctions';
import { saveChat } from "../../frameworks/database/Functions/ChatFunctions"
import ChannelModel from '../../frameworks/database/models/Channels';
import WebPush from '../../frameworks/database/models/WebpushNotification';
import { Types } from 'mongoose';
import Notifications from '../../frameworks/database/models/Notifications';

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

    socket.on("subscribeChannel", async (userId: string, channelId: string) => {
      console.log(channelId,userId)
      const channel = await ChannelModel.findByIdAndUpdate(channelId, { $addToSet: { Subsribers: userId } }, { upsert: true })
      return socket.to(userId).emit("subscribed", channel?.Subsribers.length)
    })
    socket.on("unsubscribeChannel", async (userId: string, channelId: string) => {
      const channel = await ChannelModel.findByIdAndUpdate(channelId, { $pull: { Subsribers: userId } }, { upsert: true })
      return socket.to(userId).emit("unsubscribed", channel?.Subsribers.length)
    })
    socket.on("live_comment", (data: any) => {
      console.log(data)
      io.emit("new_comment", data)
    })

    socket.on("allowed", async (userId: string, endpoint: string) => {
      const response = await WebPush.findOne({ UserId: new Types.ObjectId(userId), endpoint: endpoint })
      if (response && response.send) return io.to(userId).emit("allow_notification", { send: response.send })
      else return io.to(userId).emit("allow_notification", { send: false })
    })

    socket.on("disallow", async (userId: string, endpoint: string) => {
      await WebPush.findOneAndUpdate({ UserId: new Types.ObjectId(userId), endpoint: endpoint }, { $set: { send: false } })
    })
    socket.on("allow", async (userId: string, endpoint: string) => {
      await WebPush.findOneAndUpdate({ UserId: new Types.ObjectId(userId), endpoint: endpoint }, { $set: { send: true } })
    })

    socket.on("emptyMsg", async (userId: string) => {
      await Notifications.findOneAndUpdate({ UserId: new Types.ObjectId(userId) }, { $set: { Messages: [] } })
    })

    socket.on("liked", (postId: string) => {
      io.to(postId).emit("liked", postId)
    })
    socket.on("disliked", (postId: string) => {
      io.to(postId).emit("disliked", postId)
    })
    socket.on("removedlike", (postId: string) => {
      io.to(postId).emit("removedlike", postId)
    })
    socket.on("removeddislike", (postId: string) => {
      io.to(postId).emit("removeddislike", postId)
    })
  });
  return io;
};

export default socketRoutes;
