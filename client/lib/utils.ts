import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRoomId(): string {
  // Generate a 6-character alphanumeric room ID
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from(
    { length: 6 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join('');
}

export function isValidRoomId(roomId: string): boolean {
  // Check if room ID is 6 characters and only contains alphanumeric characters
  return /^[A-Z0-9]{6}$/.test(roomId);
}

export function generateUserId(): string {
  return Math.random().toString(36).substring(2, 15);
}
