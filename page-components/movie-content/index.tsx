import { cookies } from 'next/headers';
import { fetchMovieCardData } from '@/repositories/fetchMovies';
import MovieStack from '@/components/cards/movie-stack';

export default async function MovieContent() {
  const cookieStore = await cookies();
  const swipedMoviesCookie = cookieStore.get('movieSwipes');
  const swipedMovies = swipedMoviesCookie
    ? JSON.parse(swipedMoviesCookie.value)
    : { liked: [], disliked: [] };

  const allSwipedMovieIds = [...swipedMovies.liked, ...swipedMovies.disliked];

  const { transformedMovies } = await fetchMovieCardData({
    movieType: 'popular',
    swipedMovieIds: allSwipedMovieIds,
  });

  return <MovieStack movies={transformedMovies} />;
}
