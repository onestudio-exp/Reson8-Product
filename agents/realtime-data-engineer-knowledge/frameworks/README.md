# frameworks/ — seeding convention

Holds streaming-architecture patterns and methods, in our own words with a citation.

**What belongs here:** delivery-semantics models (exactly-once / at-least-once /
at-most-once), partitioning and ordering patterns, dedup/idempotency strategies,
backpressure and latency-budgeting methods, failover/replay/reconciliation patterns,
schema evolution and edge-validation.

**Each file needs:** the pattern name, a plain-words explanation, when to use / not use
it, a `Source:` citation, a confidence tag, and a capture date. After adding a file,
bump `frameworks` in `INDEX.md` `seed_counts`.
