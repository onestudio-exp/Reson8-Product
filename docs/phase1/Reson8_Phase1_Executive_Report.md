# Reson8 Platform
## Phase 1 — Executive Report

**Prepared by:** ID8 Media · Product Engineering  
**Date:** May 2026  
**Version:** 1.0

---

## Executive Summary

Reson8 is an end-to-end broadcast intelligence platform that converts live world events into on-air Vizrt graphics in under 4 seconds — fully reviewed by editorial teams, in any of 10 supported languages.

Phase 1 delivers a production-ready broadcast platform across five content modules: Elections, Sports, Finance & Markets, Weather, and Breaking News. Every module is built on a shared editorial core — the same Producer → Editor → Operator → Take to Air chain, the same Vizrt integration, and the same control room — powered throughout by the Sentra AI Engine.

Phase 1 is the complete, shippable product. It is not a prototype.

---

## Platform Architecture

```
        SENTRA ENGINE  ─────────────────────────────────
        10-Language AI Core · Always Active              │
                │                                        │
        RESON8 PLATFORM                          SENTRA PLATFORM
        Editorial Chain · Vizrt · Control Room   (Separate product)
                │
   ┌────┬───────┬───────┬───────┐
   │    │       │       │       │
  ORA ARENA  PULSE  ATMOS  FLASH
```

**Core pipeline — same for every module:**

> Ingest → Contextualize (Sentra AI) → Generate → Review (Editorial) → Take to Air (Vizrt)

**One non-negotiable rule:** A human decision — the Editor's approval — is always the final step before any graphic reaches air.

---

## Phase 1 Scope at a Glance

| Layer | Features | Notes |
|---|:---:|---|
| Sentra Engine | 12 | Always active · no activation required |
| Reson8 Core | 29 | Shared across all 5 modules · built once |
| ORA — Elections | 31 | Flagship module |
| ARENA — Sports | 25 | Football-first |
| PULSE — Finance & Markets | 18 | Live market data |
| ATMOS — Weather | 12 | Severe weather alerts |
| FLASH — Breaking News | 16 | Real-time breaking detection |
| **Total** | **143** | |

---

## Language Support — Approved 10 Languages

| Group | Languages |
|---|---|
| UN Core (6) | English · Arabic · French · Spanish · Russian · Chinese |
| Regional (4) | German · Portuguese · Persian · Turkish |

**Monitoring (input):** All 10 languages — the Engine reads, understands, and analyses content arriving in any of the 10 languages across social media, news wires, and data feeds.

**Broadcast output:** Arabic and English as primary · French as optional third output language for North Africa markets.

---

## Module 1 — ORA Elections

**Tagline:** Wire to on-air election results in 4 seconds.

### What Phase 1 Delivers

| Feature Group | Features | Description |
|---|:---:|---|
| System Setup | 8 | Election config · candidate & party databases · constituency mapping · results feed integration · Vizrt scene assignment |
| Live Results | 7 | Real-time vote counts · seat tally · lead/trail indicators · constituency drill-down · results validation |
| Interactive Map | 3 | Geographic results map · regional drill-down · colour-coded party performance |
| Entity Profiles | 4 | Candidate & party profile cards · social sentiment · media presence |
| Election Preparations | 3 | Historical data · polling integration · template pre-load |
| Social Sentiment | 4 | Election social listening · candidate & party sentiment · hashtag tracking |
| Breaking News | 2 | Elections breaking feed · results threshold alert |
| **Total** | **31** | |

### Key Capabilities
- Official results feed ingested, validated, and on-air in ≤4 seconds
- Results validation layer flags anomalous data before it reaches the editorial queue
- Candidate and party social sentiment running in real time alongside official results
- All graphics bilingual Arabic + English simultaneously
- Full editorial audit trail — every on-air action immutably logged

---

## Module 2 — ARENA Sports

**Tagline:** Every goal, card, and stat on air before the crowd stops reacting.

### What Phase 1 Delivers

| Feature Group | Features | Description |
|---|:---:|---|
| System Setup | 7 | Competition config · team & player databases · match schedule · Opta/Stats Perform integration |
| Live Match | 6 | Live score · match clock · match events (goals/cards/subs/VAR) · basic stats · validation |
| Entity Profiles | 3 | Player & team profile cards · player social sentiment |
| Competition Context | 4 | League table · form guide · head-to-head · top scorers |
| Social Sentiment | 3 | Match social listening · team sentiment comparison · trending hashtags |
| Breaking News | 2 | Sports breaking feed · match alert |
| **Total** | **25** | |

### Key Capabilities
- Every match event (goal, card, substitution, VAR) automatically enters the editorial queue the moment it is reported by the official data feed
- Live league table and top scorers updated after every result
- Fan sentiment tracked per team throughout the match window
- Score bug, stats panels, player cards — all native Vizrt scenes

---

## Module 3 — PULSE Finance & Markets

**Tagline:** Market moves on screen before the ticker scrolls.

### What Phase 1 Delivers

| Feature Group | Features | Description |
|---|:---:|---|
| System Setup | 5 | Market config · instrument database · Bloomberg/Reuters feed integration · alert thresholds |
| Live Market Data | 7 | Live prices · indices · gainers/losers · FX rates · commodities · market status · open/close events |
| Entity Profiles | 2 | Company & index profile cards |
| Social Sentiment | 2 | Market social listening · instrument sentiment |
| Breaking News | 2 | Financial breaking feed · market threshold alert |
| **Total** | **18** | |

### Key Capabilities
- Live prices, indices, FX, and commodities from Bloomberg / Reuters / exchange APIs
- Automatic alert and graphic trigger when any instrument crosses a configured threshold
- Market open and close events fire graphics automatically into the editorial queue
- Investor sentiment from social and financial news running in real time alongside price data

---

## Module 4 — ATMOS Weather

**Tagline:** Severe weather on screen before the public gets the alert.

### What Phase 1 Delivers

| Feature Group | Features | Description |
|---|:---:|---|
| System Setup | 4 | Coverage area config · weather API integration · template library · severe alert thresholds |
| Live Weather | 6 | Current conditions · 3/7-day forecast · temperature map · severe alerts · weather symbols · city cards |
| Breaking News | 2 | Severe weather breaking alert · editorial queue routing |
| **Total** | **12** | |

### Key Capabilities
- Current conditions, forecast, and temperature maps for all configured cities updated continuously
- Severe weather warnings from national meteorological authorities route directly to the editorial queue — the editor sees the alert before it is public
- Full standardised weather symbol library built into Vizrt scenes

---

## Module 5 — FLASH Breaking News

**Tagline:** Breaking detected across 10 languages before a journalist spots it.

### What Phase 1 Delivers

| Feature Group | Features | Description |
|---|:---:|---|
| System Setup | 4 | Source config · severity classification · template library · keyword & topic alerts |
| Live Breaking | 9 | Breaking detection · alert queue · severity display · multi-source aggregation · source attribution · geographic tag · cross-source verification · ticker · flash overlay |
| Editorial Chain | 3 | Breaking confirmation workflow · audit trail · developing story tracker |
| **Total** | **16** | |

### Key Capabilities
- Sentra Engine classifies breaking events across social and news simultaneously in all 10 languages — no manual monitoring required
- Severity automatically classified: Major Breaking / Breaking / Developing
- Cross-source verification confirms a story across independent sources before flagging
- Developing story thread maintained and updated as new information arrives
- Nothing goes to air without editor confirmation — the full editorial chain applies to breaking news

---

## Reson8 Core — Shared Platform

All five modules inherit the full Reson8 Core. It is built once.

### Editorial Chain (7 features)
Producer Preparation Queue · Editor Approval Layer · Operator Take to Air · Reject & Revise Workflow · Live/Preview Separation · Editorial Audit Trail · Editorial Review Gate

### Vizrt Integration (3 features)
Vizrt Scene Binding · Direct Data Feed to Vizrt · Viz Engine Output

### Control Room (6 features)
Control Room Dashboard · Multi-Screen Management · Operator Role Assignment · Real-Time Status Monitor · Emergency Override · Broadcast Event Log

### AI Content Generation (3 features)
Auto-Generated Headline · Lower-Third Caption Generation · Bilingual Broadcast Text (Arabic + English)

### Access & Security (5 features)
Role-Based Access Control · Audit Logging · Multi-Tenant Architecture · Notification System · Broadcast Security & Auth

### Performance & Reliability (5 features)
≤4 Second Wire-to-Air SLA · 99.99% Uptime · Feed Redundancy · Broadcast Output Failover · On-Prem or Cloud Deployment

---

## Team & Delivery Estimate

### Team Composition

| Role | Capacity |
|---|---|
| Technical Manager (14 years) | Architecture · code review · 60% development |
| Senior Developer 1 | Full development |
| Senior Developer 2 | Full development |
| Product Engineer | Requirements · UAT · delivery management |
| Product Manager | Scope · stakeholder · grooming |

**Effective development velocity:** 26 dev-days per 2-week sprint

### Recommended Delivery Sequence

| Stage | Sprints | Weeks | Content |
|---|:---:|:---:|---|
| 1 — Foundation | 1 – 2 | 1 – 4 | Architecture · infrastructure · Sentra Engine connection · Vizrt SDK |
| 2 — Reson8 Core | 3 – 6 | 5 – 12 | Editorial chain · control room · AI content · security · performance |
| 3 — ORA Elections | 7 – 10 | 13 – 20 | Full elections module · all 31 P1 features |
| 4 — ARENA + FLASH | 11 – 13 | 21 – 26 | Sports and breaking news in parallel |
| 5 — PULSE + ATMOS | 14 – 15 | 27 – 30 | Finance and weather in parallel |
| 6 — QA · UAT · Hardening | 16 – 17 | 31 – 34 | Full system testing · SLA validation · security audit |

### Headline Timeline

| Delivery | Timeline | Content |
|---|---|---|
| **Release 1** | Month 6 | Core + ORA Elections · first client ready |
| **Release 2** | Month 9 | All 5 modules · full platform live |

---

## What Phase 1 Deliberately Excludes

Deferred to Phase 2 and Phase 3 to keep the P1 scope focused and deliverable:

| Feature | Deferred to |
|---|---|
| AI Prediction Engine (all modules) | P2 |
| Swing Analysis & Turnout Map | P2 |
| Coalition & Seat Mathematics | P2 |
| Expected Goals (xG) | P2 |
| AI-Generated Candidate & Player Briefs | P2 |
| Viral Claim Detection | P2 |
| Commentary Talking Points | P2 |
| Ticker Copy Generation | P2 |
| Multi-Output Management | P2 |
| Transfer & News Intelligence (Sports) | P2 |
| Advanced Market Analytics | P2 |
| Social-to-Results Correlation | P3 |
| Constituency Service Records | P3 |

---

## Definition of Done — Phase 1

Phase 1 is complete when:

- All 143 features are implemented and passing acceptance criteria
- ≤4 second wire-to-air SLA validated under load for all 5 modules
- Full editorial chain tested end-to-end: Producer → Editor → Operator → Vizrt → On-air
- All 10 languages processing correctly through the Engine
- Security audit passed · RBAC verified per role
- UAT signed off per module by the product team
- Deployment validated on-premises or cloud per client requirement

---

*ID8 Media · info@id8media.com · Qatar: +974 6626 4422*  
*Reson8 Platform — Phase 1 Executive Report · May 2026*
