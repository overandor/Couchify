import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.stubGlobal('fetch', vi.fn());

beforeEach(() => {
  vi.clearAllMocks();
});

describe('dockos-client mock fallback', async () => {
  const client = await import('../lib/dockos-client');

  it('creates a mock space draft without api url', async () => {
    const draft = await client.createSpaceDraft({
      title: 'Draft',
      description: 'Desc',
      address: 'NY',
      spaceType: 'living_room',
      capacity: 2,
      pricePerMinutePerSeatUsd: 0.25,
      amenities: ['wifi']
    });

    expect(draft.id.startsWith('mock_space_')).toBe(true);
    expect(draft.status).toBe('draft');
  });

  it('creates mock user/host/booking without api url', async () => {
    const user = await client.createUser({ name: 'A', email: 'a@x.com', role: 'host' });
    const host = await client.createHostProfile({ userId: user.id, displayName: 'A Hosting' });
    const booking = await client.createBooking({
      spaceId: 's1',
      requestedSeats: 1,
      durationMinutes: 30,
      startIso: new Date().toISOString()
    });

    expect(user.id.startsWith('mock_user_')).toBe(true);
    expect(host.id.startsWith('mock_host_')).toBe(true);
    expect(booking.id.startsWith('mock_booking_')).toBe(true);
  });
});
