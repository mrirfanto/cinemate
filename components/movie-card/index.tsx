import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Movie } from '@/types/movie';
import Image from 'next/image';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="rounded-xl p-0">
        <div className="relative aspect-[2/3]">
          <Image
            src={movie.posterPath}
            alt={`${movie.title} poster`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="absolute bottom-0 flex w-full flex-col gap-3 bg-gradient-to-t from-black to-transparent/80 p-3">
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-bold text-white">{movie.title}</h3>
              <div className="flex gap-2">
                {movie.genres.slice(0, 2).map((genre) => (
                  <Badge
                    key={genre}
                    variant="secondary"
                    className="bg-white px-1 py-0 text-[10px]"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="text-xs text-white">
              {new Date(movie.releaseDate).getFullYear()} • ⭐{' '}
              {movie.voteAverage.toFixed(1)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
