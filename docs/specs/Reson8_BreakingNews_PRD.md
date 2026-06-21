# Reson8 Platform — Breaking News PRD
## Shared Core Architecture · ORA Elections Implementation · All-Module Design Guide

**Prepared by:** ID8 Media · Product Engineering
**Date:** June 2026
**Version:** 1.0
**Team:** Tech Engineer · Product Engineer

---

## 1. Strategic Purpose

Breaking news is not a module — it is a **Core platform service** that every module consumes.

The same detection pipeline, severity engine, cross-source verification, editorial confirmation workflow, and Vizrt output patterns serve all five modules. The only thing that changes per module is the **topic filter profile** — a configuration that scopes the global breaking feed to the module's domain.

**This document defines:**
- The shared Breaking News Core (built in Sprint 7, inherited by all future modules)
- The ORA Elections implementation (first module, built in Sprint 7)
- The implementation guide for ARENA, PULSE, ATMOS, and FLASH (Phases 2 and 3)

**Architectural decision:**  
Breaking News Core is built once, in Sprint 7, scoped to ORA. When ARENA and FLASH are built in Phase 2, they register their own filter profiles and inherit the full pipeline without rework.

---

## 2. System Architecture

### 2.1 Full Breaking News Flow

```
┌─────────────────────────────────────────────────────┐
│                   INPUT SOURCES                      │
│  Social (X · Facebook · Instagram · TikTok · Telegram│
│  News Wires (Reuters · AP · AFP · regional agencies) │
│  Official Feeds (electoral commission · league API · │
│                  exchange · met authority)            │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│              SENTRA ENGINE (always on)               │
│  E6 Real-Time Pipeline · E7 Breaking Signal          │
│  E11 Velocity Detection · E12 Source Credibility     │
│  E4 Named Entity Recognition · E1 10-Language NLP    │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│         BREAKING NEWS CORE  (shared service)         │
│                                                      │
│  BN-C1  Detection Pipeline                           │
│  BN-C2  Severity Classification                      │
│  BN-C3  Cross-Source Verification                    │
│  BN-C4  Source Attribution                           │
│  BN-C5  Geographic Tagging                           │
│  BN-C12 Module Filter Router                         │
└──────────┬──────────────────────────────────────────┘
           │  routes to module-scoped queues
    ┌──────┴────────────────────────────────────┐
    │              │            │               │
    ▼              ▼            ▼               ▼
  ORA            ARENA        PULSE          ATMOS
Elections        Sports       Finance        Weather
Breaking         Breaking     Breaking       Breaking
Feed             Feed         Feed           Feed
    │              │            │               │
    └──────┬────────────────────────────────────┘
           │  all feed into the same editorial chain
           ▼
┌─────────────────────────────────────────────────────┐
│         BREAKING EDITORIAL CHAIN (shared)            │
│                                                      │
│  BN-C6  Breaking Alert Queue                         │
│  BN-C7  Breaking Confirmation Workflow               │
│  BN-C8  Breaking News Audit Trail                    │
│  BN-C9  Developing Story Tracker                     │
└───────────────────────┬─────────────────────────────┘
                        │  Editor confirms
                        ▼
┌─────────────────────────────────────────────────────┐
│              ON-AIR OUTPUT (shared)                  │
│                                                      │
│  BN-C10  Breaking Flash Overlay → Vizrt              │
│  BN-C11  Breaking News Ticker → Vizrt                │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
                  ┌─────────────┐
                  │   ON AIR    │
                  └─────────────┘
                        │
                        ▼
          BN-C9  Developing Story Tracker
          (continues monitoring for updates)
```

### 2.2 Data-Driven vs. Content-Driven Breaking News

Breaking news in the platform has two distinct trigger sources. Both feed the same editorial chain and output system.

| Type | Trigger | Used by | Example |
|---|---|---|---|
| **Content-Driven** | Social + news wire signal detected by Sentra Engine | All modules | Concession speech detected on X |
| **Data-Driven** | Official data feed crosses a configured threshold | ORA · PULSE · ATMOS | Party reaches majority · Market circuit breaker |

Content-driven is handled by BN-C1 to BN-C9.
Data-driven is handled by module-specific threshold engines (O31, F18, W11) that inject their alert directly into the Breaking Alert Queue (BN-C6) — bypassing the detection pipeline but still requiring editorial confirmation.

---

## 3. Feature Specifications — Breaking News Core

---

### BN-C1 — Breaking News Detection Pipeline

**Sprint:** S7 (ORA scope) · **Owner:** Tech Engineer
**Phase 2 extension:** ARENA + FLASH · **Phase 3 extension:** PULSE + ATMOS

**Description:**
The always-running process that reads the enriched signal stream from the Sentra Engine (E6) and evaluates every signal for breaking news characteristics. A signal qualifies as a breaking news candidate when it meets a minimum score threshold across: velocity (E11), credibility (E12), entity significance (E4), and novelty (not a duplicate of a recently processed story). Candidate signals are passed to the severity classifier (BN-C2).

The pipeline is module-agnostic at this stage — it evaluates all signals without knowledge of which module will consume them. The module routing happens downstream (BN-C12).

**User Stories:**
- As the platform, I need to continuously evaluate all incoming signals for breaking news characteristics so that no significant event is missed regardless of which source it appears on.
- As an Editor, I want breaking items to surface automatically so that I am never the last person to know about a significant event.

**Acceptance Criteria:**
- [ ] Pipeline evaluates 100% of signals from E6 output — no sampling, no skipping
- [ ] Evaluation runs within 5 seconds of a signal being emitted by E6
- [ ] Candidate signals score above a configurable threshold (default: 0.7 on a 0–1 composite score)
- [ ] Composite score components: velocity weight (30%) + credibility weight (35%) + novelty weight (20%) + entity significance weight (15%) — weights are configurable by Admin
- [ ] Pipeline processes signals in all 10 supported languages without degradation
- [ ] Pipeline throughput: minimum 500 signals/minute without latency increase
- [ ] If pipeline is overloaded, high-credibility signals are prioritised (lower-credibility signals are queued, not dropped)

**Dependencies:** E6, E7, E11, E12, E4

---

### BN-C2 — Severity Classification Engine

**Sprint:** S7 · **Owner:** Tech Engineer

**Description:**
Classifies every breaking candidate (from BN-C1) into one of three severity tiers. Classification is based on the composite score, entity significance, cross-source confirmation count, and the configured severity thresholds.

| Tier | Label | Characteristics |
|---|---|---|
| 3 | **Major Breaking** | Confirmed by ≥3 independent credible sources · high-significance entity · velocity spike > 5× baseline |
| 2 | **Breaking** | Confirmed by ≥2 sources · significant entity · velocity spike > 2× baseline |
| 1 | **Developing** | Single credible source · unconfirmed · or slow-building story with sustained velocity increase |

Severity is re-evaluated every 60 seconds. A Developing story can escalate to Breaking or Major Breaking as more sources confirm it.

**User Story:**
As an Editor, I want each breaking item labelled with a clear severity so that I can prioritise my attention — Major Breaking requires immediate action, Developing allows a moment to verify.

**Acceptance Criteria:**
- [ ] Every breaking candidate receives one of three severity labels: Major Breaking, Breaking, or Developing
- [ ] Severity thresholds are configurable per module by Admin (default thresholds defined above)
- [ ] Severity is re-evaluated every 60 seconds for all active items; label updates in real time in the editorial queue
- [ ] A story can only escalate (Developing → Breaking → Major Breaking), not de-escalate automatically — de-escalation requires Editor action
- [ ] Severity label is visually distinct in the UI: Major Breaking = red · Breaking = orange · Developing = yellow
- [ ] Severity change triggers a new notification (BN-C6) when an item escalates

**Dependencies:** BN-C1, BN-C3, E12

---

### BN-C3 — Cross-Source Verification

**Sprint:** S7 · **Owner:** Tech Engineer

**Description:**
Tracks how many independent sources have reported the same story and produces a confirmation score. "Independent" means: different organisations, different source categories (e.g., one wire service + one social account + one broadcaster = 3 independent sources). Two accounts owned by the same organisation count as one source. The confirmation score feeds directly into severity classification (BN-C2) and is visible to Editors in the alert queue.

A story is marked "Unconfirmed" (single source) or "Confirmed" (two or more independent credible sources). The "Confirmed" flag is a key input to the Editor's confirmation decision.

**User Story:**
As an Editor, I need to know how many independent sources have reported a story before I confirm it for broadcast so that I do not take an unverified single-source story to air.

**Acceptance Criteria:**
- [ ] Each breaking item shows: source count, source list (outlet names), confirmation status (Unconfirmed / Confirmed)
- [ ] Sources are deduplicated: accounts owned by the same organisation count as one source
- [ ] Cross-language source matching: the same story reported in Arabic and English from two different outlets counts as two independent sources
- [ ] "Confirmed" status is only assigned when ≥2 independent sources report the same story within a configurable time window (default: 30 minutes)
- [ ] A single authoritative source (credibility tier: Authoritative per E12) counts as equivalent to 2 standard sources for confirmation purposes
- [ ] Source list is visible in the Editor's detail view for each breaking item

**Dependencies:** BN-C1, E12, E4

---

### BN-C4 — Source Attribution Display

**Sprint:** S7 · **Owner:** Product Engineer

**Description:**
Displays the platform or outlet that first reported each breaking item and the timestamp of first detection. Attribution follows the story — as new sources confirm, they are listed in order of detection. The first-detected source is always displayed as the originating source. Source attribution appears in: the breaking alert queue, the Editor's detail view, and the on-air confirmation record.

**User Story:**
As an Editor, I want to see exactly which outlet first reported a breaking item so that I can assess its credibility immediately and make a faster confirmation decision.

**Acceptance Criteria:**
- [ ] Each breaking item displays: primary source name, source type (wire service / social / official), detection timestamp
- [ ] As additional sources confirm, they appear in a "confirmed by" list below the primary source
- [ ] Source names are standardised (e.g., "@Reuters" not "Reuters Twitter account") — a source name registry is configurable by Admin
- [ ] First-detected source is immutable — it cannot be changed even if a higher-credibility source confirms later
- [ ] Source attribution is logged in the audit trail (BN-C8) for every breaking item that reaches air

**Dependencies:** BN-C1, E12

---

### BN-C5 — Geographic Tagging

**Sprint:** S7 · **Owner:** Tech Engineer

**Description:**
Identifies and tags the geographic location of each breaking event. Location is extracted via NER (E4) from the content of the breaking item and enriched with a standardised location record (country, city, region). Location data is used to: route the item to the correct module's regional filter, populate the geographic tag on the on-air overlay graphic, and enable location-based filtering in the editorial queue.

**User Story:**
As an Editor covering an election in Country X, I want breaking items automatically tagged with their location so that I can filter the queue to show only events occurring in the countries I am covering.

**Acceptance Criteria:**
- [ ] Every breaking item receives a location tag: country (ISO code), city (where determinable), region (where applicable)
- [ ] Location is extracted from content text using E4 (NER) — not inferred from source location
- [ ] Items where location cannot be determined are tagged "Location Unknown" and are not filtered out of any queue
- [ ] Location tag appears on the breaking overlay graphic (BN-C10) when the item is taken to air
- [ ] Editor can filter the breaking queue by location
- [ ] Location tags feed the module filter router (BN-C12) — items tagged to a country in an election's configured geography are routed to ORA

**Dependencies:** E4, BN-C1

---

### BN-C6 — Breaking Alert Queue

**Sprint:** S7 · **Owner:** Both (Tech: queue backend · Product: queue UI)

**Description:**
The editorial holding area for breaking news items awaiting Editor confirmation. Separate from the regular editorial queue (C1–C2) — breaking items are time-critical and must not compete for attention with regular staged graphics. The Breaking Alert Queue is module-scoped: an ORA Editor sees only election-relevant breaking items; an ARENA Editor sees only sports-relevant items.

Items are sorted by severity (Major Breaking first) then by first-detected timestamp (most recent first). Items remain in the queue until the Editor confirms, dismisses, or the item expires (configurable; default: 4 hours for Developing, 1 hour for Breaking, no expiry for Major Breaking).

**User Story:**
As an Editor, I want a dedicated, prioritised queue showing only breaking items relevant to my module so that I can confirm and get breaking news to air without searching through unrelated content.

**Acceptance Criteria:**
- [ ] Breaking Alert Queue is visually separate from the regular editorial queue — distinct panel, distinct colour treatment
- [ ] Queue is module-scoped via BN-C12 — only items matching the module's filter profile appear
- [ ] Items sorted by: severity (Major Breaking first) → recency (most recent first)
- [ ] Each item shows: severity label, headline, source, confirmation status, detection timestamp, time in queue
- [ ] Audio and visual alert fires when a Major Breaking item enters the queue (user-configurable)
- [ ] Items auto-expire at configured time limits per severity tier; expiry is logged
- [ ] Editor can filter queue by: severity, source, location, confirmation status

**Dependencies:** BN-C1, BN-C2, BN-C3, BN-C4, BN-C5, BN-C12, C20

---

### BN-C7 — Breaking Confirmation Workflow

**Sprint:** S7 · **Owner:** Both (Tech: workflow state machine · Product: confirmation UI)

**Description:**
The Editorial gate for breaking news. Before any breaking news graphic goes to air, an Editor must explicitly confirm the story. Confirmation is a two-field action: the Editor marks the item as confirmed and selects the graphic type to fire (overlay, ticker, or both). Confirmation is role-gated — only Editor and Senior Editor roles can confirm. Producer and Operator roles cannot confirm.

After confirmation, the approved graphic enters the Operator's queue. The Operator fires it using the standard take-to-air (C3). This maintains the full editorial chain — breaking news does not create a shortcut to air.

**User Story:**
As an Editor, I want to confirm a breaking item with a single deliberate action that selects both the story as verified and the graphic format, so that the Operator can take it to air immediately without any further configuration.

**Acceptance Criteria:**
- [ ] Confirmation UI: Editor selects item → reviews source, summary, severity → selects graphic type → confirms
- [ ] Only Editor and Senior Editor roles can perform the confirmation action
- [ ] Confirmed item immediately enters the Operator's take-to-air queue as an approved graphic
- [ ] Confirmation action is logged in BN-C8 (Breaking Audit Trail) with: Editor identity, item ID, confirmation timestamp, selected graphic type
- [ ] If the Editor rejects (dismisses) a breaking item, a mandatory dismissal reason is logged — the item is removed from the active queue but retained in the archive
- [ ] A dismissed item can be reinstated by the same or a different Editor if new information warrants it

**Dependencies:** BN-C6, C3, C6, C20, BN-C8

---

### BN-C8 — Breaking News Audit Trail

**Sprint:** S7 · **Owner:** Tech Engineer

**Description:**
A breaking-news-specific immutable log that extends C6 (Editorial Audit Trail) with breaking-specific fields. Records the full lifecycle of every breaking item: first detection → severity classification → cross-source confirmation events → editorial confirmation or dismissal → take to air → any subsequent updates.

This trail is separate from the general editorial audit trail (C6) to allow breaking-specific reporting — for example, a post-broadcast report showing the time from first detection to on-air for every breaking item.

**User Story:**
As a Broadcast Manager, I want a full audit of every breaking story — from first detection to on-air — so that I can measure editorial response times and demonstrate accountability to the client.

**Acceptance Criteria:**
- [ ] Breaking audit log records: item ID, first-detected timestamp, source, severity assigned, severity changes (with timestamps), confirmation timestamp, confirming Editor, graphic type fired, take-to-air timestamp, Operator
- [ ] Time-from-detection-to-air is calculated automatically per item and displayed in the log
- [ ] Log is exportable per broadcast event as PDF or CSV
- [ ] All records are immutable — no edit or delete
- [ ] Log is queryable by: date range, module, severity, confirming Editor, source

**Dependencies:** BN-C7, C6, C21

---

### BN-C9 — Developing Story Tracker

**Sprint:** S7 · **Owner:** Both (Tech: story thread engine · Product: tracker UI)

**Description:**
Once a breaking story is confirmed and taken to air, the Developing Story Tracker continues monitoring all sources for new information related to that story. New updates (additional details, corrections, escalations) are automatically grouped under the original story thread. The Editor sees a story timeline — original break + all subsequent updates — and can take updated graphics to air as the story develops.

The tracker keeps the story alive until the Editor explicitly closes it or the story reaches a "Final" state (e.g., election result declared final, match ended, market closed).

**User Story:**
As an Editor managing a developing story, I want all new information related to the same story automatically grouped under one thread so that I am not treating each update as a new story — I can see the full picture and take updates to air in sequence.

**Acceptance Criteria:**
- [ ] After a story is confirmed (BN-C7), the Developing Story Tracker creates a story thread with: headline, first-detection timestamp, all source detections, all editorial actions taken
- [ ] New signals matching the same story (same entity, same event, same location, within a 24-hour window) are automatically added to the thread
- [ ] Each new update appears in the Editor's queue as "Update: [story headline]" — not as a new story
- [ ] Story timeline view shows: original break → each update → each on-air action → current status
- [ ] Editor can take update graphics to air from within the story thread using the same confirmation workflow (BN-C7)
- [ ] Editor can manually close a story (marks it "Closed" in the log); closed stories are retained in archive
- [ ] Story thread is viewable by all editorial roles — Producers and Operators can see the story context

**Dependencies:** BN-C7, BN-C6, BN-C8, E4

---

### BN-C10 — Breaking Flash Overlay

**Sprint:** S7 · **Owner:** Both (Tech: Vizrt scene binding · Product: overlay config UI)

**Description:**
The primary on-air graphic for a confirmed breaking story. A full-screen or partial overlay applied to the broadcast output, containing: severity label, breaking headline (bilingual Arabic + English), source attribution, and geographic tag. The overlay duration and animation are configured in the Vizrt template. The overlay is dismissed by the Operator after a configurable duration or manually.

The overlay template is registered in the Vizrt Template Registry (C8) and is module-specific — ORA's overlay has different styling from FLASH's overlay, but the same data binding structure.

**User Story:**
As an Operator, I want to fire a breaking news overlay to air immediately after editorial confirmation, without any configuration on my end, so that the graphic is on screen within seconds of the Editor confirming the story.

**Acceptance Criteria:**
- [ ] Breaking overlay fires to Vizrt within 1 second of the Operator's take-to-air action
- [ ] Overlay contains: severity label (Major Breaking / Breaking / Developing), bilingual headline (Arabic top, English below, or as configured), source attribution, geographic tag, first-detection timestamp
- [ ] Overlay duration is configurable per severity tier: Major Breaking (no auto-dismiss), Breaking (60 seconds default), Developing (30 seconds default)
- [ ] Operator can dismiss the overlay manually at any time
- [ ] Module-specific overlay styling: ORA uses election colour theme; ARENA uses sports theme; PULSE uses finance theme; ATMOS uses weather theme; FLASH uses neutral theme
- [ ] Overlay is pre-rendered and ready in the Vizrt template cache before broadcast (O25 equivalent for breaking templates)

**Dependencies:** BN-C7, C3, C8, C9, C10, E9 (Arabic)

---

### BN-C11 — Breaking News Ticker

**Sprint:** S7 · **Owner:** Both (Tech: ticker feed · Product: ticker config UI)

**Description:**
A continuous horizontal ticker that runs on the broadcast output, fed automatically from editor-confirmed breaking items. The ticker displays a rolling queue of confirmed breaking headlines — each headline appears in Arabic and English on alternating passes (or simultaneously in a split ticker, depending on Vizrt template configuration). New confirmed breaking items are appended to the ticker queue immediately after editorial confirmation.

**User Story:**
As an Operator, I want confirmed breaking headlines to automatically appear in the ticker without me manually entering text so that the ticker always reflects the latest confirmed stories.

**Acceptance Criteria:**
- [ ] Ticker is fed automatically from the confirmed breaking queue — Operator does not type ticker copy
- [ ] New confirmed items are added to ticker queue within 5 seconds of editorial confirmation (BN-C7)
- [ ] Ticker shows Arabic and English headlines (bilingual display, Vizrt-template-defined layout)
- [ ] Ticker queue is manageable by the Operator: items can be reordered, hidden, or removed
- [ ] Ticker items expire from the queue after a configurable time (default: 2 hours) or when the Editor closes the story
- [ ] Ticker displays: severity indicator, headline, source attribution — all auto-populated from breaking item data

**Dependencies:** BN-C7, C8, C9, C10, E5, E9

---

### BN-C12 — Module Filter Profile

**Sprint:** S7 · **Owner:** Tech Engineer

**Description:**
The configuration layer that scopes the global breaking feed to a specific module's domain. Each module registers a filter profile defining: topic categories (e.g., "Elections", "Sports", "Finance"), entity types to monitor (candidates, players, companies), geographic scope, source categories, and keyword/topic clusters. The filter profile is evaluated against each breaking candidate after BN-C2 severity classification — only candidates matching the profile are routed to that module's Breaking Alert Queue (BN-C6).

A single breaking item can match multiple modules' filter profiles and appear in multiple modules' queues simultaneously.

**User Story:**
As an Admin configuring an election broadcast, I want to define which topics and entities trigger the ORA breaking feed so that only election-relevant content appears in the ORA editorial queue.

**Acceptance Criteria:**
- [ ] Each module has one registered filter profile (configurable by Admin per tenant)
- [ ] Filter profile parameters: topic categories (from a predefined taxonomy), entity types, entity IDs (specific candidates/parties/players), geographic scope (country codes), source categories, keyword inclusions, keyword exclusions
- [ ] A breaking item is routed to a module if it matches at least one inclusion criteria and no exclusion criteria
- [ ] One item can match multiple module profiles — it appears in all matching queues
- [ ] Filter profile changes take effect within 60 seconds — no platform restart required
- [ ] Admin can test a filter profile against a sample breaking item before activating it
- [ ] Filter profile changes are logged in C21 (Audit Logging)

**Dependencies:** BN-C1, BN-C2, BN-C5, E4, C20

---

## 4. ORA Elections — Breaking News Implementation

---

### O30 — Elections Breaking Feed

**Sprint:** S7 · **Owner:** Tech Engineer
**Inherits:** BN-C1 through BN-C12

**Description:**
The ORA Elections module's registered filter profile and breaking alert queue, scoped to election-relevant content for the configured election. Uses BN-C12 (Module Filter Profile) to filter the global breaking feed to: the election's country, all registered candidates (O2), all registered parties (O3), the electoral commission as an authoritative source, and election-specific topic keywords.

Breaking items that match the elections filter appear in the ORA Breaking Alert Queue — separate from the results queue and visible only to users in the ORA editorial context. The elections breaking feed complements the data-driven threshold alert (O31) — between the two, editors receive both social/news breaking signals and official data-crossing signals in one unified breaking view.

**User Story:**
As an ORA Editor on election night, I want a breaking feed showing only election-relevant stories — concessions, disputes, statements, announcements — so that I am not managing unrelated breaking news while also managing live results.

**Acceptance Criteria:**
- [ ] ORA filter profile automatically includes: election country (from O1), all candidate names (O2), all party names and acronyms (O3), electoral commission as authoritative source
- [ ] Admin can add custom keywords and topic clusters to the ORA filter (e.g., "vote counting", "polling station", "ballot", "fraud claim")
- [ ] ORA breaking queue is scoped to the current election — it does not surface breaking news from other elections unless explicitly added
- [ ] Breaking items confirmed in ORA carry the "Elections Breaking" tag in the audit trail (BN-C8)
- [ ] The ORA breaking queue and results queue are displayed as distinct panels — never merged
- [ ] When the election configuration (O1) is updated (e.g., country or election date changed), the filter profile updates automatically

**ORA-specific Filter Profile (defaults):**

| Filter Parameter | Value |
|---|---|
| Topic categories | Elections · Voting · Government · Political |
| Entity types | Candidate · Party · Electoral Commission |
| Entity IDs | Auto-populated from O2, O3 |
| Geographic scope | Configured election country (O1) |
| Source categories | Authoritative + News wire + Social |
| Keyword inclusions | Admin-configurable |
| Keyword exclusions | Non-election political content (Admin-configurable) |

**Dependencies:** BN-C12, BN-C6, BN-C7, O1, O2, O3

---

### O31 — Results Threshold Alert

**Sprint:** S7 · **Owner:** Tech Engineer
**Type:** Data-driven (not content-driven)

**Description:**
A data-driven breaking alert that fires when the official results data (O5) crosses a milestone configured in O6. This is distinct from the social/news breaking detection pipeline (BN-C1) — it is triggered by a calculation against the live results feed, not by the Sentra Engine classifying content.

When a threshold is crossed (party reaches majority, 100% of precincts report, configured seat milestone), the threshold engine injects an alert directly into the ORA Breaking Alert Queue (BN-C6) with severity "Major Breaking" (for majority achieved) or "Breaking" (for other milestones). The alert is treated by the editorial chain exactly like any other breaking item — it requires Editor confirmation (BN-C7) before going to air.

The injected alert auto-populates a pre-staged graphic: if the alert is "Party X reaches majority", the seat tally graphic (O10) is automatically staged for the Operator alongside the breaking overlay (BN-C10).

**User Story:**
As an Operator on election night, I want an automatic alert the instant a party reaches majority — complete with a pre-staged graphic ready to fire — so that the most significant moment of the night reaches air within seconds.

**Acceptance Criteria:**
- [ ] Threshold engine evaluates the results feed (O5) on every data update — no polling delay
- [ ] Alert fires within 5 seconds of the threshold being crossed in the data
- [ ] Alert is injected into the ORA Breaking Alert Queue (BN-C6) with: severity (auto-assigned based on threshold type), headline ("Party X has reached majority — 151 of 300 seats"), triggered value, threshold definition
- [ ] Each alert type has a default severity: majority achieved = Major Breaking; 75%+ precincts reporting = Breaking; seat milestone = Breaking; 100% results final = Breaking
- [ ] When the alert fires, the corresponding graphic (defined per threshold type by Admin) is auto-staged and linked to the alert — Editor sees alert + linked graphic in one view
- [ ] Threshold alerts are labelled "Data Alert" in the queue to distinguish them from content-detected breaking items
- [ ] All fired threshold alerts are logged in BN-C8 with the exact value that triggered them

**Dependencies:** O5, O6, O10, BN-C6, BN-C7, BN-C8

---

## 5. Module Implementation Guide — Phase 2 & Phase 3

When ARENA, FLASH, PULSE, and ATMOS are built in Phase 2 and 3, each module registers its own filter profile (BN-C12) and breaking alert queue (BN-C6). All shared core features (BN-C1 through BN-C11) are already built. The implementation effort per module is:

1. Configure the module filter profile in BN-C12
2. Register module-specific breaking Vizrt templates (BN-C10, BN-C11)
3. Build any module-specific data-driven threshold alerts
4. Test the end-to-end pipeline with module-specific content

---

### 5.1 ARENA Sports — Phase 2 (Sprint 5)

**Scope:** A24 (Sports Breaking Feed) · A25 (Match Alert)

**Filter Profile:**

| Filter Parameter | ARENA Value |
|---|---|
| Topic categories | Sports · Football · Basketball · Tennis · Athletics · Cricket · Combat Sports |
| Entity types | Player · Team · Club · League · Competition · Manager |
| Entity IDs | Auto-populated from Player Database (A3), Team Database (A2) |
| Geographic scope | Global (no geographic restriction unless configured) |
| Source categories | Official data feed (Opta/Stats Perform) + News wire + Social |
| Keyword inclusions | injury · transfer · lineup · red card · manager statement · postponed |
| Keyword exclusions | Admin-configurable |

**A25 — Match Alert (Data-Driven):**
Equivalent to O31 for sports. Fires when the official data feed (A5) reports: a goal, a red card, a penalty decision, a VAR reversal, full time, or a configured significant match event. Severity: goal = Breaking; red card = Breaking; full time = Breaking; VAR reversal = Breaking; match suspended = Major Breaking.

---

### 5.2 FLASH Breaking News — Phase 2 (Sprint 6–7)

**Scope:** B5–B16 (the full dedicated breaking news module)

FLASH is the platform's global, unfiltered breaking news module. Its filter profile is the broadest — it is configured to surface breaking news across all topic categories, not scoped to a single domain. FLASH Editors manage the global breaking feed while module-specific editors manage their domain feeds.

**Filter Profile:**

| Filter Parameter | FLASH Value |
|---|---|
| Topic categories | All (configurable — Admin selects coverage regions and topics) |
| Entity types | All |
| Entity IDs | None pre-set — Admin configures per deployment |
| Geographic scope | Global (configurable per region) |
| Source categories | All |
| Keyword inclusions | Admin-configurable per client |
| Keyword exclusions | Admin-configurable |

**Additional FLASH-specific features** (B17–B20, Phase 2 P2 features):
- Story Priority Ranking (AI-scored relevance)
- Related Stories Clustering (groups related breaking items)
- Escalation Detection (Developing → Breaking transition alert)
- Breaking News Archive (searchable archive of all past breaking events)

---

### 5.3 PULSE Finance & Markets — Phase 3 (Sprint 9–10)

**Scope:** F17 (Financial Breaking Feed) · F18 (Market Alert)

**Filter Profile:**

| Filter Parameter | PULSE Value |
|---|---|
| Topic categories | Finance · Markets · Economy · Business · Banking · Regulation |
| Entity types | Company · Index · Central Bank · Regulatory Authority · Exchange |
| Entity IDs | Auto-populated from Instrument Database (F2) |
| Geographic scope | Configured market regions (F1) |
| Source categories | Market data feed + News wire + Financial news + Social |
| Keyword inclusions | earnings · rate decision · inflation · GDP · merger · bankruptcy · IPO · sanctions |
| Keyword exclusions | Admin-configurable |

**F18 — Market Alert (Data-Driven):**
Fires when the market data feed (F3) reports: a configured price threshold crossed, a circuit breaker triggered, a market open/close event, or an index level milestone. Severity: circuit breaker = Major Breaking; threshold crossed = Breaking; index milestone = Breaking.

---

### 5.4 ATMOS Weather & Natural Disasters — Phase 3 (Sprint 9–10)

**Scope:** W11 (Severe Weather Breaking Alert) · W12 (Weather Alert Editorial Queue)

**Filter Profile:**

| Filter Parameter | ATMOS Value |
|---|---|
| Topic categories | Weather · Natural Disasters · Climate · Emergency |
| Entity types | Meteorological Authority · Emergency Agency · Location |
| Entity IDs | National met authorities for configured coverage areas (W1) |
| Geographic scope | Configured coverage area (W1) |
| Source categories | National met authority API + Weather API + Emergency agency + News wire |
| Keyword inclusions | storm warning · extreme heat · flood · earthquake · tsunami · evacuation |
| Keyword exclusions | Admin-configurable |

**W11 — Severe Weather Breaking Alert (Data-Driven):**
Fires when the weather API (W2) or a national meteorological authority issues a severe weather warning that crosses the configured alert threshold (W4). Severity: life-threatening weather (red alert) = Major Breaking; significant weather (amber alert) = Breaking; advisory = Developing.

---

## 6. Breaking News Sprint Assignment — Phase 1

| Feature | Sprint | Owner | Delivery |
|---|:---:|---|---|
| BN-C1 — Breaking Detection Pipeline | S7 | Tech | Phase 1 |
| BN-C2 — Severity Classification Engine | S7 | Tech | Phase 1 |
| BN-C3 — Cross-Source Verification | S7 | Tech | Phase 1 |
| BN-C4 — Source Attribution Display | S7 | Product | Phase 1 |
| BN-C5 — Geographic Tagging | S7 | Tech | Phase 1 |
| BN-C6 — Breaking Alert Queue | S7 | Both | Phase 1 |
| BN-C7 — Breaking Confirmation Workflow | S7 | Both | Phase 1 |
| BN-C8 — Breaking News Audit Trail | S7 | Tech | Phase 1 |
| BN-C9 — Developing Story Tracker | S7 | Both | Phase 1 |
| BN-C10 — Breaking Flash Overlay | S7 | Both | Phase 1 |
| BN-C11 — Breaking News Ticker | S7 | Both | Phase 1 |
| BN-C12 — Module Filter Profile | S7 | Tech | Phase 1 |
| O30 — Elections Breaking Feed | S7 | Tech | Phase 1 |
| O31 — Results Threshold Alert | S7 | Tech | Phase 1 |

---

## 7. Data Flow Summary

### Content-Driven Breaking (Social + News)

```
Source detected
  → E6 ingests and enriches
  → BN-C1 scores for breaking characteristics
  → BN-C2 assigns severity (Major Breaking / Breaking / Developing)
  → BN-C3 tracks cross-source confirmation
  → BN-C4 records source attribution
  → BN-C5 assigns geographic tag
  → BN-C12 routes to matching module queues
  → BN-C6 surfaces in module Breaking Alert Queue
  → Editor sees item with: severity · source · confirmation count · location
  → BN-C7 Editor confirms → selects graphic type
  → C3 Operator takes to air
  → BN-C10 flash overlay fires to Vizrt
  → BN-C11 headline added to ticker
  → BN-C8 full lifecycle logged
  → BN-C9 Developing Story Tracker monitors for updates
```

### Data-Driven Breaking (Official Feed Threshold)

```
Official data feed updates (O5 / F3 / W2)
  → Threshold engine evaluates against O6 / F5 / W4 configuration
  → Threshold crossed
  → Alert injected into BN-C6 with: severity · description · triggered value
  → Linked graphic auto-staged
  → Editor sees alert + linked graphic
  → BN-C7 Editor confirms
  → C3 Operator takes to air
  → BN-C10 flash overlay + linked module graphic fire to Vizrt
  → BN-C8 logged with triggered value
```

---

## 8. Definition of Done — Breaking News (Phase 1)

Breaking News is complete when:

- [ ] BN-C1: Detection pipeline processing 100% of E6 signals within 5 seconds
- [ ] BN-C2: Severity classification producing correct tier labels — validated with test scenarios for each tier
- [ ] BN-C3: Cross-source verification tracking independent sources and correctly assigning "Confirmed" status
- [ ] BN-C4: Source attribution displaying correctly in the editorial queue
- [ ] BN-C5: Geographic tagging extracting location from content in all 10 languages
- [ ] BN-C6: Breaking Alert Queue displaying module-scoped items with correct sorting and severity labels
- [ ] BN-C7: Confirmation workflow tested end-to-end — confirmed item reaches Operator queue within 3 seconds
- [ ] BN-C8: Audit trail logging the full lifecycle of at least 20 test breaking events
- [ ] BN-C9: Developing Story Tracker grouping related updates under the same story thread correctly
- [ ] BN-C10: Flash overlay fires to Vizrt within 1 second of Operator take-to-air
- [ ] BN-C11: Ticker populates within 5 seconds of editorial confirmation
- [ ] BN-C12: ORA filter profile passing only election-relevant content — verified with sample test events from outside the election scope (must not appear in ORA queue)
- [ ] O30: Elections breaking feed correctly scoped to configured election entities
- [ ] O31: Threshold alert fires within 5 seconds of majority crossing in test results data — linked graphic auto-staged
- [ ] End-to-end SLA: first detection to on-air overlay ≤4 seconds (automated pipeline portion only; editorial confirmation time excluded)

---

*ID8 Media · info@id8media.com · Qatar: +974 6626 4422*
*Reson8 Platform — Breaking News PRD · June 2026*
