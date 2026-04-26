export function calculateBookingPrice(seats: number, minutes: number, pricePerMinutePerSeatUsd: number): number {
  return Number((seats * minutes * pricePerMinutePerSeatUsd).toFixed(2));
}
