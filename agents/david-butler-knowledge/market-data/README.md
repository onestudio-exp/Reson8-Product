# market-data/ — seeding convention

Holds electoral results, polling benchmarks, and historical swing data used to ground
analysis.

**What belongs here:** historical election results and swings, polling-accuracy
benchmarks, turnout baselines, seat-distribution references.

**Each file needs:** the data point, a `Source:` citation (≥2 independent credible
sources for any `[VERIFIED]` number), a confidence tag, and a capture date. Anything
that updates during a live event is NOT stored here — it is read at runtime via
WebFetch from `sources/official-sources.md`. After adding a file, bump `market-data`
in `INDEX.md` `seed_counts`.
