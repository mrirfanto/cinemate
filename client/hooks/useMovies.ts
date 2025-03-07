import { useState, useEffect, useCallback } from 'react';
import { Movie } from '@/types/movie';
import { getMovies, getMovieById } from '@/services/movieService';
import {
  getLikedMovies,
  getDislikedMovies,
  saveMoviePreference,
} from '@/lib/utils';

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch movies from the API
  const fetchMovies = useCallback(async (forceRefresh = false) => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedMovies = await getMovies(forceRefresh);
      setMovies(fetchedMovies);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to fetch movies')
      );
      console.error('Error fetching movies:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return {
    movies,
    isLoading,
    error,
    refreshMovies: () => fetchMovies(true),
  };
}

export function useMoviePreferences() {
  const [likedMovies, setLikedMovies] = useState<Movie[]>([]);
  const [dislikedMovies, setDislikedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load movie preferences from localStorage
  const loadPreferences = useCallback(async () => {
    try {
      setIsLoading(true);
      const likedIds = getLikedMovies();
      const dislikedIds = getDislikedMovies();

      const likedMoviePromises = likedIds.map((id) => getMovieById(id));
      const dislikedMoviePromises = dislikedIds.map((id) => getMovieById(id));

      const likedResults = await Promise.all(likedMoviePromises);
      const dislikedResults = await Promise.all(dislikedMoviePromises);

      setLikedMovies(likedResults.filter(Boolean) as Movie[]);
      setDislikedMovies(dislikedResults.filter(Boolean) as Movie[]);
    } catch (error) {
      console.error('Error loading movie preferences:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle liking a movie
  const handleLikeMovie = useCallback((movie: Movie) => {
    saveMoviePreference(movie.id, true);
    setLikedMovies((prev) => {
      // Check if movie is already in the list
      if (prev.some((m) => m.id === movie.id)) {
        return prev;
      }
      return [...prev, movie];
    });
  }, []);

  // Handle disliking a movie
  const handleDislikeMovie = useCallback((movie: Movie) => {
    saveMoviePreference(movie.id, false);
    setDislikedMovies((prev) => {
      // Check if movie is already in the list
      if (prev.some((m) => m.id === movie.id)) {
        return prev;
      }
      return [...prev, movie];
    });
  }, []);

  // Reset all preferences
  const resetPreferences = useCallback(() => {
    localStorage.removeItem('moviePreferences');
    setLikedMovies([]);
    setDislikedMovies([]);
  }, []);

  // Load preferences on mount
  useEffect(() => {
    loadPreferences();
  }, [loadPreferences]);

  return {
    likedMovies,
    dislikedMovies,
    isLoading,
    handleLikeMovie,
    handleDislikeMovie,
    resetPreferences,
    refreshPreferences: loadPreferences,
  };
}
