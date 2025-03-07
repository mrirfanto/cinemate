import { Configuration } from '@/types/configuration';
import { Genre, Movie } from '@/types/movie';
import { transformMovies } from './utils';

const TMDB_API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

async function fetchConfiguration(): Promise<Configuration> {
  const configRes = await fetch(
    `${TMDB_API_URL}/configuration?language=en-US`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    }
  );

  if (!configRes.ok) {
    const errorData = await configRes.json();
    throw new Error(
      `Failed to fetch configuration: ${JSON.stringify(errorData)}`
    );
  }

  return await configRes.json();
}

async function fetchMovies(movieType: string): Promise<Movie[]> {
  const moviesRes = await fetch(
    `${TMDB_API_URL}/movie/${movieType}?language=en-US&page=1`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    }
  );

  if (!moviesRes.ok) {
    throw new Error('Failed to fetch movies');
  }

  const moviesData = await moviesRes.json();
  return moviesData.results;
}

async function fetchGenres(): Promise<Genre[]> {
  const genresRes = await fetch(
    `${TMDB_API_URL}/genre/movie/list?language=en`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    }
  );

  if (!genresRes.ok) {
    throw new Error('Failed to fetch genres');
  }

  const genresData = await genresRes.json();
  return genresData.genres;
}

export async function fetchMovieCardData({
  movieType,
  swipedMovieIds = [],
}: {
  movieType: string;
  swipedMovieIds?: number[];
}) {
  const configuration = await fetchConfiguration();
  const genres = await fetchGenres();
  const movies = await fetchMovies(movieType);

  const unswipedMovies = movies.filter(
    (movie) => !swipedMovieIds.includes(movie.id)
  );

  const transformedMovies = transformMovies({
    configuration,
    genres,
    movies: unswipedMovies,
  });

  return { transformedMovies };
}
