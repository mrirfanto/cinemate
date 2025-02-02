'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error in DiscoverPage:', error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-red-500">
        Oops! Something went wrong.
      </h2>
      <p className="mt-2 text-gray-600">
        {error.message || 'Failed to load the page.'}
      </p>
      <Button variant="destructive" onClick={reset} className="mt-2">
        Try Again
      </Button>
    </div>
  );
}
