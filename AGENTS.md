# AGENTS.md

Front door for agents working in this repository. Keep it short — this is a map, not an encyclopedia.

## Mission

Reson8 **ORA Elections** — a broadcast-grade elections product for newsrooms. ORA turns a
configured election into live, on-air visuals: an interactive results map, seat tallies,
"vs. last election" swing, candidate/party/coalition cards, and breaking-news lower-thirds.
The product is currently in **Phase 1: UI built on mock data, no backend**. The standard of
correctness is: every screen is *derived from the mock data model* and is fully usable in
both English (LTR) and Arabic (RTL).

## Start here

- Product overview: `docs/product.md` — what ORA is, who uses it, core terms.
- Architecture: `docs/architecture.md` — the `web/` app layout, data model, RTL, dependency rules.
- Operations and commands: `docs/operations.md` — setup / verify / dev / UI-check commands.
- Active plans: `docs/plans/active/` — current build plan and next features.
- Approved roadmap: `docs/roadmap/ORA_Elections_Approved_Roadmap.md` — the 16 ORA features.
- Country Setup spec: `docs/specs/ORA_Country_Setup_SpecLite.md` — the shipped feature's source of truth.

## The web app has its own rules

The Next.js app lives in `web/`. It has its own `web/AGENTS.md` covering **Next 16 specifics**
(this is NOT the Next.js in your training data — APIs and file conventions differ; read
`node_modules/next/dist/docs/` before writing Next code). Do not duplicate those rules here —
read `web/AGENTS.md` before touching app code.

## Non-negotiables (this repo)

- **Phase 1 is UI + mock data only.** No backend, no network calls. `web/src/lib/mock-data.ts`
  is the single source of truth for all election data; components read from it, never invent it.
- **RTL / Arabic parity is required, not optional.** Every screen must work in both EN and AR.
  Every entity carries a `nameAr`; never ship a surface that only renders English.
- **Use Base UI, not Radix.** The component layer is built on `@base-ui/react`. Do not pull in
  Radix or another primitives library.
- **Next 16 has breaking changes.** Follow `web/AGENTS.md`; check `node_modules/next/dist/docs/`
  before using Next APIs from memory.
- **Do not `git push` without approval.** Pushing and any destructive action are gated
  (see `docs/operations.md`).

## Preferred workflow

1. Understand the task and read the relevant docs/spec.
2. Read the code you'll touch (and `web/AGENTS.md` for app code).
3. Make the smallest coherent change; keep `types.ts` + `mock-data.ts` edits atomic.
4. Verify (see `docs/operations.md`): typecheck + build, then UI-check in EN and AR.
5. Summarize what changed and any remaining risks. Do not push.

## If information is missing

Stop guessing. Surface the gap (missing doc, rule, tool, or test) and, when possible, add the
missing context back into the repository.
