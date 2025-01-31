export interface Movie {
  id: string;
  title: string;
  overview: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
  genres: string[];
}

export const mockMovie: Movie = {
  id: 'mockId',
  title: 'Mock Movie Title',
  overview: 'This is a mock movie overview.',
  posterPath: 'https://placehold.co/400x600',
  releaseDate: '2022-01-01',
  voteAverage: 8.5,
  genres: ['Action', 'Adventure', 'Comedy'],
};
