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
import { createBooking } from '@/lib/data-provider';
import { appendActionLog } from '@/lib/action-log';
import { ActionFeed } from '@/components/ActionFeed';

export default function SpaceDetailPage() {
  const params = useParams<{ id: string }>();
  const space = spaces.find((item) => item.id === params.id);
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const totalPrice = useMemo(() => {
    if (!space) return 0;
    return calculateBookingPrice(selectedSeats, durationMinutes, space.pricePerMinutePerSeatUsd);
  }, [durationMinutes, selectedSeats, space]);

  if (!space) {
    return <main className="rounded-soft bg-white p-8 shadow-neu">Space not found.</main>;
  }

  const canBook = canBookSeats(space.capacitySeats, space.bookedSeats, selectedSeats);
  const firstWindow = space.timeline[0];
  const liveAvailabilityMinutes = firstWindow
    ? Math.max(0, Math.floor((new Date(firstWindow.endIso).getTime() - new Date(firstWindow.startIso).getTime()) / 60000))
    : 0;

  async function handleBook() {
    if (!space || !canBook) return;
    setIsBooking(true);
    setBookingError(null);
    setBookingStatus(null);
    try {
      const booking = await createBooking({
        spaceId: space.id,
        requestedSeats: selectedSeats,
        durationMinutes,
        startIso: new Date().toISOString()
      });
      setBookingStatus(`Booking created: ${booking.id} (${booking.status})`);
      appendActionLog('booking_created', `Booking created (${booking.id}) for ${selectedSeats} seat(s)`);
    } catch (error) {
      setBookingError(error instanceof Error ? error.message : 'Booking failed.');
    } finally {
      setIsBooking(false);
    }
  }

  return (
    <main className="space-y-6">
      <section className="glass-card grid gap-4 p-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold">{space.title}</h1>
          <p className="mt-2 text-slate-700">{space.description}</p>
          <p className="text-sm text-slate-600">{space.locationLabel}</p>
        </div>
        <aside className="rounded-3xl bg-nightCloud/80 p-4 shadow-neuInset">
          <p className="font-semibold text-slateInk">Capacity snapshot</p>
          <p className="text-sm text-slate-700">Total seats: {space.capacitySeats}</p>
          <p className="text-sm text-slate-700">Booked seats: {space.bookedSeats}</p>
          <p className="text-sm text-emerald-700">Available seats: {space.availableSeats}</p>
          <p className="mt-1 text-xs text-slate-600">Available NOW for {liveAvailabilityMinutes} minutes</p>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-card space-y-4 p-6">
          <div className="flex flex-wrap gap-2">
            {space.amenities.map((amenity) => (
              <span key={amenity} className="rounded-full bg-nightCloud/80 px-3 py-1 text-xs shadow-neuInset">{amenity}</span>
            ))}
          </div>
          {firstWindow && (
            <div className="rounded-3xl bg-nightCloud/80 p-4 shadow-neuInset text-sm">
              {new Date(firstWindow.startIso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} —{' '}
              {new Date(firstWindow.endIso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
          <AvailabilityTimeline timeline={space.timeline} />
        </div>

        <section className="space-y-4">
          <SeatSelector value={selectedSeats} max={space.availableSeats} onChange={setSelectedSeats} />
          <MinuteBookingSelector value={durationMinutes} onChange={setDurationMinutes} />
          <div className="glass-card p-4">
            <p className="text-sm text-slate-700">Live calculation</p>
            <p className="text-lg font-semibold text-slateInk">
              {selectedSeats} seats × {durationMinutes} min × ${space.pricePerMinutePerSeatUsd.toFixed(2)} = ${totalPrice.toFixed(2)}
            </p>
          </div>
          <PriceCalculator
            seats={selectedSeats}
            minutes={durationMinutes}
            pricePerMinutePerSeatUsd={space.pricePerMinutePerSeatUsd}
            totalPriceUsd={totalPrice}
          />
          <button
            type="button"
            disabled={!canBook || isBooking}
            onClick={handleBook}
            className="w-full rounded-soft bg-white/75 px-5 py-3 text-center font-semibold shadow-neu transition active:scale-95 disabled:opacity-50"
          >
            {isBooking ? 'Creating booking...' : canBook ? 'Book now' : 'Not enough seats'}
          </button>
          {bookingStatus && <p className="rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-700 shadow-neuInset">{bookingStatus}</p>}
          {bookingError && <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-700 shadow-neuInset">{bookingError}</p>}
        </section>
      </section>
      <ActionFeed />
    </main>
  );
}
