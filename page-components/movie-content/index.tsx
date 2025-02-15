import { cookies } from 'next/headers';
import { fetchMovieCardData } from '@/repositories/fetchMovies';
import MovieStack from '@/components/cards/movie-stack';
import { RoomPresenceProvider } from '@/components/room-presence-provider';
import { redirect } from 'next/navigation';

interface MovieContentProps {
  params: {
    roomId: string;
  };
}

export default async function MovieContent({ params }: MovieContentProps) {
  const { roomId } = await params;
  const cookieStore = await cookies();
  const userNameCookie = cookieStore.get('userName');

  if (!userNameCookie?.value) {
    // Redirect to landing page if no username
    redirect('/');
  }

  const { transformedMovies } = await fetchMovieCardData({
    movieType: 'popular',
    swipedMovieIds: [], // We'll handle this client-side now
  });

  return (
    <div className="container mx-auto px-4">
      <RoomPresenceProvider roomId={roomId} userName={userNameCookie.value}>
        <MovieStack
          movies={transformedMovies}
          roomId={roomId}
          userName={userNameCookie.value}
        />
      </RoomPresenceProvider>
    </div>
  );
}
