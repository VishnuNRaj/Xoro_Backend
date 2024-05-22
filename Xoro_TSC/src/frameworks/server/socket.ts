import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import config from '../../config/config';
import socketRoutes from '../../controllers/Socket/Sockets'

let io: SocketIOServer | undefined;

const initializeSocketServer = (server: HttpServer): void => {
    io = new SocketIOServer(server, {
        cors: {
            origin: config.BASE,
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
