# frameworks/ — seeding convention

Holds broadcast-graphics architecture patterns and standards, in our own words with a
citation.

**What belongs here:** data-binding models (template → live data), scene/graph
architecture, playout and switcher integration patterns, signal standards (SDI, NDI,
ST 2110), key/fill, MOS/newsroom integration, frame-accuracy and fail-safe rendering
patterns.

**Each file needs:** the pattern name, a plain-words explanation, when to use / not
use it, a `Source:` citation, a confidence tag, and a capture date. After adding a
file, bump `frameworks` in `INDEX.md` `seed_counts`.
