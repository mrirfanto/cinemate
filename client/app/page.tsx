'use client';

import { useState } from 'react';
import { MovieStack } from '@/components/MovieStack';
import { useMovies, useMoviePreferences } from '@/hooks/useMovies';

export default function Home() {
  const { movies, isLoading } = useMovies();
  const { likedMovies, dislikedMovies, resetPreferences, refreshPreferences } =
    useMoviePreferences();
  const [showStats, setShowStats] = useState(false);

  const handleStackEmpty = () => {
    setShowStats(true);
    refreshPreferences();
  };

  const handleReset = () => {
    resetPreferences();
    setShowStats(false);
    window.location.reload();
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-4 text-center">
        <h1 className="text-xl font-bold text-primary">CineMate</h1>
      </div>

      {showStats ? (
        <div className="mx-auto max-w-md rounded-xl border p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">
            Your Movie Preferences
          </h2>

          <div className="mb-6">
            <h3 className="mb-2 text-lg font-medium">
              Liked Movies ({likedMovies.length})
            </h3>
            <ul className="space-y-1">
              {likedMovies.length > 0 ? (
                likedMovies.map((movie) => (
                  <li key={movie.id} className="text-sm">
                    {movie.title} ({new Date(movie.release_date).getFullYear()})
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted-foreground">
                  No liked movies yet
                </li>
              )}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-lg font-medium">
              Disliked Movies ({dislikedMovies.length})
            </h3>
            <ul className="space-y-1">
              {dislikedMovies.length > 0 ? (
                dislikedMovies.map((movie) => (
                  <li key={movie.id} className="text-sm">
                    {movie.title} ({new Date(movie.release_date).getFullYear()})
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted-foreground">
                  No disliked movies yet
                </li>
              )}
            </ul>
          </div>

          <button
            onClick={handleReset}
            className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            Start Over
          </button>
        </div>
      ) : (
        <MovieStack
          movies={movies}
          onStackEmpty={handleStackEmpty}
          isLoading={isLoading}
        />
      )}
    </main>
  );
}
