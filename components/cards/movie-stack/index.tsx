import { clsx } from 'clsx';
import MovieCard from '@/components/cards/movie-card';
import { mockMovies, Movie } from '@/types/movie';

async function getMovies(): Promise<Movie[]> {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulated delay

  return mockMovies;
}

export default async function MovieStack() {
  const movies = await getMovies();

  return (
    <ul className="relative mx-auto my-8 h-full w-[320px]">
      {movies.map((movie, index) => (
        <li
          key={movie.id}
          className={clsx(
            {
              'absolute -top-4 left-[6%] z-[-1] w-[88%] opacity-50':
                index !== 0,
            },
            'h-full w-full'
          )}
        >
          <MovieCard index={index} movie={movie} />
        </li>
      ))}
    </ul>
  );
}
