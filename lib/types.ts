export type SpaceKind = 'couch' | 'desk' | 'quiet' | 'wifi' | 'phone' | 'nap';
export type BookingStatus = 'pending' | 'active' | 'completed' | 'cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'guest' | 'host';
  rating: number;
}

export interface HostProfile {
  id: string;
  userId: string;
  displayName: string;
  verified: boolean;
  totalEarningsUsd: number;
  occupancyRate: number;
}

export interface SpaceRules {
  noFood: boolean;
  quietHours: string;
  maxNoiseLevel: 'low' | 'medium';
  checkInPolicy: string;
}

export interface AvailabilityWindow {
  id: string;
  spaceId: string;
  startIso: string;
  endIso: string;
  availableSeats: number;
}

export interface SpaceUnit {
  id: string;
  hostId: string;
  title: string;
  description: string;
  locationLabel: string;
  kind: SpaceKind;
  amenities: string[];
  capacitySeats: number;
  bookedSeats: number;
  availableSeats: number;
  pricePerMinutePerSeatUsd: number;
  rules: SpaceRules;
  timeline: AvailabilityWindow[];
}

export interface BookingRequest {
  id: string;
  userId: string;
  spaceId: string;
  status: BookingStatus;
  requestedSeats: number;
  durationMinutes: number;
  startIso: string;
  endIso: string;
  totalPriceUsd: number;
}

export interface CheckInSession {
  id: string;
  bookingId: string;
  startedAtIso: string;
  endedAtIso?: string;
  checkedIn: boolean;
}
