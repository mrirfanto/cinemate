import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRoom } from '@/contexts/RoomContext';

interface RoomJoinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RoomJoinDialog({ open, onOpenChange }: RoomJoinDialogProps) {
  const { connect, createRoom, joinRoom } = useRoom();
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [step, setStep] = useState<'name' | 'room'>('name');
  const [error, setError] = useState('');

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      setError('Please enter your name');
      return;
    }
    connect(userName);
    setStep('room');
    setError('');
  };

  const handleCreateRoom = () => {
    const roomCode = createRoom();
    // Copy room code to clipboard
    navigator.clipboard.writeText(roomCode);
    onOpenChange(false);
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId.trim()) {
      setError('Please enter a room code');
      return;
    }
    const success = joinRoom(roomId.toUpperCase());
    if (success) {
      onOpenChange(false);
    } else {
      setError('Failed to join room');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join a Movie Session</DialogTitle>
          <DialogDescription>
            {step === 'name'
              ? 'Enter your name to get started'
              : 'Create a new room or join an existing one'}
          </DialogDescription>
        </DialogHeader>

        {step === 'name' ? (
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleCreateRoom}
              >
                Create New Room
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>
              <form onSubmit={handleJoinRoom} className="space-y-2">
                <Label htmlFor="roomId">Room Code</Label>
                <Input
                  id="roomId"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter room code"
                  className="uppercase"
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full">
                  Join Room
                </Button>
              </form>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
