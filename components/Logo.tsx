import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2 rounded-soft bg-white px-4 py-3 text-slateInk shadow-neu">
      <span className="text-xl">🛋️</span>
      <span className="text-lg font-semibold tracking-tight">Couchify</span>
    </Link>
  );
}
