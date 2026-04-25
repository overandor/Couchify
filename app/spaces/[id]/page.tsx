'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { AvailabilityTimeline } from '@/components/AvailabilityTimeline';
import { MinuteBookingSelector } from '@/components/MinuteBookingSelector';
import { PriceCalculator } from '@/components/PriceCalculator';
import { SeatSelector } from '@/components/SeatSelector';
import { spaces } from '@/lib/mock-data';
import { canBookSeats } from '@/lib/capacity';
import { calculateBookingPrice } from '@/lib/pricing';

export default function SpaceDetailPage() {
  const params = useParams<{ id: string }>();
  const space = spaces.find((item) => item.id === params.id);
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [durationMinutes, setDurationMinutes] = useState(30);

  const totalPrice = useMemo(() => {
    if (!space) return 0;
    return calculateBookingPrice(selectedSeats, durationMinutes, space.pricePerMinutePerSeatUsd);
  }, [durationMinutes, selectedSeats, space]);

  if (!space) {
    return <main className="rounded-soft bg-white p-8 shadow-neu">Space not found.</main>;
  }

  const canBook = canBookSeats(space.capacitySeats, space.bookedSeats, selectedSeats);

  return (
    <main className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="space-y-4 rounded-soft bg-white p-6 shadow-neu">
        <h1 className="text-3xl font-bold">{space.title}</h1>
        <p className="text-slate-600">{space.description}</p>
        <p className="text-sm text-slate-500">{space.locationLabel}</p>
        <div className="flex flex-wrap gap-2">
          {space.amenities.map((amenity) => (
            <span key={amenity} className="rounded-full bg-cloud px-3 py-1 text-xs shadow-neuInset">{amenity}</span>
          ))}
        </div>
        <AvailabilityTimeline timeline={space.timeline} />
      </section>

      <section className="space-y-4">
        <SeatSelector value={selectedSeats} max={space.availableSeats} onChange={setSelectedSeats} />
        <MinuteBookingSelector value={durationMinutes} onChange={setDurationMinutes} />
        <PriceCalculator
          seats={selectedSeats}
          minutes={durationMinutes}
          pricePerMinutePerSeatUsd={space.pricePerMinutePerSeatUsd}
          totalPriceUsd={totalPrice}
        />
        <button
          type="button"
          disabled={!canBook}
          className="w-full rounded-soft bg-white px-5 py-3 text-center font-semibold shadow-neu disabled:opacity-50"
        >
          {canBook ? 'Book now' : 'Not enough seats'}
        </button>
      </section>
    </main>
  );
}
