// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { RoomProvider } from '@/contexts/RoomContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CineMate - Find Movies Together',
  description:
    'Match movies with your partner and find something you both want to watch.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RoomProvider>{children}</RoomProvider>
      </body>
    </html>
  );
}
