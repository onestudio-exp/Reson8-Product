// Mock election data for UI verification. No backend — all in-memory.
import type {
  Candidate,
  Constituency,
  Country,
  Election,
  Party,
} from "./types";

export const countries: Country[] = [
  { id: "ca", name: "Caledonia", nameAr: "كاليدونيا", iso: "CAL", flag: "🇨🇦" },
  { id: "no", name: "Nordia", nameAr: "نورديا", iso: "NOR", flag: "🇳🇴" },
  { id: "az", name: "Azmaria", nameAr: "أزماريا", iso: "AZM", flag: "🇦🇿" },
];

export const parties: Party[] = [
  // Caledonia
  { id: "ca-pp", countryId: "ca", name: "Progress Party", acronym: "PP", color: "#2563eb", symbol: "🔵", leader: "Helena Voss", seatsTarget: 160 },
  { id: "ca-ua", countryId: "ca", name: "Unity Alliance", acronym: "UA", color: "#dc2626", symbol: "🔴", leader: "Marcus Reed", seatsTarget: 150 },
  { id: "ca-gf", countryId: "ca", name: "Green Future", acronym: "GF", color: "#16a34a", symbol: "🟢", leader: "Ada Lindqvist", seatsTarget: 40 },
  { id: "ca-lib", countryId: "ca", name: "Liberty", acronym: "LIB", color: "#f59e0b", symbol: "🟡", leader: "Tomas Hale", seatsTarget: 25 },
  // Nordia
  { id: "no-sd", countryId: "no", name: "Social Democrats", acronym: "SD", color: "#e11d48", symbol: "🌹", leader: "Ingrid Solberg", seatsTarget: 70 },
  { id: "no-cp", countryId: "no", name: "Centre Party", acronym: "CP", color: "#0891b2", symbol: "🔷", leader: "Lars Berg", seatsTarget: 55 },
  { id: "no-np", countryId: "no", name: "National People's", acronym: "NP", color: "#7c3aed", symbol: "🟣", leader: "Sofie Dahl", seatsTarget: 45 },
  // Azmaria
  { id: "az-fm", countryId: "az", name: "Freedom Movement", acronym: "FM", color: "#0d9488", symbol: "🟩", leader: "Karim Nasser", seatsTarget: 120 },
  { id: "az-np", countryId: "az", name: "National Front", acronym: "NF", color: "#b91c1c", symbol: "🟥", leader: "Layla Hadid", seatsTarget: 110 },
];

export const candidates: Candidate[] = [
  { id: "c1", countryId: "ca", partyId: "ca-pp", name: "Helena Voss", district: "Capital North", photo: "👩‍💼", position: "Presidential Candidate", bio: "Two-term governor; economic reform platform." },
  { id: "c2", countryId: "ca", partyId: "ca-ua", name: "Marcus Reed", district: "Capital North", photo: "👨‍💼", position: "Presidential Candidate", bio: "Former defence minister; security focus." },
  { id: "c3", countryId: "ca", partyId: "ca-gf", name: "Ada Lindqvist", district: "Harbour West", photo: "👩‍🌾", position: "Parliamentary Candidate", bio: "Climate scientist; first-time candidate." },
  { id: "c4", countryId: "ca", partyId: "ca-lib", name: "Tomas Hale", district: "Easthollow", photo: "🧑‍💼", position: "Parliamentary Candidate", bio: "Entrepreneur; tax-reform advocate." },
  { id: "c5", countryId: "no", partyId: "no-sd", name: "Ingrid Solberg", district: "Fjordland", photo: "👩‍⚖️", position: "PM Candidate", bio: "Incumbent prime minister." },
  { id: "c6", countryId: "no", partyId: "no-cp", name: "Lars Berg", district: "Highvale", photo: "👨‍🌾", position: "PM Candidate", bio: "Rural development champion." },
  { id: "c7", countryId: "az", partyId: "az-fm", name: "Karim Nasser", district: "Old City", photo: "🧑", position: "Presidential Candidate", bio: "Reform coalition leader." },
  { id: "c8", countryId: "az", partyId: "az-np", name: "Layla Hadid", district: "Riverside", photo: "👩", position: "Presidential Candidate", bio: "Long-serving senator." },
];

export const constituencies: Constituency[] = [
  { id: "d1", countryId: "ca", name: "Capital North", region: "Capital", seats: 12, registeredVoters: 480_000 },
  { id: "d2", countryId: "ca", name: "Harbour West", region: "Coast", seats: 8, registeredVoters: 310_000 },
  { id: "d3", countryId: "ca", name: "Easthollow", region: "Interior", seats: 6, registeredVoters: 225_000 },
  { id: "d4", countryId: "no", name: "Fjordland", region: "North", seats: 9, registeredVoters: 360_000 },
  { id: "d5", countryId: "no", name: "Highvale", region: "Central", seats: 7, registeredVoters: 280_000 },
  { id: "d6", countryId: "az", name: "Old City", region: "Metro", seats: 14, registeredVoters: 560_000 },
  { id: "d7", countryId: "az", name: "Riverside", region: "Delta", seats: 10, registeredVoters: 410_000 },
];

export const elections: Election[] = [
  {
    id: "e1",
    countryId: "ca",
    type: "Presidency",
    date: "2026-09-14",
    seatCount: 1,
    electoralRule: "Two-round runoff (50% + 1)",
    status: "configured",
    rounds: [
      { round: 1, date: "2026-09-14", status: "configured" },
      { round: 2, date: "2026-09-28", status: "draft" },
    ],
  },
  {
    id: "e2",
    countryId: "ca",
    type: "Parliament",
    date: "2026-09-14",
    seatCount: 375,
    electoralRule: "Proportional (D'Hondt), 4% threshold",
    status: "configured",
    rounds: [{ round: 1, date: "2026-09-14", status: "configured" }],
  },
  {
    id: "e3",
    countryId: "no",
    type: "Parliament",
    date: "2026-11-03",
    seatCount: 169,
    electoralRule: "Proportional (Sainte-Laguë)",
    status: "draft",
    rounds: [{ round: 1, date: "2026-11-03", status: "draft" }],
  },
  {
    id: "e4",
    countryId: "az",
    type: "Presidency",
    date: "2026-10-19",
    seatCount: 1,
    electoralRule: "First-past-the-post",
    status: "live",
    rounds: [{ round: 1, date: "2026-10-19", status: "live" }],
  },
];

// Lookup helpers
export const partyById = (id: string) => parties.find((p) => p.id === id);
export const countryById = (id: string) => countries.find((c) => c.id === id);
export const partiesByCountry = (cid: string) => parties.filter((p) => p.countryId === cid);
export const candidatesByCountry = (cid: string) => candidates.filter((c) => c.countryId === cid);
export const constituenciesByCountry = (cid: string) => constituencies.filter((c) => c.countryId === cid);
export const electionsByCountry = (cid: string) => elections.filter((e) => e.countryId === cid);
