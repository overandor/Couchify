'use client';

interface MinuteBookingSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const minuteOptions = [15, 30, 45, 60, 90, 120];

export function MinuteBookingSelector({ value, onChange }: MinuteBookingSelectorProps) {
  return (
    <div className="rounded-soft bg-white p-4 shadow-neu">
      <p className="mb-3 text-sm font-medium text-slateInk">Duration (minutes)</p>
      <div className="flex flex-wrap gap-2">
        {minuteOptions.map((minutes) => (
          <button
            key={minutes}
            type="button"
            onClick={() => onChange(minutes)}
            className={`rounded-full px-3 py-2 text-sm shadow-neu ${
              value === minutes ? 'bg-peach text-slateInk' : 'bg-cloud text-slate-600'
            }`}
          >
            {minutes}m
          </button>
        ))}
      </div>
    </div>
  );
}
