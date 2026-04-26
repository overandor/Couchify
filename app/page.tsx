import Link from 'next/link';
import { spaces } from '@/lib/mock-data';
import { SpaceCard } from '@/components/SpaceCard';

const featured = spaces[0];

export default function HomePage() {
  return (
    <main className="space-y-8">
      <section className="grid gap-6 rounded-soft bg-white p-8 shadow-neu lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="mb-3 text-4xl font-bold tracking-tight">Private space by the minute.</h1>
          <p className="mb-3 max-w-2xl text-slate-600">Book unused couch capacity in real time.</p>
          <p className="mb-6 text-base font-medium text-slateInk">You don&apos;t rent the space — you rent a seat in it.</p>
          <div className="flex gap-3">
            <Link href="/explore" className="neu-button">Explore spaces</Link>
            <Link href="/host" className="neu-button">Become a host</Link>
          </div>
        </div>

        <aside className="rounded-soft bg-cloud p-5 shadow-neuInset">
          <p className="text-lg font-semibold">{featured.title}</p>
          <p className="mt-2 text-emerald-700">🟢 {featured.availableSeats} seats available now</p>
          <p className="text-slate-700">👥 {featured.bookedSeats} people already booked</p>
          <p className="mt-2 text-sm text-slate-600">${featured.pricePerMinutePerSeatUsd.toFixed(2)}/min per seat</p>
        </aside>
      </section>

      <section className="rounded-soft bg-white p-6 shadow-neu">
        <h2 className="mb-4 text-xl font-semibold">How it works</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl bg-cloud p-4 shadow-neuInset">
            <p className="font-semibold">1) List seat capacity</p>
            <p className="text-sm text-slate-600">Host lists a couch with total seat capacity.</p>
          </article>
          <article className="rounded-3xl bg-cloud p-4 shadow-neuInset">
            <p className="font-semibold">2) Book by minute</p>
            <p className="text-sm text-slate-600">Guests reserve seats by the minute, not the whole couch.</p>
          </article>
          <article className="rounded-3xl bg-cloud p-4 shadow-neuInset">
            <p className="font-semibold">3) Share capacity</p>
            <p className="text-sm text-slate-600">Multiple guests can book the same space at once.</p>
          </article>
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
