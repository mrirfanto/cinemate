'use client';

import { Button } from '@/components/ui/button';
import { HeartIcon, XIcon } from 'lucide-react';
import { useCallback } from 'react';

interface MovieCardActionsProps {
  loading?: boolean;
}

export default function MovieCardActions({ loading }: MovieCardActionsProps) {
  const likeMovie = useCallback(() => {
    console.log(`Like movie`);
  }, []);

  const dislikeMovie = useCallback(() => {
    console.log(`Dislike movie`);
  }, []);

  return (
    <div className="flex justify-center gap-10">
      <Button
        disabled={loading}
        variant="outline"
        className="h-12 w-12 rounded-full p-0"
        onClick={dislikeMovie}
      >
        <XIcon size={32} />
      </Button>
      <Button
        disabled={loading}
        variant="outline"
        className="h-12 w-12 rounded-full p-0"
        onClick={likeMovie}
      >
        <HeartIcon size={32} />
      </Button>
    </div>
  );
}
