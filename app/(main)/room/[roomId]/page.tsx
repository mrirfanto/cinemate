import MovieContent from '@/page-components/movie-content';

interface PageProps {
  params: {
    roomId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { roomId } = await params;
  return (
    <div className="container mx-auto px-4">
      <h1 className="my-4 text-center text-2xl font-bold">Room: {roomId}</h1>
      <MovieContent />
    </div>
  );
}
