'use client';

import { FormEvent, useMemo, useState } from 'react';
import { createSpaceDraft, getProviderMode } from '@/lib/data-provider';
import { CreateSpaceDraftInput, SpaceDraft } from '@/lib/dockos-client';
import { appendActionLog } from '@/lib/action-log';
import { ActionFeed } from '@/components/ActionFeed';

type FormState = {
  title: string;
  description: string;
  address: string;
  spaceType: string;
  capacity: string;
  pricePerMinutePerSeatUsd: string;
  amenities: string;
};

const initialFormState: FormState = {
  title: '',
  description: '',
  address: '',
  spaceType: 'living_room',
  capacity: '1',
  pricePerMinutePerSeatUsd: '0.25',
  amenities: 'wifi, power'
};

function validateForm(state: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};

  if (!state.title.trim()) errors.title = 'Title is required.';
  if (!state.description.trim()) errors.description = 'Description is required.';
  if (!state.address.trim()) errors.address = 'Address is required.';
  if (!state.spaceType.trim()) errors.spaceType = 'Space type is required.';

  const capacity = Number(state.capacity);
  if (!Number.isInteger(capacity) || capacity <= 0) errors.capacity = 'Capacity must be a whole number greater than 0.';

  const price = Number(state.pricePerMinutePerSeatUsd);
  if (!Number.isFinite(price) || price <= 0) errors.pricePerMinutePerSeatUsd = 'Price must be greater than 0.';

  return errors;
}

function parseInput(state: FormState): CreateSpaceDraftInput {
  return {
    title: state.title.trim(),
    description: state.description.trim(),
    address: state.address.trim(),
    spaceType: state.spaceType.trim(),
    capacity: Number(state.capacity),
    pricePerMinutePerSeatUsd: Number(state.pricePerMinutePerSeatUsd),
    amenities: state.amenities
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  };
}

export function NewSpaceForm() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [savedDraft, setSavedDraft] = useState<SpaceDraft | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const providerMode = useMemo(() => getProviderMode(), []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);
    setSavedDraft(null);

    const nextErrors = validateForm(formState);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setIsSaving(true);
    try {
      const payload = parseInput(formState);
      const draft = await createSpaceDraft(payload);
      setSavedDraft(draft);
      appendActionLog('listing_draft_created', `Listing draft created (${draft.id})`);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to save draft right now.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="glass-card space-y-4 p-6">
      <div>
        <h1 className="mb-1 text-2xl font-bold">Create a new listing</h1>
        <p className="text-sm text-slate-600">
          Save draft uses <span className="font-semibold">{providerMode}</span>.
        </p>
      </div>

      {savedDraft && (
        <div className="rounded-3xl bg-emerald-50/90 p-4 text-sm text-emerald-800 shadow-neuInset">
          Draft saved successfully. ID: <span className="font-semibold">{savedDraft.id}</span>
        </div>
      )}

      {submitError && (
        <div className="rounded-3xl bg-red-50/90 p-4 text-sm text-red-700 shadow-neuInset">{submitError}</div>
      )}

      <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
        <div>
          <input
            className="neu-input"
            placeholder="Title"
            value={formState.title}
            onChange={(event) => setFormState((current) => ({ ...current, title: event.target.value }))}
          />
          {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
        </div>

        <div>
          <input
            className="neu-input"
            placeholder="Address"
            value={formState.address}
            onChange={(event) => setFormState((current) => ({ ...current, address: event.target.value }))}
          />
          {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
        </div>

        <div>
          <input
            className="neu-input"
            placeholder="Space type"
            value={formState.spaceType}
            onChange={(event) => setFormState((current) => ({ ...current, spaceType: event.target.value }))}
          />
          {errors.spaceType && <p className="mt-1 text-xs text-red-600">{errors.spaceType}</p>}
        </div>

        <div>
          <input
            className="neu-input"
            placeholder="Capacity seats"
            type="number"
            min={1}
            value={formState.capacity}
            onChange={(event) => setFormState((current) => ({ ...current, capacity: event.target.value }))}
          />
          {errors.capacity && <p className="mt-1 text-xs text-red-600">{errors.capacity}</p>}
        </div>

        <div>
          <input
            className="neu-input"
            placeholder="Price per minute per seat"
            type="number"
            step="0.01"
            min={0.01}
            value={formState.pricePerMinutePerSeatUsd}
            onChange={(event) => setFormState((current) => ({ ...current, pricePerMinutePerSeatUsd: event.target.value }))}
          />
          {errors.pricePerMinutePerSeatUsd && <p className="mt-1 text-xs text-red-600">{errors.pricePerMinutePerSeatUsd}</p>}
        </div>

        <input
          className="neu-input"
          placeholder="Amenities (comma separated)"
          value={formState.amenities}
          onChange={(event) => setFormState((current) => ({ ...current, amenities: event.target.value }))}
        />

        <div className="md:col-span-2">
          <textarea
            className="neu-input"
            placeholder="Describe the space"
            rows={5}
            value={formState.description}
            onChange={(event) => setFormState((current) => ({ ...current, description: event.target.value }))}
          />
          {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
        </div>

        <button type="submit" disabled={isSaving} className="neu-button md:col-span-2 md:justify-self-start disabled:opacity-60">
          {isSaving ? 'Saving draft...' : 'Save draft'}
        </button>
      </form>
      <ActionFeed />
    </main>
  );
}
