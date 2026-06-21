# Architecture — Reson8 ORA Elections

Phase 1 is a **UI-only Next.js app on mock data**, no backend. This file makes the structure
mechanically legible so agents take the correct path, not the shortest one.

## The app lives in `web/`

A Next.js 16 + React 19 + Tailwind 4 app. Components are built on **Base UI** (`@base-ui/react`),
not Radix. The repo root holds product docs (`docs/`, `pdf/`); the app is entirely under `web/`.

> Next 16 has breaking changes vs. older Next. Read `web/AGENTS.md` and
> `web/node_modules/next/dist/docs/` before writing Next code.

```text
web/
  AGENTS.md                  # Next 16 specifics — read before touching app code
  package.json               # scripts: dev / build / start / lint
  src/
    app/                     # Next App Router
      layout.tsx             # root layout — wraps everything in <I18nProvider>
      page.tsx               # landing
      ora/                   # the ORA module (one folder per roadmap area)
        layout.tsx           # Sidebar + Topbar shell for all ORA screens
        setup/               # Country Setup (roadmap #1) — SHIPPED
          page.tsx           #   Elections/Parties/Coalitions/Candidates/Constituencies tabs
          election-wizard.tsx#   Election Configuration Wizard (O1)
        <next features>/     # map/, calendar/, ... added here as they are built
    components/
      layout/                # sidebar.tsx, topbar.tsx (app chrome)
      ui/                    # Base UI primitives: button, card, dialog, select, table, tabs, ...
      status-badge.tsx       # shared domain widget
    lib/                     # the data + cross-cutting layer (see below)
      types.ts               # the election data model (interfaces only)
      mock-data.ts           # the SINGLE SOURCE of all election data + lookup helpers
      nav.ts                 # ORA feature nav (mirrors the roadmap; ready vs. soon)
      i18n.tsx               # I18nProvider, useI18n, EN/AR dictionary, dir (ltr/rtl)
      utils.ts               # cn() etc.
```

## Where the data model and mock data live (`src/lib/`)

- **`src/lib/types.ts`** — the entity model: `Country`, `Election`, `ElectoralSystem`, `Round`,
  `Constituency`, `Party`, `Coalition`, `Candidate`, `Candidacy`, `Result`, `HistoricalResult`,
  plus the enums (`ElectionType`, `ElectoralFamily`, `ElectoralFormula`, …). Interfaces only — no
  data, no logic. This implements `docs/specs/ORA_Country_Setup_SpecLite.md` §2.
- **`src/lib/mock-data.ts`** — the **single source of truth** for all election data: typed arrays
  (`countries`, `elections`, `parties`, `coalitions`, `candidates`, `candidacies`, `results`,
  `historicalResults`, `constituencies`) plus lookup helpers (`partyById`, `electionsByCountry`,
  `candidaciesByElection`, `resultsByElection`, `coalitionsByCountry`, `historicalByElection`, …).
  Everything every screen renders is derived from here. There is **no network/backend call** in
  Phase 1.
- When the model changes, edit `types.ts` and `mock-data.ts` as **one atomic change** (the spec
  re-homes fields onto `Candidacy`; partial edits break consumers).

## i18n / RTL approach

- `src/lib/i18n.tsx` provides `I18nProvider` (mounted once in `app/layout.tsx`) and the `useI18n()`
  hook returning `{ lang, dir, t, toggle }`. `lang` is `"en" | "ar"`; `dir` is `"ltr" | "rtl"`.
- The provider sets `document.documentElement.lang` and `dir` on language change, so RTL flips the
  whole layout. Components localize copy via `t("key")` against the EN/AR `DICT`, and pick entity
  names with the `nameAr` field (a common pattern is a local `L(en, ar)` helper, as in
  `setup/page.tsx`).
- **Parity rule:** every entity in `types.ts`/`mock-data.ts` carries `nameAr`; every user-facing
  string has an `ar` entry in the dictionary. A screen is not done until it renders correctly in
  both EN (LTR) and AR (RTL). This is the cross-cutting "Translation (RTL + Arabic)" roadmap item.

## Feature-module structure under `src/app/ora/`

- Each roadmap area is a folder under `app/ora/` (e.g. `setup/`). The **only built feature** is
  `setup/` (Country Setup, roadmap #1). The rest are listed in `src/lib/nav.ts` with
  `status: "soon"` until built — new features are added as sibling folders.
- `app/ora/layout.tsx` provides the shared chrome (Sidebar + Topbar) for every ORA screen; the
  sidebar is driven by `nav.ts`, so adding a feature = add its folder + flip its nav entry to
  `"ready"`.

## Allowed dependency directions

```text
app/ (pages, feature modules)
   └─> components/  (layout + ui)
   └─> lib/         (types, mock-data, i18n, nav, utils)

components/
   └─> lib/         (types, i18n, utils)        # ui primitives may use cn()/i18n

lib/
   └─> (self only)  # types <- mock-data; no upward imports
```

**Must NOT happen:**
- `lib/` must **not** import from `app/` or `components/` (it is the leaf layer).
- `components/` must **not** import from `app/` (chrome/primitives don't depend on pages).
- Nothing invents election data inline — all data comes from `mock-data.ts` (the single source).
  Components depend on `lib`, never the reverse.
- No new primitives library — extend `components/ui/` on top of **Base UI**, not Radix.
- No backend/network layer in Phase 1. If a feature seems to need one, stop and surface it
  (see `docs/operations.md` / AGENTS.md "If information is missing").
