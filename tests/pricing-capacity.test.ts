import { describe, expect, it } from 'vitest';
import { calculateBookingPrice } from '../lib/pricing';
import { canBookSeats } from '../lib/capacity';

describe('booking helpers', () => {
  it('calculates booking price by seats x minutes x rate', () => {
    expect(calculateBookingPrice(2, 60, 0.25)).toBe(30);
  });

  it('returns false for invalid seat requests', () => {
    expect(canBookSeats(4, 1, 0)).toBe(false);
    expect(canBookSeats(4, 4, 1)).toBe(false);
  });

  it('returns true when requested seats are available', () => {
    expect(canBookSeats(4, 1, 2)).toBe(true);
  });
});
