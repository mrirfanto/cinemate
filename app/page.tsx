import MovieCard from '@/components/movie-card';
import { mockMovie } from '@/types/movie';

export default function Home() {
  return (
    <div className="p-4">
      <MovieCard movie={mockMovie} />
    </div>
  );
}
