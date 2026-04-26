import { BookingStatus } from '@/lib/types';

export function BookingStatusPill({ status }: { status: BookingStatus }) {
  const statusClasses: Record<BookingStatus, string> = {
    active: 'bg-mint',
    pending: 'bg-peach',
    completed: 'bg-cloud',
    cancelled: 'bg-red-100'
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize text-slateInk shadow-neu ${statusClasses[status]}`}>
      {status}
    </span>
  );
}
