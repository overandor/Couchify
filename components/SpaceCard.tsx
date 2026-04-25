import Link from 'next/link';
import { SpaceUnit } from '@/lib/types';
import { CapacityBadge } from '@/components/CapacityBadge';

export function SpaceCard({ space }: { space: SpaceUnit }) {
  return (
    <article className="rounded-soft bg-white p-5 shadow-neu">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slateInk">{space.title}</h3>
        <CapacityBadge capacitySeats={space.capacitySeats} availableSeats={space.availableSeats} />
      </div>
      <p className="mb-2 text-sm text-slate-500">{space.locationLabel}</p>
      <p className="mb-4 text-sm text-slate-600">{space.description}</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {space.amenities.slice(0, 3).map((amenity) => (
          <span key={amenity} className="rounded-full bg-cloud px-3 py-1 text-xs shadow-neuInset">
            {amenity}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <p className="font-medium text-slateInk">${space.pricePerMinutePerSeatUsd.toFixed(2)}/min/seat</p>
        <Link href={`/spaces/${space.id}`} className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-neu">
          View space
        </Link>
      </div>
    </article>
  );
}
