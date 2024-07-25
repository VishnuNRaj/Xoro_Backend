// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const { spawn } = require('child_process');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*"
//   }
// });

// const PORT = 8080;
// const RTMP_URL = 'rtmp://localhost/live/testStream';

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   let ffmpegProcess;

//   socket.on('start-stream', () => {
//     console.log('Stream started');

//     ffmpegProcess = spawn('ffmpeg', [
//       '-i', 'pipe:0',
//       '-c:v', 'libx264',
//       '-preset', 'veryfast',
//       '-tune', 'zerolatency',
//       '-c:a', 'aac',
//       '-f', 'flv',
//       RTMP_URL
//     ]);

//     ffmpegProcess.stderr.on('data', (data) => {
//       console.error(`FFmpeg stderr: ${data}`);
//     });

//     ffmpegProcess.on('close', (code) => {
//       console.log(`FFmpeg process exited with code ${code}`);
//     });

//     ffmpegProcess.stdin.on('error', (err) => {
//       console.error(`FFmpeg stdin error: ${err.message}`);
//     });
//   });

//   socket.on('stream', (data) => {
//     if (ffmpegProcess && !ffmpegProcess.stdin.destroyed) {
//       ffmpegProcess.stdin.write(data);
//     } else {
//       console.error('FFmpeg process is not running or stdin is destroyed');
//     }
//   });

//   socket.on('stop-stream', () => {
//     console.log('Stream stopped');

//     if (ffmpegProcess) {
//       ffmpegProcess.stdin.end();
//       ffmpegProcess = null;
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');

//     if (ffmpegProcess) {
//       ffmpegProcess.stdin.end();
//       ffmpegProcess = null;
//     }
//   });
// });

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

