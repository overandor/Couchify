interface HostStatsCardProps {
  label: string;
  value: string;
}

export function HostStatsCard({ label, value }: HostStatsCardProps) {
  return (
    <article className="rounded-soft bg-white p-5 shadow-neu">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slateInk">{value}</p>
    </article>
  );
}
