import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const connectToSocketServer = (roomId: string, userName: string) => {
  if (!socket) {
    socket = io('http://localhost:3002'); // Replace with your server URL
  }

  socket.on('connect', () => {
    console.log('Connected to server:', socket?.id);

    // Join the room
    socket?.emit('joinRoom', roomId, userName);

    // Listen for messages
    socket?.on('message', (message: string) => {
      console.log('Message from server:', message);
    });
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
};

export const getSocket = () => socket;
