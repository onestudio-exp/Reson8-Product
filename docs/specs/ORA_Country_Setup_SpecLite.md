# ORA Elections — Country Setup · Spec-Lite

**Module:** Reson8 ORA (Elections) · Roadmap item #1 "Country election system setup / configuration"
**Author:** Katrina (Product) · **Date:** 2026-06-21 · **Status:** Approved for engineering — Phase 1 (UI + mock data, no backend)
**Maps to features:** O1 (Election Config Wizard), O2 (Candidate DB), O3 (Party DB), O4 (Constituency Mapping); enables downstream O9–O18, O15/O23 (vs-last-election), O20 (coalition history).

---

## 1. Problem & Scope

**What Country Setup is.** The pre-broadcast configuration surface where an election is defined before it goes to air. Everything the live broadcast renders — the seat tally, the interactive map fill, the "vs. last election" swing, candidate/party cards — is *derived* from what is configured here. If Country Setup is wrong or incomplete, the broadcast is wrong.

**Who uses it.** Broadcast operations / Admin, configuring an election *ahead of* election night (not under live pressure). They are domain-literate (they understand "two-round runoff", "D'Hondt") but not engineers. The wizard must let them answer questions, not edit a data model.

**Why now.** Phase 1 ships a **full vertical demo slice**: three fictional countries fully configured, so Interactive Map, Seat Tally, and "vs. last election" swing are all demoable end-to-end from mock data.

**In scope (Phase 1)**
- Structured, multi-type election model (one `Election` per chamber, discriminated by `type`).
- Structured electoral system (family / formula / threshold / majority rule) replacing the old free-text rule string.
- Bicameral support **modelled now**, exercised by exactly one mock country (Caledonia = lower house + senate), with senate setup gated behind `Country.isBicameral`.
- `Coalition` entity + **read-only** bloc display (party colours grouped on map/tally). 
- `Result` data + **thin** `HistoricalResult` (enough to compute and show swing).
- Country Setup screens: Elections, Parties, Candidates, Constituencies, the Election wizard, and a Coalitions tab.
- RTL/Arabic parity on all setup surfaces (E9/O-Translation requirement).

**Out of scope (Phase 1 — deferred)**
- **Live coalition seat-mathematics simulator → P2** (we ship the entity + static bloc display only).
- GeoJSON boundary upload, CSV bulk import, photo/logo file upload (use emoji/hex placeholders — mock only).
- Results *feed* integration (O5), alert thresholds (O6), Vizrt binding (O7/O10) — separate specs.
- Real countries / real historical datasets (fictional only this phase).
- Mixed-member (MMP) and referendum election types — model leaves room, no mock data.

---

## 2. Finalized Entity Model

TypeScript-ish. Tags: **[NEW]** entity/field added this spec · **[CHG]** changed from current `types.ts` · **[KEEP]** unchanged.

```ts
// ── Enums / shared ────────────────────────────────────────────────
type ElectionType    = "Presidency" | "Parliament" | "Senate";        // [CHG] was ElectionSystemType
type ElectionStatus  = "draft" | "configured" | "live" | "closed";    // [KEEP]

type ElectoralFamily = "Majoritarian" | "Proportional";               // [NEW]
type ElectoralFormula =                                               // [NEW]
  | "FPTP"            // first-past-the-post, single member
  | "TwoRound"        // majority runoff
  | "DHondt"          // PR, highest averages (D'Hondt)
  | "SainteLague";    // PR, highest averages (Sainte-Laguë)

// ── Country ───────────────────────────────────────────────────────
interface Country {
  id: string;            // [KEEP]
  name: string;          // [KEEP]
  nameAr: string;        // [KEEP]
  iso: string;           // [KEEP]
  flag: string;          // [KEEP] emoji
  isBicameral: boolean;  // [NEW] gates Senate setup + 2nd Election
  timezone: string;      // [NEW] IANA tz, e.g. "Europe/Oslo" — for pollsClose
}

// ── ElectoralSystem (value object on Election) ────────────────────
interface ElectoralSystem {                       // [NEW] replaces Election.electoralRule string
  family: ElectoralFamily;
  formula: ElectoralFormula;
  seatsPerConstituency: number;   // 1 for FPTP/TwoRound/Presidency; >1 for PR multi-member
  thresholdPct: number | null;    // legal threshold, e.g. 4 → 4%; null if none
  majorityRule: "Plurality" | "AbsoluteMajority"; // AbsoluteMajority drives a 2nd round
  displayLabel: string;           // human string for UI/broadcast, e.g. "Proportional (D'Hondt), 4% threshold"
}

// ── Election (one per chamber/contest) ────────────────────────────
interface Election {
  id: string;                  // [KEEP]
  countryId: string;           // [KEEP]
  type: ElectionType;          // [CHG] discriminator; Senate only if Country.isBicameral
  date: string;                // [KEEP] ISO — first/primary round
  seatCount: number;           // [KEEP] total seats contested (1 for Presidency)
  system: ElectoralSystem;     // [CHG] replaces electoralRule: string
  status: ElectionStatus;      // [KEEP]
  rounds: Round[];             // [CHG] see Round
}

// ── Round ─────────────────────────────────────────────────────────
interface Round {                    // [CHG] (was ElectionRound)
  round: number;                     // [KEEP]
  name: string;                      // [NEW] e.g. "First Round", "Runoff"
  date: string;                      // [KEEP] ISO
  pollsClose: string;                // [NEW] ISO datetime — drives Poll-Close map layer
  status: ElectionStatus;            // [KEEP]
}

// ── Constituency (belongs to an Election) ─────────────────────────
interface Constituency {
  id: string;                  // [KEEP]
  electionId: string;          // [NEW] constituency belongs to an Election (not just a country)
  countryId: string;           // [KEEP] denormalized for convenience
  name: string;                // [KEEP]
  nameAr: string;              // [NEW] Arabic name — RTL parity
  parentRegionId: string | null; // [CHG] was free-text `region`; null = top-level
  seats: number;               // [KEEP]
  registeredVoters: number;    // [KEEP]
}

// ── Party ─────────────────────────────────────────────────────────
interface Party {
  id: string;                  // [KEEP]
  countryId: string;           // [KEEP]
  name: string;                // [KEEP]
  nameAr: string;              // [NEW] Arabic name — RTL parity
  acronym: string;             // [KEEP]
  color: string;               // [KEEP] hex — official party colour
  symbol: string;              // [KEEP] emoji glyph
  leader: string;              // [KEEP]
  coalitionId: string | null;  // [NEW] bloc membership; null = unaligned
  // [CHG] REMOVED seatsTarget — seat targets are not a Party property
}

// ── Coalition ─────────────────────────────────────────────────────
interface Coalition {           // [NEW]
  id: string;
  countryId: string;
  name: string;
  nameAr: string;
  color: string;                // hex — bloc colour for grouped map/tally display
  partyIds: string[];           // member parties (mirror of Party.coalitionId)
}

// ── Candidate ─────────────────────────────────────────────────────
interface Candidate {
  id: string;                  // [KEEP]
  countryId: string;           // [KEEP]
  name: string;                // [KEEP]
  nameAr: string;              // [NEW] Arabic name — RTL parity
  photo: string;               // [KEEP] emoji avatar placeholder
  bio: string;                 // [KEEP]
  // [CHG] REMOVED partyId, district, position — now expressed via Candidacy
}

// ── Candidacy (the join: Candidate × Election × Constituency × Party) 
interface Candidacy {            // [NEW]
  id: string;
  candidateId: string;
  electionId: string;
  constituencyId: string | null; // null for at-large / national PR list
  partyId: string | null;        // null = independent
  coalitionId: string | null;    // denormalized from party for fast bloc grouping
  ballotPosition: number;        // list/ballot order
}

// ── Result (current election, per candidacy per constituency) ─────
interface Result {               // [NEW]
  id: string;
  electionId: string;
  constituencyId: string;
  candidacyId: string;
  votes: number;
  pctReporting: number;          // 0–100, drives "progressive results"
  seatsWon: number;              // resolved seats (PR allocation pre-computed in mock)
  isWinner: boolean;             // for map fill / lead indicator
}

// ── HistoricalResult (thin — prior cycle, for swing) ──────────────
interface HistoricalResult {     // [NEW]
  id: string;
  electionId: string;            // the CURRENT election this baselines against
  constituencyId: string;
  partyId: string;               // prior result attributed at party level (thin)
  votePct: number;               // prior vote share % — swing = currentPct − this
  seatsWon: number;              // prior seats — for "net change" tally
}
```

**Net change vs. current `types.ts`:** `Country` +2 fields · `Election` swaps rule→system, Round enriched · `Constituency` belongs to Election + Arabic + parentRegionId · `Party` −seatsTarget +coalitionId +Arabic · `Candidate` −partyId/district/position +Arabic · **new:** `ElectoralSystem`, `Coalition`, `Candidacy`, `Result`, `HistoricalResult`.

---

## 3. Relationship & Cardinality Map

```
Country (1) ──< Election (N)              # bicameral country = 2 Elections
   │              │
   │              ├──< Round (N)          # 1 for single-round; 2 for two-round
   │              ├──< Constituency (N) ──< parentRegion (self-ref, nullable)
   │              └──< Candidacy (N) ───── Candidate (N..1 via candidacy)
   │                        │  └─ Party (N..1, nullable=independent)
   │                        └──< Result (1 per candidacy×constituency)
   │
   ├──< Party (N) ───>── Coalition (0..1)   # Party.coalitionId
   ├──< Coalition (N) ──< partyIds[]        # read-only bloc this phase
   └──< Candidate (N)

Election ──< HistoricalResult (N)           # thin prior-cycle baseline, keyed by party

Candidacy = Candidate × Election × Constituency × (Party | Coalition)   # the central join
Result    → references (electionId, constituencyId, candidacyId)
```

**Bicameral case — Caledonia, shown explicitly:**

```
Country "Caledonia" { isBicameral: true }
   ├── Election  ca-lower  type=Parliament  system=DHondt(4%)     ← lower house
   │      ├── Constituencies (multi-member, seats>1)
   │      └── Candidacies → Results
   └── Election  ca-senate  type=Senate     system=FPTP(1/seat)   ← upper house, GATED by isBicameral
          ├── Constituencies (single-member)
          └── Candidacies → Results
```

A unicameral country (Nordia, Azmaria) has **exactly one** Election of type Parliament/Presidency and no Senate Election. The Senate wizard step and Senate tab are hidden unless `Country.isBicameral === true`.

---

## 4. Phase-1 Mock Dataset Spec

Three fictional countries. Build the mock to this shape exactly — it is sized to exercise every electoral formula and the bicameral path while staying demoable.

| Country | Bicameral | Elections | Electoral systems showcased | Parties | Coalitions | Constituencies | Candidacies | Results | HistoricalResult |
|---|---|---|---|---|---|---|---|---|---|
| **Caledonia** 🇨🇦 (`ca`) | **YES** | 2 (Parliament + Senate) | **D'Hondt** (4% threshold) for Parliament · **FPTP** for Senate | 4 | 2 blocs | 4 lower + 3 senate = 7 | ~16 | populated | thin |
| **Nordia** 🇳🇴 (`no`) | No | 1 (Parliament) | **Sainte-Laguë** (no threshold) | 3 | 1 bloc (2 parties) | 4 | ~10 | populated | thin |
| **Azmaria** 🇦🇿 (`az`) | No | 1 (Presidency) | **Two-Round** (absolute majority) | 2 | none | 1 national | 2 | populated (round 1) | thin |

**Electoral-system coverage check:** FPTP ✓ (Caledonia Senate) · Two-Round ✓ (Azmaria Presidency) · D'Hondt ✓ (Caledonia Parliament) · Sainte-Laguë ✓ (Nordia Parliament). All four formulas demoable.

**Concrete requirements**
- **Caledonia is the only bicameral country.** Its Senate Election (`ca-senate`, type `Senate`, FPTP) exists *because* `isBicameral: true`. Use this to prove the gating.
- **Coalitions:** Caledonia has 2 blocs (e.g. a centre-left and a centre-right bloc, each grouping 2 of the 4 parties); Nordia has 1 bloc grouping 2 of its 3 parties; Azmaria has none (each party stands alone). Set both `Party.coalitionId` and `Coalition.partyIds[]` consistently. Display is **read-only** — bloc colour grouping on map/tally, no simulator.
- **Constituencies:** Caledonia lower-house constituencies are multi-member (`seats > 1`, e.g. 6–12) to make D'Hondt meaningful; Senate constituencies single-member (`seats = 1`). Nordia multi-member for Sainte-Laguë. Azmaria one national constituency. Populate `nameAr` and `parentRegionId` (at least one country shows a 2-level region hierarchy).
- **Results:** every current Election has `Result` rows with `votes`, `seatsWon`, `isWinner`, and a realistic `pctReporting` mix (some 100%, some partial) so progressive-results and map fill are demoable. PR seat allocations are **pre-computed** in the mock (no live allocation engine this phase).
- **HistoricalResult (thin):** for each current Election, prior-cycle `votePct` + `seatsWon` per party per constituency — enough that "vs. last election" swing and net seat change render. Make at least a couple of constituencies show a visible swing (one flip) so the demo lands.
- **Statuses:** spread across `draft` / `configured` / `live` / `closed` so the Elections list shows the full status range. Keep dates in 2026, consistent with each country's `timezone`.
- **Placeholders only:** emoji for flags/photos/symbols, hex for colours. No file uploads, no GeoJSON.

Provide the data as exported typed arrays plus lookup helpers (extend the existing `partyById`, `electionsByCountry`, etc. pattern with `candidaciesByElection`, `resultsByElection`, `coalitionsByCountry`, `historicalByElection`).

---

## 5. Acceptance Criteria (per screen / tab)

**General (all setup surfaces)**
- [ ] Selecting a country scopes every tab to that country's data (no cross-country leakage).
- [ ] **RTL/Arabic:** when language = Arabic, all setup surfaces render right-to-left; every entity shows its `nameAr`; Latin/Arabic mixed strings (acronyms, hex, dates) display without character-order reversal; no field falls back to English-only.
- [ ] All data is read from the mock module; no network/backend call is made.

**Elections tab**
- [ ] Lists all Elections for the country with type, date, `system.displayLabel`, seat count, and status badge (draft/configured/live/closed all visually distinct).
- [ ] For a bicameral country (Caledonia), **two** Elections appear (Parliament + Senate); for unicameral countries, exactly one.
- [ ] Two-round elections (Azmaria) show both Rounds with their `name` and `pollsClose`; single-round elections show one.

**Election Configuration Wizard (O1)**
- [ ] Collects, in order: country → election type → date → seat count → electoral system (family + formula) → round structure → threshold/majority rule.
- [ ] Selecting a formula sets sensible defaults: FPTP/Two-Round ⇒ `seatsPerConstituency = 1`; PR formulas ⇒ prompt for multi-member seats and optional threshold.
- [ ] `majorityRule = AbsoluteMajority` auto-adds a second Round ("Runoff"); `Plurality` keeps a single round.
- [ ] **Senate step is shown only when the selected country has `isBicameral = true`**; hidden otherwise.
- [ ] Validation: `seatCount` is a positive integer; `thresholdPct` (if set) is 0–100; PR formula requires `seatsPerConstituency ≥ 1`.
- [ ] On completion a valid `Election` (with a structured `ElectoralSystem`, not a free-text rule) is produced.

**Parties tab (O3)**
- [ ] Lists parties with name/`nameAr`, acronym, colour swatch (rendered from hex), symbol, leader.
- [ ] Each party shows its coalition/bloc affiliation (or "Unaligned"); affiliation matches `Coalition.partyIds`.
- [ ] No `seatsTarget` field is present anywhere (removed).

**Candidates tab (O2)**
- [ ] Lists candidates with name/`nameAr` and photo placeholder.
- [ ] Each candidate's party, constituency, and ballot position are shown **via their Candidacy/Candidacies** (a candidate can hold candidacies in more than one constituency/election without duplicate Candidate records).
- [ ] Independents (no party) render correctly as "Independent".

**Constituencies tab (O4)**
- [ ] Lists constituencies scoped to the selected Election (not just country); a bicameral country shows distinct constituency sets per chamber.
- [ ] Shows name/`nameAr`, seats, registered voters, and parent region; top-level constituencies (`parentRegionId = null`) render without a broken parent reference.
- [ ] Multi-member constituencies (seats > 1) are visibly distinguished from single-member.

**Coalitions tab (read-only)**
- [ ] Lists each coalition with name/`nameAr`, bloc colour, and member parties.
- [ ] Bloc colour is usable for grouped map/tally display; member list matches each `Party.coalitionId`.
- [ ] **No simulator / no live seat-math controls** are present (explicitly deferred to P2) — display only.

**Demo-slice cross-checks (vertical slice intent)**
- [ ] From the mock, the Seat Tally can be derived per Election (seats by party, majority line from `seatCount`).
- [ ] The Interactive Map can fill each constituency by `Result.isWinner` party colour (or bloc colour).
- [ ] "vs. last election" swing is computable for at least one constituency from `Result` vs `HistoricalResult` (including one visible flip).

---

## 6. Open Questions / Risks

**PRD reconciliation note (must read).** `docs/features/Reson8_P1_Features.md` → "What P1 Deliberately Excludes" defers **"Coalition & Seat Mathematics (Elections)"** and **"Swing Analysis / Turnout Map (Elections)"** to **P2**. This spec is consistent with that *only* because:
- We ship the **`Coalition` entity + read-only bloc display**, NOT the live seat-math simulator (the simulator is the part P2 defers — confirmed by Decision 2). 
- We ship **thin `HistoricalResult` for "vs. last election" swing display**, NOT predictive Swing Analysis / turnout projection (the AI/analysis part stays P2).

This is a deliberate, scoped pull-forward for the demo slice (Decision 4), not a contradiction. **Action:** add a one-line clarification to the PRD's exclusion table ("read-only bloc display and static swing are P1; simulators/projections are P2") so future readers don't see a conflict. No other PRD conflict found — O1–O4 acceptance criteria align with this model (note: O2/O3/O4's CSV/GeoJSON/photo-upload criteria are explicitly out of *this* mock-only phase).

**Open questions**
1. **PR seat allocation** is pre-computed in mock data this phase. Who owns the real D'Hondt/Sainte-Laguë allocation engine, and in which phase — is it part of Results Feed (O5) or a separate calc service? (Affects whether `Result.seatsWon` stays authored or becomes derived.)
2. **HistoricalResult granularity:** thin = party-level per constituency. Is party-level swing enough for the broadcast story, or will the demo want candidate-level prior results in any constituency? (Current call: party-level only.)
3. **Coalition vs. Party colour precedence** on the map: when a winning party belongs to a bloc, does the map fill use party colour or bloc colour by default? (Recommend: party colour for fill, bloc colour for the grouped tally — confirm.)
4. **Candidacy without constituency** (national PR list / at-large): modelled as `constituencyId = null`. Confirm the Candidates UI handles the null gracefully (shows "National list" rather than blank).
5. **Timezone usage:** `pollsClose` is stored ISO with the country `timezone`; confirm the Poll-Close map layer (O22) reads `Round.pollsClose`, not a separate field, so we don't duplicate.

**Risks**
- **Migration churn:** removing `Party.seatsTarget` and `Candidate.partyId/district/position` and re-homing them onto `Candidacy` touches existing mock consumers/components. Low risk (UI-only, no backend) but coordinate the `types.ts` + `mock-data.ts` change as one atomic edit.
- **Over-fitting the mock:** pre-computed results can hide allocation bugs that only surface with a real engine in P2. Acceptable for a demo slice; flag for P2 carry-over.
- **RTL coverage gap:** every new `nameAr` field must be populated in mock data or Arabic mode shows blanks — make `nameAr` non-optional in mock authoring.
```
