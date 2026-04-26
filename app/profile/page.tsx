'use client';

import { FormEvent, useState } from 'react';
import { createHostProfile, createUser } from '@/lib/data-provider';
import { appendActionLog } from '@/lib/action-log';
import { ActionFeed } from '@/components/ActionFeed';
import { currentUser, hostProfiles } from '@/lib/mock-data';

export default function ProfilePage() {
  const hostProfile = hostProfiles.find((host) => host.userId === currentUser.id);

  const [userName, setUserName] = useState(currentUser.name);
  const [userEmail, setUserEmail] = useState(currentUser.email);
  const [newUserId, setNewUserId] = useState<string | null>(null);
  const [newHostId, setNewHostId] = useState<string | null>(null);
  const [busy, setBusy] = useState<'user' | 'host' | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleCreateUser(event: FormEvent) {
    event.preventDefault();
    setBusy('user');
    setError(null);
    try {
      const user = await createUser({ name: userName, email: userEmail, role: 'host' });
      setNewUserId(user.id);
      appendActionLog('user_created', `User created (${user.id})`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user.');
    } finally {
      setBusy(null);
    }
  }

  async function handleCreateHost() {
    setBusy('host');
    setError(null);
    try {
      const sourceUserId = newUserId ?? currentUser.id;
      const host = await createHostProfile({ userId: sourceUserId, displayName: `${userName} Hosting` });
      setNewHostId(host.id);
      appendActionLog('host_created', `Host profile created (${host.id})`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create host profile.');
    } finally {
      setBusy(null);
    }
  }

  return (
    <main className="space-y-6">
      <section className="glass-card p-6">
        <h1 className="mb-4 text-2xl font-bold">Profile</h1>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-nightCloud text-3xl shadow-neuInset">{currentUser.avatarUrl}</div>
          <div>
            <p className="text-lg font-semibold">{currentUser.name}</p>
            <p className="text-sm text-slate-600">{currentUser.email}</p>
            <p className="text-sm text-slate-700">Rating: {currentUser.rating.toFixed(1)} ⭐</p>
          </div>
        </div>
      </section>

      <section className="glass-card p-6">
        <h2 className="mb-3 text-lg font-semibold">Create user (functional)</h2>
        <form className="grid gap-3 md:grid-cols-2" onSubmit={handleCreateUser}>
          <input className="neu-input" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Name" />
          <input className="neu-input" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="Email" type="email" />
          <button className="neu-button md:col-span-2 md:justify-self-start" type="submit" disabled={busy === 'user'}>
            {busy === 'user' ? 'Creating user...' : 'Create user'}
          </button>
        </form>
        {newUserId && <p className="mt-3 text-sm text-emerald-700">Created user id: {newUserId}</p>}
      </section>

      <section className="glass-card p-6">
        <h2 className="mb-3 text-lg font-semibold">Create host profile (functional)</h2>
        <div className="flex gap-3">
          <button className="neu-button" type="button" onClick={handleCreateHost} disabled={busy === 'host'}>
            {busy === 'host' ? 'Creating host...' : 'Create host'}
          </button>
        </div>
        <p className="mt-2 text-sm text-slate-700">Existing host: {hostProfile ? hostProfile.displayName : 'None'}</p>
        {newHostId && <p className="mt-2 text-sm text-emerald-700">Created host id: {newHostId}</p>}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </section>

      <ActionFeed />
    </main>
  );
}
