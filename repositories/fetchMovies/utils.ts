import { Configuration } from '@/types/configuration';
import { Genre, Movie } from '@/types/movie';

export function transformMovies({
  configuration,
  genres,
  movies,
}: {
  configuration: Configuration;
  genres: Genre[];
  movies: Movie[];
}): Movie[] {
  const baseUrl = configuration.images.base_url;
  const posterSize = configuration.images.poster_sizes[5];
  const genreMap = new Map(genres.map((genre) => [genre.id, genre.name]));

  return movies.map((movie: Movie) => ({
    ...movie,
    poster_path: `${baseUrl}${posterSize}${movie.poster_path}`,
    genres: movie.genre_ids.map((id) => genreMap.get(id) ?? '').filter(Boolean),
  }));
}
