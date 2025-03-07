import React, { useState } from 'react';
import Image from 'next/image';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { X, Heart } from 'lucide-react';

import { Movie } from '@/types/movie';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useMoviePreferences } from '@/hooks/useMovies';

interface MovieCardProps {
  movie: Movie;
  onSwipe: (direction: 'left' | 'right') => void;
}

export function MovieCard({ movie, onSwipe }: MovieCardProps) {
  const { handleLikeMovie, handleDislikeMovie } = useMoviePreferences();
  const [exitX, setExitX] = useState<number | null>(null);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const opacity = useTransform(x, [-100, 0, 100], [0.5, 1, 0.5]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x > 100) {
      setExitX(200);
      handleLikeMovie(movie);
      onSwipe('right');
    } else if (info.offset.x < -100) {
      setExitX(-200);
      handleDislikeMovie(movie);
      onSwipe('left');
    }
  };

  const handleLike = () => {
    setExitX(200);
    setTimeout(() => {
      handleLikeMovie(movie);
      onSwipe('right');
    }, 200);
  };

  const handleDislike = () => {
    setExitX(-200);
    setTimeout(() => {
      handleDislikeMovie(movie);
      onSwipe('left');
    }, 200);
  };

  return (
    <motion.div
      style={{
        x,
        rotate,
        opacity,
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={exitX !== null ? { x: exitX } : undefined}
      transition={{ duration: 0.2 }}
    >
      <Card className="relative h-full w-full overflow-hidden rounded-3xl">
        <div className="relative h-full w-full">
          <Image
            src={movie.poster_path}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <CardContent className="absolute bottom-6 left-0 right-0 flex justify-center gap-8">
          <Button
            variant="destructive"
            size="icon"
            className="h-14 w-14 rounded-full bg-white text-red-500 shadow-lg hover:bg-white/90 hover:text-red-600"
            onClick={handleDislike}
          >
            <X className="h-8 w-8" />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="h-14 w-14 rounded-full bg-white text-green-500 shadow-lg hover:bg-white/90 hover:text-green-600"
            onClick={handleLike}
          >
            <Heart className="h-8 w-8" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
