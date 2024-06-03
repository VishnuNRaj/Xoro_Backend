import { Server as SocketIOServer, Socket } from 'socket.io';
import * as SocketFunctions from './SocketFunctions';
import fs from 'fs';
import path from 'path'
const videoPath = path.join(__dirname, '../../live');
const cameraPath = path.join(videoPath, `camera-${'123'}-${'123'}.webm`);
const screenPath = path.join(videoPath, `screen-${'123'}.webm`);

let live:any = {}
const socketRoutes = (io: SocketIOServer): SocketIOServer => {
    if (!io) {
        throw new Error('Socket instance is undefined. Ensure initializeSocketServer is called.');
    }

    io.on('connection', (socket) => {
        socket.on('join', (UserId) => SocketFunctions.joinUserId(socket, UserId));
        socket.on('notification', ({ data, UserId }) => SocketFunctions.sendNotifications(socket, data, UserId));
        socket.on('chat', ({ data, UserId }) => SocketFunctions.chatRoom(socket, UserId, data));
        socket.on('disconnect', () => SocketFunctions.disconnect(socket));
        socket.on('start',(data)=>{
          console.log(data,socket.id)
          live[socket.id] = socket.id
        })
        socket.on('camera', (data) => {
          // console.log(live[socket.id])
            if (live[socket.id]) {
              fs.write(fs.openSync(cameraPath, 'a'), Buffer.from(data), null, null, (err) => {
                if (err) {
                  console.error('Error writing camera data:', err);
                }
              });
            }
          });
          
          socket.on('screen', (data) => {
            console.log(live[socket.id],data)
            if (live[socket.id]) {
              fs.write(fs.openSync(screenPath, 'a'), Buffer.from(data), null, null, (err) => {
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
export default socketRoutes;
