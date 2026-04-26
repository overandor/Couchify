import {
  createBooking as createBookingViaDockOs,
  createHostProfile as createHostProfileViaDockOs,
  createSpaceDraft as createSpaceDraftViaDockOs,
  createUser as createUserViaDockOs,
  hasDockOsApiUrl,
  type BookingRecord,
  type CreateBookingInput,
  type CreateHostProfileInput,
  type CreateSpaceDraftInput,
  type CreateUserInput,
  type HostProfileRecord,
  type SpaceDraft,
  type UserRecord
} from '@/lib/dockos-client';

export type ProviderMode = 'mockProvider' | 'dockosProvider';

export function getProviderMode(): ProviderMode {
  return hasDockOsApiUrl() ? 'dockosProvider' : 'mockProvider';
}

export async function createSpaceDraft(input: CreateSpaceDraftInput): Promise<SpaceDraft> {
  return createSpaceDraftViaDockOs(input);
}

export async function createUser(input: CreateUserInput): Promise<UserRecord> {
  return createUserViaDockOs(input);
}

export async function createHostProfile(input: CreateHostProfileInput): Promise<HostProfileRecord> {
  return createHostProfileViaDockOs(input);
}

export async function createBooking(input: CreateBookingInput): Promise<BookingRecord> {
  return createBookingViaDockOs(input);
}
