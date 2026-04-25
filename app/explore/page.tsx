import { SpaceCard } from '@/components/SpaceCard';
import { spaces } from '@/lib/mock-data';

const filters = ['Available Now', 'Couch', 'Desk', 'Quiet', 'WiFi'];

export default function ExplorePage() {
  return (
    <main className="space-y-6">
      <section className="rounded-soft bg-white p-6 shadow-neu">
        <h1 className="mb-4 text-2xl font-bold">Explore spaces</h1>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button key={filter} type="button" className="rounded-full bg-cloud px-4 py-2 text-sm shadow-neu">
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {spaces.map((space) => (
          <SpaceCard key={space.id} space={space} />
        ))}
      </section>
    </main>
  );
}
