'use client';

import { clsx } from 'clsx';
import MovieCard from '@/components/cards/movie-card';
import { Movie } from '@/types/movie';
import { Button } from '@/components/ui/button';
import { XIcon, HeartIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState, useMemo, useEffect } from 'react';
import RoomSwipeTracker from '@/lib/room-swipe-tracker';
import { useRoomPresence } from '@/components/room-presence-provider';
import { Badge } from '@/components/ui/badge';
import toast from 'react-hot-toast';

interface MovieStackProps {
  movies: Movie[];
  roomId: string;
  userName: string;
}

type SwipeDirection = 'left' | 'right';

export default function MovieStack({
  movies,
  roomId,
  userName,
}: MovieStackProps) {
  const { totalUsers, activeUsers } = useRoomPresence();
  const [cards, setCards] = useState<Movie[]>(movies);
  const [exitDirection, setExitDirection] = useState<SwipeDirection | null>(
    null
  );
  const [matches, setMatches] = useState<number[]>([]);

  const swipeTracker = useMemo(() => {
    if (typeof window !== 'undefined') {
      return new RoomSwipeTracker(roomId);
    }
    return null;
  }, [roomId]);

  useEffect(() => {
    if (swipeTracker) {
      const interval = setInterval(() => {
        const matchedMovies = swipeTracker.getMatchedMovies(totalUsers);
        // Only show toast if there's a new match
        const newMatches = matchedMovies.filter((id) => !matches.includes(id));
        if (newMatches.length > 0) {
          newMatches.forEach((matchId) => {
            const movie = movies.find((m) => m.id === matchId);
            if (movie) {
              toast.success(`Everyone liked "${movie.title}"!`, {
                duration: 2000,
                icon: '🎬',
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              });
            }
          });
        }
        setMatches(matchedMovies);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [swipeTracker, totalUsers, matches, movies]);

  const handleSwipe = (direction: SwipeDirection) => {
    if (!swipeTracker || cards.length === 0) return;

    const currentMovie = cards[0];
    swipeTracker.trackSwipe(currentMovie.id, userName, direction === 'right');
    setExitDirection(direction);

    // Show feedback toast for user's swipe
    if (direction === 'right') {
      toast('Liked! 👍', {
        icon: '❤️',
        duration: 1000,
      });
    }

    setTimeout(() => {
      setCards((prev) => prev.slice(1));
      setExitDirection(null);
    }, 300);
  };

  const triggerSwipe = (direction: SwipeDirection) => {
    if (!swipeTracker) return;
    if (cards.length === 0) return;
    handleSwipe(direction);
  };

  return (
    <div>
      {/* Room Status Section */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            {activeUsers.length} Active User
            {activeUsers.length !== 1 ? 's' : ''}
          </Badge>
        </div>
        {totalUsers > activeUsers.length && (
          <p className="text-sm text-muted-foreground">
            Waiting for {totalUsers - activeUsers.length} more user
            {totalUsers - activeUsers.length !== 1 ? 's' : ''}...
          </p>
        )}
      </div>

      {/* Movie Stack */}
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
                  handleSwipe('right');
                } else if (info.offset.x < -150) {
                  handleSwipe('left');
                }
              }}
            >
              <MovieCard index={index} movie={movie} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-4">
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

        {/* Instructions */}
        <p className="text-center text-sm text-muted-foreground">
          {activeUsers.length < 2
            ? 'Waiting for others to join...'
            : 'Swipe right to like, left to pass'}
        </p>
      </div>
    </div>
  );
}
