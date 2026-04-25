export function canBookSeats(capacitySeats: number, bookedSeats: number, requestedSeats: number): boolean {
  if (requestedSeats <= 0) return false;
  const availableSeats = capacitySeats - bookedSeats;
  return requestedSeats <= availableSeats;
}
