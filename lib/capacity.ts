export function canBookSeats(
  capacitySeats: number,
  alreadyBookedSeats: number,
  requestedSeats: number
): boolean {
  return alreadyBookedSeats + requestedSeats <= capacitySeats;
}

export function getOccupancyPercent(
  capacitySeats: number,
  bookedSeats: number
): number {
  if (capacitySeats === 0) return 0;
  return Math.round((bookedSeats / capacitySeats) * 100);
}
