import { calculateBookingPrice } from '@/lib/pricing';

export interface DockOsQuoteInput {
  seats: number;
  minutes: number;
  pricePerMinutePerSeatUsd: number;
}

export function createDockOsQuote(input: DockOsQuoteInput) {
  return {
    seats: input.seats,
    minutes: input.minutes,
    pricePerMinutePerSeatUsd: input.pricePerMinutePerSeatUsd,
    totalPriceUsd: calculateBookingPrice(input.seats, input.minutes, input.pricePerMinutePerSeatUsd),
    generatedAtIso: new Date().toISOString()
  };
}
