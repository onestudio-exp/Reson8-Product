---
agent_slug: david-butler
schema_version: 1
last_built: 2026-06-21
categories:
  - frameworks
  - market-data
seed_counts:
  frameworks: 0
  market-data: 0
---

# David Butler — Knowledge Base Index

This file is the manifest for `david-butler`'s knowledge base. It is
machine-read by the OneStudio hub to surface what the agent knows.

## How this stays accurate

- **Keep the frontmatter in sync.** When you add or remove KB files, update
  `last_built` and the `seed_counts` for the affected category.
- **Every KB file must carry a `Source:` line.** Entries without sources
  are flagged `[UNVERIFIED]` at runtime.
- **Re-verify quarterly.** Bump a file's `last_verified` when you re-check it;
  treat anything untouched for 90+ days as stale.
- **Don't dump live sources here.** Anything updated frequently (live results,
  current polls) is a LIVE source the agent reads at runtime via WebFetch from
  `sources/official-sources.md` — snapshotting it here means it goes stale fast.

## Categories in this KB

- **frameworks/** — psephological methodology: swing, projection, seat-allocation, turnout.
- **market-data/** — electoral results, polling benchmarks, historical swing data.

> The `persona/` folder holds the cited homage profile that grounds this agent's
> voice. It is not a knowledge category.

## Adding new knowledge

Every entry needs: the claim, its classification (rule / decision / lesson),
a confidence tag (`[VERIFIED]` needs ≥2 independent credible sources —
otherwise `[UNVERIFIED]`), the source citation, and the capture date. File it
under the matching category folder, then update this manifest's frontmatter.
