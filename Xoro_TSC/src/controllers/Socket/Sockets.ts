import { Server as SocketIOServer } from 'socket.io';
import * as SocketFunctions from './SocketFunctions';
// import fs from 'fs';
// import path from 'path';
import { spawn } from 'child_process';

// const videoPath = path.join(__dirname, '../../live');

// let live = {};

const socketRoutes = (io: SocketIOServer): SocketIOServer => {
  if (!io) {
    throw new Error('Socket instance is undefined. Ensure initializeSocketServer is called.');
  }

  io.on('connection', (socket) => {
    console.log('Client connected');

    const ffmpeg = spawn('ffmpeg', [
      '-re',
      '-i', 'pipe:0', 
      '-c:v', 'libx264', 
      '-preset', 'fast', 
      '-c:a', 'aac', 
      '-f', 'flv', 
      'rtmp://localhost:1935/live/stream' 
    ]);

    ffmpeg.stdin.on('error', (err) => {
      console.error('FFmpeg stdin error:', err);
    });

    ffmpeg.stderr.on('data', (data) => {
      console.error('FFmpeg stderr:', data.toString());
    });
    ffmpeg.on('error',(data)=>{
      console.log('sadasdas',data)
    })

    ffmpeg.on('close', (code) => {
      console.log(`FFmpeg process closed with code ${code}`);
    });
   
    socket.on('stream', (data) => {
      ffmpeg.stdin.write(data);
    });

    socket.on('stop', () => {
      ffmpeg.stdin.end();
    });


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

export default socketRoutes;
