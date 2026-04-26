import Link from 'next/link';
import { SpaceUnit } from '@/lib/types';

function getLiveAvailabilityMinutes(space: SpaceUnit) {
  const currentWindow = space.timeline[0];
  if (!currentWindow) return 0;

  const start = new Date(currentWindow.startIso).getTime();
  const end = new Date(currentWindow.endIso).getTime();
  const minutes = Math.max(0, Math.floor((end - start) / 60000));
  return minutes;
}

export function SpaceCard({ space }: { space: SpaceUnit }) {
  const liveMinutes = getLiveAvailabilityMinutes(space);

  return (
    <article className="rounded-soft bg-white p-5 shadow-neu transition hover:-translate-y-1">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slateInk">{space.title}</h3>
        <p className="text-sm text-slate-500">{space.locationLabel}</p>
      </div>

      <div className="mb-4 rounded-3xl bg-cloud p-4 shadow-neuInset">
        <p className="text-sm font-semibold text-slateInk">{space.capacitySeats} total seats</p>
        <p className="text-sm text-emerald-700">🟢 {space.availableSeats} / {space.capacitySeats} seats available now</p>
        <p className="text-sm text-slate-600">👥 {space.bookedSeats} people already booked</p>
        <p className="mt-1 text-xs text-slate-500">Available NOW for {liveMinutes} minutes</p>
      </div>

      <p className="mb-4 text-sm text-slate-600">{space.description}</p>

      <div className="mb-4 flex flex-wrap gap-2">
        {space.amenities.slice(0, 3).map((amenity) => (
          <span key={amenity} className="rounded-full bg-cloud px-3 py-1 text-xs shadow-neuInset">
            {amenity}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="font-medium text-slateInk">${space.pricePerMinutePerSeatUsd.toFixed(2)}/min per seat</p>
        <Link href={`/spaces/${space.id}`} className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-neu transition active:scale-95">
          View space
        </Link>
      </div>
    </article>
  );
}
