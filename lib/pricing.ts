export function calculateBookingPrice(
  seats: number,
  minutes: number,
  pricePerMinutePerSeatUsd: number
): number {
  return seats * minutes * pricePerMinutePerSeatUsd;
}

export function formatPrice(usd: number): string {
  return `$${usd.toFixed(2)}`;
}

export function formatPricePerMinute(pricePerMinutePerSeatUsd: number): string {
  return `$${pricePerMinutePerSeatUsd.toFixed(2)}/min/seat`;
}
