'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import socketService from '@/services/socketService';
import { Movie } from '@/types/movie';
import { getMovieById } from '@/services/movieService';

interface RoomContextType {
  isConnected: boolean;
  isInRoom: boolean;
  userName: string;
  roomId: string | null;
  matchedMovie: Movie | null;
  isDecisionPromptOpen: boolean;
  showMatchedMovies: boolean;
  matchedMovies: Movie[];
  connect: (userName: string) => void;
  disconnect: () => void;
  createRoom: () => string;
  joinRoom: (roomId: string) => boolean;
  leaveRoom: () => void;
  sendMovieLike: (movieId: number) => void;
  sendSessionDecision: (decision: 'continue' | 'conclude') => void;
  closeDecisionPrompt: () => void;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const useRoom = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoom must be used within a RoomProvider');
  }
  return context;
};

interface RoomProviderProps {
  children: ReactNode;
}

export const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState<string | null>(null);
  const [matchedMovie, setMatchedMovie] = useState<Movie | null>(null);
  const [isDecisionPromptOpen, setIsDecisionPromptOpen] = useState(false);
  const [showMatchedMovies, setShowMatchedMovies] = useState(false);
  const [matchedMovies, setMatchedMovies] = useState<Movie[]>([]);

  // Connect to socket server
  const connect = (name: string) => {
    setUserName(name);
    socketService.connect(name);
    setIsConnected(true);
  };

  // Disconnect from socket server
  const disconnect = () => {
    socketService.disconnect();
    setIsConnected(false);
    setUserName('');
    setRoomId(null);
  };

  // Create a new room
  const createRoom = () => {
    // Generate a random 6-character room code
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    joinRoom(roomCode);
    return roomCode;
  };

  // Join an existing room
  const joinRoom = (id: string) => {
    if (!isConnected) return false;

    let success = false;
    socketService.joinRoom(id, (result) => {
      success = result;
      if (result) {
        setRoomId(id);
      }
    });
    return success;
  };

  // Leave the current room
  const leaveRoom = () => {
    socketService.leaveRoom(() => {
      setRoomId(null);
      setMatchedMovie(null);
      setIsDecisionPromptOpen(false);
      setShowMatchedMovies(false);
      setMatchedMovies([]);
    });
  };

  // Send a movie like event
  const sendMovieLike = (movieId: number) => {
    socketService.sendMovieLike(movieId);
  };

  // Send session decision
  const sendSessionDecision = (decision: 'continue' | 'conclude') => {
    socketService.sendSessionDecision(decision);
    setIsDecisionPromptOpen(false);
  };

  // Close decision prompt
  const closeDecisionPrompt = () => {
    setIsDecisionPromptOpen(false);
  };

  // Set up socket event listeners
  useEffect(() => {
    if (!isConnected) return;

    // Handle movie match
    const handleMovieMatch = async (movieId: number) => {
      try {
        const movie = await getMovieById(movieId.toString());
        if (movie) {
          setMatchedMovie(movie);
          setIsDecisionPromptOpen(true);
        }
      } catch (error) {
        console.error('Error fetching matched movie:', error);
      }
    };

    // Handle session conclusion
    const handleSessionConclusion = async (matchedMovieIds: number[]) => {
      try {
        const moviePromises = matchedMovieIds.map((id) =>
          getMovieById(id.toString())
        );

        const movies = await Promise.all(moviePromises);
        setMatchedMovies(movies.filter(Boolean) as Movie[]);
        setShowMatchedMovies(true);
      } catch (error) {
        console.error('Error fetching matched movies:', error);
      }
    };

    // Handle session continue
    const handleSessionContinue = () => {
      setMatchedMovie(null);
      setIsDecisionPromptOpen(false);
    };

    // Register event listeners
    socketService.onMovieMatch(handleMovieMatch);
    socketService.onSessionConclusion(handleSessionConclusion);
    socketService.on('sessionContinue', handleSessionContinue);

    // Clean up event listeners
    return () => {
      socketService.off('movieMatch');
      socketService.off('sessionConclusion');
      socketService.off('sessionContinue');
    };
  }, [isConnected]);

  const value = {
    isConnected,
    isInRoom: !!roomId,
    userName,
    roomId,
    matchedMovie,
    isDecisionPromptOpen,
    showMatchedMovies,
    matchedMovies,
    connect,
    disconnect,
    createRoom,
    joinRoom,
    leaveRoom,
    sendMovieLike,
    sendSessionDecision,
    closeDecisionPrompt,
  };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};
