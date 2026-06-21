# Product — Reson8 ORA Elections

## Core purpose

ORA (the Elections module of the Reson8 platform) is a **broadcast control surface for election
coverage**. It lets a newsroom configure an election ahead of time and then render it live on air:
an interactive results map, seat tallies, "vs. last election" swing, candidate/party/coalition
cards, and breaking-news lower-thirds — all under tight latency (target ≤ 3s, real time) and in
both English and Arabic.

ORA is the first of several Reson8 product areas; the app is structured so additional modules can
be added later. See the approved roadmap: `docs/roadmap/ORA_Elections_Approved_Roadmap.md`.

**Phase 1 (current): UI built on mock data, no backend.** The goal of Phase 1 is a full vertical
demo slice — three fictional countries fully configured so the map, tally, and swing are all
demoable end-to-end from in-memory data. Source of truth for the shipped feature is
`docs/specs/ORA_Country_Setup_SpecLite.md`.

## Main users

- **Broadcast operations / Admin (pre-broadcast).** Configure an election *ahead of* election
  night, not under live pressure. They are domain-literate (they understand "two-round runoff",
  "D'Hondt") but are not engineers — the setup wizard lets them answer questions, not edit a data
  model. This is who **Country Setup** (roadmap #1, shipped) is built for.
- **Control room / on-air operators (live).** During coverage, drive what goes to air — map fills,
  tallies, breaking-news cards, "take to air" preview-then-publish. Served by the live features
  still on the roadmap (Interactive Map, Broadcast, Take to Air, Control Room).
- **Bilingual audiences.** Output must read correctly in English (LTR) and Arabic (RTL); RTL/Arabic
  parity is a cross-cutting requirement on every surface, not a separate screen.

## Key workflows

1. **Configure a country & election (shipped — Country Setup).** Pick a country, define one
   `Election` per chamber, choose the electoral system (family + formula + threshold + majority
   rule), set the round structure, then register parties, coalitions, candidates (via candidacies),
   and constituencies. Everything the live broadcast renders is *derived* from what is configured
   here — if Country Setup is wrong, the broadcast is wrong.
2. **Go live on the map (next).** Fill each constituency by the winning party (or bloc) colour,
   show progressive results as `pctReporting` climbs, and surface poll-close timing.
3. **Tell the swing story (next).** Compare current `Result` to thin `HistoricalResult` to show
   "vs. last election" vote swing and net seat change, including visible seat flips.
4. **Take to air (later).** Preview a card/visual, then publish it to the live channel under
   control-room approval.

## Core terms

- **Election** — one contest for one chamber (`Presidency` | `Parliament` | `Senate`). A bicameral
  country has two Elections (lower house + senate); a unicameral country has one. Discriminated by
  `type`; carries an `ElectoralSystem`, a `status` (draft / configured / live / closed), and
  `Round`s.
- **The 4 electoral formulas** — every Election's `ElectoralSystem.formula` is one of:
  - **FPTP** — first-past-the-post, single member (e.g. Caledonia Senate).
  - **TwoRound** — majority runoff; absolute-majority rule auto-adds a second round (e.g. Azmaria
    Presidency).
  - **DHondt** — proportional, highest-averages D'Hondt, often with a legal threshold (e.g.
    Caledonia Parliament, 4%).
  - **SainteLague** — proportional, highest-averages Sainte-Laguë (e.g. Nordia Parliament).
- **Candidacy** — the central join: a `Candidate` standing in a specific `Election` ×
  `Constituency` × `Party`. One person (one `Candidate` record) can hold multiple candidacies
  (e.g. running for both houses) without duplicate candidate records. `partyId = null` ⇒
  Independent; `constituencyId = null` ⇒ national PR list / at-large.
- **Coalition** — a bloc grouping several parties for grouped map/tally display. Phase 1 is
  **read-only** bloc colour grouping; the live seat-mathematics simulator is deferred to P2.
- **Result** — current-cycle outcome per candidacy per constituency: `votes`, `pctReporting`,
  `seatsWon`, `isWinner`. PR seat allocations are pre-computed in the mock this phase (no live
  allocation engine).
- **HistoricalResult** — thin prior-cycle baseline (party-level `votePct` + `seatsWon` per
  constituency) used to compute "vs. last election" swing and net seat change.
- **Bicameral** — a country with two chambers. Modelled now (`Country.isBicameral`), exercised by
  exactly one mock country (Caledonia). The Senate wizard step and Senate tab are gated behind
  `isBicameral === true`.

## Phase-1 demo dataset (fictional)

| Country | Bicameral | Elections | Electoral systems showcased |
|---|---|---|---|
| **Caledonia** 🇨🇦 | Yes | Parliament + Senate | D'Hondt (4% threshold) · FPTP |
| **Nordia** 🇳🇴 | No | Parliament | Sainte-Laguë (no threshold) |
| **Azmaria** 🇦🇿 | No | Presidency | Two-Round (absolute majority) |

All four formulas are demoable; Caledonia proves the bicameral path; at least one constituency
shows a visible seat flip so the swing story lands.
