# Reson8 · ORA Elections — UI

Next.js + React + Tailwind + shadcn/ui front-end for the Reson8 **ORA (Elections)** module.
All data is **mock data** — this is a UI verification build, no backend.

## Stack
- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** · **shadcn/ui** (Base UI primitives)
- **RTL + Arabic** support built in (toggle in the top bar)

## Run

```bash
cd web
npm install
npm run dev      # http://localhost:3000  → redirects to /ora/setup
npm run build    # production build
```

## Status — approved roadmap

See [`../docs/roadmap/ORA_Elections_Approved_Roadmap.md`](../docs/roadmap/ORA_Elections_Approved_Roadmap.md).

| Feature | State |
| --- | --- |
| **Country Setup / Configuration** (elections, parties, candidates, constituencies + wizard) | ✅ Built |
| Calendar, Interactive Map, Entity Profiles, Breaking News, Coalition, Achievements, Election Prep, AI Prediction, Broadcast, Programs, Take to Air, Control Room, Integrations | ⏳ Placeholder (in nav, marked "Soon") |
| Translation (RTL + Arabic) · Latency badge (≤3s) | ✅ Cross-cutting, in shell |

## Structure
```
src/
  app/
    layout.tsx              root layout + i18n provider
    page.tsx                → redirects to /ora/setup
    ora/
      layout.tsx            module shell (sidebar + topbar)
      setup/
        page.tsx            Country Setup (4 config tabs)
        election-wizard.tsx New-election dialog
  components/
    layout/                 sidebar, topbar
    status-badge.tsx
    ui/                     shadcn components
  lib/
    types.ts                election data model
    mock-data.ts            mock countries / parties / candidates / elections
    nav.ts                  ORA feature navigation (roadmap)
    i18n.tsx                EN/AR + RTL provider
```
