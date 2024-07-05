"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnReadNotifications = exports.markAsRead = exports.chatRoom = exports.sendNotifications = exports.disconnect = exports.joinUserId = void 0;
const ChatFunctions_1 = require("../../frameworks/database/Functions/ChatFunctions");
const joinUserId = (socket, userId) => __awaiter(void 0, void 0, void 0, function* () {
    socket.join(userId);
});
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
const markAsRead = (_a) => __awaiter(void 0, [_a], void 0, function* ({ RoomId, UserId }) {
    yield (0, ChatFunctions_1.setMarkAsRead)(RoomId, UserId);
});
exports.markAsRead = markAsRead;
const getUnReadNotifications = (UserId) => {
    const notifications = exports.getUnReadNotifications;
};
exports.getUnReadNotifications = getUnReadNotifications;
