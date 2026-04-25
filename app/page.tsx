import Link from 'next/link';
import { spaces } from '@/lib/mock-data';
import { SpaceCard } from '@/components/SpaceCard';

export default function HomePage() {
  return (
    <main className="space-y-8">
      <section className="rounded-soft bg-white p-8 shadow-neu">
        <h1 className="mb-3 text-4xl font-bold tracking-tight">Private space by the minute.</h1>
        <p className="mb-6 max-w-2xl text-slate-600">Book unused couch capacity in real time.</p>
        <div className="flex gap-3">
          <Link href="/explore" className="neu-button">Explore spaces</Link>
          <Link href="/host" className="neu-button">Become a host</Link>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Popular right now</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {spaces.slice(0, 3).map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      </section>
    </main>
  );
}
