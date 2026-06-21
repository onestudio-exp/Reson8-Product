# Operations — Reson8 ORA Elections

Concrete, runnable commands. The app lives in `web/`, so all commands run from there.
Scripts are defined in `web/package.json`.

## Setup

```bash
cd web && npm install
```

## Verify (the command this project gates on)

There is no separate test runner in Phase 1 — correctness is enforced by **TypeScript + a
production build**. This is the verification command; run it before finishing any change:

```bash
cd web && npx tsc --noEmit && npm run build
```

- `npx tsc --noEmit` — typechecks the whole app against `src/lib/types.ts`. Because every screen
  is derived from the typed mock data, a model/data mismatch fails here.
- `npm run build` — `next build`; catches Next 16 / RSC / route errors a typecheck alone misses.
- Optional lint: `cd web && npm run lint`.

## Dev server

```bash
cd web && npm run dev      # next dev, default http://localhost:3000
```

ORA screens are under `/ora` (Country Setup at `/ora/setup`).

## How UI is verified (required for any UI change)

Verification is not just "it builds" — a UI change must be **seen working in both languages**:

1. Run `npm run dev` and open the affected screen.
2. View it in **English (LTR)** and in **Arabic (RTL)** via the language toggle (the i18n provider
   flips `document.dir` to `rtl`). Confirm: every entity shows its `nameAr`, no field falls back to
   English-only, and mixed Latin/Arabic strings (acronyms, hex, dates) are not character-reversed.
3. Capture/inspect the rendered screen with the **Claude_Preview MCP** (browser-driven UI check)
   for both EN and AR before calling the change done.

Acceptance criteria per screen live in `docs/specs/ORA_Country_Setup_SpecLite.md` §5.

## Risky actions (require approval)

Fast on low-risk work, gated on anything irreversible or that leaves the repo:

- **`git push`** — do not push without explicit approval. Commit locally; report; wait.
- Any **destructive shell command** (`rm -rf`, history rewrite, force-push, branch deletion).
- Editing `web/` **app code** when the task only calls for harness/docs changes.
- Adding a new dependency, or swapping the UI primitives layer off **Base UI**.

Allowed without approval: read files, update docs, make non-destructive code edits, and run the
setup / verify / dev / lint commands above.
