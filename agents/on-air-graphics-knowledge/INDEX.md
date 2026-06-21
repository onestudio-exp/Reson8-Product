---
agent_slug: on-air-graphics
schema_version: 1
last_built: 2026-06-21
categories:
  - frameworks
  - vendor-playbooks
seed_counts:
  frameworks: 0
  vendor-playbooks: 0
---

# On-Air Graphics Architect — Knowledge Base Index

This file is the manifest for `on-air-graphics`'s knowledge base. It is
machine-read by the OneStudio hub to surface what the agent knows.

## How this stays accurate

- **Keep the frontmatter in sync.** When you add or remove KB files, update
  `last_built` and the `seed_counts` for the affected category.
- **Every KB file must carry a `Source:` line.** Entries without sources
  are flagged `[UNVERIFIED]` at runtime.
- **Re-verify quarterly.** Vendor capabilities change fast; bump `last_verified`
  and treat anything untouched for 90+ days as stale.
- **Don't dump live sources here.** Vendor docs and version-specific features are
  LIVE sources read at runtime via WebFetch from `sources/official-sources.md`.

## Categories in this KB

- **frameworks/** — broadcast-graphics architecture patterns, data-binding models, standards.
- **vendor-playbooks/** — engine strengths, fit, and trade-offs (Vizrt, Chyron, Ross, …).

## Adding new knowledge

Every entry needs: the claim, its classification (rule / decision / lesson),
a confidence tag (`[VERIFIED]` needs ≥2 independent credible sources —
otherwise `[UNVERIFIED]`), the source citation, and the capture date. File it
under the matching category folder, then update this manifest's frontmatter.
