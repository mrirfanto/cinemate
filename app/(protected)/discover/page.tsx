import MovieCardActions from '@/components/cards/movie-card-actions';
import MovieStack from '@/components/cards/movie-stack';
import { Suspense } from 'react';
import DiscoverPageLoading from './loading';

export default function DiscoverPage() {
  return (
    <>
      <div className="mb-4 flex w-full flex-col items-center">
        <h1 className="flex-1 text-5xl">Discover</h1>
        <p className="flex-1 text-lg">Romance/Comedy</p>
      </div>
      <Suspense fallback={<DiscoverPageLoading />}>
        <MovieStack />
      </Suspense>
      <MovieCardActions />
    </>
  );
}
