import React from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRoom } from '@/contexts/RoomContext';

export function MatchDialog() {
  const {
    matchedMovie,
    isDecisionPromptOpen,
    sendSessionDecision,
    closeDecisionPrompt,
  } = useRoom();

  if (!matchedMovie || !isDecisionPromptOpen) return null;

  return (
    <Dialog open={isDecisionPromptOpen} onOpenChange={closeDecisionPrompt}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>It&apos;s a Match! 🎉</DialogTitle>
          <DialogDescription>
            You both liked {matchedMovie.title}!
          </DialogDescription>
        </DialogHeader>
        <div className="relative mx-auto aspect-[2/3] w-48 overflow-hidden rounded-lg">
          <Image
            src={matchedMovie.poster_path}
            alt={matchedMovie.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="mt-4 flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => sendSessionDecision('continue')}
          >
            Keep Swiping
          </Button>
          <Button
            variant="default"
            onClick={() => sendSessionDecision('conclude')}
          >
            Done for Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
