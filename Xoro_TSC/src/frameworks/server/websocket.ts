import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';

const webSocket = (server: Server): WebSocketServer | null => {
    try {
        // const wss = new WebSocketServer({ server });
        // wss.on('connection', (ws: WebSocket) => {
        //     ws.on('message', (message) => {
        //         console.log('Received message:', message);
        //     });

        //     ws.on('close', (message) => {
        //         console.log('WebSocket connection closed',message);
        //     });

        //     ws.on('error', (error) => {
        //         console.error('WebSocket error:', error);
        //     });

        //     console.log('WebSocket connected');
        // });

        // console.log('WebSocket server is set up');
        return null;
    } catch (e) {
        return null;
    }
};

export default webSocket;
