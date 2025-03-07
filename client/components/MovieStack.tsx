import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Movie } from '@/types/movie';
import { MovieCard } from '@/components/MovieCard';

interface MovieStackProps {
  movies: Movie[];
  onStackEmpty?: () => void;
  isLoading: boolean;
}

export function MovieStack({
  movies,
  onStackEmpty,
  isLoading,
}: MovieStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSwipe = (direction: 'left' | 'right') => {
    // Update the current index to show the next card
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;

      // Check if we've reached the end of the stack
      if (newIndex >= movies.length && onStackEmpty) {
        setTimeout(() => {
          onStackEmpty();
        }, 300); // Wait for the animation to complete
      }

      return newIndex;
    });
  };

  // Filter out movies that have already been swiped
  const remainingMovies = movies.slice(currentIndex);

  if (isLoading) {
    return (
      <div className="relative mx-auto flex h-[70vh] w-full max-w-md items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="mx-auto mb-4 h-8 w-32 rounded bg-gray-200"></div>
          <div className="mx-auto h-4 w-48 rounded bg-gray-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto h-[80vh] w-full max-w-md">
      <AnimatePresence>
        {remainingMovies.length > 0 ? (
          <MovieCard
            key={remainingMovies[0].id}
            movie={remainingMovies[0]}
            onSwipe={handleSwipe}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-xl border border-dashed p-8 text-center">
            <div>
              <h3 className="text-xl font-semibold">No more movies</h3>
              <p className="mt-2 text-muted-foreground">
                You&apos;ve gone through all the movies in our collection.
              </p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
