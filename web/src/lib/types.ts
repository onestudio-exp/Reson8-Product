// ORA Elections — core data model
// Grounds the "Country election system setup / configuration" feature (O1–O8).

export type ElectionSystemType = "Presidency" | "Senate" | "Parliament";

export type ElectionStatus = "draft" | "configured" | "live" | "closed";

export interface Country {
  id: string;
  name: string;
  nameAr: string;
  iso: string;
  flag: string; // emoji
}

export interface Party {
  id: string;
  countryId: string;
  name: string;
  acronym: string;
  color: string; // hex — official party colour
  symbol: string; // emoji glyph
  leader: string;
  seatsTarget: number;
}

export interface Candidate {
  id: string;
  countryId: string;
  partyId: string;
  name: string;
  district: string;
  photo: string; // emoji avatar placeholder
  position: string;
  bio: string;
}

export interface Constituency {
  id: string;
  countryId: string;
  name: string;
  region: string;
  seats: number;
  registeredVoters: number;
}

export interface ElectionRound {
  round: number;
  date: string; // ISO
  status: ElectionStatus;
}

export interface Election {
  id: string;
  countryId: string;
  type: ElectionSystemType;
  date: string; // ISO — primary / first round
  seatCount: number;
  electoralRule: string;
  status: ElectionStatus;
  rounds: ElectionRound[];
}
