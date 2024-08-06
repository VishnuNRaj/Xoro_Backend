import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import config from '../../config/config';
import socketRoutes from '../../controllers/Socket/Sockets'
const origin: string[] = []
for (let i = 1; i <= 5; i++) {
    const data = process.env["API_" + i]
    if (!data) break;
    if (data) origin.push(data)
}
let io: SocketIOServer | undefined;

const initializeSocketServer = (server: HttpServer): void => {
    io = new SocketIOServer(server, {
        cors: {
            origin: origin,
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });
    socketRoutes(io)    
};

const getSocketInstance = (): SocketIOServer | undefined => io;

export {
    initializeSocketServer,
    getSocketInstance,
};
