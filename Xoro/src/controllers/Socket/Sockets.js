"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const SocketFunctions = __importStar(require("./SocketFunctions"));
// import {chatUploadQueue} from "../../frameworks/mq/queue/chatUploadQueue"
const ChatFunctions_1 = require("../../frameworks/database/Functions/ChatFunctions");
const socketRoutes = (io) => {
    if (!io) {
        throw new Error('Socket instance is undefined. Ensure initializeSocketServer is called.');
    }
    io.on('connection', (socket) => {
        console.log('Client connected');
        socket.on('join', (UserId) => SocketFunctions.joinUserId(socket, UserId));
        socket.on('notification', ({ data, UserId }) => SocketFunctions.sendNotifications(socket, data, UserId));
        socket.on('chat', ({ data, UserId }) => SocketFunctions.chatRoom(socket, UserId, data));
        socket.on("markAsRead", (data) => SocketFunctions.markAsRead(data));
        socket.on('disconnect', () => SocketFunctions.disconnect(socket));
        socket.on("join-chat", ({ UserId, RoomId }) => {
            if (UserId.length > 0) {
                console.log(UserId, RoomId);
                UserId.forEach((usr) => {
                    socket.to(usr).emit("start-chat", RoomId);
                });
                socket.join(RoomId);
            }
        });
        socket.on("message", (_a) => __awaiter(void 0, [_a], void 0, function* ({ Message, RoomId, SenderId }) {
            const message = yield (0, ChatFunctions_1.saveChat)({ Message, RoomId, SenderId });
            socket.send(message);
            socket.to(RoomId).emit("message", message);
        }));
        socket.on("typing", (RoomId, Username, typing) => {
            console.log(typing, Username);
            socket.to(RoomId).emit("typing", { typing, Username });
        });
    });
    return io;
};
exports.default = socketRoutes;
