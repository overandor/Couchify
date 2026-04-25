import { currentUser, hostProfiles } from '@/lib/mock-data';

export default function ProfilePage() {
  const hostProfile = hostProfiles.find((host) => host.userId === currentUser.id);

  return (
    <main className="space-y-6">
      <section className="rounded-soft bg-white p-6 shadow-neu">
        <h1 className="mb-4 text-2xl font-bold">Profile</h1>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cloud text-3xl shadow-neuInset">{currentUser.avatarUrl}</div>
          <div>
            <p className="text-lg font-semibold">{currentUser.name}</p>
            <p className="text-sm text-slate-500">{currentUser.email}</p>
            <p className="text-sm text-slate-600">Rating: {currentUser.rating.toFixed(1)} ⭐</p>
          </div>
        </div>
      </section>

      <section className="rounded-soft bg-white p-6 shadow-neu">
        <h2 className="mb-3 text-lg font-semibold">Mode</h2>
        <div className="flex gap-3">
          <button className="rounded-full bg-mint px-4 py-2 text-sm font-medium shadow-neu" type="button">Guest</button>
          <button className="rounded-full bg-cloud px-4 py-2 text-sm font-medium shadow-neu" type="button">Host</button>
        </div>
        {hostProfile ? (
          <p className="mt-3 text-sm text-slate-600">Host dashboard: {hostProfile.displayName}</p>
        ) : (
          <p className="mt-3 text-sm text-slate-600">Create a host profile to list your couch capacity.</p>
        )}
      </section>
    </main>
  );
}
