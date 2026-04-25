import { calculateBookingPrice } from '@/lib/pricing';
import { BookingRequest, CheckInSession, HostProfile, SpaceUnit, User } from '@/lib/types';

export const users: User[] = [
  { id: 'u1', name: 'Maya Chen', email: 'maya@couchify.app', avatarUrl: '🛋️', role: 'host', rating: 4.9 },
  { id: 'u2', name: 'Jordan Lee', email: 'jordan@couchify.app', avatarUrl: '📚', role: 'host', rating: 4.8 },
  { id: 'u3', name: 'Priya Singh', email: 'priya@couchify.app', avatarUrl: '☕', role: 'host', rating: 4.7 },
  { id: 'u4', name: 'Noah Rivera', email: 'noah@couchify.app', avatarUrl: '🎧', role: 'guest', rating: 4.6 },
  { id: 'u5', name: 'Ava Martinez', email: 'ava@couchify.app', avatarUrl: '💻', role: 'guest', rating: 4.9 }
];

export const hostProfiles: HostProfile[] = [
  { id: 'h1', userId: 'u1', displayName: 'Maya Downtown Spaces', verified: true, totalEarningsUsd: 2140, occupancyRate: 73 },
  { id: 'h2', userId: 'u2', displayName: 'Jordan Quiet Corners', verified: true, totalEarningsUsd: 1760, occupancyRate: 66 },
  { id: 'h3', userId: 'u3', displayName: 'Priya Work Nooks', verified: true, totalEarningsUsd: 1985, occupancyRate: 69 },
  { id: 'h4', userId: 'u4', displayName: 'Noah Midtown Pods', verified: false, totalEarningsUsd: 920, occupancyRate: 42 },
  { id: 'h5', userId: 'u5', displayName: 'Ava Gramercy Lounge', verified: true, totalEarningsUsd: 2455, occupancyRate: 78 }
];

const baseRules = {
  noFood: false,
  quietHours: '9:00 PM - 7:00 AM',
  maxNoiseLevel: 'low' as const,
  checkInPolicy: 'Self check-in with QR badge'
};

export const spaces: SpaceUnit[] = [
  {
    id: 's1',
    hostId: 'h1',
    title: 'L-shaped couch in Brooklyn',
    description: 'Sunny corner in a loft with power outlets and strong WiFi.',
    locationLabel: 'Brooklyn, NY',
    kind: 'couch',
    amenities: ['WiFi', 'Outlets', 'Natural light'],
    capacitySeats: 4,
    bookedSeats: 1,
    availableSeats: 3,
    pricePerMinutePerSeatUsd: 0.25,
    rules: baseRules,
    timeline: [
      { id: 't1', spaceId: 's1', startIso: '2026-04-25T12:00:00Z', endIso: '2026-04-25T13:00:00Z', availableSeats: 3 },
      { id: 't2', spaceId: 's1', startIso: '2026-04-25T13:00:00Z', endIso: '2026-04-25T14:00:00Z', availableSeats: 2 },
      { id: 't3', spaceId: 's1', startIso: '2026-04-25T14:00:00Z', endIso: '2026-04-25T15:00:00Z', availableSeats: 4 }
    ]
  },
  {
    id: 's2',
    hostId: 'h1',
    title: 'Quiet couch near Union Square',
    description: 'Minimalist room for reading and deep focus.',
    locationLabel: 'Union Square, NY',
    kind: 'quiet',
    amenities: ['Quiet', 'Tea', 'Lamp'],
    capacitySeats: 2,
    bookedSeats: 0,
    availableSeats: 2,
    pricePerMinutePerSeatUsd: 0.3,
    rules: { ...baseRules, noFood: true },
    timeline: [
      { id: 't4', spaceId: 's2', startIso: '2026-04-25T12:00:00Z', endIso: '2026-04-25T13:30:00Z', availableSeats: 2 },
      { id: 't5', spaceId: 's2', startIso: '2026-04-25T13:30:00Z', endIso: '2026-04-25T15:00:00Z', availableSeats: 1 }
    ]
  },
  {
    id: 's3',
    hostId: 'h2',
    title: 'Desk seat in SoHo',
    description: 'Ergonomic desk seat with monitor and charging dock.',
    locationLabel: 'SoHo, NY',
    kind: 'desk',
    amenities: ['Desk', 'Monitor', 'WiFi'],
    capacitySeats: 1,
    bookedSeats: 0,
    availableSeats: 1,
    pricePerMinutePerSeatUsd: 0.35,
    rules: baseRules,
    timeline: [
      { id: 't6', spaceId: 's3', startIso: '2026-04-25T12:00:00Z', endIso: '2026-04-25T16:00:00Z', availableSeats: 1 }
    ]
  },
  {
    id: 's4',
    hostId: 'h2',
    title: 'Phone-call corner near Midtown',
    description: 'Acoustic corner with privacy divider for calls.',
    locationLabel: 'Midtown, NY',
    kind: 'phone',
    amenities: ['Acoustic panel', 'Chair', 'USB-C'],
    capacitySeats: 2,
    bookedSeats: 1,
    availableSeats: 1,
    pricePerMinutePerSeatUsd: 0.22,
    rules: baseRules,
    timeline: [
      { id: 't7', spaceId: 's4', startIso: '2026-04-25T12:00:00Z', endIso: '2026-04-25T14:00:00Z', availableSeats: 1 },
      { id: 't8', spaceId: 's4', startIso: '2026-04-25T14:00:00Z', endIso: '2026-04-25T16:00:00Z', availableSeats: 2 }
    ]
  },
  {
    id: 's5',
    hostId: 'h3',
    title: 'Nap seat near Grand Central',
    description: 'Reclining seat with blanket and white-noise machine.',
    locationLabel: 'Grand Central, NY',
    kind: 'nap',
    amenities: ['Blanket', 'White noise', 'Mask'],
    capacitySeats: 2,
    bookedSeats: 1,
    availableSeats: 1,
    pricePerMinutePerSeatUsd: 0.28,
    rules: { ...baseRules, checkInPolicy: 'Host greeting in lobby' },
    timeline: [
      { id: 't9', spaceId: 's5', startIso: '2026-04-25T12:00:00Z', endIso: '2026-04-25T13:00:00Z', availableSeats: 1 },
      { id: 't10', spaceId: 's5', startIso: '2026-04-25T13:00:00Z', endIso: '2026-04-25T15:00:00Z', availableSeats: 2 }
    ]
  },
  {
    id: 's6', hostId: 'h3', title: 'Window couch in Chelsea', description: 'Lounge couch with city-view window.', locationLabel: 'Chelsea, NY', kind: 'couch', amenities: ['View', 'WiFi'], capacitySeats: 3, bookedSeats: 2, availableSeats: 1, pricePerMinutePerSeatUsd: 0.24, rules: baseRules, timeline: [{ id: 't11', spaceId: 's6', startIso: '2026-04-25T12:00:00Z', endIso: '2026-04-25T15:00:00Z', availableSeats: 1 }]
  },
  {
    id: 's7', hostId: 'h4', title: 'Quiet pod in Flatiron', description: 'Compact focus seat for fast sprints.', locationLabel: 'Flatiron, NY', kind: 'quiet', amenities: ['Focus light', 'Desk'], capacitySeats: 1, bookedSeats: 0, availableSeats: 1, pricePerMinutePerSeatUsd: 0.27, rules: baseRules, timeline: [{ id: 't12', spaceId: 's7', startIso: '2026-04-25T12:00:00Z', endIso: '2026-04-25T15:00:00Z', availableSeats: 1 }]
  },
  {
    id: 's8', hostId: 'h4', title: 'WiFi couch near Bryant Park', description: 'High-speed internet and soft bench seating.', locationLabel: 'Bryant Park, NY', kind: 'wifi', amenities: ['1Gbps WiFi', 'Coffee'], capacitySeats: 4, bookedSeats: 1, availableSeats: 3, pricePerMinutePerSeatUsd: 0.26, rules: baseRules, timeline: [{ id: 't13', spaceId: 's8', startIso: '2026-04-25T12:00:00Z', endIso: '2026-04-25T15:00:00Z', availableSeats: 3 }]
  },
  {
    id: 's9', hostId: 'h5', title: 'Couch nook in Tribeca', description: 'Premium couch nook for collaborations.', locationLabel: 'Tribeca, NY', kind: 'couch', amenities: ['Snacks', 'WiFi', 'Whiteboard'], capacitySeats: 5, bookedSeats: 3, availableSeats: 2, pricePerMinutePerSeatUsd: 0.33, rules: baseRules, timeline: [{ id: 't14', spaceId: 's9', startIso: '2026-04-25T12:00:00Z', endIso: '2026-04-25T16:00:00Z', availableSeats: 2 }]
  },
  {
    id: 's10', hostId: 'h5', title: 'Desk-and-couch combo in NoMad', description: 'Switch between desk seat and couch seat.', locationLabel: 'NoMad, NY', kind: 'desk', amenities: ['Desk', 'Couch', 'Fast WiFi'], capacitySeats: 3, bookedSeats: 1, availableSeats: 2, pricePerMinutePerSeatUsd: 0.29, rules: baseRules, timeline: [{ id: 't15', spaceId: 's10', startIso: '2026-04-25T12:00:00Z', endIso: '2026-04-25T15:00:00Z', availableSeats: 2 }]
  }
];

export const bookings: BookingRequest[] = [
  {
    id: 'b1',
    userId: 'u4',
    spaceId: 's1',
    status: 'active',
    requestedSeats: 2,
    durationMinutes: 60,
    startIso: '2026-04-25T12:15:00Z',
    endIso: '2026-04-25T13:15:00Z',
    totalPriceUsd: calculateBookingPrice(2, 60, 0.25)
  },
  {
    id: 'b2',
    userId: 'u5',
    spaceId: 's3',
    status: 'pending',
    requestedSeats: 1,
    durationMinutes: 45,
    startIso: '2026-04-25T14:00:00Z',
    endIso: '2026-04-25T14:45:00Z',
    totalPriceUsd: calculateBookingPrice(1, 45, 0.35)
  },
  {
    id: 'b3',
    userId: 'u4',
    spaceId: 's5',
    status: 'completed',
    requestedSeats: 1,
    durationMinutes: 30,
    startIso: '2026-04-24T16:00:00Z',
    endIso: '2026-04-24T16:30:00Z',
    totalPriceUsd: calculateBookingPrice(1, 30, 0.28)
  }
];

export const checkInSessions: CheckInSession[] = [
  {
    id: 'c1',
    bookingId: 'b1',
    startedAtIso: '2026-04-25T12:16:00Z',
    checkedIn: true
  },
  {
    id: 'c2',
    bookingId: 'b3',
    startedAtIso: '2026-04-24T16:00:00Z',
    endedAtIso: '2026-04-24T16:29:00Z',
    checkedIn: true
  }
];

export const currentUser = users[3];
