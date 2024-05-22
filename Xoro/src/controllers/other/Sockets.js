"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("../../frameworks/server/socket");
const socketRoutes = () => {
    const io = (0, socket_1.getSocketInstance)();
    if (!io) {
        throw new Error('Socket instance is undefined. Ensure initializeSocketServer is called.');
    }
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);
        socket.on('join', (UserId) => {
            console.log(`User ${UserId} joined`);
            socket.join(UserId);
        });
        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
    });
};
exports.default = socketRoutes;
