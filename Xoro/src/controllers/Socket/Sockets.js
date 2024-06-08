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
Object.defineProperty(exports, "__esModule", { value: true });
const SocketFunctions = __importStar(require("./SocketFunctions"));
// const videoPath = path.join(__dirname, '../../live');
// let live = {};
const socketRoutes = (io) => {
    if (!io) {
        throw new Error('Socket instance is undefined. Ensure initializeSocketServer is called.');
    }
    io.on('connection', (socket) => {
        console.log('Client connected');
        socket.on('join', (UserId) => SocketFunctions.joinUserId(socket, UserId));
        socket.on('notification', ({ data, UserId }) => SocketFunctions.sendNotifications(socket, data, UserId));
        socket.on('chat', ({ data, UserId }) => SocketFunctions.chatRoom(socket, UserId, data));
        socket.on('disconnect', () => SocketFunctions.disconnect(socket));
        // socket.on('start', (data) => {
        //   console.log('Streaming started:', data, socket.id);
        //   live[socket.id] = {
        //     cameraPath: path.join(videoPath, `camera-${socket.id}.webm`),
        //     screenPath: path.join(videoPath, `screen-${socket.id}.webm`)
        //   };
        // });
        // socket.on('camera', (data) => {
        //   const cameraPath = live[socket.id]?.cameraPath;
        //   if (cameraPath) {
        //     fs.appendFile(cameraPath, Buffer.from(data), (err) => {
        //       if (err) {
        //         console.error('Error writing camera data:', err);
        //       } else {
        //         console.log('Camera data written to', cameraPath);
        //       }
        //     });
        //   }
        // });
        // socket.on('screen', (data) => {
        //   const screenPath = live[socket.id]?.screenPath;
        //   if (screenPath) {
        //     fs.appendFile(screenPath, Buffer.from(data), (err) => {
        //       if (err) {
        //         console.error('Error writing screen data:', err);
        //       } else {
        //         console.log('Screen data written to', screenPath);
        //       }
        //     });
        //   }
        // });
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
            // if (live[socket.id]) {
            //   delete live[socket.id];
            // }
        });
    });
    return io;
};
exports.default = socketRoutes;
