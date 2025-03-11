import { io, Socket } from 'socket.io-client';

class SocketService {
  socket: Socket | null = null;
  private userName: string | null = null;
  private roomId: string | null = null;

  // Initialize the socket connection
  connect(userName: string): void {
    if (this.socket) return;

    // Connect to the socket server
    this.socket = io('http://localhost:3002', {
      query: { userName },
    });

    this.userName = userName;

    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }

  // Join a room
  joinRoom(roomId: string, callback?: (success: boolean) => void): void {
    if (!this.socket || !this.userName) {
      console.error('Socket not connected or username not set');
      callback?.(false);
      return;
    }

    this.roomId = roomId;
    this.socket.emit('joinRoom', roomId, this.userName);
    callback?.(true);
  }

  // Leave the current room
  leaveRoom(callback?: () => void): void {
    if (!this.socket || !this.roomId || !this.userName) {
      console.error('Not in a room or socket not connected');
      return;
    }

    this.socket.emit('leaveRoom', this.roomId, this.userName);
    this.roomId = null;
    callback?.();
  }

  // Send a movie like event
  sendMovieLike(movieId: number): void {
    if (!this.socket || !this.roomId) {
      console.error('Not in a room or socket not connected');
      return;
    }

    this.socket.emit('movieLike', this.roomId, movieId);
  }

  // Listen for movie matches
  onMovieMatch(callback: (movieId: number) => void): void {
    if (!this.socket) {
      console.error('Socket not connected');
      return;
    }

    this.socket.on('movieMatch', callback);
  }

  // Listen for session decision requests
  onSessionDecisionRequest(callback: (movieId: number) => void): void {
    if (!this.socket) {
      console.error('Socket not connected');
      return;
    }

    this.socket.on('sessionDecisionRequest', callback);
  }

  // Send session decision (continue or conclude)
  sendSessionDecision(decision: 'continue' | 'conclude'): void {
    if (!this.socket || !this.roomId) {
      console.error('Not in a room or socket not connected');
      return;
    }

    this.socket.emit('sessionDecision', this.roomId, decision);
  }

  // Listen for session conclusion
  onSessionConclusion(callback: (matchedMovieIds: number[]) => void): void {
    if (!this.socket) {
      console.error('Socket not connected');
      return;
    }

    this.socket.on('sessionConclusion', callback);
  }

  // Generic method to add event listener
  on(event: string, callback: (data: unknown) => void): void {
    if (!this.socket) {
      console.error('Socket not connected');
      return;
    }

    this.socket.on(event, callback);
  }

  // Generic method to remove event listener
  off(event: string, callback?: (data: unknown) => void): void {
    if (!this.socket) {
      console.error('Socket not connected');
      return;
    }

    if (callback) {
      this.socket.off(event, callback);
    } else {
      this.socket.off(event);
    }
  }

  // Disconnect from the socket server
  disconnect(): void {
    if (this.socket) {
      if (this.roomId) {
        this.leaveRoom();
      }
      this.socket.disconnect();
      this.socket = null;
      this.userName = null;
      this.roomId = null;
    }
  }

  // Check if connected to a room
  isInRoom(): boolean {
    return !!this.roomId && !!this.socket;
  }

  // Get the current room ID
  getCurrentRoomId(): string | null {
    return this.roomId;
  }
}

// Create a singleton instance
const socketService = new SocketService();
export default socketService;
