// app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

// Font setup - Using Outfit as primary and Inter as secondary font
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CineMate - Movie Matching for Couples',
  description: 'Find movies you both want to watch',
  // Basic SEO
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cinemate.app',
    title: 'CineMate - Movie Matching for Couples',
    description: 'Find movies you both want to watch',
    siteName: 'CineMate',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-outfit min-h-screen bg-background">
        {/* Theme provider can be added here later */}
        <main className="relative flex min-h-screen flex-col">{children}</main>
      </body>
    </html>
  )
}
