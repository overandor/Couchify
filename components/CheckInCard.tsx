import { CheckInSession } from '@/lib/types';

export function CheckInCard({ session }: { session: CheckInSession }) {
  return (
    <article className="rounded-soft bg-white p-5 shadow-neu">
      <h3 className="mb-3 text-sm font-semibold text-slateInk">Session status</h3>
      <p className="text-sm text-slate-600">Started: {new Date(session.startedAtIso).toLocaleString()}</p>
      <p className="text-sm text-slate-600">Checked in: {session.checkedIn ? 'Yes' : 'No'}</p>
      <div className="mt-4 flex gap-3">
        <button type="button" className="rounded-full bg-white px-4 py-2 text-sm shadow-neu">Check-in</button>
        <button type="button" className="rounded-full bg-white px-4 py-2 text-sm shadow-neu">Check-out</button>
      </div>
    </article>
  );
}
