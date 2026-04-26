import { BookingStatusPill } from '@/components/BookingStatusPill';
import { CheckInCard } from '@/components/CheckInCard';
import { bookings, checkInSessions, spaces } from '@/lib/mock-data';

export default function GuestBookingsPage() {
  const activeBooking = bookings.find((booking) => booking.status === 'active') ?? bookings[0];
  const activeSession = checkInSessions.find((session) => session.bookingId === activeBooking.id) ?? checkInSessions[0];
  const space = spaces.find((item) => item.id === activeBooking.spaceId);

  return (
    <main className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <section className="rounded-soft bg-white p-6 shadow-neu">
        <h1 className="mb-4 text-2xl font-bold">Guest bookings</h1>
        <div className="space-y-3 rounded-2xl bg-cloud p-4 shadow-neuInset">
          <p className="text-sm text-slate-500">Current booking</p>
          <p className="text-lg font-semibold">{space?.title}</p>
          <BookingStatusPill status={activeBooking.status} />
          <p className="text-sm text-slate-600">{activeBooking.requestedSeats} seats × {activeBooking.durationMinutes} minutes</p>
          <p className="text-sm text-slate-600">Total: ${activeBooking.totalPriceUsd.toFixed(2)}</p>
        </div>
      </section>

      <section className="space-y-4">
        <CheckInCard session={activeSession} />
        <article className="rounded-soft bg-white p-5 shadow-neu">
          <h3 className="mb-2 font-semibold">Price summary</h3>
          <p className="text-sm text-slate-600">Seat reservation is priced by minute and seat.</p>
          <p className="mt-3 text-xl font-bold">${activeBooking.totalPriceUsd.toFixed(2)}</p>
        </article>
      </section>
    </main>
  );
}
