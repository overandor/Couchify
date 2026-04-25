'use client';

interface SeatSelectorProps {
  value: number;
  max: number;
  onChange: (value: number) => void;
}

export function SeatSelector({ value, max, onChange }: SeatSelectorProps) {
  return (
    <div className="rounded-soft bg-white p-4 shadow-neu">
      <p className="mb-3 text-sm font-medium text-slateInk">Choose seats</p>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: max }, (_, i) => i + 1).map((seatCount) => (
          <button
            key={seatCount}
            type="button"
            onClick={() => onChange(seatCount)}
            className={`rounded-full px-3 py-2 text-sm shadow-neu ${
              value === seatCount ? 'bg-mint text-slateInk' : 'bg-cloud text-slate-600'
            }`}
          >
            {seatCount} seat{seatCount > 1 ? 's' : ''}
          </button>
        ))}
      </div>
    </div>
  );
}
