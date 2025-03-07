import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Local storage functions for movie preferences
export const saveMoviePreference = (movieId: number, liked: boolean) => {
  try {
    const preferences = getMoviePreferences();
    preferences[movieId.toString()] = liked;
    localStorage.setItem('moviePreferences', JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving movie preference:', error);
  }
};

export const getMoviePreferences = (): Record<string, boolean> => {
  try {
    const preferences = localStorage.getItem('moviePreferences');
    return preferences ? JSON.parse(preferences) : {};
  } catch (error) {
    console.error('Error getting movie preferences:', error);
    return {};
  }
};

export const getLikedMovies = (): string[] => {
  const preferences = getMoviePreferences();
  return Object.entries(preferences)
    .filter(([, liked]) => liked)
    .map(([id]) => id);
};

export const getDislikedMovies = (): string[] => {
  const preferences = getMoviePreferences();
  return Object.entries(preferences)
    .filter(([, liked]) => !liked)
    .map(([id]) => id);
};
