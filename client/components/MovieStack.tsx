import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Movie } from '@/types/movie';
import { MovieCard } from '@/components/MovieCard';

interface MovieStackProps {
  movies: Movie[];
  isLoading: boolean;
}

export function MovieStack({ movies, isLoading }: MovieStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-center text-muted-foreground">Loading movies...</p>
      </div>
    );
  }

  if (currentIndex >= movies.length) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-center text-muted-foreground">
          No more movies to show. Wait for your partner to catch up!
        </p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto aspect-[2/3] w-full max-w-sm">
      <AnimatePresence>
        <MovieCard
          key={movies[currentIndex].id}
          movie={movies[currentIndex]}
          onSwipe={handleSwipe}
        />
      </AnimatePresence>
    </div>
  );
}
