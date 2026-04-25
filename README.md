# Couchify

**Private space by the minute.**

Couchify is a marketplace for booking unused private seating capacity by the minute. A space has multiple seats, and bookings reserve seats (not the full couch).

## MVP Scope

This repository now contains a fully working **Next.js + TypeScript + Tailwind** app with mock data and these routes:

- `/` landing page
- `/explore` marketplace grid + filter chips
- `/spaces/[id]` space detail + seat/minute selection + live price
- `/host` host dashboard
- `/host/spaces/new` create listing form UI
- `/guest/bookings` guest booking/check-in view
- `/profile` user profile and role toggle

## Core Booking Rule

Price is computed by seat and minute:

`total = seats × minutes × pricePerMinutePerSeatUsd`

Example:

- Capacity: 4 seats
- Price: `$0.25 / min / seat`
- Booking: `2 seats × 60 minutes`
- Total: `$30.00`

## Local Development

### 1) Install dependencies

```bash
npm install
```

### 2) Start dev server

```bash
npm run dev
```

Open http://localhost:3000.

### 3) Production build

```bash
npm run build
npm run start
```

## Environment

Copy example env:

```bash
cp .env.example .env.local
```

## Deploy to Vercel

### Option A: GitHub import (recommended)

1. Push this repo to GitHub.
2. In Vercel, click **Add New Project**.
3. Import the GitHub repository.
4. Keep default Next.js build settings.
5. Add env vars from `.env.example` if needed.
6. Deploy.

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel
vercel --prod
```

## Project Structure

- `app/` Next.js App Router pages and global styles
- `components/` UI building blocks (neumorphic cards, selectors, pills)
- `lib/` types, mock data, pricing/capacity helpers, DockOS utility
- `vercel.json` Vercel framework config

## Notes

- No backend/database is required for this MVP.
- All data is mocked in `lib/mock-data.ts`.
