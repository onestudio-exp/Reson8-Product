# Reson8 Platform — Master Roadmap
## All Phases · All Modules · Sprint Plan · Build-Up Curve

**Prepared by:** ID8 Media · Product Engineering  
**Date:** June 2026  
**Version:** 1.0

---

## 1. Strategic Overview

Reson8 is delivered in three consecutive phases over six months. Every phase ends with a broadcast-ready release — not a milestone or a demo. Each release adds modules on top of a shared, stable Core.

### Release Milestones

| Release | End of | Modules Live | Cumulative P1 Features |
|---|---|---|:---:|
| **R1** | Month 2 | Core + ORA Elections | 64 |
| **R2** | Month 4 | + ARENA Sports + FLASH Breaking News | 113 |
| **R3** | Month 6 | + PULSE Finance + ATMOS Weather | 143 |

### Full Platform Scope — All Phases

| Layer | P1 | P2 | P3 | ∞ | Total |
|---|:---:|:---:|:---:|:---:|:---:|
| Sentra Engine | — | — | — | 12 | **12** |
| Reson8 Core | 24 | 4 | — | 5 | **33** |
| ORA — Elections | 31 | 21 | 5 | — | **57** |
| ARENA — Sports | 25 | 10 | 3 | — | **38** |
| PULSE — Finance & Markets | 18 | 7 | 2 | — | **27** |
| ATMOS — Weather | 12 | 6 | 3 | — | **21** |
| FLASH — Breaking News | 16 | 4 | 2 | — | **22** |
| **Total** | **126** | **52** | **15** | **17** | **210** |

*P1 delivery = 126 + 17 (∞) = 143 features*

---

## 2. Team & Velocity

| Role | Contribution |
|---|---|
| Technical Manager (14 years) | Architecture · code review · 60% development |
| Senior Developer 1 | Full development |
| Senior Developer 2 | Full development |
| Product Engineer | Requirements · UAT · delivery management |
| Product Manager | Scope · stakeholder · grooming |

**Effective development velocity:** 26 dev-days per 2-week sprint  
**Per phase:** 4 sprints × 26 dev-days = 104 dev-days

---

## 3. Why Elections First

Phase 1 is built on ORA Elections for four reasons:

1. **Fixed broadcast dates.** An election cannot wait for a late release. The platform must be ready before the broadcast date is set.

2. **ORA tests every platform capability.** Live data feeds, editorial chain, Vizrt graphics, breaking news detection, social sentiment, bilingual output — ORA exercises all of them. Proving ORA proves the Core.

3. **Core built for ORA is inherited by all modules.** Every architectural decision made in Phase 1 benefits Phase 2 and 3 directly. There is no rework.

4. **Commercial priority.** ORA is the flagship module. A working election broadcast system is the most compelling demonstration to any broadcaster.

---

## 4. Platform Architecture — Phase 1 Built for All Modules

The most critical architectural discipline of Phase 1: every technical decision is made with five modules in mind, not one.

Six infrastructure decisions made in Phase 1 that enable Phase 2 and Phase 3 without modification:

---

### 4.1 Module Registry

Each module (ORA · ARENA · PULSE · ATMOS · FLASH) is a self-contained domain package. It registers with Core at startup, declaring:
- Its data feeds
- Its entity types
- Its event types
- Its Vizrt template bindings

**Adding a new module requires zero changes to Core code.**

Phase 1 establishes this pattern with ORA. ARENA, FLASH, PULSE, and ATMOS register identically in Phases 2 and 3.

---

### 4.2 Feed Abstraction Layer (FAL)

A generic `DataFeedConnector` interface built in Phase 1 for ORA's official election results feed. Every future module uses the same interface — only the configuration changes.

| Phase | Module | Feed Provider |
|---|---|---|
| Phase 1 | ORA | Official election results API |
| Phase 2 | ARENA | Opta / Stats Perform |
| Phase 2 | FLASH | News wire APIs · Social APIs |
| Phase 3 | PULSE | Bloomberg / Reuters / Exchange APIs |
| Phase 3 | ATMOS | Tomorrow.io / AccuWeather / National Met |

Interface: `authenticate()` · `subscribe(fields)` · `onUpdate(handler)` · `onFailure(fallback)`  
Primary + fallback feed switching is handled by the FAL, not by individual modules.

---

### 4.3 Generic Event Pipeline

Every data event — regardless of module — flows through the same immutable processing chain:

```
Raw Feed Event
  → Ingest Service        normalize schema · deduplicate
  → Validation Service    anomaly detection · hold-and-flag (O14 · A13 · F18)
  → Sentra Enrichment     sentiment · classification · entity linking · NER
  → Editorial Queue       C1 — Producer stages
  → Approval Gate         C2 · C7 — Editor reviews and approves
  → Take to Air           C3 — Operator fires to Vizrt
  → Audit Log             C6 · C21 — immutable record
```

Event types differ (ELECTION_RESULT · MATCH_EVENT · MARKET_MOVE · WEATHER_ALERT · BREAKING_SIGNAL). The pipeline is identical. **Built once in Phase 1. Reused across all modules.**

---

### 4.4 Extensible Entity Model

Entity types are defined with inheritance in Phase 1. Future modules extend the base schema without modifying existing types.

```
Entity  (id · name · type · metadata · media · social_handles)
  │
  ├── Person
  │     ├── Candidate       ← Phase 1 (ORA)
  │     └── Player          ← Phase 2 (ARENA)
  │
  ├── Organisation
  │     ├── Party           ← Phase 1 (ORA)
  │     ├── Club / Team     ← Phase 2 (ARENA)
  │     └── Company         ← Phase 3 (PULSE)
  │
  └── Location
        ├── Constituency    ← Phase 1 (ORA)
        ├── Stadium         ← Phase 2 (ARENA)
        └── City / Region   ← Phase 3 (ATMOS)
```

---

### 4.5 Vizrt Template Registry

A central registry maps: `module → event_type → scene_id → data_container_bindings`

Pipeline logic never hardcodes a Vizrt scene ID. It queries the registry. Module templates are loaded at startup.

| Phase | Module | Scenes Registered |
|---|---|---|
| Phase 1 | ORA | Results bar · map · ticker · candidate card · seat projection |
| Phase 2 | ARENA | Score bug · events panel · stats panel · player card · table |
| Phase 2 | FLASH | Flash overlay · ticker · alert card · developing banner |
| Phase 3 | PULSE | Ticker bar · price panel · index display · gainers/losers |
| Phase 3 | ATMOS | Conditions card · forecast display · temperature map · alert overlay |

---

### 4.6 Shared Sentra Engine Client

One authenticated connection to the Sentra Engine. Established in Phase 1 Sprint 1. All modules call the same client — no reconnection, no re-authentication in Phase 2 or 3.

Shared methods available to all modules:
- `engine.sentiment(text, lang)` — multi-language sentiment scoring
- `engine.classify(event)` — breaking · developing · routine classification
- `engine.ner(text)` — named entity extraction
- `engine.generate(template, data)` — headline · caption · bilingual broadcast copy

---

### Architecture Summary

| What is built in Phase 1 | What it enables in Phase 2 & 3 |
|---|---|
| Module Registry | Add ARENA, FLASH, PULSE, ATMOS — zero Core changes |
| Feed Abstraction Layer | Plug in Opta, Bloomberg, weather APIs — same interface |
| Generic Event Pipeline | All module events processed identically — no new pipeline |
| Extensible Entity Model | Add Player, Company, City types — no schema breaking changes |
| Vizrt Template Registry | Register new module scenes at startup — no pipeline changes |
| Shared Sentra Engine Client | All modules use same Engine connection from day one |

---

## 5. Full Sprint Plan — 12 Sprints · 24 Weeks

### Phase 1 — Foundation + Core + ORA Elections (Weeks 1–8)

| Sprint | Weeks | Focus | Dev 1 (TM + Senior) | Dev 2 (Senior) | Features |
|---|:---:|---|---|---|:---:|
| **S1** | 1–2 | **Foundation** | Infrastructure · CI/CD · Sentra Engine client · Vizrt SDK | Architecture · module registry · FAL skeleton · entity model | E1–E12 (12) |
| **S2** | 3–4 | **Core: Editorial + Auth** | Editorial Chain C1–C7 · Vizrt Integration C8–C10 | Access & Security C20–C24 | +15 → **27** |
| **S3** | 5–6 | **Core: Control Room + ORA Setup** | Control Room C11–C16 · AI Content C17–C19 · Performance C25–C29 | ORA System Setup O1–O8 | +22 → **49** |
| **S4** | 7–8 | **ORA Live + UAT** | Live Results O9–O15 · Interactive Map O16–O18 | Preparations O23–O25 · Breaking O30–O31 · UAT | +15 → **64** |

**R1: End of Week 8 — Election-ready broadcast platform**

*Stretch in Sprint 4 (if capacity): ORA Entity Profiles O19–O22 + Social Sentiment O26–O29 = +8 → 72*

---

### Phase 2 — ARENA Sports + FLASH Breaking News (Weeks 9–16)

ARENA and FLASH are built in parallel. Dev 1 owns ARENA. Dev 2 owns FLASH. TM covers architecture review and integration.

| Sprint | Weeks | Dev 1 — ARENA | Dev 2 — FLASH | Features |
|---|:---:|---|---|:---:|
| **S5** | 9–10 | ORA completion (if needed) · ARENA System Setup A1–A7 | FLASH System Setup B1–B4 · Breaking Detection + Alert Queue B5–B6 | +19 → **83** |
| **S6** | 11–12 | ARENA Live Match A8–A13 · Entity Profiles A14–A16 | Multi-Source Aggregation + Verification B7–B11 | +16 → **99** |
| **S7** | 13–14 | Competition Context A17–A20 · Social A21–A23 · Breaking A24–A25 | Ticker B12 · Flash Overlay B13 · Editorial Chain B14–B16 | +14 → **113** |
| **S8** | 15–16 | QA · UAT · Integration testing | QA · UAT · Cross-module breaking feed test | — → **113** |

**R2: End of Week 16 — Elections · Sports graphics · Breaking news**

---

### Phase 3 — PULSE Finance + ATMOS Weather + Platform Completion (Weeks 17–24)

PULSE and ATMOS are built in parallel. Dev 1 owns PULSE. Dev 2 owns ATMOS. Sprints 11–12 are dedicated to full-platform QA and sign-off.

| Sprint | Weeks | Dev 1 — PULSE | Dev 2 — ATMOS | Features |
|---|:---:|---|---|:---:|
| **S9** | 17–18 | System Setup F1–F5 · Live Market Data F6–F12 | System Setup W1–W4 · Live Weather W5–W10 | +22 → **135** |
| **S10** | 19–20 | Entity Profiles F13–F14 · Social F15–F16 · Breaking F17–F18 | Breaking News W11–W12 | +8 → **143** |
| **S11** | 21–22 | Platform-wide QA · ≤4 second SLA validation across all 5 modules | Security audit · RBAC verification per role | — → **143** |
| **S12** | 23–24 | Full UAT per module · client sign-off per module | Production hardening · deployment validation | — → **143** |

**R3: End of Week 24 — Full 5-module broadcast platform**

---

## 6. Feature Master Plan — All 210 Features

### Phase and Delivery Assignment

| Module | Feature Group | P1 | P2 | P3 | Delivery Phase | Sprint(s) |
|---|---|:---:|:---:|:---:|---|:---:|
| **Sentra Engine** | All capabilities | — | — | — | Foundation | S1 |
| | 10-Language NLP (E1) | ∞ | | | | |
| | Sentiment + Emotion (E2–E3) | ∞ | | | | |
| | NER + AI Generation (E4–E5) | ∞ | | | | |
| | Real-Time Pipeline (E6) | ∞ | | | | |
| | Breaking + Anomaly (E7–E8) | ∞ | | | | |
| | Arabic Processing (E9) | ∞ | | | | |
| | Multi-Model AI (E10) | ∞ | | | | |
| | Velocity + Credibility (E11–E12) | ∞ | | | | |
| **Reson8 Core** | Editorial Chain (C1–C7) | 7 | | | Phase 1 | S2 |
| | Vizrt Integration (C8–C10) | 3 | | | Phase 1 | S2 |
| | Access & Security (C20–C24) | 5 | | | Phase 1 | S2 |
| | Control Room (C11–C16) | 6 | | | Phase 1 | S3 |
| | AI Content — P1 (C17–C19) | 3 | | | Phase 1 | S3 |
| | Performance & Reliability (C25–C29) | ∞ | | | Phase 1 | S3 |
| | Ticker Copy Generation (C30) | | 1 | | Post-R3 | — |
| | Commentary Talking Points (C31) | | 1 | | Post-R3 | — |
| | Multi-Output Management (C32) | | 1 | | Post-R3 | — |
| | Third Language Output / French (C33) | | 1 | | Post-R3 | — |
| **ORA Elections** | System Setup (O1–O8) | 8 | | | Phase 1 | S3 |
| | Live Results (O9–O15) | 7 | | | Phase 1 | S4 |
| | Interactive Map — P1 (O16–O18) | 3 | | | Phase 1 | S4 |
| | Election Preparations (O23–O25) | 3 | | | Phase 1 | S4 |
| | Breaking News — P1 (O30–O31) | 2 | | | Phase 1 | S4 |
| | Entity Profiles — P1 (O19–O22) | 4 | | | Phase 1 | S4–S5 |
| | Social Sentiment — P1 (O26–O29) | 4 | | | Phase 1 | S4–S5 |
| | Interactive Map — P2 (O32–O34) | | 3 | | Post-R3 | — |
| | Coalition Modelling (O38–O41) | | 4 | | Post-R3 | — |
| | AI Prediction Engine (O44–O48) | | 5 | | Post-R3 | — |
| | AI-Generated Briefs (O35–O37) | | 3 | | Post-R3 | — |
| | Track Record (O42–O43) | | 2 | | Post-R3 | — |
| | Viral Claim Detection (O49–O50) | | 2 | | Post-R3 | — |
| | Breaking — P2 (O51–O52) | | 2 | | Post-R3 | — |
| | Constituency Service Record (O53) | | | 1 | Future | — |
| | Social-to-Results Correlation (O54) | | | 1 | Future | — |
| | Storytelling Package (O55–O57) | | | 3 | Future | — |
| **ARENA Sports** | System Setup (A1–A7) | 7 | | | Phase 2 | S5 |
| | Live Match — P1 (A8–A13) | 6 | | | Phase 2 | S6 |
| | Entity Profiles — P1 (A14–A16) | 3 | | | Phase 2 | S6 |
| | Competition Context (A17–A20) | 4 | | | Phase 2 | S7 |
| | Social Sentiment — P1 (A21–A23) | 3 | | | Phase 2 | S7 |
| | Breaking News — P1 (A24–A25) | 2 | | | Phase 2 | S7 |
| | Live Match — P2 xG + Heatmap (A26–A28) | | 3 | | Post-R3 | — |
| | AI-Generated Match Brief (A29) | | 1 | | Post-R3 | — |
| | Match Outcome Probability (A30–A31) | | 2 | | Post-R3 | — |
| | Transfer & Injury Intelligence (A32–A33) | | 2 | | Post-R3 | — |
| | Viral Moment Detection (A34) | | 1 | | Post-R3 | — |
| | Post-Match + Season Stories (A35–A37) | | | 3 | Future | — |
| **PULSE Finance** | System Setup (F1–F5) | 5 | | | Phase 3 | S9 |
| | Live Market Data (F6–F12) | 7 | | | Phase 3 | S9 |
| | Entity Profiles (F13–F14) | 2 | | | Phase 3 | S10 |
| | Social Sentiment (F15–F16) | 2 | | | Phase 3 | S10 |
| | Breaking News (F17–F18) | 2 | | | Phase 3 | S10 |
| | Advanced Charts + Watchlist (F19–F21) | | 3 | | Post-R3 | — |
| | Economic Calendar + Earnings (F22–F23) | | 2 | | Post-R3 | — |
| | Market Sentiment Score (F24) | | 1 | | Post-R3 | — |
| | Market Stories (F25–F26) | | | 2 | Future | — |
| **ATMOS Weather** | System Setup (W1–W4) | 4 | | | Phase 3 | S9 |
| | Live Weather (W5–W10) | 6 | | | Phase 3 | S9 |
| | Breaking News (W11–W12) | 2 | | | Phase 3 | S10 |
| | Animated Maps + Radar (W13–W14) | | 2 | | Post-R3 | — |
| | Extended Forecasts + UV + Wind (W15–W18) | | 4 | | Post-R3 | — |
| | Historical + Climate Stories (W19–W21) | | | 3 | Future | — |
| **FLASH Breaking** | System Setup (B1–B4) | 4 | | | Phase 2 | S5 |
| | Live Breaking + Editorial (B5–B16) | 12 | | | Phase 2 | S6–S7 |
| | Story Priority + Clustering (B17–B20) | | 4 | | Post-R3 | — |
| | Timeline + Crisis Reconstruction (B21–B22) | | | 2 | Future | — |

---

## 7. Product Build-Up Curve

### Cumulative Features by Sprint

| Sprint | Week | Features Added | Cumulative | Broadcast Capability |
|---|:---:|:---:|:---:|---|
| S1 — Foundation | 2 | 12 | 12 | — Infrastructure only |
| S2 — Core Part 1 | 4 | 15 | 27 | — Core building |
| S3 — Core Complete + ORA Setup | 6 | 22 | 49 | — Platform ready, no module live yet |
| **S4 — ORA Live** | **8** | **15** | **64** | **✅ Elections — live results · map · editorial chain** |
| S5 — ORA Complete + Module Setups | 10 | 19 | 83 | ✅ Elections (full) |
| S6 — ARENA Live + FLASH Detection | 12 | 16 | 99 | ✅ Elections · Sports graphics · Breaking detection |
| S7 — ARENA + FLASH Complete | 14 | 14 | 113 | ✅ Elections · Sports graphics · Breaking news on air |
| **S8 — QA + UAT** | **16** | **—** | **113** | **✅ R2: 3 modules broadcast-ready** |
| S9 — PULSE + ATMOS Live | 18 | 22 | 135 | ✅ All 5 modules — initial release |
| S10 — PULSE + ATMOS Complete | 20 | 8 | 143 | ✅ All 5 modules — full feature set |
| S11 — Platform QA | 22 | — | 143 | ✅ SLA validated · security audited |
| **S12 — UAT + Sign-off** | **24** | **—** | **143** | **✅ R3: Full platform production-ready** |

### Visual Curve

```
Cumulative Features (∎ = 5 features)

Wk  2  ∎∎                                                  12   Foundation
Wk  4  ∎∎∎∎∎                                               27   Core Part 1
Wk  6  ∎∎∎∎∎∎∎∎∎∎                                          49   Core Complete
Wk  8  ∎∎∎∎∎∎∎∎∎∎∎∎∎    ◄ R1 Elections Live                64
Wk 10  ∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎                                   83   + ORA Full + Module Setups
Wk 12  ∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎                                99   + ARENA + FLASH Mid
Wk 14  ∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎                            113   + ARENA + FLASH Complete
Wk 16  ∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎    ◄ R2 3 Modules Live    113   QA Sprint
Wk 18  ∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎                        135   + PULSE + ATMOS Live
Wk 20  ∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎                      143   All 5 Modules Complete
Wk 22  ∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎                      143   Platform QA
Wk 24  ∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎    ◄ R3 Full         143   Production Ready
```

### Capability Progression

| Release | Month | Modules | What broadcasts are covered |
|---|:---:|---|---|
| R1 | 2 | Core + ORA | Any election broadcast — results, map, seat tally, social sentiment |
| R2 | 4 | + ARENA + FLASH | Elections + any live sports match + any breaking news event |
| R3 | 6 | + PULSE + ATMOS | Full platform — elections · sports · markets · weather · breaking |

---

## 8. Phase Summaries

### Phase 1 — Foundation + Core + ORA Elections
**Month 1–2 · 4 sprints · 64 features committed**

The most technically significant phase. Every line of architecture written here shapes the platform for three years.

Sprint 1 is not about features — it is about correctness. Module registry, FAL, event pipeline, entity model, Sentra Engine client, and Vizrt template registry must all be designed for five modules, not one.

Sprint 2–3 complete the Reson8 Core — 29 features shared by all modules, built once.

Sprint 4 brings ORA live. By end of Week 8 the platform can ingest an official election results feed, route each result through the editorial chain, generate a bilingual graphic, and fire it to a Vizrt renderer in under 4 seconds.

---

### Phase 2 — ARENA Sports + FLASH Breaking News
**Month 3–4 · 4 sprints · +49 features**

The two modules run in parallel. ARENA is data-driven (structured feed from Opta/Stats Perform). FLASH is signal-driven (unstructured detection from social and wire). They share nothing except the Core editorial chain — which is already built.

By end of Week 16, the platform covers every live sports match event (goal, card, substitution, VAR, stats, standings) and classifies breaking news across 10 languages in real time before surfacing it to the editorial queue.

---

### Phase 3 — PULSE Finance + ATMOS Weather + Platform Completion
**Month 5–6 · 4 sprints · +30 features + QA**

PULSE and ATMOS are the lowest-risk phase. Core is proven across 3 modules. The Feed Abstraction Layer has handled elections results APIs (O5), Opta (A5), and news wire APIs (B1). Plugging in Bloomberg/Reuters (F3) and Tomorrow.io (W2) is configuration, not architecture.

Sprints 11–12 are reserved entirely for:
- Platform-wide SLA validation (≤4 seconds, all 5 modules, under load)
- Security audit and RBAC verification
- Full UAT per module
- Production deployment validation

By end of Week 24: 143 features delivered, 5 modules live, platform production-ready.

---

## 9. Post-R3 — Intelligence Layer

After R3, the platform enters its intelligence phase. 67 additional features across P2 and P3.

### P2 — Intelligence Layer (52 features)

| Module | Feature Groups | Features |
|---|---|:---:|
| Core | Ticker Copy · Commentary Talking Points · Multi-Output · French Output | 4 |
| ORA | AI Predictions · Coalition Modelling · Swing Maps · AI Briefs · Track Record · Viral Detection | 21 |
| ARENA | xG · Heatmaps · Match Outcome Probability · Transfer Intelligence · Viral Moments | 10 |
| PULSE | Advanced Charts · Economic Calendar · Earnings Dashboard · Market Sentiment | 7 |
| ATMOS | Animated Maps · Radar · Extended Forecast · Wind Map · UV Map | 6 |
| FLASH | Story Priority · Clustering · Escalation Detection · Archive | 4 |
| **Total P2** | | **52** |

### P3 — Storytelling & Distribution (15 features)

| Module | Feature Groups | Features |
|---|---|:---:|
| ORA | Election Night Story Builder · Post-Election Analysis · Historical Trend Analysis · Social-to-Results Correlation · Constituency Service Record | 5 |
| ARENA | Post-Match Package · Season Deep Dive · Historical Records | 3 |
| PULSE | Market Story Builder · IPO / Earnings Tracker | 2 |
| ATMOS | Historical Weather Comparison · Climate Trend · Weather Impact Stories | 3 |
| FLASH | Breaking News Timeline Builder · Crisis Reconstruction | 2 |
| **Total P3** | | **15** |

---

## 10. Definition of Done — Each Release

### R1 Complete when:
- Full editorial chain tested end-to-end: Producer → Editor → Operator → Vizrt → On-air
- Live election results feed ingested, validated, and on screen in ≤4 seconds
- Geographic results map live with party colour fills
- Arabic + English bilingual output validated
- RBAC verified per role (Producer / Editor / Operator / Admin)
- UAT signed off on all ORA P1 features

### R2 Complete when:
- ARENA: live match data (score · events · stats) on air in ≤4 seconds from official feed
- FLASH: breaking event detected, classified, surfaced to editorial queue, and on air within editorial SLA
- Cross-module editorial chain tested (ORA + ARENA + FLASH simultaneously)
- All 3 modules passing UAT

### R3 Complete when:
- All 143 P1 features implemented and passing acceptance criteria
- ≤4 second wire-to-air SLA validated under load across all 5 modules
- Security audit passed
- 99.99% uptime architecture verified
- All 10 languages processing correctly through the Engine
- UAT signed off per module
- Production deployment validated on-premises or cloud per client requirement

---

*ID8 Media · info@id8media.com · Qatar: +974 6626 4422*  
*Reson8 Platform — Master Roadmap · June 2026*
