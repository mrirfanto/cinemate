import ActionButtons from '@/components/action-buttons';
import MovieCard from '@/components/movie-card';
import { mockMovies } from '@/types/movie';
import clsx from 'clsx';

export default function Home() {
  return (
    <div>
      <ul className="relative mx-auto my-8 h-full w-[320px]">
        {mockMovies.map((movie, index) => (
          <li
            key={movie.id}
            className={clsx(
              {
                'absolute -top-4 left-4 z-[-1] w-[90%] opacity-50': index !== 0,
              },
              'h-full w-full'
            )}
          >
            <MovieCard index={index} movie={movie} />
          </li>
        ))}
      </ul>
      <ActionButtons />
    </div>
  );
}
