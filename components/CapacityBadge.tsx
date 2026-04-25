interface CapacityBadgeProps {
  capacitySeats: number;
  availableSeats: number;
}

export function CapacityBadge({ capacitySeats, availableSeats }: CapacityBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-cloud px-3 py-1 text-sm text-slateInk shadow-neuInset">
      <span>Seats {availableSeats}/{capacitySeats}</span>
    </div>
  );
}
