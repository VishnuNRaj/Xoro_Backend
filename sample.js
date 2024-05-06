const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const cors = require('cors')



app.use(express.json({ limit: '10mb' }));
app.use(cors({
    origin:'http://localhost:6767'
}))

const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:6767', 
      methods: ['GET', 'POST'],
      credentials: true
    }
  });
  


io.on('connection', (socket) => {
  console.log('Client connected');
 
  socket.on('stream', (stream) => {
    console.log('Received screen stream');
    console.log(stream)
    socket.broadcast.emit('stream', stream);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
