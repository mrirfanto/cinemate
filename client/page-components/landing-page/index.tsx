'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateRoomId, isValidRoomId } from '@/lib/utils';
import { connectToSocketServer } from '@/lib/socket';

type FlowStep = 'room' | 'name';

interface NameStepProps {
  userName: string;
  setUserName: (name: string) => void;
  onSubmit: () => void;
  error: string;
  setError: (error: string) => void;
}

function NameStep({
  userName,
  setUserName,
  onSubmit,
  error,
  setError,
}: NameStepProps) {
  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Enter Your Name"
        value={userName}
        onChange={(e) => {
          setError('');
          setUserName(e.target.value);
        }}
        className="w-full"
        maxLength={30}
      />
      <Button
        onClick={onSubmit}
        className="w-full py-6 text-lg"
        size="lg"
        disabled={!userName.trim()}
      >
        Continue
      </Button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const [step, setStep] = useState<FlowStep>('room');
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  const handleCreateRoom = () => {
    setIsCreatingRoom(true);
    const newRoomId = generateRoomId();
    setRoomId(newRoomId);
    setStep('name');
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

    setIsCreatingRoom(false);
    setStep('name');
  };

  const handleNameSubmit = () => {
    if (!userName.trim()) {
      setError('Please enter your name');
      return;
    }

    // Store userName in cookie before redirecting
    document.cookie = `userName=${encodeURIComponent(userName)}; path=/`;

    // If we're creating a room, use the generated roomId
    // Otherwise, use the entered roomId
    const targetRoomId = isCreatingRoom ? roomId : roomId.toUpperCase();
    connectToSocketServer(targetRoomId, userName);
    router.push(`/room/${targetRoomId}`);
  };

  if (step === 'name') {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="mb-2 text-4xl font-bold">Enter Your Name</h1>
            <p className="mb-8 text-gray-600">
              Choose a name that others will see in the room
            </p>
          </div>
          <NameStep
            userName={userName}
            setUserName={setUserName}
            onSubmit={handleNameSubmit}
            error={error}
            setError={setError}
          />
        </div>
      </main>
    );
  }

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
