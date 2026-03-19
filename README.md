# Cure Track

> A clinic operations dashboard for care teams — patients, visits, and follow-ups in one place.

Cure Track is a single-page dashboard that gives clinicians a fast, high-level view of their clinic's day: patient records, today's visits, follow-ups due, and operational insights.

![Status](https://img.shields.io/badge/status-frontend%20prototype-amber)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/-Tailwind-06B6D4?logo=tailwindcss&logoColor=white)

## Overview

Care teams juggle patient records, visit logs, and follow-up schedules across disconnected tools. Cure Track brings them into one clean interface with a dashboard-first layout, so the most important things — who's waiting, what's due, and where the clinic is busy — are visible at a glance.

> **Scope:** This is a front-end prototype. Data is currently rendered from typed, in-memory fixtures; persistence, auth, and the clinical backend are planned next (see [Roadmap](#roadmap)).

## Features

- **Clinic dashboard** — KPI cards (total patients, today's visits, average consultation time), recent-patient activity table, and a clinical-efficiency insight panel.
- **Patient management** — searchable, filterable patient directory with status badges and pagination.
- **Visit tracking** — structured view of scheduled and completed visits.
- **Follow-ups** — due-follow-up queue with per-item actions.
- **Responsive layout** — mobile-friendly app shell with a collapsible navigation sidebar.

## Tech stack

| Layer        | Choice                                             |
| ------------ | -------------------------------------------------- |
| Framework    | [TanStack Start](https://tanstack.com/start) + React 19 |
| Routing      | TanStack Router (file-based, code-split)           |
| Data layer   | TanStack Query                                     |
| Styling      | Tailwind CSS v4 + design tokens                    |
| UI primitives| Radix UI via shadcn/ui, `lucide-react`             |
| Forms        | react-hook-form + Zod validation                    |
| Charts       | Recharts                                           |
| Language     | TypeScript (strict)                                |
| Tooling      | Vite, Bun, ESLint, Prettier                        |
| Hosting      | Cloudflare Workers (`wrangler`)                    |

## Architecture

File-based routes under `src/routes` map directly to URLs. A shared `AppLayout` provides the shell (sidebar + topbar). UI primitives live in `src/components/ui`; feature components sit alongside their routes. Static fixtures in each route module simulate the API responses that the backend will replace.

```
src/
├─ routes/         # file-based routes (index, patients, visit, follow-ups, __root)
├─ components/     # AppLayout + shadcn/ui primitives
├─ lib/            # utilities (cn, formatters)
├─ hooks/          # shared hooks
└─ router.tsx      # TanStack Router bootstrap
```

## Getting started

```bash
# install deps
bun install

# run the dev server
bun dev

# type-check + lint
bun run lint

# production build
bun run build
```

## Deployment

The app builds to a Cloudflare Workers bundle via `@cloudflare/vite-plugin` and `wrangler.jsonc`:

```bash
bun run build
npx wrangler deploy
```

## Roadmap

- [ ] Wire a real backend (patients/visits/follow-ups APIs) behind TanStack Query
- [ ] Authentication + clinic-scoped roles
- [ ] Zod-validated data contracts shared with the server
- [ ] Persisted state and audit history

## License

MIT © [Jahanzaib Iftikhar](https://github.com/jahanzaib0013-a11y)
