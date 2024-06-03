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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SocketFunctions = __importStar(require("./SocketFunctions"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const videoPath = path_1.default.join(__dirname, '../../live');
const cameraPath = path_1.default.join(videoPath, `camera-${'123'}-${'123'}.webm`);
const screenPath = path_1.default.join(videoPath, `screen-${'123'}.webm`);
let live = {};
const socketRoutes = (io) => {
    if (!io) {
        throw new Error('Socket instance is undefined. Ensure initializeSocketServer is called.');
    }
    io.on('connection', (socket) => {
        socket.on('join', (UserId) => SocketFunctions.joinUserId(socket, UserId));
        socket.on('notification', ({ data, UserId }) => SocketFunctions.sendNotifications(socket, data, UserId));
        socket.on('chat', ({ data, UserId }) => SocketFunctions.chatRoom(socket, UserId, data));
        socket.on('disconnect', () => SocketFunctions.disconnect(socket));
        socket.on('start', (data) => {
            console.log(data, socket.id);
            live[socket.id] = socket.id;
        });
        socket.on('camera', (data) => {
            // console.log(live[socket.id])
            if (live[socket.id]) {
                fs_1.default.write(fs_1.default.openSync(cameraPath, 'a'), Buffer.from(data), null, null, (err) => {
                    if (err) {
                        console.error('Error writing camera data:', err);
                    }
                });
            }
        });
        socket.on('screen', (data) => {
            console.log(live[socket.id], data);
            if (live[socket.id]) {
                fs_1.default.write(fs_1.default.openSync(screenPath, 'a'), Buffer.from(data), null, null, (err) => {
                    if (err) {
                        console.error('Error writing screen data:', err);
                    }
                });
            }
        });
        socket.on('stop', (UserId) => {
            if (live[UserId]) {
                live[UserId].cameraStream.end();
                live[UserId].screenStream.end();
                delete live[UserId];
            }
        });
    });
    return io;
};
exports.default = socketRoutes;
