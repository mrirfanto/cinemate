export interface Movie {
  id: string;
  title: string;
  overview: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
  genres: string[];
}

export const mockMovies: Movie[] = [
  {
    id: 'mockId1',
    title: 'Mock Movie Title 1',
    overview: 'This is a mock movie overview 1.',
    posterPath: 'https://placehold.co/400x600',
    releaseDate: '2022-01-01',
    voteAverage: 8.5,
    genres: ['Action', 'Adventure', 'Comedy'],
  },
  {
    id: 'mockId2',
    title: 'Mock Movie Title 2',
    overview: 'This is a mock movie overview 2.',
    posterPath: 'https://placehold.co/400x600',
    releaseDate: '2022-02-01',
    voteAverage: 7.5,
    genres: ['Drama', 'Thriller', 'Mystery'],
  },
  {
    id: 'mockId3',
    title: 'Mock Movie Title 3',
    overview: 'This is a mock movie overview 3.',
    posterPath: 'https://placehold.co/400x600',
    releaseDate: '2022-03-01',
    voteAverage: 9.0,
    genres: ['Romance', 'Comedy', 'Drama'],
  },
];
