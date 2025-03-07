import { fetchMovieCardData } from '@/repositories/fetchMovieCardData';
import { Movie } from '@/types/movie';
import { getLikedMovies, getDislikedMovies } from '@/lib/utils';

// Cache for movie data to avoid unnecessary API calls
let movieCache: Movie[] | null = null;

export async function getMovies(forceRefresh = false): Promise<Movie[]> {
  // If we have cached movies and don't need to refresh, return them
  if (movieCache && !forceRefresh) {
    return movieCache;
  }

  try {
    // Get IDs of movies that have already been swiped
    const likedMovieIds = getLikedMovies().map(Number);
    const dislikedMovieIds = getDislikedMovies().map(Number);
    const swipedMovieIds = [...likedMovieIds, ...dislikedMovieIds];

    // Fetch popular movies from TMDB API
    const { transformedMovies } = await fetchMovieCardData({
      movieType: 'popular',
      swipedMovieIds,
    });

    // Cache the movies
    movieCache = transformedMovies;
    return transformedMovies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}

export function getMovieById(id: string): Promise<Movie | undefined> {
  return getMovies().then((movies) =>
    movies.find((movie) => movie.id.toString() === id)
  );
}
