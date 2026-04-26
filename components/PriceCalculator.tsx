interface PriceCalculatorProps {
  seats: number;
  minutes: number;
  pricePerMinutePerSeatUsd: number;
  totalPriceUsd: number;
}

export function PriceCalculator({ seats, minutes, pricePerMinutePerSeatUsd, totalPriceUsd }: PriceCalculatorProps) {
  return (
    <div className="rounded-soft bg-white p-5 shadow-neu">
      <h3 className="mb-3 text-sm font-semibold text-slateInk">Live price</h3>
      <ul className="mb-4 space-y-1 text-sm text-slate-600">
        <li>{seats} seats</li>
        <li>{minutes} minutes</li>
        <li>${pricePerMinutePerSeatUsd.toFixed(2)}/min/seat</li>
      </ul>
      <p className="text-2xl font-bold text-slateInk">${totalPriceUsd.toFixed(2)}</p>
    </div>
  );
}
