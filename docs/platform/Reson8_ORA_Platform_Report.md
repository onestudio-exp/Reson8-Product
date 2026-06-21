# Reson8 Platform & ORA Elections System
## Comprehensive Product Definition Report

**Prepared by:** Product Engineering  
**Date:** May 2026  
**Classification:** Internal Working Document

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Platform Architecture Overview](#2-platform-architecture-overview)
3. [Sentra Engine — The Shared AI Foundation](#3-sentra-engine--the-shared-ai-foundation)
4. [Commercial Model — Two Products, One Engine](#4-commercial-model--two-products-one-engine)
5. [ORA Elections Module — Feature Definition](#5-ora-elections-module--feature-definition)
6. [Elections Feature Table — System Attribution & Phase Map](#6-elections-feature-table--system-attribution--phase-map)
7. [Value Analysis: Reson8 Only vs. Reson8 + Sentra Platform](#7-value-analysis-reson8-only-vs-reson8--sentra-platform)
8. [Conclusions & Recommendations](#8-conclusions--recommendations)

---

## 1. Executive Summary

Reson8 is an end-to-end broadcast intelligence platform that turns live world events into on-air broadcast graphics in ≤4 seconds, in any language, fully reviewed by editorial teams. It is purpose-built for MENA newsroom control rooms and uses the Sentra AI Engine as its inseparable intelligence backbone.

The system is organised across four distinct layers:

- **Sentra Engine** — the shared AI core that cannot be separated from either product
- **Sentra Platform** — an AI-powered intelligence operations platform sold separately to governments, ministries, and media organisations
- **Reson8 Platform** — the broadcast production platform sold to TV networks, with five content modules
- **ORA System** — the elections-specific application within Reson8; Reson8's flagship module

ORA covers the complete broadcast journey: ingesting live official results feeds, contextualising them through Sentra AI, routing them through a structured editorial approval chain, and firing native Vizrt graphics — all within a 4-second wire-to-air SLA. ORA is the only elections broadcast system built on a live AI intelligence engine, which means the same pipeline that processes official results data is also processing social sentiment, detecting viral narratives, and generating bilingual broadcast copy in real time.

This report defines the complete feature set of the ORA elections system, maps each feature to its system origin (Engine / Sentra Platform / Reson8), and establishes the phased delivery roadmap for implementation.

**Key numbers:**
- **131** elections-scoped features defined
- **23** powered by Sentra Engine alone (always included)
- **24** shared capabilities across both products
- **84** Reson8 / ORA exclusive features
- **4 seconds** wire-to-air SLA on election night
- **5 feature phases:** P1 Core · P2 Intelligence Layer · P3 Storytelling & Distribution · ∞ Infrastructure · S Sentra stages

---

## 2. Platform Architecture Overview

### The Four Nodes

```
┌─────────────────────────────────────────────────────────────┐
│                      SENTRA ENGINE                          │
│            Shared AI Core · Always Included                 │
└──────────────────────┬──────────────────────────────────────┘
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
┌─────────────────┐       ┌──────────────────────────────────┐
│ SENTRA PLATFORM │       │        RESON8 PLATFORM           │
│ (Intelligence   │       │  ┌──────────────────────────┐   │
│  Operations)    │       │  │ ORA · ARENA · ATMOS      │   │
│                 │       │  │ PULSE · FLASH            │   │
│ Governments     │       │  └──────────────────────────┘   │
│ Ministries      │       │        Broadcasters              │
│ Media Orgs      │       │        TV Networks               │
└─────────────────┘       └──────────────────────────────────┘
```

### Core ORA Pipeline

```
INGEST → CONTEXTUALIZE (Sentra AI) → GENERATE → REVIEW (Editorial) → TAKE TO AIR (Vizrt)
```

Every step in this pipeline executes within a combined ≤4-second window from feed ingestion to graphic on screen.

### Critical Architectural Rule

Reson8 calls Sentra Engine **directly** — not through Sentra Platform's API. This is intentional and non-negotiable. It means:

- Reson8's broadcast-grade SLA is independent of Sentra Platform's operational state
- The two products share the Engine's intelligence but are operationally isolated from each other
- A Sentra Platform outage does not affect an election night broadcast

### The Boundary Between the Two Products

| Dimension | Sentra Platform | Reson8 Platform |
|---|---|---|
| Core activity | Broadcast **monitoring** — watching TV for intelligence | Broadcast **production** — firing graphics TO TV |
| Output | Intelligence reports, alerts, briefs | On-air Vizrt graphics |
| User | Analysts, ministers, diplomats | Producers, editors, operators |
| Environment | Intelligence operations center | Newsroom control room |
| Vizrt integration | None | Native; required |
| Editorial chain | None | Required (Producer → Editor → Operator) |

### The Five Reson8 Modules

| Module | Domain | Status |
|---|---|---|
| **ORA** | Elections | Flagship; primary product |
| **ARENA** | Sports (football-first) | Active |
| **ATMOS** | Weather | Active |
| **PULSE** | Finance & Markets | Active |
| **FLASH / Sentra · Breaking** | Breaking News | Active |

---

## 3. Sentra Engine — The Shared AI Foundation

The Sentra Engine is the AI core that powers both products. It is not sold as a standalone; it is the infrastructure layer that makes Reson8's intelligence possible and Sentra Platform's analytics work. Every Reson8 purchase includes the Engine. Every Sentra Platform deployment runs on the Engine.

### What the Engine Provides (Always-On, Phase ∞)

| Capability | Description |
|---|---|
| **10-Language NLP** | English · Arabic · French · Spanish · Russian · Chinese · German · Portuguese · Persian · Turkish; Arabic dialect recognition |
| **Sentiment Analysis** | Positive / Neutral / Negative; multi-language; culturally adjusted |
| **6-Emotion Model** | Anger / Fear / Joy / Sadness / Disgust / Surprise — per mention and per topic |
| **Named Entity Recognition** | Persons, parties, organisations, locations, events — auto-extracted |
| **Entity Extraction & Classification** | Structured entity records from unstructured text |
| **Topic Clustering** | Real-time; hourly rebuild; deduplication across sources |
| **Narrative Generation** | Converts raw signal volume into coherent intelligence narratives |
| **Text Summarization** | Multi-source content summarization with citation |
| **AI Content Generation** | Headlines, captions, talking points, broadcast copy |
| **RAG / Semantic Search** | pgvector embeddings; trust-weighted retrieval (authoritative 1.3×, org_upload 1.2×) |
| **Anomaly Detection** | Mentions spike, sentiment shift, virality pattern recognition |
| **Influence Graph Analysis** | Relationship mapping; reach scoring; cross-entity network |
| **Risk Scoring** | Predictive 0–100 scale combining velocity, sentiment, and influence |
| **Real-Time Pipeline** | 10,000+ signals/day; three-stage: ingest → enrich → embed |
| **Multi-Model AI Routing** | Gemini 2.5 Flash (primary, T=0.7), GPT-4, Grok; admin-switchable |
| **Deduplication Engine** | Cross-source near-duplicate detection before analysis |
| **Source Credibility Scoring** | Weighted trust levels per source type |
| **Keyword & Pattern Matching** | Semantic + exact; configurable per deployment |
| **Arabic Processing** | Full RTL parity; Shams typeface; Modern Standard + dialect |
| **Velocity & Virality Detection** | Rate-of-change tracking; early viral signal before peak |
| **Cross-Language Bridge** | Translate + analyze + generate across 200+ languages |
| **Breaking News Signal** | Real-time breaking event classification |
| **Correlation Analysis** | Cross-source event relationship surfacing; hidden pattern detection |

### Tech Stack (Engine Layer)

| Component | Technology |
|---|---|
| Database | PostgreSQL 17 on GCP Cloud SQL with pgvector extension |
| AI Models | Gemini 2.5 Flash · GPT-4 · Grok (switchable) |
| API Gateway | Kong 2.8.1 (key-auth, ACL, CORS) |
| Auth | Supabase GoTrue (JWT/HS256, OTP, 2FA, SSO, magic link, OAuth 2.0) |
| Compute | GCP Cloud Run (stateless containers, me-central1) |
| Storage | GCS (sentra-insight-hub-storage) |
| Security | TLS 1.2+ · AES-256 at rest · HMAC-SHA256 JWT · private VPC · RLS |
| Edge Functions | 38 Deno serverless functions |
| Embeddings | 4096 / 8192 token limits; pgvector semantic storage |

---

## 4. Commercial Model — Two Products, One Engine

### Architecture

```
              SENTRA ENGINE
         (Core AI — shared, internal)
                   │
       ┌───────────┴────────────┐
       ▼                         ▼
 SENTRA PLATFORM           RESON8 PLATFORM
 Sold to governments,      Sold to broadcasters.
 ministries, media orgs.   Always uses Sentra Engine
 Sold separately.          directly (no API dependency).
```

### Five Commercial Rules

1. **Reson8 always includes the Sentra Engine.** The Engine is inseparable from Reson8's function. Every Reson8 contract includes Engine licensing.

2. **Reson8 calls the Engine directly — not through Sentra Platform.** The broadcast SLA is owned entirely within the Reson8 stack. Sentra Platform's availability does not affect a Reson8 broadcast.

3. **Sentra Platform is an optional add-on.** A broadcaster can buy Reson8 alone and have full broadcast production capability. Adding Sentra Platform layers an intelligence operations center on top.

4. **Sentra Platform does not expose broadcast production features.** Vizrt integration, the editorial chain (Producer → Editor → Operator), and Take to Air are Reson8-exclusive. Sentra Platform clients do not get these.

5. **The Engine is dual-load capable.** When both products run for the same client, the Engine serves both workloads simultaneously through SLA-differentiated processing lanes.

### Target Markets

| Product | Primary Clients | Sales Motion |
|---|---|---|
| **Reson8 Platform** | MENA TV networks (50–100 targets) | Long-cycle enterprise; control room replacement |
| **Sentra Platform** | Any organisation that needs an intelligence operations center — customised per client scope and vertical after engagement | Scoped per client; deployed as a tailored intelligence product |
| **Both Together** | Broadcasters who want editorial production AND a full intelligence operations layer | Premium bundle; highest contract value |

---

## 5. ORA Elections Module — Feature Definition

ORA is Reson8's flagship elections module. It covers the complete broadcast journey from raw results ingestion through editorial approval to Vizrt graphics on screen. The 15 feature groups below define the full scope of the system.

---

### 5.1 System Setup

Configuration of the elections environment before broadcast: candidate and party databases, constituency geospatial mapping, results feed authentication, threshold parameters, and Vizrt scene assignments. This is completed in the days before the election and determines the entire data structure for election night. A well-configured setup means the production team can execute entirely from the control room without any technical intervention during broadcast.

---

### 5.2 Live Results

Real-time vote counts, seat tallies, lead/trail indicators, and progressive updates as results are reported. The system ingests from official results feeds, validates data against anomaly thresholds, and routes directly to Vizrt without manual transcription or data entry by the production team. The validation layer flags statistically anomalous jumps before they reach the editorial queue.

---

### 5.3 Interactive Map

Geographic visualisation of results across constituencies and regions. Supports drill-down from national level through province to individual district. Party and candidate colours are configured in setup and applied automatically. Swing analysis overlays show directional movement from the previous election, giving anchors immediate context for every region result.

---

### 5.4 Candidate & Party Profiles

Rich entity profiles for all candidates and parties, drawn from Sentra Engine's entity intelligence layer. Profiles include biography, position history, polling trajectory, social media stance, media presence score, and risk indicators. The Engine updates these profiles continuously during the election period as new coverage and social signal arrives. Editorial teams have briefing-ready candidate cards throughout the broadcast.

---

### 5.5 Election Preparations

The pre-election intelligence package that the editorial team receives before election night: historical results loaded by constituency, polling data integrated from configured sources, coalition mathematics modelled for potential majority scenarios, and candidate stance analysis assembled by the Engine. Graphics templates are pre-bound to Vizrt scenes so the production team can execute without configuration delays during broadcast.

---

### 5.6 Coalition & Alliances

Seat mathematics tracker that models which combinations of parties reach majority thresholds in real time as results arrive. The system alerts when a specific coalition becomes mathematically possible or impossible based on actual reported results and current projections. Critical for parliamentary elections — the tool that eliminates seat-count errors under broadcast pressure.

---

### 5.7 Achievements & Track Record

Campaign promise tracking, parliamentary voting history, and constituency service record for incumbent candidates. These are drawn from the Sentra Engine entity profile system and enriched with structured data loaded pre-election. The Track Record feature gives anchors evidence-based talking points for incumbents beyond live results.

---

### 5.8 AI Prediction Engine

Sentra Engine powers a seat projection model that updates dynamically as actual results arrive, recalibrating projections to reflect the reported data rather than operating solely on pre-election polls. The model produces seat projection ranges, directional swing by region, projected final turnout, majority probability per party, and a called-race signal when a statistical threshold is reached. This is not a polling average tool — it is a live-results-driven model.

---

### 5.9 Social Sentiment (Elections)

Election-specific social intelligence filtered to the election context: candidate sentiment comparison, party trend tracking, hashtag volume analysis, viral claim detection, and public mood aggregated across the full social stream. Powered by Sentra Engine's 6-emotion model and real-time sentiment pipeline. Gives anchors the social dimension of the election alongside official results without requiring any manual social monitoring.

---

### 5.10 Breaking News Integration

A dedicated breaking news feed filtered to elections-related content. Triggers when results cross configured thresholds, when concession or victory language is detected in public statements, when anomalous result patterns emerge, or when social signal indicates a breaking development before official results confirm it. The engine detects these events faster than manual monitoring — the editorial team gets the alert, not the feed.

---

### 5.11 Broadcast Intelligence & Editorial Chain

The editorial workflow that separates ORA from a data display tool. A Producer prepares a graphic and stages it for review. An Editor sees the staged graphic in the approval queue, reviews it, and approves or rejects with a comment. An Operator fires the approved graphic to Vizrt. The entire chain is logged immutably — every action timestamped, attributed, and retained. A human decision is always the final step before any graphic reaches air.

---

### 5.12 AI Content Generation

Automatic generation of broadcast-ready text: headlines for results graphics, lower-third captions, ticker copy, and commentary talking points for anchors — in Arabic and English simultaneously. The Engine generates; the Editor reviews; the Operator takes to air. No AI-generated content can reach the screen without passing through the editorial chain.

---

### 5.13 Vizrt Integration

Native Vizrt scene binding. Results data flows directly from ORA into Vizrt data containers — no manual data entry. The template library covers all standard elections graphics types: results bars, maps, tickers, candidate profile cards, seat projection displays, and coalition scenario panels. The operator fires from the ORA control room; Vizrt executes on its existing renderer. No graphics engine replacement is required.

---

### 5.14 Control Room Operations

Multi-screen management, output surface control, live/preview mode separation, and operator role assignment. Designed for the physical control room environment with clear role separation between producers, editors, and operators. An emergency override function allows the senior editor to clear any queued graphic instantly. A broadcast event log records every on-air event with timestamp and attribution.

---

### 5.15 Performance & Reliability

≤4-second wire-to-air SLA from results feed ingestion to graphic on screen. 99.99% uptime target for election night — a zero-failure event environment. Primary and fallback results feed sources with automatic failover. Broadcast output failover for the Vizrt path. Deployable on-premises within the broadcaster's infrastructure or cloud-hosted. Authentication hardened for broadcast security requirements.

---

## 6. Elections Feature Table — System Attribution & Phase Map

### Legend

| Symbol | Meaning |
|---|---|
| 🔵 E | **Sentra Engine** — always included with any product; the shared AI core |
| 🟢 S | **Sentra Platform** — separate product; adds intelligence operations layer |
| 🟠 R | **Reson8 Platform** — included in Reson8 purchase; broadcast production layer |
| **P1** | Core / Launch — essential for go-live |
| **P2** | Intelligence Layer — deepens capability after launch |
| **P3** | Storytelling & Distribution — advanced broadcast storytelling features |
| **∞** | Always-on Infrastructure — permanent platform requirements |

---

### Section A — Sentra Engine Foundation
*Included with every Reson8 deployment. These capabilities are always active.*

| # | Capability | System | Phase | Description |
|---|---|:---:|:---:|---|
| 1 | 10-Language NLP | 🔵 E | ∞ | English · Arabic · French · Spanish · Russian · Chinese · German · Portuguese · Persian · Turkish; Arabic dialect recognition |
| 2 | Sentiment Analysis | 🔵 E | ∞ | Positive / Neutral / Negative; multi-language; culture-adjusted |
| 3 | 6-Emotion Model | 🔵 E | ∞ | Anger / Fear / Joy / Sadness / Disgust / Surprise per mention and topic |
| 4 | Named Entity Recognition | 🔵 E | ∞ | Auto-extracts persons, parties, organisations, locations, events |
| 5 | Entity Extraction & Classification | 🔵 E | ∞ | Structured entity records built from unstructured text |
| 6 | Topic Clustering | 🔵 E | ∞ | Real-time; hourly rebuild; cross-source deduplication |
| 7 | Narrative Generation | 🔵 E | ∞ | Converts raw signal volume into coherent intelligence narratives |
| 8 | Text Summarization | 🔵 E | ∞ | Multi-source summarization with citation |
| 9 | AI Content Generation | 🔵 E | ∞ | Headlines, captions, talking points, broadcast copy |
| 10 | RAG / Semantic Search | 🔵 E | ∞ | pgvector; trust-weighted retrieval (authoritative 1.3×) |
| 11 | Anomaly Detection | 🔵 E | ∞ | Mentions spike, sentiment shift, virality pattern recognition |
| 12 | Influence Graph Analysis | 🔵 E | ∞ | Candidate and party relationship mapping; reach scoring |
| 13 | Risk Scoring | 🔵 E | ∞ | Predictive 0–100 scale; velocity + sentiment + influence combined |
| 14 | Real-Time Pipeline | 🔵 E | ∞ | 10,000+ signals/day; ingest → enrich → embed; three-stage processing |
| 15 | Multi-Model AI Routing | 🔵 E | ∞ | Gemini 2.5 Flash (primary) / GPT-4 / Grok; admin-switchable |
| 16 | Deduplication Engine | 🔵 E | ∞ | Cross-source near-duplicate detection before analysis |
| 17 | Source Credibility Scoring | 🔵 E | ∞ | Trust-weighted per source type; authoritative sources boosted |
| 18 | Keyword & Pattern Matching | 🔵 E | ∞ | Semantic + exact matching; configurable per deployment |
| 19 | Arabic Processing | 🔵 E | ∞ | Full RTL parity; Shams typeface; Modern Standard + dialect |
| 20 | Velocity & Virality Detection | 🔵 E | ∞ | Rate-of-change tracking; early viral signal before peak |
| 21 | Cross-Language Bridge | 🔵 E | ∞ | Translate + analyse + generate across all 10 approved languages |
| 22 | Breaking News Signal | 🔵 E | ∞ | Real-time breaking event classification |
| 23 | Correlation Analysis | 🔵 E | ∞ | Cross-source event relationship surfacing; hidden pattern detection |

---

### Section B — Shared Capabilities
*Available within both Reson8 Platform and Sentra Platform deployments.*

| # | Capability | System | Phase | Description |
|---|---|:---:|:---:|---|
| 24 | Live Data Ingestion | 🔵 E / 🟠 R | P1 | Social + news + official results feeds; real-time continuous ingestion |
| 25 | Breaking News Detection | 🔵 E / 🟠 R | P1 | AI-classified breaking signal; filtered to election context in ORA |
| 26 | Real-Time Alerts | 🔵 E / 🟠 R | P1 | Threshold-based push and in-app alerts; configurable per event |
| 27 | Entity Profiles | 🔵 E / 🟠 R | P1 | Persons and organisations; AI-generated; continuously updated |
| 28 | Influence Monitoring | 🔵 E / 🟠 R | P1 | Candidate and party reach, stance, engagement metrics |
| 29 | Trend Detection | 🔵 E / 🟠 R | P1 | Topic and narrative trend surfacing; velocity-ranked |
| 30 | Translation (English / Arabic) | 🔵 E / 🟠 R | P1 | Broadcast-grade; real-time; bilingual output simultaneous |
| 31 | Keyword Monitoring | 🔵 E / 🟠 R | P1 | Candidate names, party hashtags, election topic keywords |
| 32 | Sentiment Over Time | 🔵 E / 🟠 R | P1 | Trend line per candidate / party; comparative display |
| 33 | Volume & Engagement Metrics | 🔵 E / 🟠 R | P1 | Reach, mentions, shares by entity and topic |
| 34 | Source Attribution | 🔵 E / 🟠 R | P1 | Platform and outlet identified per piece of content |
| 35 | Content Tagging & Classification | 🔵 E / 🟠 R | P1 | Auto-tag by topic, party, candidate, election event |
| 36 | Multi-Source Aggregation | 🔵 E / 🟠 R | P1 | Social + news + official results feeds unified |
| 37 | Role-Based Access Control | 🟠 R / 🟢 S | P1 | Producer / Editor / Operator / Admin role separation |
| 38 | Audit Logging | 🟠 R / 🟢 S | P1 | Immutable action trail for all platform events |
| 39 | Multi-Tenant Architecture | 🟠 R / 🟢 S | P1 | Per-client data isolation; tenant-scoped access controls |
| 40 | Notification System | 🟠 R / 🟢 S | P1 | Push alerts; in-app; configurable thresholds per user |
| 41 | Search & Filter | 🔵 E / 🟠 R | P1 | RAG-powered semantic + structured search across all content |
| 42 | Geographic Coverage Analysis | 🔵 E / 🟠 R | P2 | Region-by-region signal breakdown; constituency-level filtering |
| 43 | Report Generation | 🟠 R / 🟢 S | P2 | Structured post-election analytics and intelligence reports |
| 44 | Data Source Management | 🟠 R / 🟢 S | P2 | Admin-enabled / disabled per client from control panel |
| 45 | Data Export | 🟠 R / 🟢 S | P2 | CSV and PDF export of election analytics |
| 46 | API Access | 🟠 R / 🟢 S | P2 | External integration endpoints for client systems |
| 47 | Dashboard Visualisation | 🟠 R / 🟢 S | P1 | KPI panels; real-time charts; configurable views |

---

### Section C — ORA Elections System (Reson8 Platform Exclusive)

#### System Setup

| # | Feature | System | Phase | Description |
|---|---|:---:|:---:|---|
| 48 | Election Configuration Wizard | 🟠 R | P1 | Country, election type, date, total seat count, system rules |
| 49 | Candidate Database | 🟠 R | P1 | Full candidate roster with party, district, photo, ID |
| 50 | Party Database | 🟠 R | P1 | Party registry with official colours, symbols, acronyms, leadership |
| 51 | Constituency Mapping | 🟠 R | P1 | District / constituency geospatial configuration and seat allocation |
| 52 | Results Feed Integration | 🟠 R | P1 | Official API or data feed authentication, field mapping, and validation |
| 53 | Seat / Vote Threshold Alerts | 🟠 R | P1 | Configurable alert triggers for results milestones (majority, seat targets) |
| 54 | Vizrt Scene Assignment | 🟠 R | P1 | Map results data fields to Vizrt scene data containers |
| 55 | Pre-Election Baseline Load | 🟠 R | P1 | Historical results and polling pre-loaded before broadcast night |

#### Live Results

| # | Feature | System | Phase | Description |
|---|---|:---:|:---:|---|
| 56 | Real-Time Vote Count Display | 🟠 R | P1 | Live tally; percentage; absolute votes; updating as reported |
| 57 | Seat Tally Display | 🟠 R | P1 | Seats won / projected; majority threshold line visible |
| 58 | Lead / Trail Indicators | 🟠 R | P1 | Live candidate ranking per constituency; gain/loss markers |
| 59 | Results by Constituency | 🟠 R | P1 | Drill-down from national aggregate to individual district |
| 60 | Progressive Results Update | 🟠 R | P1 | % of precincts reporting; confidence indicator per result |
| 61 | Results Validation Layer | 🟠 R | P1 | Anomaly flag on data jumps before graphic reaches editorial queue |
| 62 | Comparative Results (Last Election) | 🟠 R | P1 | Side-by-side current vs. prior election result per constituency |

#### Interactive Map

| # | Feature | System | Phase | Description |
|---|---|:---:|:---:|---|
| 63 | Geographic Results Map | 🟠 R | P1 | National map filled by winning party / candidate colour |
| 64 | Regional Drill-Down | 🟠 R | P1 | Click-through: National → Province → District |
| 65 | Colour-Coded Party Performance | 🟠 R | P1 | Configured party colours applied automatically to map |
| 66 | Swing Analysis Map | 🟠 R | P2 | Direction and magnitude of swing vs. last election per district |
| 67 | Turnout Map | 🟠 R | P2 | Turnout % per constituency; heat-map overlay |
| 68 | Margin of Victory Map | 🟠 R | P2 | Visual margin size per district on geographic layer |

#### Candidate & Party Profiles

| # | Feature | System | Phase | Description |
|---|---|:---:|:---:|---|
| 69 | Candidate Profile Card | 🟠 R | P1 | Photo, name, party, district, bio, social links |
| 70 | Party Profile Card | 🟠 R | P1 | Party overview, leadership, seat target, coalition history |
| 71 | Candidate Social Sentiment | 🔵 E / 🟠 R | P1 | Sentra Engine live sentiment on candidate mentions across social |
| 72 | Candidate Media Presence | 🔵 E / 🟠 R | P1 | Coverage volume + tone across news sources; trends over campaign |
| 73 | AI-Generated Candidate Brief | 🔵 E / 🟠 R | P2 | Auto-assembled briefing for broadcast anchors; Engine-generated |

#### Election Preparations

| # | Feature | System | Phase | Description |
|---|---|:---:|:---:|---|
| 74 | Historical Election Data | 🟠 R | P1 | Prior election results pre-loaded per constituency |
| 75 | Polling Data Integration | 🟠 R | P1 | Pre-election poll data ingested and displayed in context |
| 76 | Candidate Stance Analysis | 🔵 E / 🟠 R | P2 | AI-extracted positions on key issues from public record |
| 77 | Pre-Night Editorial Briefing | 🔵 E / 🟠 R | P2 | AI-generated briefing package for editorial team before broadcast |
| 78 | Graphics Template Pre-Load | 🟠 R | P1 | All Vizrt scenes pre-bound before broadcast; zero setup on night |

#### Coalition & Alliances

| # | Feature | System | Phase | Description |
|---|---|:---:|:---:|---|
| 79 | Seat Mathematics Tracker | 🔵 E / 🟠 R | P2 | Real-time majority threshold calculation; displayed as results arrive |
| 80 | Coalition Scenario Modeller | 🔵 E / 🟠 R | P2 | Models which party combinations reach majority; updates live |
| 81 | Alliance Formation Alert | 🔵 E / 🟠 R | P2 | Alert when coalition becomes mathematically viable or impossible |
| 82 | Coalition History Display | 🟠 R | P2 | Prior coalition governments shown as context |

#### Achievements & Track Record

| # | Feature | System | Phase | Description |
|---|---|:---:|:---:|---|
| 83 | Parliamentary Voting History | 🔵 E / 🟠 R | P2 | AI-sourced voting record for incumbent candidates |
| 84 | Campaign Promise Tracker | 🔵 E / 🟠 R | P2 | Promises made vs. documented actions taken |
| 85 | Constituency Service Record | 🔵 E / 🟠 R | P3 | Local project delivery for incumbent candidates; structured data |

#### AI Prediction Engine

| # | Feature | System | Phase | Description |
|---|---|:---:|:---:|---|
| 86 | Real-Time Seat Projection | 🔵 E / 🟠 R | P2 | Dynamic model; recalibrates as actual results arrive |
| 87 | Swing Prediction | 🔵 E / 🟠 R | P2 | Direction and magnitude of swing per region; live update |
| 88 | Turnout Forecasting | 🔵 E / 🟠 R | P2 | Projected final turnout based on reported early results |
| 89 | Majority Probability Model | 🔵 E / 🟠 R | P2 | % probability of outright majority per party; updates live |
| 90 | Called Race Detection | 🔵 E / 🟠 R | P2 | AI signals race called when statistical threshold is reached |

#### Social Sentiment (Elections)

| # | Feature | System | Phase | Description |
|---|---|:---:|:---:|---|
| 91 | Election Social Listening | 🔵 E / 🟠 R | P1 | Filtered social stream scoped to election topics only |
| 92 | Candidate Sentiment Comparison | 🔵 E / 🟠 R | P1 | Side-by-side sentiment bars per candidate; real-time |
| 93 | Party Sentiment Trend | 🔵 E / 🟠 R | P1 | Sentiment over time per party; direction and magnitude |
| 94 | Hashtag Volume Tracking | 🔵 E / 🟠 R | P1 | Top election hashtags; volume + sentiment per hashtag |
| 95 | Viral Claim Detection | 🔵 E / 🟠 R | P2 | Detects rapidly spreading unverified claims in election discourse |
| 96 | Public Mood Analysis | 🔵 E / 🟠 R | P2 | Aggregate emotion across full election social discourse |
| 97 | Social-to-Results Correlation | 🔵 E / 🟠 R | P3 | Compare social sentiment shifts against actual results post-night |

#### Breaking News Integration

| # | Feature | System | Phase | Description |
|---|---|:---:|:---:|---|
| 98 | Elections Breaking Feed | 🔵 E / 🟠 R | P1 | Dedicated breaking news stream filtered to elections content |
| 99 | Results Threshold Alert | 🟠 R | P1 | Alert when result crosses configured milestone (majority, concede) |
| 100 | Concession / Victory Detection | 🔵 E / 🟠 R | P2 | NLP detects concession or victory language in public statements |
| 101 | Anomalous Results Alert | 🔵 E / 🟠 R | P2 | Flags statistically anomalous data jumps before editorial review |

#### Broadcast Intelligence & Editorial Chain

| # | Feature | System | Phase | Description |
|---|---|:---:|:---:|---|
| 102 | Producer Preparation Queue | 🟠 R | P1 | Producer selects graphic, populates data, stages for editorial review |
| 103 | Editor Approval Layer | 🟠 R | P1 | Editor sees staged graphic; approves or rejects with note |
| 104 | Operator Take to Air | 🟠 R | P1 | Operator fires approved graphic to Vizrt; logged immediately |
| 105 | Editorial Audit Trail | 🟠 R | P1 | Immutable log: who prepared, who approved, when taken, what aired |
| 106 | Reject & Revise Workflow | 🟠 R | P1 | Editor rejects back to Producer with comment; revision loop |
| 107 | Live / Preview Separation | 🟠 R | P1 | Preview pane shows graphic before take; no accidental on-air |
| 108 | Multi-Output Management | 🟠 R | P2 | Manage multiple simultaneous Vizrt output surfaces |

#### AI Content Generation (Broadcast)

| # | Feature | System | Phase | Description |
|---|---|:---:|:---:|---|
| 109 | Auto-Generated Headline | 🔵 E / 🟠 R | P1 | AI drafts broadcast headline from live results data |
| 110 | Lower-Third Caption Generation | 🔵 E / 🟠 R | P1 | AI generates lower-third text for on-screen graphic display |
| 111 | Ticker Copy Generation | 🔵 E / 🟠 R | P2 | AI generates scroll ticker text from live election results |
| 112 | Commentary Talking Points | 🔵 E / 🟠 R | P2 | AI generates anchor talking points per graphic type |
| 113 | Bilingual Broadcast Text | 🔵 E / 🟠 R | P1 | All generated text produced in Arabic + English simultaneously |
| 114 | Editorial Review Gate | 🟠 R | P1 | All AI-generated content reviewed by editor before any take to air |

#### Vizrt Integration

| # | Feature | System | Phase | Description |
|---|---|:---:|:---:|---|
| 115 | Vizrt Scene Binding | 🟠 R | P1 | Native data container binding to Vizrt scene elements |
| 116 | Results Data to Vizrt | 🟠 R | P1 | Direct feed from ORA data layer to Vizrt data engine; no manual entry |
| 117 | Elections Template Library | 🟠 R | P1 | Pre-built scenes: results bar, map, ticker, profile card, seat projection |
| 118 | Viz Engine Output | 🟠 R | P1 | Drives existing Vizrt renderer; no graphics engine replacement required |
| 119 | Multi-Scene Management | 🟠 R | P2 | Manage and fire multiple Vizrt scenes from a single ORA interface |

#### Control Room Operations

| # | Feature | System | Phase | Description |
|---|---|:---:|:---:|---|
| 120 | Control Room Dashboard | 🟠 R | P1 | Single view of all outputs, statuses, and queued graphics |
| 121 | Multi-Screen Management | 🟠 R | P1 | Assign graphics to specific output screens and channels |
| 122 | Operator Role Assignment | 🟠 R | P1 | Per-screen operator assignment with permission controls |
| 123 | Real-Time Status Monitor | 🟠 R | P1 | Live view of what is on air and what is in the approval queue |
| 124 | Emergency Override | 🟠 R | P1 | Senior editor clears or overrides any queued graphic instantly |
| 125 | Broadcast Event Log | 🟠 R | P1 | Full log of every on-air event with timestamp and operator attribution |

#### Performance & Reliability

| # | Feature | System | Phase | Description |
|---|---|:---:|:---:|---|
| 126 | ≤4 Second Wire-to-Air SLA | 🟠 R | ∞ | End-to-end from results feed ingestion to graphic on screen |
| 127 | 99.99% Uptime Target | 🟠 R | ∞ | Election night zero-failure requirement |
| 128 | Results Feed Redundancy | 🟠 R | ∞ | Primary + fallback results feed sources; automatic switching |
| 129 | Broadcast Output Failover | 🟠 R | ∞ | Automatic failover on Vizrt output path |
| 130 | On-Prem or Cloud Deployment | 🟠 R | ∞ | Deploys within broadcaster's infrastructure or cloud-hosted |
| 131 | Broadcast Security & Auth | 🟠 R | ∞ | JWT, OTP, 2FA, SSO, magic link; control room hardened |

---

## 7. Value Analysis: Reson8 Only vs. Reson8 + Sentra Platform

### What Reson8 Alone Provides (Including the Engine)

A broadcaster who purchases Reson8 — without Sentra Platform — receives a complete, production-ready broadcast intelligence system. The Sentra Engine is always included. This means the production team has live multilingual NLP, real-time sentiment analysis, entity recognition, narrative generation, AI content generation, risk scoring, anomaly detection, and a full 10,000+ signals per day pipeline already working underneath the broadcast interface. On election night, the system ingests official results feeds, generates bilingual broadcast copy, runs social sentiment on all candidates and parties in real time, detects viral claims before they propagate, models coalition mathematics, and fires native Vizrt graphics through the editorial chain — all within four seconds and all without any manual monitoring by the team.

The broadcaster has an end-to-end system that does what no traditional broadcast data provider has ever offered: intelligence that thinks about the election, not just a feed that reports numbers.

### What Is Added When Sentra Platform Is Also Purchased

Sentra Platform adds an intelligence operations layer that works alongside and independently of the broadcast production workflow. The distinction is one of depth and organisational reach, not of broadcast capability.

**Organised intelligence operations at scale.** Sentra Platform transforms the broadcaster's newsroom from a team that reacts to events into an organisation that monitors the entire intelligence landscape continuously — across 25 data sources, updated hourly, with topics and narrative structures maintained automatically. The Engine already collects and processes signals; Sentra Platform gives the newsroom's non-production staff a structured environment to act on that intelligence — analysing it, building dossiers, assigning tasks, and coordinating across teams — in a way the production-focused Reson8 interface is not designed for.

**Deep entity intelligence for editorial preparation.** While Reson8 carries entity profiles for election candidates, Sentra Platform's Business Intelligence module builds multi-degree relationship graphs, case files, and curated dossiers on any person, organisation, or institution — at a depth that supports investigative editorial work, not just broadcast graphics. A senior correspondent preparing an interview or a documentary team investigating a candidate's network uses the Sentra Platform intelligence layer, not the control room interface.

**Organised early warning across the full news landscape.** The Sentra Platform Risk Detection module runs a predictive 0–100 risk score across every monitored entity and topic continuously — not just during election night. It detects developing situations before they become breaking news, which means the newsroom's editorial planning team can anticipate coverage needs hours before they arrive. The Reson8 Engine detects anomalies within the election context; the Sentra Platform risk engine covers the full news landscape the organisation is responsible for.

**A collaborative intelligence workspace for the full organisation.** Sentra Platform provides a war room / situation room, case management, task assignment, a knowledge base, and an in-platform report authoring environment. These are the tools that allow the editorial management team to coordinate coverage across multiple live stories simultaneously, maintain structured records of developing situations, and produce formal intelligence assessments. The Reson8 interface is designed for control room operators; the Sentra Platform workspace is designed for editors-in-chief, senior correspondents, and editorial coordinators.

**Persistent narrative intelligence.** Sentra Platform's Listening & Sentiment module maintains continuous monitoring of topics, sub-narratives, and sentiment structures across all 25 data sources — not just during an active broadcast. The newsroom benefits from narrative intelligence that spans weeks and months, surfacing shifts in public discourse, cross-country topic correlations, and cultural sentiment dynamics that shape how an audience receives election coverage. This persistent layer informs the editorial line, the framing of graphics, and the talking points generated for anchors — but it lives outside the four-second broadcast pipeline.

**A persistent simulation and training environment.** Sentra Platform includes a simulation and test framework that allows the newsroom to run crisis scenarios, model coverage situations, and train editorial teams against realistic data before going live. Social media posts, news articles, entity profiles, and risk scenarios can all be simulated against a sandboxed version of the platform. This capability supports editorial readiness and platform onboarding without touching live production data — something the Reson8 broadcast interface, which operates purely on live data, does not provide.

In summary: a broadcaster who purchases only Reson8 loses none of the broadcast production capability. What they lose is the intelligence operations layer — the organised, persistent, organisationally-wide environment that turns monitoring signals into structured editorial intelligence for the whole newsroom. Reson8 is the control room. Sentra Platform, scoped and customised for the broadcaster's needs, is the editorial intelligence center that feeds it.

---

## 8. Conclusions & Recommendations

### 8.1 System Architecture — Clear and Sound

The four-layer architecture (Sentra Engine → Sentra Platform + Reson8 Platform → ORA System) is architecturally clean and commercially coherent. The direct Engine connection for Reson8 — bypassing Sentra Platform's API — is the correct engineering decision and must be maintained. It protects the broadcast SLA from any dependency on the intelligence platform's availability.

### 8.2 ORA Is Genuinely Differentiated

No traditional broadcast data provider offers what ORA provides: a live AI intelligence engine underneath a control room interface, with social sentiment, narrative generation, coalition modelling, prediction engine, viral claim detection, and bilingual AI content generation all running simultaneously with official results processing. The differentiation is real and defensible.

### 8.3 Phase Delivery Priority

The P1 feature set (Core / Launch) covers everything required for a production-ready election night broadcast: system setup, live results, interactive map, candidate profiles, election prep, social listening, breaking news, the editorial chain, Vizrt integration, and control room operations. This is the minimum viable election product.

P2 (Intelligence Layer) delivers the features that make ORA analytically superior: swing analysis, coalition modelling, prediction engine, AI-generated candidate briefs, viral claim detection, concession detection, multi-output management, and AI commentary talking points. This is where ORA moves from a production tool to an intelligence tool.

P3 (Storytelling & Distribution) adds the long-form narrative capabilities — constituency service records, social-to-results correlation, advanced multi-channel distribution — that build audience engagement beyond the election night itself.

### 8.4 Commercial Recommendation

Lead Reson8 as the primary product for MENA broadcaster conversations. The broadcast production case is self-contained and immediately understood by control room and operations leadership. Introduce Sentra Platform in the same conversation as the intelligence operations upgrade for editorial leadership — scoped to the broadcaster's specific coverage responsibilities and organisational structure. The bundle is the highest-value proposition; but the Reson8-only case must be able to close independently.

### 8.5 Key Selling Point to Protect

The human editorial chain — Producer → Editor → Operator → Take to Air — is not a limitation. It is the product's primary trust mechanism for risk-averse broadcasters. The immutable audit log and the requirement for human approval before any graphic reaches air differentiate ORA from automated data systems. This must be positioned as a feature in every commercial conversation, not explained away.

---

*End of Report*

---

**ID8 Media** · info@id8media.com · Qatar: +974 6626 4422  
*Reson8 Platform & ORA Elections System — Product Definition Report · May 2026*
