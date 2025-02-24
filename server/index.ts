import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: Socket) => {
  console.log('a user connected:', socket.id);

  // Join a room
  socket.on('joinRoom', (room: string, userName: string) => {
    socket.join(room);
    console.log(`User ${userName} joined room ${room}`);

    // Update active users
    const activeUsers = Array.from(
      io.sockets.adapter.rooms.get(room) || []
    ).map(
      (socketId) => io.sockets.sockets.get(socketId)?.handshake.query.userName
    );

    io.to(room).emit('updateActiveUsers', activeUsers);
  });

  // Leave a room
  socket.on('leaveRoom', (room: string, userName: string) => {
    socket.leave(room);
    console.log(`User ${userName} left room ${room}`);

    // Update active users
    const activeUsers = Array.from(
      io.sockets.adapter.rooms.get(room) || []
    ).map(
      (socketId) => io.sockets.sockets.get(socketId)?.handshake.query.userName
    );

    io.to(room).emit('updateActiveUsers', activeUsers);
  });

  // Handle messages
  socket.on('message', (room: string, message: string, userName: string) => {
    console.log(`Message from ${userName} in room ${room}: ${message}`);
    io.to(room).emit('message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
