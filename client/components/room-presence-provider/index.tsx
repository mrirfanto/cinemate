'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getSocket } from '@/lib/socket';

interface RoomPresenceContext {
  totalUsers: number;
  activeUsers: string[];
}

const RoomPresenceContext = createContext<RoomPresenceContext>({
  totalUsers: 1,
  activeUsers: [],
});

export function RoomPresenceProvider({
  children,
  roomId,
  userName,
}: {
  children: React.ReactNode;
  roomId: string;
  userName: string;
}) {
  const [totalUsers, setTotalUsers] = useState(1);
  const [activeUsers, setActiveUsers] = useState<string[]>([userName]);

  useEffect(() => {
    const socket = getSocket();

    if (socket) {
      // Emit an event to join the room
      socket.emit('joinRoom', roomId, userName);

      // Listen for updates on active users
      socket.on('updateActiveUsers', (users: string[]) => {
        setTotalUsers(users.length);
        setActiveUsers(users);
      });

      // Clean up on unmount
      return () => {
        socket.emit('leaveRoom', roomId, userName);
        socket.off('updateActiveUsers');
      };
    }
  }, [roomId, userName]);

  return (
    <RoomPresenceContext.Provider value={{ totalUsers, activeUsers }}>
      {children}
    </RoomPresenceContext.Provider>
  );
}

export const useRoomPresence = () => useContext(RoomPresenceContext);
