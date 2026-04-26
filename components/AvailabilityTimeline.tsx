import { AvailabilityWindow } from '@/lib/types';

export function AvailabilityTimeline({ timeline }: { timeline: AvailabilityWindow[] }) {
  return (
    <div className="rounded-soft bg-white p-4 shadow-neu">
      <h3 className="mb-3 text-sm font-semibold text-slateInk">Availability timeline</h3>
      <div className="space-y-3">
        {timeline.map((window) => (
          <div key={window.id} className="rounded-2xl bg-cloud p-3 shadow-neuInset">
            <p className="text-sm text-slateInk">
              {new Date(window.startIso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
              {new Date(window.endIso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-xs text-slate-500">{window.availableSeats} seats available</p>
          </div>
        ))}
      </div>
    </div>
  );
}
