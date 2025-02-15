'use client';

import { createContext, useContext, useEffect, useState } from 'react';

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
    const trackUserPresence = () => {
      const now = Date.now();
      const presence = JSON.parse(
        localStorage.getItem(`room_${roomId}_presence`) || '{}'
      );

      // Update presence using userName
      presence[userName] = now;

      const userTimestamps = new Map<string, number>();

      Object.entries(presence).forEach(([name, timestamp]) => {
        const ts = Number(timestamp);
        if (now - ts < 60000) {
          if (!userTimestamps.has(name) || ts > userTimestamps.get(name)!) {
            userTimestamps.set(name, ts);
          }
        }
      });

      const updatedPresence = Object.fromEntries(userTimestamps.entries());

      localStorage.setItem(
        `room_${roomId}_presence`,
        JSON.stringify(updatedPresence)
      );

      const currentActiveUsers = Array.from(userTimestamps.keys());
      setTotalUsers(currentActiveUsers.length);
      setActiveUsers(currentActiveUsers);
    };

    const interval = setInterval(trackUserPresence, 5000);
    trackUserPresence();

    return () => clearInterval(interval);
  }, [roomId, userName]);

  return (
    <RoomPresenceContext.Provider value={{ totalUsers, activeUsers }}>
      {children}
    </RoomPresenceContext.Provider>
  );
}

export const useRoomPresence = () => useContext(RoomPresenceContext);
