// ORA Elections — core data model
// Implements docs/specs/ORA_Country_Setup_SpecLite.md (Country Setup, roadmap #1).

// ── Enums / shared ──────────────────────────────────────────────────
export type ElectionType = "Presidency" | "Parliament" | "Senate";

export type ElectionStatus = "draft" | "configured" | "live" | "closed";

export type ElectoralFamily = "Majoritarian" | "Proportional";

export type ElectoralFormula =
  | "FPTP" // first-past-the-post, single member
  | "TwoRound" // majority runoff
  | "DHondt" // PR, highest averages (D'Hondt)
  | "SainteLague"; // PR, highest averages (Sainte-Laguë)

export type MajorityRule = "Plurality" | "AbsoluteMajority";

// ── Country ─────────────────────────────────────────────────────────
export interface Country {
  id: string;
  name: string;
  nameAr: string;
  iso: string;
  flag: string; // emoji
  isBicameral: boolean; // gates Senate setup + 2nd Election
  timezone: string; // IANA tz, e.g. "Europe/Oslo" — for pollsClose
}

// ── ElectoralSystem (value object on Election) ──────────────────────
export interface ElectoralSystem {
  family: ElectoralFamily;
  formula: ElectoralFormula;
  seatsPerConstituency: number; // 1 for FPTP/TwoRound/Presidency; >1 for PR multi-member
  thresholdPct: number | null; // legal threshold, e.g. 4 → 4%; null if none
  majorityRule: MajorityRule; // AbsoluteMajority drives a 2nd round
  displayLabel: string; // human string for UI/broadcast
}

// ── Round ───────────────────────────────────────────────────────────
export interface Round {
  round: number;
  name: string; // e.g. "First Round", "Runoff"
  date: string; // ISO
  pollsClose: string; // ISO datetime — drives Poll-Close map layer
  status: ElectionStatus;
}

// ── Election (one per chamber/contest) ──────────────────────────────
export interface Election {
  id: string;
  countryId: string;
  type: ElectionType; // discriminator; Senate only if Country.isBicameral
  date: string; // ISO — first/primary round
  seatCount: number; // total seats contested (1 for Presidency)
  system: ElectoralSystem;
  status: ElectionStatus;
  rounds: Round[];
}

// ── Constituency (belongs to an Election) ───────────────────────────
export interface Constituency {
  id: string;
  electionId: string; // belongs to an Election (not just a country)
  countryId: string; // denormalized for convenience
  name: string;
  nameAr: string;
  parentRegionId: string | null; // null = top-level
  seats: number;
  registeredVoters: number;
}

// ── Party ───────────────────────────────────────────────────────────
export interface Party {
  id: string;
  countryId: string;
  name: string;
  nameAr: string;
  acronym: string;
  color: string; // hex — official party colour
  symbol: string; // emoji glyph
  leader: string;
  coalitionId: string | null; // bloc membership; null = unaligned
}

// ── Coalition ───────────────────────────────────────────────────────
export interface Coalition {
  id: string;
  countryId: string;
  name: string;
  nameAr: string;
  color: string; // hex — bloc colour for grouped map/tally display
  partyIds: string[]; // member parties (mirror of Party.coalitionId)
}

// ── Candidate ───────────────────────────────────────────────────────
export interface Candidate {
  id: string;
  countryId: string;
  name: string;
  nameAr: string;
  photo: string; // emoji avatar placeholder
  bio: string;
}

// ── Candidacy (Candidate × Election × Constituency × Party) ─────────
export interface Candidacy {
  id: string;
  candidateId: string;
  electionId: string;
  constituencyId: string | null; // null for at-large / national PR list
  partyId: string | null; // null = independent
  coalitionId: string | null; // denormalized from party for fast bloc grouping
  ballotPosition: number; // list/ballot order
}

// ── Result (current election, per candidacy per constituency) ───────
export interface Result {
  id: string;
  electionId: string;
  constituencyId: string;
  candidacyId: string;
  votes: number;
  pctReporting: number; // 0–100, drives "progressive results"
  seatsWon: number; // resolved seats (PR allocation pre-computed in mock)
  isWinner: boolean; // for map fill / lead indicator
}

// ── HistoricalResult (thin — prior cycle, for swing) ────────────────
export interface HistoricalResult {
  id: string;
  electionId: string; // the CURRENT election this baselines against
  constituencyId: string;
  partyId: string; // prior result attributed at party level (thin)
  votePct: number; // prior vote share % — swing = currentPct − this
  seatsWon: number; // prior seats — for "net change" tally
}
