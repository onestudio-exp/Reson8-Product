---
agent_slug: realtime-data-engineer
schema_version: 1
last_built: 2026-06-21
categories:
  - frameworks
  - vendor-playbooks
seed_counts:
  frameworks: 0
  vendor-playbooks: 0
---

# Real-Time Data Engineer — Knowledge Base Index

This file is the manifest for `realtime-data-engineer`'s knowledge base. It is
machine-read by the OneStudio hub to surface what the agent knows.

## How this stays accurate

- **Keep the frontmatter in sync.** When you add or remove KB files, update
  `last_built` and the `seed_counts` for the affected category.
- **Every KB file must carry a `Source:` line.** Entries without sources
  are flagged `[UNVERIFIED]` at runtime.
- **Re-verify quarterly.** Streaming-platform features change fast; bump
  `last_verified` and treat anything untouched for 90+ days as stale.
- **Don't dump live sources here.** Platform docs and version-specific behavior are
  LIVE sources read at runtime via WebFetch from `sources/official-sources.md`.

## Categories in this KB

- **frameworks/** — streaming architecture patterns, delivery semantics, SLA/latency methods.
- **vendor-playbooks/** — Kafka, Flink, Redpanda, Kinesis, Debezium: strengths, fit, trade-offs.

## Adding new knowledge

Every entry needs: the claim, its classification (rule / decision / lesson),
a confidence tag (`[VERIFIED]` needs ≥2 independent credible sources —
otherwise `[UNVERIFIED]`), the source citation, and the capture date. File it
under the matching category folder, then update this manifest's frontmatter.
