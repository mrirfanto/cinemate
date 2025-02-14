'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateRoomId, isValidRoomId } from '@/lib/utils';

export default function LandingPage() {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');

  const handleCreateRoom = () => {
    const newRoomId = generateRoomId();
    router.push(`/room/${newRoomId}`);
  };

  const handleJoinRoom = () => {
    if (!roomId) {
      setError('Please enter a room code');
      return;
    }

    if (!isValidRoomId(roomId)) {
      setError('Invalid room code format');
      return;
    }

    router.push(`/room/${roomId}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="mb-2 text-4xl font-bold">Cinemate</h1>
          <p className="mb-8 text-gray-600">
            Match movies with friends! Create a room or join an existing one to
            start finding your next movie night pick.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleCreateRoom}
            className="w-full py-6 text-lg"
            size="lg"
          >
            Create New Room
          </Button>

          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter Room Code"
                value={roomId}
                onChange={(e) => {
                  setError('');
                  setRoomId(e.target.value.toUpperCase());
                }}
                className="flex-1"
                maxLength={6}
              />
              <Button
                onClick={handleJoinRoom}
                disabled={!roomId}
                className="px-8"
              >
                Join
              </Button>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </main>
  );
}
