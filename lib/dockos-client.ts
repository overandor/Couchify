const API_URL = process.env.NEXT_PUBLIC_DOCKOS_API_URL;

export type CreateSpaceDraftInput = {
  title: string;
  description: string;
  address: string;
  spaceType: string;
  capacity: number;
  pricePerMinutePerSeatUsd: number;
  amenities: string[];
};

export type SpaceDraft = CreateSpaceDraftInput & {
  id: string;
  status: 'draft';
};

export type CreateUserInput = {
  name: string;
  email: string;
  role: 'guest' | 'host';
};

export type UserRecord = CreateUserInput & {
  id: string;
};

export type CreateHostProfileInput = {
  userId: string;
  displayName: string;
};

export type HostProfileRecord = CreateHostProfileInput & {
  id: string;
  status: 'active';
};

export type CreateBookingInput = {
  spaceId: string;
  requestedSeats: number;
  durationMinutes: number;
  startIso: string;
};

export type BookingRecord = CreateBookingInput & {
  id: string;
  status: 'pending' | 'active';
};

export function hasDockOsApiUrl() {
  return Boolean(API_URL);
}

async function postToDockOs<TBody, TResponse>(path: string, body: TBody, fallback: () => TResponse): Promise<TResponse> {
  if (!API_URL) return fallback();

  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`DockOS request failed (${response.status})`);
  }

  return response.json();
}

export async function createSpaceDraft(input: CreateSpaceDraftInput): Promise<SpaceDraft> {
  return postToDockOs('/v1/spaces/drafts', input, () => ({
    id: `mock_space_${Date.now()}`,
    status: 'draft',
    ...input
  }));
}

export async function createUser(input: CreateUserInput): Promise<UserRecord> {
  return postToDockOs('/v1/users', input, () => ({
    id: `mock_user_${Date.now()}`,
    ...input
  }));
}

export async function createHostProfile(input: CreateHostProfileInput): Promise<HostProfileRecord> {
  return postToDockOs('/v1/hosts/profiles', input, () => ({
    id: `mock_host_${Date.now()}`,
    status: 'active',
    ...input
  }));
}

export async function createBooking(input: CreateBookingInput): Promise<BookingRecord> {
  return postToDockOs('/v1/bookings/requests', input, () => ({
    id: `mock_booking_${Date.now()}`,
    status: 'pending',
    ...input
  }));
}
