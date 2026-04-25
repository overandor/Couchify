import Link from 'next/link';
import { HostStatsCard } from '@/components/HostStatsCard';
import { SpaceCard } from '@/components/SpaceCard';
import { bookings, hostProfiles, spaces } from '@/lib/mock-data';

const primaryHost = hostProfiles[0];

export default function HostPage() {
  return (
    <main className="space-y-6">
      <section className="flex items-center justify-between rounded-soft bg-white p-6 shadow-neu">
        <div>
          <h1 className="text-2xl font-bold">Host dashboard</h1>
          <p className="text-slate-600">Manage your minute-based capacity and bookings.</p>
        </div>
        <Link href="/host/spaces/new" className="neu-button">Create listing</Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <HostStatsCard label="Earnings" value={`$${primaryHost.totalEarningsUsd}`} />
        <HostStatsCard label="Active bookings" value={`${bookings.filter((b) => b.status === 'active').length}`} />
        <HostStatsCard label="Occupancy" value={`${primaryHost.occupancyRate}%`} />
        <HostStatsCard label="Listed spaces" value={`${spaces.filter((s) => s.hostId === primaryHost.id).length}`} />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Your spaces</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {spaces.filter((space) => space.hostId === primaryHost.id).map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      </section>
    </main>
  );
}
