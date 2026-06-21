// Mock election data for UI verification. No backend — all in-memory.
// Implements the Phase-1 mock dataset in docs/specs/ORA_Country_Setup_SpecLite.md §4:
//   Caledonia (bicameral: D'Hondt + FPTP) · Nordia (Sainte-Laguë) · Azmaria (Two-Round).
import type {
  Candidacy,
  Candidate,
  Coalition,
  Constituency,
  Country,
  Election,
  HistoricalResult,
  Party,
  Result,
} from "./types";

// ── Countries ───────────────────────────────────────────────────────
export const countries: Country[] = [
  { id: "ca", name: "Caledonia", nameAr: "كاليدونيا", iso: "CAL", flag: "🇨🇦", isBicameral: true, timezone: "America/Toronto" },
  { id: "no", name: "Nordia", nameAr: "نورديا", iso: "NOR", flag: "🇳🇴", isBicameral: false, timezone: "Europe/Oslo" },
  { id: "az", name: "Azmaria", nameAr: "أزماريا", iso: "AZM", flag: "🇦🇿", isBicameral: false, timezone: "Asia/Baku" },
];

// ── Coalitions (read-only bloc display this phase) ──────────────────
export const coalitions: Coalition[] = [
  { id: "ca-prog", countryId: "ca", name: "Progressive Bloc", nameAr: "الكتلة التقدمية", color: "#1d4ed8", partyIds: ["ca-pp", "ca-gf"] },
  { id: "ca-cons", countryId: "ca", name: "Conservative Bloc", nameAr: "الكتلة المحافظة", color: "#b91c1c", partyIds: ["ca-ua", "ca-lib"] },
  { id: "no-redgreen", countryId: "no", name: "Red-Green Alliance", nameAr: "التحالف الأحمر-الأخضر", color: "#be123c", partyIds: ["no-sd", "no-gp"] },
];

// ── Parties ─────────────────────────────────────────────────────────
export const parties: Party[] = [
  // Caledonia
  { id: "ca-pp", countryId: "ca", name: "Progress Party", nameAr: "حزب التقدم", acronym: "PP", color: "#2563eb", symbol: "🔵", leader: "Helena Voss", coalitionId: "ca-prog" },
  { id: "ca-gf", countryId: "ca", name: "Green Future", nameAr: "المستقبل الأخضر", acronym: "GF", color: "#16a34a", symbol: "🟢", leader: "Ada Lindqvist", coalitionId: "ca-prog" },
  { id: "ca-ua", countryId: "ca", name: "Unity Alliance", nameAr: "تحالف الوحدة", acronym: "UA", color: "#dc2626", symbol: "🔴", leader: "Marcus Reed", coalitionId: "ca-cons" },
  { id: "ca-lib", countryId: "ca", name: "Liberty", nameAr: "الحرية", acronym: "LIB", color: "#f59e0b", symbol: "🟡", leader: "Tomas Hale", coalitionId: "ca-cons" },
  // Nordia
  { id: "no-sd", countryId: "no", name: "Social Democrats", nameAr: "الديمقراطيون الاجتماعيون", acronym: "SD", color: "#e11d48", symbol: "🌹", leader: "Ingrid Solberg", coalitionId: "no-redgreen" },
  { id: "no-gp", countryId: "no", name: "Green Party", nameAr: "حزب الخضر", acronym: "GP", color: "#15803d", symbol: "🌿", leader: "Pål Reite", coalitionId: "no-redgreen" },
  { id: "no-cp", countryId: "no", name: "Centre Party", nameAr: "حزب الوسط", acronym: "CP", color: "#0891b2", symbol: "🔷", leader: "Lars Berg", coalitionId: null },
  // Azmaria
  { id: "az-fm", countryId: "az", name: "Freedom Movement", nameAr: "حركة الحرية", acronym: "FM", color: "#0d9488", symbol: "🟩", leader: "Karim Nasser", coalitionId: null },
  { id: "az-nf", countryId: "az", name: "National Front", nameAr: "الجبهة الوطنية", acronym: "NF", color: "#b91c1c", symbol: "🟥", leader: "Layla Hadid", coalitionId: null },
];

// ── Elections ───────────────────────────────────────────────────────
export const elections: Election[] = [
  {
    id: "ca-lower", countryId: "ca", type: "Parliament", date: "2026-09-14", seatCount: 22, status: "live",
    system: { family: "Proportional", formula: "DHondt", seatsPerConstituency: 11, thresholdPct: 4, majorityRule: "Plurality", displayLabel: "Proportional (D'Hondt), 4% threshold" },
    rounds: [{ round: 1, name: "General Election", date: "2026-09-14", pollsClose: "2026-09-14T21:00:00-04:00", status: "live" }],
  },
  {
    id: "ca-senate", countryId: "ca", type: "Senate", date: "2026-09-14", seatCount: 3, status: "live",
    system: { family: "Majoritarian", formula: "FPTP", seatsPerConstituency: 1, thresholdPct: null, majorityRule: "Plurality", displayLabel: "First-past-the-post (single member)" },
    rounds: [{ round: 1, name: "General Election", date: "2026-09-14", pollsClose: "2026-09-14T21:00:00-04:00", status: "live" }],
  },
  {
    id: "no-parl", countryId: "no", type: "Parliament", date: "2026-11-03", seatCount: 30, status: "configured",
    system: { family: "Proportional", formula: "SainteLague", seatsPerConstituency: 8, thresholdPct: null, majorityRule: "Plurality", displayLabel: "Proportional (Sainte-Laguë)" },
    rounds: [{ round: 1, name: "General Election", date: "2026-11-03", pollsClose: "2026-11-03T21:00:00+01:00", status: "configured" }],
  },
  {
    id: "az-pres", countryId: "az", type: "Presidency", date: "2026-10-19", seatCount: 1, status: "live",
    system: { family: "Majoritarian", formula: "TwoRound", seatsPerConstituency: 1, thresholdPct: null, majorityRule: "AbsoluteMajority", displayLabel: "Two-round runoff (50% + 1)" },
    rounds: [
      { round: 1, name: "First Round", date: "2026-10-19", pollsClose: "2026-10-19T19:00:00+04:00", status: "live" },
      { round: 2, name: "Runoff", date: "2026-11-02", pollsClose: "2026-11-02T19:00:00+04:00", status: "draft" },
    ],
  },
];

// ── Constituencies (belong to an Election) ──────────────────────────
export const constituencies: Constituency[] = [
  // Caledonia — lower house (multi-member; 2-level region hierarchy demoed)
  { id: "ca-l-1", electionId: "ca-lower", countryId: "ca", name: "Capital North", nameAr: "العاصمة الشمالية", parentRegionId: null, seats: 12, registeredVoters: 480_000 },
  { id: "ca-l-2", electionId: "ca-lower", countryId: "ca", name: "Riverside", nameAr: "ضفة النهر", parentRegionId: "ca-l-1", seats: 8, registeredVoters: 295_000 },
  { id: "ca-l-3", electionId: "ca-lower", countryId: "ca", name: "Harbour West", nameAr: "الميناء الغربي", parentRegionId: null, seats: 10, registeredVoters: 310_000 },
  { id: "ca-l-4", electionId: "ca-lower", countryId: "ca", name: "Easthollow", nameAr: "إيست هولو", parentRegionId: "ca-l-3", seats: 6, registeredVoters: 225_000 },
  // Caledonia — senate (single-member)
  { id: "ca-s-1", electionId: "ca-senate", countryId: "ca", name: "Northshire", nameAr: "نورثشير", parentRegionId: null, seats: 1, registeredVoters: 240_000 },
  { id: "ca-s-2", electionId: "ca-senate", countryId: "ca", name: "Westmarch", nameAr: "ويستمارش", parentRegionId: null, seats: 1, registeredVoters: 218_000 },
  { id: "ca-s-3", electionId: "ca-senate", countryId: "ca", name: "Eastfen", nameAr: "إيستفن", parentRegionId: null, seats: 1, registeredVoters: 205_000 },
  // Nordia — parliament (multi-member)
  { id: "no-1", electionId: "no-parl", countryId: "no", name: "Fjordland", nameAr: "فيوردلاند", parentRegionId: null, seats: 9, registeredVoters: 360_000 },
  { id: "no-2", electionId: "no-parl", countryId: "no", name: "Highvale", nameAr: "هايفيل", parentRegionId: null, seats: 7, registeredVoters: 280_000 },
  { id: "no-3", electionId: "no-parl", countryId: "no", name: "Lakeshore", nameAr: "شاطئ البحيرة", parentRegionId: null, seats: 8, registeredVoters: 305_000 },
  { id: "no-4", electionId: "no-parl", countryId: "no", name: "Mourne", nameAr: "مورن", parentRegionId: null, seats: 6, registeredVoters: 240_000 },
  // Azmaria — presidency (one national constituency)
  { id: "az-nat", electionId: "az-pres", countryId: "az", name: "National", nameAr: "وطني", parentRegionId: null, seats: 1, registeredVoters: 6_200_000 },
];

// ── Candidates (the people; stable across contests) ─────────────────
export const candidates: Candidate[] = [
  { id: "ca-c1", countryId: "ca", name: "Helena Voss", nameAr: "هيلينا فوس", photo: "👩‍💼", bio: "Progress Party leader; two-term governor running for both houses." },
  { id: "ca-c2", countryId: "ca", name: "Ada Lindqvist", nameAr: "آدا ليندكفيست", photo: "👩‍🌾", bio: "Green Future leader; climate scientist." },
  { id: "ca-c3", countryId: "ca", name: "Marcus Reed", nameAr: "ماركوس ريد", photo: "👨‍💼", bio: "Unity Alliance leader; former defence minister." },
  { id: "ca-c4", countryId: "ca", name: "Tomas Hale", nameAr: "توماس هيل", photo: "🧑‍💼", bio: "Liberty leader; entrepreneur and tax-reform advocate." },
  { id: "ca-c5", countryId: "ca", name: "Erik Solene", nameAr: "إريك سولين", photo: "🧑", bio: "Progress Party candidate, Harbour West." },
  { id: "ca-c6", countryId: "ca", name: "Liv Brandt", nameAr: "ليف برانت", photo: "👩", bio: "Green Future candidate, Harbour West." },
  { id: "ca-c7", countryId: "ca", name: "Nadia Croft", nameAr: "ناديا كروفت", photo: "👩‍⚖️", bio: "Unity Alliance candidate, Harbour West." },
  { id: "ca-c8", countryId: "ca", name: "Sven Aalto", nameAr: "سفين آلتو", photo: "👨", bio: "Liberty candidate, Harbour West." },
  { id: "ca-c9", countryId: "ca", name: "Owen Pike", nameAr: "أوين بايك", photo: "👨‍🦰", bio: "Progress Party senate candidate, Westmarch." },
  { id: "ca-c10", countryId: "ca", name: "Greta Voll", nameAr: "غريتا فول", photo: "👩‍🦱", bio: "Unity Alliance senate candidate, Westmarch." },
  { id: "ca-c11", countryId: "ca", name: "Ines Dahl", nameAr: "إينيس دال", photo: "👩‍🦳", bio: "Green Future senate candidate, Eastfen." },
  { id: "ca-c12", countryId: "ca", name: "Karl Reuss", nameAr: "كارل رويس", photo: "🧔", bio: "Liberty senate candidate, Eastfen." },
  // Nordia
  { id: "no-c1", countryId: "no", name: "Ingrid Solberg", nameAr: "إنغريد سولبرغ", photo: "👩‍⚖️", bio: "Social Democrat leader; incumbent prime minister." },
  { id: "no-c2", countryId: "no", name: "Pål Reite", nameAr: "بول رايت", photo: "🧑‍🌾", bio: "Green Party leader." },
  { id: "no-c3", countryId: "no", name: "Lars Berg", nameAr: "لارس بيرغ", photo: "👨‍🌾", bio: "Centre Party leader; rural development champion." },
  { id: "no-c4", countryId: "no", name: "Mette Holt", nameAr: "ميته هولت", photo: "👩", bio: "Social Democrat candidate, Highvale." },
  { id: "no-c5", countryId: "no", name: "Sofie Vang", nameAr: "صوفي فانغ", photo: "👩‍🦰", bio: "Green Party candidate, Highvale." },
  { id: "no-c6", countryId: "no", name: "Anders Krog", nameAr: "أندرس كروغ", photo: "👨", bio: "Centre Party candidate, Highvale." },
  { id: "no-c7", countryId: "no", name: "Tor Lien", nameAr: "تور لين", photo: "🧑", bio: "Social Democrat candidate, Lakeshore." },
  { id: "no-c8", countryId: "no", name: "Eva Strand", nameAr: "إيفا ستراند", photo: "👩‍🦱", bio: "Green Party candidate, Lakeshore." },
  { id: "no-c9", countryId: "no", name: "Nils Haugen", nameAr: "نيلس هاوغن", photo: "👨‍🦱", bio: "Social Democrat candidate, Mourne." },
  { id: "no-c10", countryId: "no", name: "Karine Moen", nameAr: "كارين موين", photo: "👩‍💼", bio: "Centre Party candidate, Mourne." },
  { id: "no-c11", countryId: "no", name: "Bjørn Aas", nameAr: "بيورن آس", photo: "🧑‍🦲", bio: "Independent candidate, Mourne." },
  // Azmaria
  { id: "az-c1", countryId: "az", name: "Karim Nasser", nameAr: "كريم ناصر", photo: "🧑", bio: "Freedom Movement leader; reform coalition figure." },
  { id: "az-c2", countryId: "az", name: "Layla Hadid", nameAr: "ليلى حديد", photo: "👩", bio: "National Front leader; long-serving senator." },
  { id: "az-c3", countryId: "az", name: "Sami Toure", nameAr: "سامي توري", photo: "🧔", bio: "Independent presidential candidate." },
];

// ── Candidacies (Candidate × Election × Constituency × Party) ───────
// Helena Voss (ca-c1) and Marcus Reed (ca-c3) each hold two candidacies (lower + senate).
export const candidacies: Candidacy[] = [
  // Caledonia lower house
  { id: "cy-l-1", candidateId: "ca-c1", electionId: "ca-lower", constituencyId: "ca-l-1", partyId: "ca-pp", coalitionId: "ca-prog", ballotPosition: 1 },
  { id: "cy-l-2", candidateId: "ca-c2", electionId: "ca-lower", constituencyId: "ca-l-1", partyId: "ca-gf", coalitionId: "ca-prog", ballotPosition: 1 },
  { id: "cy-l-3", candidateId: "ca-c3", electionId: "ca-lower", constituencyId: "ca-l-1", partyId: "ca-ua", coalitionId: "ca-cons", ballotPosition: 1 },
  { id: "cy-l-4", candidateId: "ca-c4", electionId: "ca-lower", constituencyId: "ca-l-1", partyId: "ca-lib", coalitionId: "ca-cons", ballotPosition: 1 },
  { id: "cy-l-5", candidateId: "ca-c5", electionId: "ca-lower", constituencyId: "ca-l-3", partyId: "ca-pp", coalitionId: "ca-prog", ballotPosition: 1 },
  { id: "cy-l-6", candidateId: "ca-c6", electionId: "ca-lower", constituencyId: "ca-l-3", partyId: "ca-gf", coalitionId: "ca-prog", ballotPosition: 1 },
  { id: "cy-l-7", candidateId: "ca-c7", electionId: "ca-lower", constituencyId: "ca-l-3", partyId: "ca-ua", coalitionId: "ca-cons", ballotPosition: 1 },
  { id: "cy-l-8", candidateId: "ca-c8", electionId: "ca-lower", constituencyId: "ca-l-3", partyId: "ca-lib", coalitionId: "ca-cons", ballotPosition: 1 },
  // Caledonia senate
  { id: "cy-s-1", candidateId: "ca-c1", electionId: "ca-senate", constituencyId: "ca-s-1", partyId: "ca-pp", coalitionId: "ca-prog", ballotPosition: 1 },
  { id: "cy-s-2", candidateId: "ca-c3", electionId: "ca-senate", constituencyId: "ca-s-1", partyId: "ca-ua", coalitionId: "ca-cons", ballotPosition: 2 },
  { id: "cy-s-3", candidateId: "ca-c9", electionId: "ca-senate", constituencyId: "ca-s-2", partyId: "ca-pp", coalitionId: "ca-prog", ballotPosition: 1 },
  { id: "cy-s-4", candidateId: "ca-c10", electionId: "ca-senate", constituencyId: "ca-s-2", partyId: "ca-ua", coalitionId: "ca-cons", ballotPosition: 2 },
  { id: "cy-s-5", candidateId: "ca-c11", electionId: "ca-senate", constituencyId: "ca-s-3", partyId: "ca-gf", coalitionId: "ca-prog", ballotPosition: 1 },
  { id: "cy-s-6", candidateId: "ca-c12", electionId: "ca-senate", constituencyId: "ca-s-3", partyId: "ca-lib", coalitionId: "ca-cons", ballotPosition: 2 },
  // Nordia parliament
  { id: "cy-no-1", candidateId: "no-c1", electionId: "no-parl", constituencyId: "no-1", partyId: "no-sd", coalitionId: "no-redgreen", ballotPosition: 1 },
  { id: "cy-no-2", candidateId: "no-c2", electionId: "no-parl", constituencyId: "no-1", partyId: "no-gp", coalitionId: "no-redgreen", ballotPosition: 1 },
  { id: "cy-no-3", candidateId: "no-c3", electionId: "no-parl", constituencyId: "no-1", partyId: "no-cp", coalitionId: null, ballotPosition: 1 },
  { id: "cy-no-4", candidateId: "no-c4", electionId: "no-parl", constituencyId: "no-2", partyId: "no-sd", coalitionId: "no-redgreen", ballotPosition: 1 },
  { id: "cy-no-5", candidateId: "no-c5", electionId: "no-parl", constituencyId: "no-2", partyId: "no-gp", coalitionId: "no-redgreen", ballotPosition: 1 },
  { id: "cy-no-6", candidateId: "no-c6", electionId: "no-parl", constituencyId: "no-2", partyId: "no-cp", coalitionId: null, ballotPosition: 1 },
  { id: "cy-no-7", candidateId: "no-c7", electionId: "no-parl", constituencyId: "no-3", partyId: "no-sd", coalitionId: "no-redgreen", ballotPosition: 1 },
  { id: "cy-no-8", candidateId: "no-c8", electionId: "no-parl", constituencyId: "no-3", partyId: "no-gp", coalitionId: "no-redgreen", ballotPosition: 1 },
  { id: "cy-no-9", candidateId: "no-c9", electionId: "no-parl", constituencyId: "no-4", partyId: "no-sd", coalitionId: "no-redgreen", ballotPosition: 1 },
  { id: "cy-no-10", candidateId: "no-c10", electionId: "no-parl", constituencyId: "no-4", partyId: "no-cp", coalitionId: null, ballotPosition: 1 },
  { id: "cy-no-11", candidateId: "no-c11", electionId: "no-parl", constituencyId: "no-4", partyId: null, coalitionId: null, ballotPosition: 2 }, // independent
  // Azmaria presidency (national)
  { id: "cy-az-1", candidateId: "az-c1", electionId: "az-pres", constituencyId: "az-nat", partyId: "az-fm", coalitionId: null, ballotPosition: 1 },
  { id: "cy-az-2", candidateId: "az-c2", electionId: "az-pres", constituencyId: "az-nat", partyId: "az-nf", coalitionId: null, ballotPosition: 2 },
  { id: "cy-az-3", candidateId: "az-c3", electionId: "az-pres", constituencyId: "az-nat", partyId: null, coalitionId: null, ballotPosition: 3 }, // independent
];

// ── Results (current cycle; PR allocations pre-computed) ────────────
export const results: Result[] = [
  // Caledonia lower — Capital North (12 seats, 100% in)
  { id: "r-l-1", electionId: "ca-lower", constituencyId: "ca-l-1", candidacyId: "cy-l-1", votes: 182_000, pctReporting: 100, seatsWon: 5, isWinner: true },
  { id: "r-l-2", electionId: "ca-lower", constituencyId: "ca-l-1", candidacyId: "cy-l-2", votes: 58_000, pctReporting: 100, seatsWon: 1, isWinner: false },
  { id: "r-l-3", electionId: "ca-lower", constituencyId: "ca-l-1", candidacyId: "cy-l-3", votes: 168_000, pctReporting: 100, seatsWon: 4, isWinner: false },
  { id: "r-l-4", electionId: "ca-lower", constituencyId: "ca-l-1", candidacyId: "cy-l-4", votes: 72_000, pctReporting: 100, seatsWon: 2, isWinner: false },
  // Caledonia lower — Harbour West (10 seats, 92% in) — PP flips this seat from UA
  { id: "r-l-5", electionId: "ca-lower", constituencyId: "ca-l-3", candidacyId: "cy-l-5", votes: 93_000, pctReporting: 92, seatsWon: 3, isWinner: true },
  { id: "r-l-6", electionId: "ca-lower", constituencyId: "ca-l-3", candidacyId: "cy-l-6", votes: 68_000, pctReporting: 92, seatsWon: 2, isWinner: false },
  { id: "r-l-7", electionId: "ca-lower", constituencyId: "ca-l-3", candidacyId: "cy-l-7", votes: 87_000, pctReporting: 92, seatsWon: 3, isWinner: false },
  { id: "r-l-8", electionId: "ca-lower", constituencyId: "ca-l-3", candidacyId: "cy-l-8", votes: 62_000, pctReporting: 92, seatsWon: 2, isWinner: false },
  // Caledonia senate — Northshire (PP flips), Westmarch (UA holds), Eastfen (LIB holds, 80% in)
  { id: "r-s-1", electionId: "ca-senate", constituencyId: "ca-s-1", candidacyId: "cy-s-1", votes: 124_000, pctReporting: 100, seatsWon: 1, isWinner: true },
  { id: "r-s-2", electionId: "ca-senate", constituencyId: "ca-s-1", candidacyId: "cy-s-2", votes: 114_000, pctReporting: 100, seatsWon: 0, isWinner: false },
  { id: "r-s-3", electionId: "ca-senate", constituencyId: "ca-s-2", candidacyId: "cy-s-3", votes: 98_000, pctReporting: 100, seatsWon: 0, isWinner: false },
  { id: "r-s-4", electionId: "ca-senate", constituencyId: "ca-s-2", candidacyId: "cy-s-4", votes: 120_000, pctReporting: 100, seatsWon: 1, isWinner: true },
  { id: "r-s-5", electionId: "ca-senate", constituencyId: "ca-s-3", candidacyId: "cy-s-5", votes: 76_000, pctReporting: 80, seatsWon: 0, isWinner: false },
  { id: "r-s-6", electionId: "ca-senate", constituencyId: "ca-s-3", candidacyId: "cy-s-6", votes: 114_000, pctReporting: 80, seatsWon: 1, isWinner: true },
  // Nordia — Fjordland (9), Highvale (7, 95%), Lakeshore (8), Mourne (6, 88%)
  { id: "r-no-1", electionId: "no-parl", constituencyId: "no-1", candidacyId: "cy-no-1", votes: 96_000, pctReporting: 100, seatsWon: 4, isWinner: true },
  { id: "r-no-2", electionId: "no-parl", constituencyId: "no-1", candidacyId: "cy-no-2", votes: 60_000, pctReporting: 100, seatsWon: 2, isWinner: false },
  { id: "r-no-3", electionId: "no-parl", constituencyId: "no-1", candidacyId: "cy-no-3", votes: 84_000, pctReporting: 100, seatsWon: 3, isWinner: false },
  { id: "r-no-4", electionId: "no-parl", constituencyId: "no-2", candidacyId: "cy-no-4", votes: 70_000, pctReporting: 95, seatsWon: 2, isWinner: false },
  { id: "r-no-5", electionId: "no-parl", constituencyId: "no-2", candidacyId: "cy-no-5", votes: 64_000, pctReporting: 95, seatsWon: 2, isWinner: false },
  { id: "r-no-6", electionId: "no-parl", constituencyId: "no-2", candidacyId: "cy-no-6", votes: 78_000, pctReporting: 95, seatsWon: 3, isWinner: true },
  { id: "r-no-7", electionId: "no-parl", constituencyId: "no-3", candidacyId: "cy-no-7", votes: 108_000, pctReporting: 100, seatsWon: 4, isWinner: true },
  { id: "r-no-8", electionId: "no-parl", constituencyId: "no-3", candidacyId: "cy-no-8", votes: 96_000, pctReporting: 100, seatsWon: 4, isWinner: false },
  { id: "r-no-9", electionId: "no-parl", constituencyId: "no-4", candidacyId: "cy-no-9", votes: 90_000, pctReporting: 88, seatsWon: 3, isWinner: true },
  { id: "r-no-10", electionId: "no-parl", constituencyId: "no-4", candidacyId: "cy-no-10", votes: 63_000, pctReporting: 88, seatsWon: 2, isWinner: false },
  { id: "r-no-11", electionId: "no-parl", constituencyId: "no-4", candidacyId: "cy-no-11", votes: 27_000, pctReporting: 88, seatsWon: 1, isWinner: false },
  // Azmaria presidency — round 1, runoff pending (no winner yet)
  { id: "r-az-1", electionId: "az-pres", constituencyId: "az-nat", candidacyId: "cy-az-1", votes: 1_880_000, pctReporting: 100, seatsWon: 0, isWinner: false },
  { id: "r-az-2", electionId: "az-pres", constituencyId: "az-nat", candidacyId: "cy-az-2", votes: 1_760_000, pctReporting: 100, seatsWon: 0, isWinner: false },
  { id: "r-az-3", electionId: "az-pres", constituencyId: "az-nat", candidacyId: "cy-az-3", votes: 360_000, pctReporting: 100, seatsWon: 0, isWinner: false },
];

// ── HistoricalResult (thin prior-cycle baseline, party-level) ───────
export const historicalResults: HistoricalResult[] = [
  // Caledonia lower — Capital North (PP held), Harbour West (UA held → now flips to PP)
  { id: "h-l-1a", electionId: "ca-lower", constituencyId: "ca-l-1", partyId: "ca-pp", votePct: 40, seatsWon: 5 },
  { id: "h-l-1b", electionId: "ca-lower", constituencyId: "ca-l-1", partyId: "ca-ua", votePct: 30, seatsWon: 4 },
  { id: "h-l-1c", electionId: "ca-lower", constituencyId: "ca-l-1", partyId: "ca-lib", votePct: 18, seatsWon: 2 },
  { id: "h-l-1d", electionId: "ca-lower", constituencyId: "ca-l-1", partyId: "ca-gf", votePct: 12, seatsWon: 1 },
  { id: "h-l-3a", electionId: "ca-lower", constituencyId: "ca-l-3", partyId: "ca-ua", votePct: 33, seatsWon: 4 },
  { id: "h-l-3b", electionId: "ca-lower", constituencyId: "ca-l-3", partyId: "ca-pp", votePct: 29, seatsWon: 3 },
  { id: "h-l-3c", electionId: "ca-lower", constituencyId: "ca-l-3", partyId: "ca-lib", votePct: 22, seatsWon: 2 },
  { id: "h-l-3d", electionId: "ca-lower", constituencyId: "ca-l-3", partyId: "ca-gf", votePct: 16, seatsWon: 1 },
  // Caledonia senate — Northshire (UA held → now flips to PP), Westmarch (UA held), Eastfen (LIB held)
  { id: "h-s-1a", electionId: "ca-senate", constituencyId: "ca-s-1", partyId: "ca-ua", votePct: 51, seatsWon: 1 },
  { id: "h-s-1b", electionId: "ca-senate", constituencyId: "ca-s-1", partyId: "ca-pp", votePct: 49, seatsWon: 0 },
  { id: "h-s-2a", electionId: "ca-senate", constituencyId: "ca-s-2", partyId: "ca-ua", votePct: 53, seatsWon: 1 },
  { id: "h-s-2b", electionId: "ca-senate", constituencyId: "ca-s-2", partyId: "ca-pp", votePct: 47, seatsWon: 0 },
  { id: "h-s-3a", electionId: "ca-senate", constituencyId: "ca-s-3", partyId: "ca-lib", votePct: 58, seatsWon: 1 },
  { id: "h-s-3b", electionId: "ca-senate", constituencyId: "ca-s-3", partyId: "ca-gf", votePct: 42, seatsWon: 0 },
  // Nordia
  { id: "h-no-1a", electionId: "no-parl", constituencyId: "no-1", partyId: "no-sd", votePct: 38, seatsWon: 4 },
  { id: "h-no-1b", electionId: "no-parl", constituencyId: "no-1", partyId: "no-cp", votePct: 36, seatsWon: 3 },
  { id: "h-no-1c", electionId: "no-parl", constituencyId: "no-1", partyId: "no-gp", votePct: 26, seatsWon: 2 },
  { id: "h-no-2a", electionId: "no-parl", constituencyId: "no-2", partyId: "no-cp", votePct: 35, seatsWon: 3 },
  { id: "h-no-2b", electionId: "no-parl", constituencyId: "no-2", partyId: "no-sd", votePct: 34, seatsWon: 2 },
  { id: "h-no-2c", electionId: "no-parl", constituencyId: "no-2", partyId: "no-gp", votePct: 31, seatsWon: 2 },
  { id: "h-no-3a", electionId: "no-parl", constituencyId: "no-3", partyId: "no-sd", votePct: 47, seatsWon: 4 },
  { id: "h-no-3b", electionId: "no-parl", constituencyId: "no-3", partyId: "no-gp", votePct: 38, seatsWon: 4 },
  { id: "h-no-4a", electionId: "no-parl", constituencyId: "no-4", partyId: "no-sd", votePct: 55, seatsWon: 4 },
  { id: "h-no-4b", electionId: "no-parl", constituencyId: "no-4", partyId: "no-cp", votePct: 45, seatsWon: 2 },
  // Azmaria presidency — prior cycle NF led; FM now leads round 1 (lead flip)
  { id: "h-az-1a", electionId: "az-pres", constituencyId: "az-nat", partyId: "az-nf", votePct: 46, seatsWon: 0 },
  { id: "h-az-1b", electionId: "az-pres", constituencyId: "az-nat", partyId: "az-fm", votePct: 45, seatsWon: 0 },
];

// ── Lookup helpers ──────────────────────────────────────────────────
export const partyById = (id: string | null) => (id ? parties.find((p) => p.id === id) : undefined);
export const countryById = (id: string) => countries.find((c) => c.id === id);
export const coalitionById = (id: string | null) => (id ? coalitions.find((c) => c.id === id) : undefined);
export const candidateById = (id: string) => candidates.find((c) => c.id === id);
export const constituencyById = (id: string | null) => (id ? constituencies.find((c) => c.id === id) : undefined);
export const electionById = (id: string) => elections.find((e) => e.id === id);

export const partiesByCountry = (cid: string) => parties.filter((p) => p.countryId === cid);
export const candidatesByCountry = (cid: string) => candidates.filter((c) => c.countryId === cid);
export const coalitionsByCountry = (cid: string) => coalitions.filter((c) => c.countryId === cid);
export const electionsByCountry = (cid: string) => elections.filter((e) => e.countryId === cid);

export const constituenciesByElection = (eid: string) => constituencies.filter((c) => c.electionId === eid);
export const candidaciesByElection = (eid: string) => candidacies.filter((c) => c.electionId === eid);
export const candidaciesByCountry = (cid: string) =>
  candidacies.filter((cy) => elections.find((e) => e.id === cy.electionId)?.countryId === cid);
export const candidaciesByCandidate = (candId: string) => candidacies.filter((c) => c.candidateId === candId);
export const resultsByElection = (eid: string) => results.filter((r) => r.electionId === eid);
export const historicalByElection = (eid: string) => historicalResults.filter((h) => h.electionId === eid);
