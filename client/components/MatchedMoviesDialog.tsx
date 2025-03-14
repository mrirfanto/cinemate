import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRoom } from '@/contexts/RoomContext';

export function MatchedMoviesDialog() {
  const router = useRouter();
  const { showMatchedMovies, matchedMovies, leaveRoom } = useRoom();

  if (!showMatchedMovies) return null;

  const handleFinish = () => {
    leaveRoom();
    router.push('/');
  };

  return (
    <Dialog open={showMatchedMovies} onOpenChange={handleFinish}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Session Complete! 🎬</DialogTitle>
          <DialogDescription>
            Here are all the movies you both liked:
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {matchedMovies.map((movie) => (
            <div
              key={movie.id}
              className="relative aspect-[2/3] overflow-hidden rounded-lg"
            >
              <Image
                src={movie.poster_path}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={handleFinish}>Back to Home</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
