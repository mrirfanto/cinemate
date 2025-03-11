'use client';

import { useState } from 'react';
import { MovieStack } from '@/components/MovieStack';
import { RoomJoinDialog } from '@/components/RoomJoinDialog';
import { MatchDialog } from '@/components/MatchDialog';
import { useMovies } from '@/hooks/useMovies';
import { useRoom } from '@/contexts/RoomContext';

export default function Home() {
  const { movies, isLoading } = useMovies();
  const { isInRoom } = useRoom();
  const [showJoinDialog, setShowJoinDialog] = useState(!isInRoom);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-4 text-center">
        <h1 className="text-xl font-bold text-primary">CineMate</h1>
      </div>

      {isInRoom ? (
        <MovieStack movies={movies} isLoading={isLoading} />
      ) : (
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-center text-muted-foreground">
            Join a room to start matching movies with your partner
          </p>
        </div>
      )}

      <RoomJoinDialog open={showJoinDialog} onOpenChange={setShowJoinDialog} />
      <MatchDialog />
    </main>
  );
}
