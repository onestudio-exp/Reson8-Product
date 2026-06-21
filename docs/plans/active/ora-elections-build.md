# Plan: ORA Elections — Phase 1 build

Status: active
Owner: Katrina (Product)
Created: 2026-06-21

## Goal

Ship the Phase-1 vertical demo slice of ORA Elections: a UI-only Next.js app, on mock data, that
takes three fully-configured fictional countries from setup all the way to live on-air visuals
(interactive map + live results + swing) — fully usable in English and Arabic.

## Why

Everything the broadcast renders is derived from configured data. Country Setup (the configuration
surface) is done and proves the data model. The next step is to turn that configured data into the
on-air story — the map fill, progressive results, and "vs. last election" swing — so the slice is
demoable end-to-end. See `docs/roadmap/ORA_Elections_Approved_Roadmap.md` and
`docs/specs/ORA_Country_Setup_SpecLite.md`.

## Scope

In scope (Phase 1):

- The finalized entity model in `web/src/lib/types.ts` (Election, ElectoralSystem, Candidacy,
  Coalition, Result, HistoricalResult, …).
- The mock dataset in `web/src/lib/mock-data.ts`: Caledonia (bicameral; D'Hondt + FPTP), Nordia
  (Sainte-Laguë), Azmaria (Two-Round), with results + thin historicals and at least one visible
  flip.
- Country Setup screens (Elections / Parties / Coalitions / Candidates / Constituencies + wizard).
- Next features built on the same mock data: **Interactive Map** (roadmap #3) and **Live Results**.
- RTL/Arabic parity on every surface built.

Out of scope (Phase 1 — deferred):

- Any backend, network calls, or real data feeds (mock only).
- Live coalition seat-mathematics simulator → P2 (ship read-only bloc display only).
- Predictive Swing Analysis / turnout projection → P2 (ship static "vs. last election" only).
- GeoJSON / CSV / photo uploads (use emoji + hex placeholders).
- Mixed-member (MMP) and referendum election types (model leaves room; no mock data).

## Current state

- [x] Data model finalized in `web/src/lib/types.ts` (per Spec-Lite §2).
- [x] Phase-1 mock dataset authored in `web/src/lib/mock-data.ts` (3 countries, all 4 formulas,
      bicameral Caledonia, results + thin historicals, one+ visible seat flip).
- [x] i18n/RTL scaffolding in place (`web/src/lib/i18n.tsx`, EN/AR dictionary, dir flip).
- [x] Feature nav in `web/src/lib/nav.ts` (Country Setup `ready`; all others `soon`).
- [x] **Country Setup (roadmap #1) shipped** — `web/src/app/ora/setup/` with all five tabs and the
      Election Configuration Wizard.

## Next steps

1. [ ] **Interactive Map (roadmap #3).** New module `web/src/app/ora/map/`. Fill each constituency
       by `Result.isWinner` party colour (bloc colour for grouped tally); read live data from
       `mock-data.ts`. Flip its `nav.ts` entry to `ready`. EN + AR.
2. [ ] **Live Results / Seat Tally.** Derive seats-by-party per Election from `Result.seatsWon`,
       show the majority line from `seatCount`, and render progressive results via `pctReporting`
       (mix of 100% and partial). EN + AR.
3. [ ] **"vs. last election" swing.** Compute swing from `Result` vs `HistoricalResult` for at least
       one constituency, including the visible flip and net seat change.
4. [ ] One-line PRD reconciliation: note in the P1 exclusion table that read-only bloc display and
       static swing are P1, while simulators/projections are P2 (Spec-Lite §6).

## Verification

- `cd web && npx tsc --noEmit && npm run build` passes (the project verify command).
- Each new screen reviewed in **English and Arabic** via the dev server + Claude_Preview MCP
  (see `docs/operations.md`); every entity shows `nameAr`, no English-only fallback.
- Acceptance criteria in `docs/specs/ORA_Country_Setup_SpecLite.md` §5 hold for built screens.

## Done when

The map, seat tally, and "vs. last election" swing all render correctly from the mock data for the
three countries, in both EN and AR, and the verify command is green. Move this file to
`docs/plans/completed/` when the slice ships.

## Notes

UI-only, no backend — but coordinate any `types.ts` + `mock-data.ts` change as one atomic edit, and
do not `git push` without approval (see `docs/operations.md`). Next 16 specifics: `web/AGENTS.md`.
