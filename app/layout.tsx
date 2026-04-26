import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { Logo } from '@/components/Logo';

export const metadata: Metadata = {
  title: 'Couchify',
  description: 'Book unused private seating capacity by the minute.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto min-h-screen max-w-6xl px-4 py-6 sm:px-6">
          <header className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-soft border border-white/35 bg-white/45 p-4 shadow-glass backdrop-blur-lg">
            <Logo />
            <nav className="flex flex-wrap gap-2 text-sm">
              <Link href="/explore" className="neu-button">Explore</Link>
              <Link href="/host" className="neu-button">Host</Link>
              <Link href="/guest/bookings" className="neu-button">Bookings</Link>
              <Link href="/profile" className="neu-button">Profile</Link>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
