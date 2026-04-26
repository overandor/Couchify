'use client';

import { useMemo } from 'react';
import { readActionLogs } from '@/lib/action-log';

export function ActionFeed() {
  const actions = useMemo(() => readActionLogs(), []);

  if (actions.length === 0) {
    return (
      <section className="glass-card p-4">
        <h3 className="mb-2 text-sm font-semibold">Recent actions</h3>
        <p className="text-xs text-slate-600">No actions yet. Create a user, host, listing draft, or booking.</p>
      </section>
    );
  }

  return (
    <section className="glass-card p-4">
      <h3 className="mb-2 text-sm font-semibold">Recent actions</h3>
      <ul className="space-y-2">
        {actions.slice(0, 5).map((action) => (
          <li key={action.id} className="rounded-2xl bg-nightCloud/70 p-2 text-xs shadow-neuInset">
            <p className="font-medium text-slateInk">{action.message}</p>
            <p className="text-slate-500">{new Date(action.createdAtIso).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
