export type SpaceType =
  | "couch"
  | "desk"
  | "chair"
  | "quiet_corner"
  | "nap_spot"
  | "phone_call_corner";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "checked_in"
  | "completed"
  | "cancelled";

export interface User {
  id: string;
  name: string;
  role: "guest" | "host" | "admin";
  rating: number;
}

export interface HostProfile {
  id: string;
  userId: string;
  displayName: string;
  responseTimeMinutes: number;
  rating: number;
  totalEarningsUsd: number;
}

export interface SpaceUnit {
  id: string;
  hostId: string;
  title: string;
  description: string;
  spaceType: SpaceType;
  locationLabel: string;
  latitude?: number;
  longitude?: number;
  capacitySeats: number;
  availableSeats: number;
  pricePerMinutePerSeatUsd: number;
  minimumMinutes: number;
  maximumMinutes: number;
  rating: number;
  rules: SpaceRules;
  availability: AvailabilityWindow[];
  photos: string[];
}

export interface SpaceRules {
  quietRequired: boolean;
  wifiAvailable: boolean;
  laptopFriendly: boolean;
  smokingAllowed: boolean;
  phoneCallsAllowed: boolean;
  foodAllowed: boolean;
}

export interface AvailabilityWindow {
  id: string;
  spaceId: string;
  startTime: string;
  endTime: string;
  capacitySeats: number;
  bookedSeats: number;
}

export interface BookingRequest {
  id: string;
  guestId: string;
  hostId: string;
  spaceId: string;
  startTime: string;
  endTime: string;
  requestedSeats: number;
  durationMinutes: number;
  pricePerMinutePerSeatUsd: number;
  totalPriceUsd: number;
  status: BookingStatus;
  createdAt: string;
}

export interface CheckInSession {
  id: string;
  bookingId: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: "not_started" | "active" | "completed";
}
