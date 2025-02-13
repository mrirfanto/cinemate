'use client';

import { clsx } from 'clsx';
import MovieCard from '@/components/cards/movie-card';
import { Movie } from '@/types/movie';
import { Button } from '@/components/ui/button';
import { XIcon, HeartIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

interface MovieStackProps {
  movies: Movie[];
}

type SwipeDirection = 'left' | 'right';

export default function MovieStack({ movies }: MovieStackProps) {
  const [cards, setCards] = useState<Movie[]>(movies);
  const [exitDirection, setExitDirection] = useState<SwipeDirection | null>(
    null
  );

  const handleSwipe = (direction: SwipeDirection) => {
    setExitDirection(direction);

    setTimeout(() => {
      setCards((prev) => prev.slice(1));
      setExitDirection(null);
    }, 300);
  };

  const triggerSwipe = (direction: SwipeDirection) => {
    if (cards.length === 0) return;
    handleSwipe(direction);
  };

  console.log(cards[0]);
  console.log(cards[cards.length - 1]);

  return (
    <div>
      <ul className="relative my-8 flex h-full w-full flex-col items-center">
        <AnimatePresence mode="popLayout">
          {cards.map((movie, index) => (
            <motion.li
              key={movie.id}
              className={clsx(
                {
                  'absolute z-[-1]': index !== 0,
                },
                'h-full w-[70%]'
              )}
              style={{ zIndex: cards.length - index }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              initial={{ scale: 1, opacity: 1 }}
              animate={{
                scale: index === 0 ? 1.05 : 1,
                opacity: 1,
              }}
              exit={{
                x: exitDirection === 'right' ? 200 : -200,
                opacity: 0,
              }}
              dragSnapToOrigin={true}
              onDragEnd={(e, info) => {
                if (info.offset.x > 150) {
                  handleSwipe('right'); // ✅ Like
                } else if (info.offset.x < -150) {
                  handleSwipe('left'); // ❌ Dislike
                }
              }}
            >
              <MovieCard index={index} movie={movie} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <div className="flex justify-center gap-10">
        <Button
          variant="outline"
          className="h-12 w-12 rounded-full p-0"
          onClick={() => triggerSwipe('left')}
        >
          <XIcon size={32} />
        </Button>
        <Button
          variant="outline"
          className="h-12 w-12 rounded-full p-0"
          onClick={() => triggerSwipe('right')}
        >
          <HeartIcon size={32} />
        </Button>
      </div>
    </div>
  );
}
