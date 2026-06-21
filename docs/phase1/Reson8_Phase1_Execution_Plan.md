# Reson8 Platform — Phase 1 Execution Plan
## Foundation + Reson8 Core + ORA Elections

**Prepared by:** ID8 Media · Product Engineering  
**Date:** June 2026  
**Version:** 2.0 — Revised for 2-person team

---

## 1. Team & Velocity

### Team Composition

| Role | Primary Responsibility | Dev Contribution |
|---|---|:---:|
| Tech Engineer | Backend · APIs · Integrations · Architecture · Deployment | 10 dev-days / sprint |
| Product Engineer | Requirements · Frontend/UI · Configuration · UAT · Delivery | 3 dev-days / sprint |

**Effective development velocity: 13 dev-days per sprint**

### Velocity Comparison

| Team Configuration | Dev-Days / Sprint | Phase 1 Duration |
|---|:---:|:---:|
| Original (TM + 2 Senior Devs + Product + PM) | 26 | 2 months |
| **Revised (Tech Engineer + Product Engineer)** | **13** | **4 months** |

The scope of Phase 1 is unchanged. The timeline doubles. No shortcuts are taken on Core — a weak Core delays every module that follows it.

---

## 2. Phase 1 Scope

### Committed (64 features)

| Layer | Feature Groups | Features |
|---|---|:---:|
| Sentra Engine | All 12 engine capabilities — always active | 12 |
| Reson8 Core | Editorial Chain · Vizrt Integration · Control Room · AI Content · Auth & Security · Performance | 29 |
| ORA — System Setup | Election config · Candidate & party databases · Constituency mapping · Results feed · Thresholds · Templates | 8 |
| ORA — Live Results | Vote count · Seat tally · Lead/trail · Constituency drill-down · Validation · Comparative | 7 |
| ORA — Interactive Map | National map · Regional drill-down · Party colour fills | 3 |
| ORA — Election Preparations | Historical data · Polling integration · Template pre-load | 3 |
| ORA — Breaking News | Elections breaking feed · Results threshold alert | 2 |
| **Total Committed** | | **64** |

### Stretch — Sprint 8 if capacity allows (+8 features → 72)

| Feature Group | Features |
|---|:---:|
| ORA — Entity Profiles | Candidate card · Party card · Candidate social sentiment · Candidate media presence | 4 |
| ORA — Social Sentiment | Election social listening · Candidate sentiment comparison · Party sentiment trend · Hashtag tracking | 4 |

---

## 3. Division of Work

The two roles have a clear, non-overlapping lane. No coordination overhead, no stepping on each other's work.

| Tech Engineer owns | Product Engineer owns |
|---|---|
| Backend logic · API endpoints · state machines | Frontend UI · forms · dashboards · display components |
| Database schema · queries · migrations | Configuration UIs · wizard flows · admin panels |
| Sentra Engine client + all AI integrations | Notification system UI · alert displays |
| Vizrt SDK binding + scene data push | Vizrt template library preparation + scene field mapping |
| Election results feed connector (FAL) | Editorial queue UI · approval screens · operator buttons |
| Auth + RBAC backend (JWT · 2FA · SSO) | Auth UI (login · 2FA flow · magic link) |
| Performance + redundancy + failover architecture | SLA monitoring display |
| Deployment (on-prem or cloud) | UAT planning · test execution · sign-off documentation |

---

## 4. Sprint Plan — 8 Sprints · 16 Weeks · 4 Months

---

### Sprint 1 — Foundation (Weeks 1–2)

**Goal:** A running project with all integrations connected and the core architecture established. No features delivered yet — everything that makes every subsequent sprint possible.

| Owner | Work |
|---|---|
| **Tech Engineer** | Project architecture (monorepo · directory structure · CI/CD) · Database design (entity schema · multi-tenant isolation) · Sentra Engine API client (connect · authenticate · test all methods) · Vizrt SDK installation + first renderer connection test · Module registry skeleton · Feed Abstraction Layer interface · Generic event pipeline skeleton |
| **Product Engineer** | Requirements lock for Core and ORA · Election results feed API documentation review · Vizrt scene inventory (available scenes · exposed fields · data containers) · Development and staging environment setup · Sprint 2 ticket preparation |

**Milestone:** Sentra Engine connected · Vizrt SDK talking to renderer · Dev environment live  
**Features:** Sentra Engine E1–E12 (12) → **Cumulative: 12**

---

### Sprint 2 — Core: Editorial Chain + Vizrt Integration (Weeks 3–4)

**Goal:** The editorial pipeline is working end-to-end. A producer can stage a graphic, an editor can approve it, and an operator can fire it to Vizrt. The audit trail records every action.

| Owner | Work |
|---|---|
| **Tech Engineer** | C1 Producer queue backend · C2 Editor approval backend · C3 Operator take-to-air (Vizrt trigger + audit log) · C4 Reject & revise workflow · C6 Editorial audit trail (immutable log) · C7 Editorial review gate (AI content block) · C8 Vizrt scene binding (data container mapping) · C9 Direct data feed to Vizrt (real-time push) · C10 Viz engine output (renderer interface) |
| **Product Engineer** | C5 Live/preview separation UI · Producer queue UI (graphic list · stage button · data form) · Editor approval UI (approve / reject / annotation) · Operator take-to-air UI (fire button · confirmation screen) · QA Sprint 1 infrastructure |

**Features:** C1–C10 (+10) → **Cumulative: 22**

---

### Sprint 3 — Core: Auth + Control Room (Weeks 5–6)

**Goal:** The platform is secured with full role-based access. The control room dashboard gives operators a live view of everything on air and in the queue.

| Owner | Work |
|---|---|
| **Tech Engineer** | C20 RBAC backend (role definitions · permission scopes · middleware) · C21 Audit logging (all platform events · tamper-proof) · C22 Multi-tenant architecture (data isolation · tenant-scoped queries) · C24 Broadcast security & auth (JWT · OTP · 2FA · SSO · magic link) · C11 Control Room dashboard backend · C12 Multi-screen management backend · C13 Operator role assignment backend |
| **Product Engineer** | C23 Notification system (in-app + push · configurable per user) · C14 Real-time status monitor UI (on-air indicator · queue depth · next-up preview) · Login and auth UI (JWT · 2FA flow · magic link) · RBAC admin UI (role assignment · permission view) · Control Room dashboard UI (status panels · queue view) |

**Features:** C11–C14, C20–C24 (+11) → **Cumulative: 33**

---

### Sprint 4 — Core: Control Room (cont.) + AI Content + Performance (Weeks 7–8)

**Goal:** Core is complete. Emergency controls are live. AI-generated content flows through the editorial gate. The platform meets its performance and reliability targets.

| Owner | Work |
|---|---|
| **Tech Engineer** | C15 Emergency override backend (senior editor clear logic) · C16 Broadcast event log · C17 Auto-generated headline (Sentra Engine call · character-limit aware · editorial queue) · C18 Lower-third caption generation (template-aware · Sentra Engine) · C19 Bilingual broadcast text (Arabic + English · RTL layout) · C25 ≤4 second SLA architecture (message queue · latency instrumentation) · C26–C28 Redundancy + failover (primary/fallback feed switching · Vizrt output failover) · C29 Deployment configuration |
| **Product Engineer** | Emergency override UI · Broadcast event log UI (timeline · export) · AI content display UI (headline view · caption edit field) · Bilingual text UI (Arabic / English side-by-side) · SLA monitoring display · QA Sprint 2–3 Core features |

**Milestone: Reson8 Core complete — 29 features, all editorial chain, all security, full Vizrt integration**  
**Features:** C15–C19, C25–C29 (+8) → **Cumulative: 41**

---

### Sprint 5 — ORA: System Setup (Weeks 9–10)

**Goal:** A complete election can be configured in the system. Candidates, parties, constituencies, and results feed are all live. Templates are pre-bound. The system is ready for results night.

| Owner | Work |
|---|---|
| **Tech Engineer** | O1 Election configuration wizard backend (election type · rules engine · seat count) · O2 Candidate database backend (CRUD · bulk import · photo storage) · O3 Party database backend (colours · symbols · leadership) · O4 Constituency mapping backend (geospatial · seat allocation · hierarchy) · O5 Results feed integration (FAL connector · field mapping · validation · health monitor · fallback) · O6 Threshold alert backend (majority · seat milestones · concession triggers) · O8 Pre-election baseline load backend (historical data ingestion · polling feed connector) |
| **Product Engineer** | O1 Election wizard UI (step-by-step configuration flow) · O2–O3 Database management UI (candidate/party add · edit · bulk import) · O4 Constituency mapping UI · O6 Threshold alert configuration UI · O7 Vizrt template library binding (bind scene data fields to data containers · assign scenes to event types) · O8 Baseline load UI (historical upload · polling integration display) |

**Features:** O1–O8 (+8) → **Cumulative: 49**

---

### Sprint 6 — ORA: Live Results (Weeks 11–12)

**Goal:** Live election results flow from the official feed, through validation, into the editorial queue, and out to Vizrt in under 4 seconds. Every result type — vote count, seat tally, constituency drill-down, comparative — is working.

| Owner | Work |
|---|---|
| **Tech Engineer** | O9 Real-time vote count pipeline (feed → validate → process → Vizrt push) · O10 Seat tally computation (running totals · majority threshold logic) · O11 Lead/trail indicators (ranking logic · gain/loss vs prior election) · O12 Results by constituency (drill-down data model · aggregation queries) · O13 Progressive results update (% precincts reporting · confidence calculation) · O14 Results validation layer (anomaly detection · hold-and-flag · editor confirmation required) · O15 Comparative results (current vs prior election · swing calculation) |
| **Product Engineer** | Vote count display UI (percentage bars · absolute numbers · live update) · Seat tally UI (bar chart · majority threshold line) · Lead/trail UI (ranked list · gain/loss markers) · Constituency drill-down UI (sortable · filterable · breadcrumb navigation) · Progressive results UI (% reporting badge · confidence indicator) · Comparative results UI (side-by-side view) · UAT of Sprint 5 — ORA System Setup |

**Features:** O9–O15 (+7) → **Cumulative: 56**

---

### Sprint 7 — ORA: Interactive Map + Preparations + Breaking (Weeks 13–14)

**Goal:** The geographic map is live with party colour fills and regional drill-down. Historical and polling data are loaded. Breaking alerts and threshold triggers are wired to the editorial queue. ORA is feature-complete for broadcast night.

| Owner | Work |
|---|---|
| **Tech Engineer** | O16 Geographic results map backend (map data service · winning-party fill logic · live update) · O17 Regional drill-down (geospatial hierarchy · click-through queries · National → Province → District) · O18 Colour-coded party performance (party database → map fill · automatic) · O23 Historical election data service · O24 Polling data integration backend · O25 Graphics template pre-load verification (all ORA scenes pre-bound · zero-setup test) · O30 Elections breaking feed (filtered breaking stream · severity classification · FLASH integration) · O31 Results threshold alert backend (trigger at configured milestone · editorial queue routing) |
| **Product Engineer** | Geographic map UI (colour-filled national map · live update animation) · Regional drill-down UI (click-through · breadcrumb · back navigation) · Historical data display UI · Polling data display UI · Breaking feed UI (alert list · severity badge) · Threshold alert notification UI · UAT of Sprint 6 — Live Results |

**Features:** O16–O18, O23–O25, O30–O31 (+8) → **Cumulative: 64**

---

### Sprint 8 — Integration QA + UAT + Hardening (Weeks 15–16)

**Goal:** The full platform is tested end-to-end under realistic conditions. Every committed feature passes acceptance criteria. The system is production-ready.

| Owner | Work |
|---|---|
| **Tech Engineer** | End-to-end SLA test: results feed → editorial queue → Vizrt on screen in ≤4 seconds · Load test: concurrent results feed + multiple simultaneous editors · Security hardening: auth audit · RBAC boundary testing · Feed redundancy test: primary fail → fallback auto-switch · Bug fixes from UAT · **Stretch (if time):** O19–O22 Entity Profiles backend |
| **Product Engineer** | Full UAT execution — all 64 committed features · UAT sign-off documentation · Deployment validation (on-prem or cloud per client) · Demo preparation · **Stretch (if time):** O19–O22 Entity Profiles UI · O26–O29 Social Sentiment UI |

**Milestone: R1 — Election-ready broadcast platform**  
**Features:** 0 net new (or +8 stretch) → **Cumulative: 64–72**

---

## 5. Build-Up Curve — Phase 1

| Sprint | Week | Owner doing what | Features Added | Cumulative | Status |
|---|:---:|---|:---:|:---:|---|
| S1 | 2 | Tech: architecture + integrations · Product: requirements + environment | 12 | 12 | Infrastructure live |
| S2 | 4 | Tech: editorial pipeline + Vizrt · Product: editorial UI | 10 | 22 | Editorial chain working |
| S3 | 6 | Tech: auth + control room · Product: auth UI + control room UI | 11 | 33 | Platform secured |
| S4 | 8 | Tech: AI content + performance · Product: AI UI + QA | 8 | **41** | **Core complete** |
| S5 | 10 | Tech: ORA feed + databases · Product: ORA config UI + templates | 8 | 49 | Election configurable |
| S6 | 12 | Tech: live results pipeline · Product: results UI + UAT S5 | 7 | 56 | Results on screen |
| S7 | 14 | Tech: map + breaking + alerts · Product: map UI + UAT S6 | 8 | **64** | **ORA feature-complete** |
| S8 | 16 | Tech: QA + hardening + stretch · Product: UAT + sign-off + stretch | 0–8 | **64–72** | **R1 Production-ready** |

```
Phase 1 Build-up (∎ = 5 features)

Wk  2   ∎∎                             12    Foundation
Wk  4   ∎∎∎∎                           22    + Editorial Chain + Vizrt
Wk  6   ∎∎∎∎∎∎                         33    + Auth + Control Room
Wk  8   ∎∎∎∎∎∎∎∎   ◄ Core complete     41
Wk 10   ∎∎∎∎∎∎∎∎∎∎                     49    + ORA System Setup
Wk 12   ∎∎∎∎∎∎∎∎∎∎∎                    56    + ORA Live Results
Wk 14   ∎∎∎∎∎∎∎∎∎∎∎∎∎  ◄ ORA complete  64
Wk 16   ∎∎∎∎∎∎∎∎∎∎∎∎∎  ◄ R1 live       64    Production-ready
```

---

## 6. Key Architecture Decisions — Sprint 1

Sprint 1 is the most important sprint of the entire project. The decisions made here determine whether Phases 2 and 3 (ARENA, FLASH, PULSE, ATMOS) add modules quickly or require rework.

The following must be built correctly in Sprint 1:

| Decision | What it enables |
|---|---|
| **Module Registry** | Adding ARENA, FLASH, PULSE, ATMOS in Phase 2–3 requires zero Core changes |
| **Feed Abstraction Layer** | Opta, Bloomberg, weather APIs plug in using the same connector — only configuration differs |
| **Generic Event Pipeline** | MATCH_EVENT, MARKET_MOVE, WEATHER_ALERT, BREAKING_SIGNAL all flow through the same chain |
| **Extensible Entity Model** | Player, Company, City added in Phase 2–3 without breaking the Candidate/Party schema |
| **Vizrt Template Registry** | ARENA, FLASH, PULSE, ATMOS scenes registered at startup — pipeline never hardcodes a scene ID |
| **Shared Sentra Engine Client** | One connection, all modules — no reconnection work in Phase 2 or 3 |

---

## 7. Definition of Done — R1

Phase 1 is complete when **all of the following** are confirmed:

- [ ] Full editorial chain tested end-to-end: Producer → Editor → Operator → Vizrt → On screen
- [ ] Live election results feed ingested, validated, and on screen in **≤ 4 seconds**
- [ ] Geographic results map live with correct party colour fills and regional drill-down
- [ ] Arabic + English bilingual output validated on all graphic types
- [ ] RBAC verified: Producer cannot approve · Editor cannot take to air · Operator cannot approve
- [ ] Audit trail records every action (who · what · when) — immutable
- [ ] Primary feed failure → automatic fallback switch within SLA
- [ ] Emergency override tested: clears queued graphic instantly
- [ ] Multi-tenant isolation verified: tenant A cannot access tenant B data
- [ ] Deployment validated on client infrastructure (on-prem or cloud)
- [ ] All 64 committed features passing UAT acceptance criteria
- [ ] UAT sign-off completed by Product Engineer

---

## 8. Full Platform Timeline — Revised

With a 2-person team, Phases 2 and 3 can no longer be fully parallelised. Estimated delivery:

| Phase | Content | Duration | Cumulative Month |
|---|---|:---:|:---:|
| Phase 1 | Foundation + Core + ORA Elections | 4 months | Month 4 |
| Phase 2 | ARENA Sports + FLASH Breaking News | 4 months | Month 8 |
| Phase 3 | PULSE Finance + ATMOS Weather + Full QA | 3 months | Month 11 |

**Full platform: approximately 11 months with a 2-person team.**

To compress the timeline, the most effective lever is adding one senior developer. That restores parallel module development in Phase 2 and 3 and reduces full delivery back to approximately 6–7 months.

---

*ID8 Media · info@id8media.com · Qatar: +974 6626 4422*  
*Reson8 Platform — Phase 1 Execution Plan · June 2026*
