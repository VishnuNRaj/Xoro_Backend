"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRoom = exports.sendNotifications = exports.disconnect = exports.joinUserId = void 0;
const joinUserId = (socket, userId) => {
    socket.join(userId);
    console.log("Joined user");
};
exports.joinUserId = joinUserId;
const disconnect = (socket) => {
    socket.disconnect();
};
exports.disconnect = disconnect;
const sendNotifications = (socket, data, UserId) => {
    console.log(data);
    socket.to(UserId).emit('notification', data);
};
exports.sendNotifications = sendNotifications;
const chatRoom = (socket, UserId, data) => {
    socket.to(UserId).emit(data);
};
exports.chatRoom = chatRoom;
