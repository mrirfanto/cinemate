import { clsx } from 'clsx';
import MovieCard from '@/components/cards/movie-card';
import { Movie } from '@/types/movie';

interface MovieStackProps {
  movies: Movie[];
}
export default function MovieStack({ movies }: MovieStackProps) {
  return (
    <ul className="relative mx-auto my-8 h-full w-[320px]">
      {movies.map((movie, index) => (
        <li
          key={movie.id}
          className={clsx(
            {
              'absolute -top-4 left-1/2 z-[-1] w-[75%] -translate-x-1/2 transform opacity-50':
                index !== 0,
            },
            { 'w-full': index === 0 },
            'h-full'
          )}
        >
          <MovieCard index={index} movie={movie} />
        </li>
      ))}
    </ul>
  );
}
