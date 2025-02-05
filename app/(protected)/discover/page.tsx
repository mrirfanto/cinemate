import MovieCardActions from '@/components/cards/movie-card-actions';
import MovieStack from '@/components/cards/movie-stack';
import { Suspense } from 'react';
import DiscoverPageLoading from './loading';
import { fetchMovieCardData } from '@/repositories/fetchMovies';

export default async function DiscoverPage() {
  const { transformedMovies } = await fetchMovieCardData({
    movieType: 'popular',
  });

  return (
    <>
      <div className="mb-4 flex w-full flex-col items-center">
        <h1 className="flex-1 text-4xl">Discover</h1>
        <p className="flex-1 text-xl">Popular</p>
      </div>
      <Suspense fallback={<DiscoverPageLoading />}>
        <MovieStack movies={transformedMovies} />
      </Suspense>
      <MovieCardActions />
    </>
  );
}
