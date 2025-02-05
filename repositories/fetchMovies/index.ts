import { Configuration } from '@/types/configuration';
import { Genre, Movie } from '@/types/movie';
import { transformMovies } from './utils';

export async function fetchConfiguration(): Promise<Configuration> {
  const configRes = await fetch(
    `${process.env.TMDB_API_URL}/configuration?language=en-US`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    }
  );

  if (!configRes.ok) {
    throw new Error('Failed to fetch configuration');
  }

  return await configRes.json();
}

export async function fetchMovies(movieType: string): Promise<Movie[]> {
  const moviesRes = await fetch(
    `${process.env.TMDB_API_URL}/movie/${movieType}?language=en-US&page=1`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    }
  );

  if (!moviesRes.ok) {
    throw new Error('Failed to fetch movies');
  }

  const moviesData = await moviesRes.json();
  return moviesData.results;
}

export async function fetchGenres(): Promise<Genre[]> {
  const genresRes = await fetch(
    `${process.env.TMDB_API_URL}/genre/movie/list?language=en`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    }
  );

  if (!genresRes.ok) {
    throw new Error('Failed to fetch genres');
  }

  const genresData = await genresRes.json();
  return genresData.genres;
}

export async function fetchMovieCardData({ movieType }: { movieType: string }) {
  const configuration = await fetchConfiguration();
  const genres = await fetchGenres();
  const movies = await fetchMovies(movieType);

  const transformedMovies = transformMovies({ configuration, genres, movies });

  return { transformedMovies };
}
