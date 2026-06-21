# Business Requirements Document
## Reson8 / ORA Platform — Phase 1 (Elections + Breaking News)

---

## Document Control

| Field | Value |
|---|---|
| Document Title | Reson8 / ORA Platform — Phase 1 Business Requirements Document |
| Document ID | BRD-RESON8-P1-001 |
| Version | 1.0 |
| Status | **DRAFT** |
| Date | 2026-06-10 |
| Author | Senior Business Analyst |
| Product | Reson8 (a.k.a. ORA) — Broadcast Intelligence Platform |
| Scope | Phase 1: Elections Module + Breaking News Module + Shared Sentra AI / Editorial Layer |

### Revision History

| Version | Date | Author | Summary of Changes |
|---|---|---|---|
| 0.1 | 2026-06-10 | Senior Business Analyst | Initial draft — full BRD structure produced from authoritative product context |
| 1.0 | 2026-06-10 | Senior Business Analyst | Promoted to Draft for stakeholder review |

### Approvers

| Role | Name | Signature | Date |
|---|---|---|---|
| Product Owner / Reson8 PM | TBD | | |
| Engineering Lead | TBD | | |
| Sentra AI / ML Lead | TBD | | |
| Legal / Compliance | TBD | | |
| Data Provider Representative | TBD (pending gate — see Section 11) | | |

---

## Table of Contents

1. Executive Summary
2. Business Context and Objectives
3. Project Scope
4. Stakeholders and RACI
5. Business Requirements (BR-#)
6. Functional Requirements (FR-#)
7. Non-Functional Requirements (NFR-#)
8. End-to-End Workflow and Process Model
9. Data and Integration Requirements
10. Assumptions, Dependencies, and Open Decisions
11. Risks and Mitigations
12. Acceptance Criteria
13. Success Metrics and KPIs
14. Requirements Traceability Matrix
15. Glossary

---

## 1. Executive Summary

Reson8 (also branded ORA) is an end-to-end broadcast intelligence platform that converts live world events into on-air-ready editorial content — sourced, verified, confidence-scored, and human-approved — in under 60 seconds. The platform is built as a white-label B2B product for TV channels and broadcast networks.

Phase 1 delivers two production modules:

- **Elections:** Automated ingestion of authoritative election results, AI-generated narrative scripts for call moments, constituency-level drill-down, multi-language output, and editor-gated broadcast-ready script export.
- **Breaking News:** Continuous wire monitoring, AI triage scoring, auto-drafted first-read bulletins, an editor priority queue, and one-click push to teleprompter/rundown.

Both modules share a single intelligence and editorial control layer — **Sentra AI** — which enforces source attribution, confidence signaling, a mandatory human approval gate, an immutable audit log, and a real-time kill switch. No content is ever published without explicit editor sign-off.

The delivery path is three-graded: demo-grade by August 2026 (targeting regional network demos); pilot-grade by September/October 2026 (one native Vizrt integration); production-grade post-pilot. The commercial target is at least one paid contract by Q4 2026.

The headline performance promise — **under 60 seconds from event trigger to editor-ready, sourced, confidence-scored content** — is the primary measurable differentiator and the binding constraint on all technical decisions in Phase 1.

---

## 2. Business Context and Objectives

### 2.1 Problem Statement

Live broadcast newsrooms face a structural latency problem: converting a breaking event or election result into a verified, scripted, on-air segment currently takes minutes — sometimes tens of minutes. The bottleneck is not signal acquisition; it is the time between receiving raw data and producing a vetted, broadcast-ready script. During that window, competitors air first and audience trust is competed for.

Compounding this: election coverage specifically carries legal and reputational risk if incorrect figures reach air. Any platform in this space must solve speed *and* accuracy simultaneously, not trade one for the other.

### 2.2 Opportunity

A platform that closes the gap between event and verified broadcast-ready content — reliably, under 60 seconds, with full source traceability and human editorial control — represents a defensible commercial product in a broadcast technology market that has not yet seen this combination at scale.

The white-label B2B model means Reson8 channels distribution through existing broadcast relationships rather than competing with newsrooms. Each channel deployment reinforces the shared Sentra AI intelligence layer, creating a compounding accuracy and speed advantage.

### 2.3 Business Objectives

| ID | Objective | Primary Metric |
|---|---|---|
| BO-01 | Reduce time from live event to editor-ready, sourced content to under 60 seconds | Median event-trigger → editor dashboard latency < 60s |
| BO-02 | Eliminate incorrect figures reaching broadcast output | Factual error rate < 2% via correction logs |
| BO-03 | Drive editor workflow adoption in deployed channels | ≥ 70% of bulletins/scripts processed through platform within 30 days of go-live |
| BO-04 | Convert demo deployments to paid pilots | demo-to-pilot conversion ≥ 40% within 60 days of demo |
| BO-05 | Secure first commercial revenue milestone | ≥ 1 paid contract by Q4 2026 |
| BO-06 | Establish Reson8 as a credible, legally defensible broadcast AI platform | Zero incidents of unvetted AI content reaching air; full audit trail available on demand |

### 2.4 White-Label B2B Rationale

Positioning as a white-label platform allows broadcaster clients to present the technology under their own brand identity, removes competitive sensitivity (the tool is not a rival publisher), and creates a recurring SaaS revenue model tied to editorial seat licenses or output volume. The Sentra AI layer is the shared, proprietary IP — never exposed directly to end clients — making it difficult for competitors to replicate on a per-engagement basis.

---

## 3. Project Scope

### 3.1 In Scope — Phase 1

#### Elections Module (Phase 1.0 — ships first)

- Live election results ingest from a contracted, authoritative data feed (no web scraping)
- Automated seat and vote tally calculation and display
- Sentra AI narrative generation for call moments: winner declared, majority crossed, upset detected
- Constituency-level drill-down data presentation in the editor interface
- Multi-language output generation for editorial scripts
- Editor workflow: approve / edit / reject with note
- Broadcast-ready script export for playout handoff
- Demo-grade delivery: JSON export + documented Vizrt import schema + watermarked demo data
- Pilot-grade delivery: one native Vizrt integration with < 10s approved-content-to-playout latency

#### Breaking News Module (Phase 1.0 — always-on upsell, ships with or immediately after Elections)

- Wire monitoring from Reuters and AP (minimum two feeds)
- Sentra AI triage scoring: significance, urgency, and category classification
- Auto-drafted first-read bulletin in target broadcast language
- Editor priority queue with triage score visible
- One-click push of approved bulletin to teleprompter or rundown

#### Shared Sentra AI and Editorial Layer (non-negotiable; underpins both modules)

- Sentra AI content generation pipeline
- Confidence signal output: High / Medium / Low band, surfaced before editor approval
- Source attribution surfaced in editor interface before any approval action
- Mandatory, permanent human approval gate — no auto-publish path exists
- Lean editor dashboard: inline AI-generated content + raw source + confidence band; actions: Approve / Reject-with-Note / Confirm-data-timestamp
- Ingest validation with quarantine of malformed or unattributed data before it reaches the editor queue
- Kill switch operable in < 5 seconds, halting all active output
- Correction/retraction workflow: upstream source correction triggers alert to all active editors and blocks stale figures
- Immutable audit log: 30-day retention minimum; invisible to editors; retrievable on demand
- Playout handoff: Vizrt-first, pilot-grade, approved content delivered to playout within 10 seconds of sign-off

### 3.2 Out of Scope — Phase 1 (Explicit Deferrals)

#### Elections — Phase 1.1 Deferrals

- Historical trend analysis and election-over-election comparisons
- Predictive modelling or seat forecasting
- Interactive voter maps (visual constituency mapping for viewer-facing use)
- Social media or second-screen publishing

#### Breaking News — Phase 1.1 Deferrals

- Custom RSS feed ingestion beyond Reuters and AP
- Social signal ingestion (Twitter/X, Telegram, etc.)
- Archive search across historical bulletin library
- Multi-anchor routing (assigning bulletins to named on-air talent)
- Deep CMS integration (full bi-directional sync with newsroom systems beyond the playout handoff)

#### Platform-Wide Deferrals

- Chyron playout integration (post-pilot; deal-specific fast-follow)
- Additional Reson8 modules: Markets, Weather, Sports
- Production-grade delivery tier (post-pilot)
- End-viewer-facing features of any kind

---

## 4. Stakeholders and RACI

### 4.1 Stakeholder Register

| Stakeholder | Role Description | Primary Interest | Concern / Risk |
|---|---|---|---|
| Broadcaster Editor | Front-line user of the platform; reviews and approves all AI-generated content | Speed of review, clarity of source attribution, confidence signals | Being blamed for incorrect output; loss of editorial control |
| News Director | Oversees editorial workflow and output decisions; approves deployment | Newsroom efficiency, editorial standards, staff acceptance | Reputational risk from AI errors; platform disrupting established workflow |
| Playout / Graphics Operator | Receives approved content and executes on-air display | Reliable, timely handoff from platform; minimal manual intervention | Integration failures, format mismatches, last-minute content errors |
| Reson8 Product Team | Owns product roadmap, demo/pilot delivery, and commercial success | Hitting demo and pilot milestones; conversion to paid contracts | Scope creep, unmet latency targets, data provider delays |
| Sentra AI / Engineering | Builds and operates the AI generation and ingest pipelines | Technical feasibility of latency targets; model accuracy | Volume spikes on election night; wire feed reliability; integration complexity |
| Election Data Provider | Contracted source of authoritative election results | Contractual compliance, data feed reliability | Data certification delays, liability if incorrect data is transmitted |
| Wire Services (Reuters / AP) | Source of breaking news wire feeds | Feed uptime and accurate transmission | Unauthorised republication, attribution compliance |
| Compliance / Legal | Ensures the platform operates within broadcast regulatory and legal boundaries | No unverified AI content reaches air; audit trail completeness | Wrong figures on air causing regulatory action or litigation; AI liability exposure |

### 4.2 RACI Matrix

R = Responsible, A = Accountable, C = Consulted, I = Informed

| Activity | Broadcaster Editor | News Director | Playout Operator | Reson8 Product | Sentra AI / Eng | Data Provider | Compliance / Legal |
|---|---|---|---|---|---|---|---|
| Define editorial workflow requirements | C | A | I | R | C | I | C |
| Design Sentra AI generation pipeline | I | I | I | A | R | I | C |
| Select and contract election data provider | I | C | I | A | C | R | C |
| Validate data feed quality and certification | I | I | I | C | R | A | I |
| Build and test ingest validation / quarantine | I | I | I | A | R | I | I |
| Build editor dashboard | C | C | I | A | R | I | I |
| Define and implement approval gate logic | C | A | I | C | R | I | A |
| Configure playout integration (Vizrt) | I | I | A | C | R | I | I |
| Define acceptance criteria | C | C | I | A | R | I | C |
| Sign off on demo readiness | I | A | I | R | C | I | I |
| Sign off on pilot readiness | C | A | A | R | C | I | C |
| Manage audit log and compliance reporting | I | I | I | C | R | I | A |
| Commercial negotiation and contracts | I | I | I | A | I | C | C |

---

## 5. Business Requirements

Requirements are prioritised using MoSCoW: **M** = Must Have, **S** = Should Have, **C** = Could Have, **W** = Won't Have (this phase).

### 5.1 Core Platform Business Requirements

| ID | Business Requirement | Priority | Rationale |
|---|---|---|---|
| BR-01 | The platform shall convert a live event trigger to fully sourced, confidence-scored, editor-ready content in under 60 seconds. | M | This is the headline product promise and primary commercial differentiator. |
| BR-02 | No AI-generated content shall reach broadcast output without explicit human editor approval. | M | Non-negotiable editorial and legal safeguard; permanent platform constraint. |
| BR-03 | Every piece of content surfaced to an editor shall carry visible source attribution and a confidence signal before any approval action is available. | M | Underpins editorial accountability and protects broadcaster from liability. |
| BR-04 | The platform shall maintain an immutable, complete audit trail for all content from ingest to output, retrievable within 60 seconds of request. | M | Regulatory and reputational protection; required for legal defensibility. |
| BR-05 | A kill switch shall halt all active platform output within 5 seconds of activation. | M | Required to prevent broadcast of incorrect or harmful content if a systemic error is detected. |
| BR-06 | An upstream data correction or retraction shall automatically alert all active editors and block any content derived from the corrected data within 2 minutes in 95% of occurrences. | M | Protects against stale or incorrect figures reaching air after a source correction. |
| BR-07 | The platform shall be delivered in three successive grades: demo-grade (Aug 2026), pilot-grade (Sept/Oct 2026), and production-grade (post-pilot). | M | Aligns with sales pipeline: demo → pilot conversion → paid contract by Q4 2026. |
| BR-08 | All demo-grade deployments shall watermark AI-generated content with "DEMO DATA — NOT CERTIFIED" to prevent accidental broadcast use. | M | Legal and reputational protection during pre-contract demonstrations. |
| BR-09 | The platform shall support multi-language output generation for editorial scripts. | M | Required for white-label deployment across regional and international broadcast markets. |
| BR-10 | All data ingested into the platform shall be validated and any malformed or unattributed data quarantined before reaching the editor queue. | M | Prevents corrupt or unverifiable data from entering the editorial workflow. |

### 5.2 Elections Module Business Requirements

| ID | Business Requirement | Priority | Rationale |
|---|---|---|---|
| BR-11 | The platform shall ingest live election results exclusively from a contracted, certified authoritative data provider — no web scraping or uncontracted feeds. | M | Legal and accuracy requirement; demo data watermark rule applies until contract is live. |
| BR-12 | The platform shall automatically compute and display seat and vote tallies as results arrive, without manual data entry. | M | Core automation value; speed of tally display is a primary demo differentiator. |
| BR-13 | The platform shall generate AI narrative scripts for defined call moments: winner declared, majority crossed, and upset detected. | M | Core editorial value; transforms raw data into broadcast-ready language. |
| BR-14 | Editors shall be able to drill down to constituency-level data within the editor interface. | M | Required for accurate script context; editors need sub-national data to verify call moment narratives. |
| BR-15 | Broadcast-ready scripts shall be exportable in a format compatible with the target playout system. | M | Defines the final handoff; no value without playout delivery. |

### 5.3 Breaking News Module Business Requirements

| ID | Business Requirement | Priority | Rationale |
|---|---|---|---|
| BR-16 | The platform shall continuously monitor wire feeds from Reuters and AP as the minimum two sources. | M | Establishes the minimum credible source baseline for breaking news; single-source would be insufficient. |
| BR-17 | Sentra AI shall automatically score each incoming wire item for significance, urgency, and category and surface that score to editors. | M | Enables editors to prioritise review without reading every item; triage is the core value. |
| BR-18 | The platform shall auto-draft a first-read bulletin from each triaged wire item, in the target broadcast language, ready for editor review. | M | Reduces writing time; speed advantage over manual drafting. |
| BR-19 | An editor shall be able to push an approved bulletin to teleprompter or rundown in a single action. | M | Closing the loop to on-air delivery; eliminates the current manual copy-paste step. |

---

## 6. Functional Requirements

### 6.1 Elections Module — Functional Requirements

| ID | Functional Requirement | Priority | Traces To |
|---|---|---|---|
| FR-E-01 | The system shall connect to and continuously poll the contracted election data feed at a cadence sufficient to reflect result updates within 10 seconds of feed publication. | M | BR-11, BR-12 |
| FR-E-02 | The system shall validate each inbound election data record against a defined schema (fields: constituency ID, candidate ID, party, vote count, declared status, timestamp, source certification token). Records failing validation shall be quarantined and an alert raised to the engineering/ops channel. | M | BR-10, BR-11 |
| FR-E-03 | The system shall calculate and maintain running seat totals and percentage vote shares in real time as validated results are received. | M | BR-12 |
| FR-E-04 | The system shall detect and trigger a call moment event when any of the following thresholds are met: (a) a candidate is declared winner in a constituency, (b) a party crosses the majority seat threshold, (c) a result deviates from pre-loaded baseline expectation by a configurable upset-detection margin. | M | BR-13 |
| FR-E-05 | On detection of a call moment event, the system shall invoke Sentra AI to generate a narrative script for that event within the overall 45-second event-to-editor-ready target. | M | BR-01, BR-13 |
| FR-E-06 | The generated script shall include: the call moment type, named entities (candidate, party, constituency), the triggering data point with its source citation, and the assigned confidence band (High / Medium / Low). | M | BR-03, BR-13 |
| FR-E-07 | The editor interface shall display, for each pending script: (a) the AI-generated script text, (b) the raw source data record that triggered the call moment, (c) the confidence band, (d) source attribution detail, and (e) the data timestamp confirmation checkbox. | M | BR-03, BR-13, BR-14 |
| FR-E-08 | The editor interface shall provide three and only three approval actions per item: Approve, Reject-with-Note, and Edit-then-Approve. Approval is required before any export or playout handoff. | M | BR-02 |
| FR-E-09 | The system shall allow an editor to drill down from a call moment script to the full constituency-level data for the relevant contest within the same interface, without leaving the review screen. | M | BR-14 |
| FR-E-10 | Approved scripts shall be formatted and exported as broadcast-ready output. For demo-grade, this is a structured JSON export with a documented Vizrt import schema. For pilot-grade, this is a native Vizrt data push. | M | BR-07, BR-15 |
| FR-E-11 | All election results data and generated scripts displayed in demo-grade deployments shall carry a visible "DEMO DATA — NOT CERTIFIED" watermark in the editor interface and in any exported output. | M | BR-08 |
| FR-E-12 | The system shall support configuration of output language; Sentra AI shall generate the final script in the configured target language. The source data and attribution shall always be stored in the source language for audit purposes. | M | BR-09 |

### 6.2 Breaking News Module — Functional Requirements

| ID | Functional Requirement | Priority | Traces To |
|---|---|---|---|
| FR-BN-01 | The system shall maintain persistent connections to Reuters and AP wire feeds and ingest new items in real time, with a target ingestion latency of < 5 seconds from wire publication to system receipt. | M | BR-16 |
| FR-BN-02 | Each ingested wire item shall be validated for: presence of source attribution, non-empty headline and body, and a publication timestamp. Items failing validation shall be quarantined before entering the triage pipeline. | M | BR-10, BR-16 |
| FR-BN-03 | The system shall invoke Sentra AI to score each validated wire item across three dimensions: (a) significance (impact scale: local / national / international), (b) urgency (time-sensitivity: breaking / developing / background), and (c) category (politics / conflict / economics / other). Scoring shall complete within the overall 45-second event-to-editor-ready target. | M | BR-17 |
| FR-BN-04 | Sentra AI shall generate a first-read bulletin draft from each wire item. The draft shall be in the target broadcast language, structured as: headline, opening sentence, key facts (bulleted), attributed source line. | M | BR-18 |
| FR-BN-05 | The editor priority queue shall display pending items sorted by triage score (highest significance + urgency first) by default, with editor-adjustable override. Each item shall show: headline, triage score dimensions, source, wire timestamp, and time-in-queue. | M | BR-17 |
| FR-BN-06 | The editor review screen for a breaking news item shall display: (a) the auto-drafted bulletin, (b) the original wire item text, (c) the triage scores, (d) confidence band, and (e) source attribution. Editor actions are: Approve, Reject-with-Note, and Edit-then-Approve. | M | BR-02, BR-03 |
| FR-BN-07 | An approved breaking news bulletin shall be deliverable to teleprompter or rundown via a single editor action (one-click push). At pilot-grade, this shall execute a native Vizrt push; at demo-grade, this shall generate a formatted export file. | M | BR-19, BR-07 |
| FR-BN-08 | The system shall support configuration of target broadcast language per deployment; Sentra AI shall draft the bulletin in the configured language. | M | BR-09 |

### 6.3 Shared Sentra AI and Editorial Layer — Functional Requirements

| ID | Functional Requirement | Priority | Traces To |
|---|---|---|---|
| FR-S-01 | The Sentra AI generation pipeline shall accept a structured event payload (data record + event type + source metadata) and return a draft content item (script or bulletin) with confidence band and source citations attached. | M | BR-01, BR-03 |
| FR-S-02 | Confidence bands shall be computed and attached to every content item as one of three values: High, Medium, or Low. The logic for band assignment shall be documented and version-controlled. Confidence band must be visible to editors before any approval action is enabled. | M | BR-03 |
| FR-S-03 | Source attribution for every content item shall include: source name, source item ID or reference, publication timestamp, and (for election data) certification token. Attribution shall be stored immutably linked to the content item record. | M | BR-03, BR-04 |
| FR-S-04 | The system shall implement a hard approval gate: no content item shall transition to exported or playout-delivered status unless an editor has explicitly performed an Approve or Edit-then-Approve action on that item. This constraint shall not be bypassable by any configuration, API call, or administrative action. | M | BR-02 |
| FR-S-05 | The system shall implement an ingest validation layer that checks all incoming data (election feeds and wire items) for: (a) schema conformance, (b) source attribution presence, (c) timestamp validity, and (d) absence of duplicate item IDs. Items failing any check shall be routed to a quarantine queue and shall not be visible in the editor workflow. | M | BR-10 |
| FR-S-06 | A kill switch control shall be available to authorised operators. Activation shall halt all content generation, editor queue population, and playout handoffs within 5 seconds. The kill switch state shall be logged in the audit trail with timestamp and activating user identity. | M | BR-05 |
| FR-S-07 | When the system receives a correction or retraction signal from an upstream source (election data provider or wire service), it shall: (a) immediately block export or playout of any content item derived from the corrected data, (b) alert all active editors within 2 minutes in 95% of cases, and (c) mark affected items in the editor queue as "Corrected — Review Required". | M | BR-06 |
| FR-S-08 | The system shall write an immutable audit log entry for every state transition of a content item: ingest received, validation result, quarantine (if applicable), Sentra AI generation invoked, generation complete, editor review opened, editor action (with editor identity, action type, note if any), export triggered, playout handoff confirmed. | M | BR-04 |
| FR-S-09 | The audit log shall be retained for a minimum of 30 days. Log entries shall not be modifiable or deletable by any user role including administrators. The full audit trail for a given content item shall be retrievable within 60 seconds of request. | M | BR-04 |
| FR-S-10 | The audit log and all raw ingest records shall not be visible to broadcaster editor or news director roles in the standard editor interface. Access shall require a separate, permissioned compliance/audit role. | M | BR-04 |
| FR-S-11 | The playout handoff for approved content shall target Vizrt as the primary integration. At pilot-grade, the system shall deliver approved content to the Vizrt playout system within 10 seconds of editor sign-off, with no manual transfer step required. | M | BR-07, BR-15, BR-19 |
| FR-S-12 | At demo-grade, the system shall produce a structured JSON export of approved content alongside a documented Vizrt import schema, enabling manual import by a playout operator. | M | BR-07 |
| FR-S-13 | The editor dashboard shall be a lean, single-screen interface. It shall not require more than three clicks to move from viewing an incoming item to completing an approval action. | S | BR-02, BR-03 |
| FR-S-14 | The system shall surface a data timestamp confirmation checkbox to the editor for each content item, enabling the editor to explicitly acknowledge the currency of the source data before approving. | M | BR-03 |

---

## 7. Non-Functional Requirements

### 7.1 Performance

| ID | Non-Functional Requirement | Target | Priority |
|---|---|---|---|
| NFR-P-01 | End-to-end latency from event trigger (election call moment detected or wire item ingested) to content item appearing, fully sourced and confidence-scored, in the editor dashboard shall be ≤ 45 seconds under normal operating conditions. | ≤ 45 seconds (median) | M |
| NFR-P-02 | The combined event-to-editor-ready latency plus editor approval time shall support the platform's headline promise of under 60 seconds from event to on-air readiness, leaving approximately 15 seconds for editor review within the 60-second envelope. | ≤ 60 seconds (end-to-end headline) | M |
| NFR-P-03 | Approved content shall be delivered to the playout system (Vizrt at pilot-grade) within 10 seconds of the editor's approval action. | ≤ 10 seconds | M |
| NFR-P-04 | The kill switch shall halt all active output within 5 seconds of activation, under any load condition including election night peak. | ≤ 5 seconds | M |
| NFR-P-05 | Upstream correction/retraction alerts shall reach all active editors within 2 minutes of the correction signal being received by the system, in at least 95% of occurrences. | ≤ 2 minutes (P95) | M |
| NFR-P-06 | The audit trail for a specific content item shall be retrievable within 60 seconds of an authorised request. | ≤ 60 seconds | M |
| NFR-P-07 | Wire feed ingestion latency (from wire publication to system receipt) shall be ≤ 5 seconds under normal operating conditions. | ≤ 5 seconds | M |
| NFR-P-08 | Election feed polling shall reflect result updates within 10 seconds of feed publication. | ≤ 10 seconds | M |
| NFR-P-09 | The system shall sustain all performance targets (NFR-P-01 through NFR-P-08) during simulated election night peak load, defined as the concurrent processing of multiple simultaneous call moment events and wire items. | ASSUMPTION: peak load volume to be defined by Sentra AI / Eng team based on target market size; load test must be run before pilot sign-off. | M |

### 7.2 Accuracy and Reliability

| ID | Non-Functional Requirement | Target | Priority |
|---|---|---|---|
| NFR-A-01 | The factual error rate for content items that pass through the approval gate and reach broadcast output shall be < 2%, measured against correction log entries. | < 2% | M |
| NFR-A-02 | The ingest validation layer shall quarantine 100% of malformed or unattributed data records before they reach the editor queue, with zero false negatives in acceptance testing. | 100% quarantine rate | M |
| NFR-A-03 | Sentra AI narrative accuracy for election call moments shall be validated under simulated full-volume election night conditions before pilot sign-off. Lab benchmarks alone are insufficient for this gate. | ASSUMPTION: accuracy acceptance threshold (e.g., % of scripts requiring zero editor correction) to be agreed with News Director stakeholder prior to pilot. | M |
| NFR-A-04 | The platform shall have a minimum availability of 99.5% during contracted election event windows (from polls-close to final result declaration). | ≥ 99.5% during election windows | M |
| NFR-A-05 | The platform shall have a minimum availability of 99.0% during non-election periods (always-on Breaking News operation). | ≥ 99.0% during non-election periods | S |

### 7.3 Auditability and Compliance

| ID | Non-Functional Requirement | Target | Priority |
|---|---|---|---|
| NFR-AU-01 | Every content item in the system shall have a complete, unbroken audit trail from ingest to output (or quarantine/rejection). No gaps in the log chain shall be permitted. | Zero audit trail gaps | M |
| NFR-AU-02 | Audit log entries shall be cryptographically immutable — no post-write modification shall be possible by any user or system process. | Immutability enforced at storage layer | M |
| NFR-AU-03 | Audit log retention shall be a minimum of 30 days from the log entry timestamp, with no automatic purging before day 30. | ≥ 30-day retention | M |
| NFR-AU-04 | The approval gate event in the audit log shall record: editor user ID, timestamp (UTC), action taken (Approve / Reject / Edit-then-Approve), rejection note text (if applicable), and content item ID. | All fields required | M |

### 7.4 Security

| ID | Non-Functional Requirement | Target | Priority |
|---|---|---|---|
| NFR-SEC-01 | All data in transit between platform components (ingest, AI generation, editor interface, playout handoff) shall be encrypted using TLS 1.2 or higher. | TLS 1.2+ | M |
| NFR-SEC-02 | All data at rest, including audit logs, ingest records, and generated content, shall be encrypted using AES-256 or equivalent. | AES-256 at rest | M |
| NFR-SEC-03 | Role-based access control (RBAC) shall be enforced. Minimum roles: Editor, News Director, Playout Operator, Compliance/Audit, System Administrator. Each role shall have the minimum permissions required for its function. | RBAC enforced | M |
| NFR-SEC-04 | The kill switch shall be accessible only to authorised operator roles (News Director, System Administrator). It shall not be accessible to Editor or Playout Operator roles. | Role-restricted | M |
| NFR-SEC-05 | All user authentication shall require a minimum of username + password with session token management. Multi-factor authentication (MFA) shall be available for all roles and mandatory for Compliance/Audit and System Administrator roles. | MFA mandatory for privileged roles | S |
| NFR-SEC-06 | The Sentra AI processing layer and ingest pipeline shall not be directly accessible from the public internet. All external integrations (wire feeds, election data provider, playout systems) shall connect via authenticated, IP-restricted endpoints. | No direct public exposure | M |

### 7.5 Localisation and Language

| ID | Non-Functional Requirement | Target | Priority |
|---|---|---|---|
| NFR-L-01 | The system shall support configuration of at least one target output language per deployment. Sentra AI-generated scripts and bulletins shall be produced in the configured language. | Per-deployment language config | M |
| NFR-L-02 | Source data and source attribution shall be stored and auditable in the original source language regardless of the configured output language. | Source language preserved in audit | M |
| NFR-L-03 | ASSUMPTION: The initial Phase 1 pilot will target English-language output. Additional language support shall be confirmed with the first pilot client prior to development of language-specific generation logic. | ASSUMPTION | S |

### 7.6 Usability

| ID | Non-Functional Requirement | Target | Priority |
|---|---|---|---|
| NFR-U-01 | The editor dashboard shall enable a trained editor to complete a review-and-approve action on a content item in under 90 seconds from opening the item. | ≤ 90 seconds per item | M |
| NFR-U-02 | The editor interface shall not require more than three clicks to move from viewing an incoming item to completing an approval action (Approve or Reject-with-Note). | ≤ 3 clicks to approval | S |
| NFR-U-03 | The platform shall be operable by editorial staff without specialised technical training, beyond a structured onboarding session of ASSUMPTION ≤ 2 hours. | ≤ 2 hours onboarding (ASSUMPTION) | S |

---

## 8. End-to-End Workflow and Process Model

### 8.1 High-Level Five-Stage Flow

```
+-------------------+    +-------------------+    +--------------------+    +------------------+    +------------------+
|                   |    |                   |    |                    |    |                  |    |                  |
|   STAGE 1         |    |   STAGE 2         |    |   STAGE 3          |    |   STAGE 4        |    |   STAGE 5        |
|   EVENT /         |--->|   INGEST &        |--->|   SENTRA AI        |--->|   EDITOR         |--->|   ON-AIR         |
|   WIRE TRIGGER    |    |   VALIDATION      |    |   GENERATION       |    |   REVIEW &       |    |   OUTPUT         |
|                   |    |                   |    |                    |    |   APPROVAL       |    |   (PLAYOUT)      |
+-------------------+    +-------------------+    +--------------------+    +------------------+    +------------------+
        |                        |                         |                        |                        |
  [Elections]              Validate schema           Generate script /         Approve /             Playout handoff
  Call moment              Check attribution         bulletin draft            Edit /                (Vizrt pilot)
  detected                 Timestamp check           Attach confidence         Reject-with-Note      < 10s after
                           Dedup check               band (H/M/L)                                    approval
  [Breaking News]          |                         Attach source                                   |
  Wire item                v                         citation                  MANDATORY GATE:       v
  received            [QUARANTINE]                   |                         No auto-publish       On-air
                      Malformed /                    v                         ever                  content
                      unattributed              [≤ 45s from                                          displayed
                      data blocked              Stage 1 to                                          via
                      before editor             Stage 4 entry]                                      playout
                      queue                                                                          system
```

### 8.2 Detailed Stage Descriptions

**Stage 1 — Event / Wire Trigger**

- Actor: External data source (contracted election feed or wire service)
- Input: Raw result record (Elections) or wire item (Breaking News)
- Control Points: Feed connectivity is monitored; reconnect logic required; feed outage triggers ops alert
- Elections: Call moment logic (FR-E-04) evaluates incoming results continuously; triggers on threshold breach
- Breaking News: Every validated wire item is a trigger candidate; Sentra triage scoring prioritises

**Stage 2 — Ingest and Validation**

- Actor: System (automated)
- Input: Raw data record from Stage 1
- Processing: Schema validation, source attribution check, timestamp validation, deduplication
- Control Points: QUARANTINE path — malformed or unattributed records never proceed; ops alert raised
- Output: Validated, clean data record passed to Stage 3; quarantine record logged to audit trail
- SLA: Must complete within budget that keeps total Stage 1-to-Stage 4 latency ≤ 45s

**Stage 3 — Sentra AI Generation**

- Actor: Sentra AI pipeline (automated)
- Input: Validated event payload (data + event type + source metadata)
- Processing: Narrative generation OR triage scoring + bulletin draft; confidence band computed; source citations attached
- Control Points: Confidence band assignment logic must be version-controlled and documented; generation timeout handling required
- Output: Draft content item (script or bulletin) + confidence band + source citations
- SLA: Total Stage 1 through Stage 3 completion ≤ 45 seconds

**Stage 4 — Editor Review and Approval**

- Actor: Broadcaster Editor (human)
- Input: Draft content item with confidence band, source attribution, raw source, and data timestamp checkbox
- Interface: Lean editor dashboard — single screen, three actions only (Approve / Reject-with-Note / Edit-then-Approve)
- Control Points: MANDATORY APPROVAL GATE — system enforces this; no bypass path; all three actions logged to audit trail with editor identity and timestamp
- Output: Approved content item (or rejected item removed from queue with note logged)
- SLA: Approval window is the residual after Stage 1-3 latency, within the 60-second headline promise; acceptance criterion is editor completing review in < 90s (NFR-U-01)

**Stage 5 — On-Air Output (Playout)**

- Actor: Playout / Graphics Operator (receives handoff); system executes transfer
- Input: Approved content item from Stage 4
- Processing: Format for target playout system; transmit via integration
- Control Points: Handoff confirmation logged to audit trail; failed handoff triggers operator alert; kill switch can halt this stage at any time in ≤ 5s
- Output: Content visible/audible in broadcast playout system
- SLA: ≤ 10 seconds from editor approval to playout delivery (pilot-grade and above)
- Demo-grade: JSON export + Vizrt import schema provided; manual operator import

### 8.3 Exception and Control Flows

```
QUARANTINE FLOW (Stage 2 failure):
  Invalid record --> Quarantine queue --> Ops alert raised --> Audit log entry written --> STOP (does not proceed to Stage 3)

CORRECTION / RETRACTION FLOW (post-Stage 4):
  Source correction signal received
    --> System identifies all content items derived from corrected data
    --> Blocks export/playout of affected items immediately
    --> Alert sent to all active editors within 2 minutes (P95)
    --> Affected items marked "Corrected — Review Required" in editor queue
    --> Audit log entry written for each affected item

KILL SWITCH FLOW:
  Authorised operator activates kill switch
    --> All content generation halted
    --> All editor queue population halted
    --> All playout handoffs halted
    --> WITHIN 5 SECONDS from activation
    --> Kill switch activation written to audit log with operator identity and UTC timestamp
```

---

## 9. Data and Integration Requirements

### 9.1 Election Data Feed

| Attribute | Requirement |
|---|---|
| Source type | Contracted authoritative data provider; no web scraping or uncontracted aggregation |
| Feed protocol | ASSUMPTION: API-based (REST or WebSocket); exact protocol to be confirmed upon provider selection (Open Gate 1 — see Section 11) |
| Polling / streaming | System shall poll or stream at a cadence that reflects result updates within 10 seconds of feed publication |
| Required fields | Constituency ID, candidate ID, party, vote count, declared status, timestamp, source certification token |
| Certification | Provider must supply a certification token or equivalent mechanism to verify data provenance per record |
| Demo period | Until contracted feed is live, demo data shall be synthetic, clearly tagged, and the system shall enforce the "DEMO DATA — NOT CERTIFIED" watermark |
| Fallback | OPEN RISK: No contracted fallback provider has been identified. A fallback mechanism is required before go-live (see Risk R-01) |

### 9.2 Wire Feed Integration (Breaking News)

| Attribute | Requirement |
|---|---|
| Sources | Reuters and AP as minimum; both must be active before Breaking News is enabled |
| Protocol | ASSUMPTION: Standard wire protocols (e.g., IPTC NewsML, NITF, or REST API); exact protocol to be confirmed at wire integration validation (Open Gate 3 — see Section 11) |
| Ingestion latency | Wire publication to system receipt ≤ 5 seconds |
| Integration timeline | Approximately 6 weeks; must be validated as a dependency by Week 2 of build. If validation fails, Breaking News module delivery date slips; Elections module is not affected |
| Attribution compliance | Wire terms of service (Reuters, AP) must be reviewed by Legal/Compliance before integration goes live; attribution line in every published bulletin is a contractual requirement |

### 9.3 Playout Integration (Vizrt)

| Attribute | Requirement |
|---|---|
| Target system | Vizrt (primary); Chyron is a post-pilot, deal-specific fast-follow |
| Demo-grade | Structured JSON export with a fully documented Vizrt import schema; manual import by playout operator; no native connection required |
| Pilot-grade | Native Vizrt integration; approved content delivered to Vizrt within 10 seconds of editor sign-off; no manual transfer |
| Validation | OPEN GATE: Vizrt as the playout target must be validated against the actual prospect list before committing to native integration development (Open Gate 2 — see Section 11) |
| Data format | ASSUMPTION: Vizrt-compatible data format (e.g., Vizrt DataHub format); exact schema to be agreed with Vizrt and documented before pilot integration begins |
| Production-grade | Post-pilot; scope not defined in this document |

### 9.4 Data Provenance and Validation Rules

| Rule | Description |
|---|---|
| DV-01 | Every content item in the system shall retain a reference to its originating source record throughout its lifecycle, from ingest to audit log. |
| DV-02 | Source attribution shall never be stripped, summarised away, or rendered optional at any processing stage. |
| DV-03 | Confidence band values (High / Medium / Low) shall be derived from a versioned, documented algorithm. The algorithm version shall be stored with each content item record. |
| DV-04 | Duplicate detection shall be applied at ingest: items with identical source item IDs shall not be processed twice. Duplicate detection logic shall be documented. |
| DV-05 | The audit log shall be written to a separate, access-controlled storage layer from the main application database. Write access to audit log storage shall be restricted to the audit-writing service identity only. |

### 9.5 Output Data Requirements

| Attribute | Requirement |
|---|---|
| Script export format (demo) | Structured JSON; schema published and versioned; Vizrt import schema documented separately |
| Script export format (pilot+) | Native Vizrt push; content formatted per agreed Vizrt schema |
| Language storage | Source-language data always stored in audit; output-language content stored separately; both linked to same content item ID |
| Watermarking | Demo-grade output: "DEMO DATA — NOT CERTIFIED" applied at generation, visible in interface and all export formats |

---

## 10. Assumptions, Dependencies, and Open Decisions

### 10.1 Assumptions

| ID | Assumption | Impact if Wrong | Owner |
|---|---|---|---|
| ASM-01 | The Phase 1 pilot will target English-language output as the primary configuration. Additional languages will be scoped per client prior to development. | Language generation scope and testing effort will increase if non-English output is required at pilot. | Reson8 Product |
| ASM-02 | The election data provider will supply a machine-readable certification token or equivalent per record, enabling automated provenance verification. | If no per-record certification mechanism exists, the validation layer design must be revisited. | Reson8 Product / Data Provider |
| ASM-03 | Sentra AI can generate a confidence band from the structured data payload without requiring external lookups or human pre-scoring. | If confidence band requires manual calibration per event type, Stage 3 latency will be affected. | Sentra AI / Eng |
| ASM-04 | Peak election night concurrent call-moment event volume for the target market can be modelled and used to define a load test specification before pilot sign-off. | If volume cannot be modelled, load testing will be underpowered and NFR-P-09 cannot be verified. | Sentra AI / Eng |
| ASM-05 | The Vizrt integration will use a documented, stable API or data protocol. No custom Vizrt development is required on the Vizrt side. | If Vizrt requires custom development or a new licence, the pilot-grade timeline (Sept/Oct 2026) is at risk. | Reson8 Eng |
| ASM-06 | Editor onboarding time for the platform is ≤ 2 hours for a trained broadcast journalist. No platform-specific journalism training is required. | If onboarding proves longer, editor adoption target (≥ 70% in 30 days) may be at risk. | Reson8 Product |
| ASM-07 | A synthetic, realistic demo dataset for elections can be produced prior to Aug 2026 demos that faithfully simulates election night data volumes and patterns. | If synthetic data is insufficient for demo credibility, demo conversions will be impacted. | Reson8 Product / Eng |

### 10.2 Open Decisions and Gates

These three items are hard gates that must be resolved by the stated dates. Failure to resolve any gate by its deadline will directly block the associated deliverable.

| ID | Open Decision | Required By | Impact if Unresolved | Owner |
|---|---|---|---|---|
| OG-01 | **Election Data Provider Selection** — A contracted, certified authoritative election data provider must be selected and the contract executed. This is required to (a) begin integration development, (b) validate the data schema, and (c) satisfy the demo watermark requirement post-contract. | **July 1, 2026 (hard gate)** | Elections module cannot go live with real data; certification timeline for the provider's data cannot start until contract is executed. Demo proceeds with watermarked synthetic data. | TBD — Reson8 Product / Commercial |
| OG-02 | **Playout Target Validation (Vizrt)** — Vizrt must be confirmed as the correct playout integration target by validating it against the actual prospect and pilot client list. If pilot clients use a different system, the integration target changes. | **Prior to committing native integration development** (ASSUMPTION: Week 4 of build at latest) | Development effort for pilot-grade playout integration may be wasted if the target changes. Chyron or another system may need to be fast-tracked. | TBD — Reson8 Product / Sales |
| OG-03 | **Wire Integration Dependency Validation** — The technical feasibility, feed access, and contractual access for Reuters and AP wire integration must be validated. | **Week 2 of build** | If integration cannot be confirmed by Week 2, Breaking News module delivery date slips. Elections module is ring-fenced and not affected by this gate. | TBD — Reson8 Eng / Commercial |

---

## 11. Risks and Mitigations

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| R-01 | Election data feed reliability in target markets — contracted provider feed goes down or publishes incorrect data during a live election | Medium | Critical | (a) Define feed SLA requirements before contract signature; (b) identify a fallback data provider before go-live; (c) correction/retraction workflow (FR-S-07) mitigates incorrect data reaching broadcast; (d) ingest validation (FR-S-05) blocks malformed data before editor queue | Reson8 Product / Data Provider |
| R-02 | Playout integration is the longest-lead technical dependency — Vizrt integration underestimated or target changes post-start | Medium | High | (a) Validate Vizrt as correct target against prospect list (OG-02) before committing; (b) demo-grade JSON export provides a fallback delivery path that does not depend on native integration; (c) allocate integration development as the first technical task after OG-02 is resolved | Reson8 Eng |
| R-03 | Sentra AI accuracy at real election-night volume — lab benchmarks may not represent peak-load degradation in accuracy or latency | Medium | Critical | (a) Simulated full-volume election night load test is a hard acceptance criterion (AC-01) before pilot; (b) do not accept lab benchmarks as sufficient validation; (c) confidence band surfaced to editors provides a human check on AI output quality at all times | Sentra AI / Eng |
| R-04 | Wire feed access for Breaking News not secured in time — Reuters / AP contractual or technical access delayed past Week 2 gate | Low | High | (a) Begin wire access conversations immediately; (b) validate by Week 2 (OG-03); (c) if delayed, Breaking News delivery date slips — clearly communicate that Elections module is unaffected and ring-fenced | Reson8 Commercial / Eng |
| R-05 | Wrong figures on air — legal, reputational, and regulatory exposure if an incorrect election result or news item reaches broadcast | Low (by design) | Critical | (a) Mandatory human approval gate (FR-S-04) is the primary control — no auto-publish ever; (b) ingest validation and quarantine (FR-S-05) blocks bad data upstream; (c) correction/retraction workflow (FR-S-07) handles upstream corrections; (d) immutable audit log (FR-S-08/09) provides forensic trail; (e) this risk drives the non-negotiable status of the editorial layer | Reson8 Product / Compliance |
| R-06 | Editor adoption failure — editors revert to existing workflows within 30 days of deployment | Medium | High | (a) Lean dashboard design with < 3 clicks to approval (NFR-U-02) reduces friction; (b) ≤ 2-hour onboarding target (NFR-U-03); (c) editor adoption measured at 30 days (KPI-03) with explicit intervention plan if < 70%; (d) involve News Director as internal champion in each deployment | Reson8 Product |
| R-07 | Demo-to-pilot conversion below 40% — demo clients do not convert to paid pilots | Medium | High | (a) Demo data quality must be realistic and representative (ASM-07); (b) watermarking must be clearly visible to prevent demo being mistaken for real capability; (c) demo must be against a validated prospect list (OG-02 related); (d) track conversion rate actively from first demo | Reson8 Commercial |
| R-08 | Demo data watermark not applied — demo content treated as certified data, creating false confidence in broadcast suitability | Low | Critical | (a) Watermark enforced at system level (FR-E-11), not as a manual step; (b) watermark visible in editor interface AND in all export formats; (c) acceptance criterion AC-04 (quarantine of bad data) is related; legal must sign off on watermark language | Reson8 Eng / Legal |

---

## 12. Acceptance Criteria

These six criteria are the Phase 1 readiness gate. ALL six must pass before pilot sign-off. They are testable against documented test scenarios.

| ID | Acceptance Criterion | Test Method | Pass Condition |
|---|---|---|---|
| AC-01 | Simulated full-volume election night — zero incorrect figures reach output | Run a scripted simulation of a full election night using a data set that includes correct results, injected errors, and a correction signal. Count the number of incorrect figures present in approved output. | PASS: Zero incorrect figures in approved output. Quarantine catches all injected errors; correction workflow blocks all stale content derived from the corrected data. |
| AC-02 | Editor reviews and approves a live Breaking News item in under 90 seconds | Time a trained editor (not previously briefed on the specific item) from the point an item appears in the priority queue to the completion of an Approve or Edit-then-Approve action. | PASS: Median time across at least 5 test items is < 90 seconds. |
| AC-03 | Approved content reaches integrated playout within 10 seconds of editor sign-off, with no manual transfer step | From the moment an editor completes an Approve action, measure time until the content item is confirmed received by the playout system. | PASS: Content confirmed at playout ≤ 10 seconds after approval in 100% of test runs (minimum 10 runs). No manual steps required. |
| AC-04 | Injected bad data (malformed or unattributed) is quarantined before reaching the editor queue in 100% of cases | Inject a defined set of malformed records (missing attribution, schema-invalid, duplicate IDs) into the ingest pipeline. Verify each record against the quarantine queue and the editor queue. | PASS: 100% of injected bad records appear in quarantine queue; 0 appear in editor queue. |
| AC-05 | Full audit trail is retrievable within 60 seconds of request | Request the complete audit trail for a specific content item that has passed through all five workflow stages. Measure time from request to full audit record display. | PASS: Full audit trail retrieved in ≤ 60 seconds in all test runs (minimum 5 runs). |
| AC-06 | Upstream correction triggers active-editor alert within 2 minutes in 95% of runs | Send a correction signal for a data record that has content items in the editor queue. Measure time from signal receipt to alert appearing on the active editor's dashboard. | PASS: Alert delivered within 2 minutes in ≥ 95% of test runs (minimum 20 runs). |

---

## 13. Success Metrics and KPIs

| ID | Metric | Target | Measurement Method | Review Cadence |
|---|---|---|---|---|
| KPI-01 | Demo-to-pilot conversion rate | ≥ 40% within 60 days of demo | Count of demo clients that proceed to signed pilot agreements divided by total demo clients, at 60-day mark | At 60 days post each demo cohort |
| KPI-02 | Median event-to-editor-ready latency | < 60 seconds (median); internal target ≤ 45 seconds | System-logged timestamps: event trigger timestamp vs. content item appearance in editor dashboard | Continuous; reviewed weekly during pilot |
| KPI-03 | Editor adoption rate | ≥ 70% of bulletins/scripts processed through platform within 30 days of go-live | Count of bulletins/scripts where editorial action was taken in platform divided by total bulletins/scripts produced in newsroom during the period | At 30 days post go-live per deployment |
| KPI-04 | Factual error rate in approved output | < 2% | Count of correction log entries for on-air content divided by total on-air items, measured over trailing 30 days | Monthly; reviewed immediately if a correction occurs |
| KPI-05 | First paid contract milestone | ≥ 1 signed paid contract by Q4 2026 | Signed contract on file | At Q4 2026 close |
| KPI-06 | Playout handoff latency | ≤ 10 seconds (100% of deliveries at pilot-grade) | System-logged timestamps: editor approval timestamp vs. playout system receipt confirmation | Continuous; reviewed weekly during pilot |
| KPI-07 | Kill switch response time | ≤ 5 seconds (100% of activations) | Measured in acceptance testing and monitored in production via audit log timestamps | Verified in AC testing; reviewed if activated in production |
| KPI-08 | Correction alert delivery time | ≤ 2 minutes (P95) | Measured via audit log: correction signal timestamp vs. editor alert delivery timestamp | Verified in AC testing; tracked from audit log in production |

---

## 14. Requirements Traceability Matrix

### 14.1 Business Requirement to Functional Requirement Traceability

| BR ID | Business Requirement (summary) | FR IDs | Acceptance Criterion |
|---|---|---|---|
| BR-01 | Event to editor-ready < 60 seconds | FR-E-05, FR-BN-03, FR-BN-04, FR-S-01 | AC-02 (proxy); NFR-P-01/02 |
| BR-02 | No content published without human approval | FR-E-08, FR-BN-06, FR-S-04 | AC-01, AC-02, AC-03 |
| BR-03 | Source attribution and confidence band visible before approval | FR-E-06, FR-E-07, FR-BN-06, FR-S-01, FR-S-02, FR-S-03, FR-S-14 | AC-01, AC-02 |
| BR-04 | Immutable audit trail retrievable within 60 seconds | FR-S-08, FR-S-09, FR-S-10 | AC-05 |
| BR-05 | Kill switch halts output within 5 seconds | FR-S-06 | NFR-P-04 |
| BR-06 | Correction alerts reach active editors within 2 minutes (P95) | FR-S-07 | AC-06 |
| BR-07 | Three-grade delivery: demo / pilot / production | FR-E-10, FR-E-11, FR-BN-07, FR-S-11, FR-S-12 | AC-03 (pilot-grade) |
| BR-08 | Demo data watermarked "DEMO DATA — NOT CERTIFIED" | FR-E-11 | AC-04 (related) |
| BR-09 | Multi-language output | FR-E-12, FR-BN-08, FR-S-01 | NFR-L-01 |
| BR-10 | Ingest validation; malformed data quarantined | FR-E-02, FR-BN-02, FR-S-05 | AC-04 |
| BR-11 | Election data from contracted authoritative feed only | FR-E-01, FR-E-02, FR-E-11 | AC-01, AC-04 |
| BR-12 | Auto seat/vote tally computation | FR-E-03 | AC-01 (data accuracy) |
| BR-13 | AI narrative for call moments | FR-E-04, FR-E-05, FR-E-06, FR-E-07 | AC-01, AC-02 |
| BR-14 | Constituency-level drill-down in editor interface | FR-E-09 | AC-02 (editor usability) |
| BR-15 | Broadcast-ready script export for playout | FR-E-10, FR-S-11, FR-S-12 | AC-03 |
| BR-16 | Continuous Reuters + AP wire monitoring | FR-BN-01, FR-BN-02 | AC-04 (feed validation) |
| BR-17 | Sentra triage scoring surfaced to editors | FR-BN-03, FR-BN-05 | AC-02 |
| BR-18 | Auto-draft first-read bulletin | FR-BN-04, FR-BN-06 | AC-02 |
| BR-19 | One-click push to teleprompter/rundown | FR-BN-07 | AC-03 |

### 14.2 Business Objective to Business Requirement Traceability

| BO ID | Business Objective | BR IDs |
|---|---|---|
| BO-01 | Event to editor-ready < 60 seconds | BR-01, BR-12, BR-13, BR-17, BR-18 |
| BO-02 | Factual error rate < 2% | BR-02, BR-03, BR-06, BR-10, BR-11 |
| BO-03 | Editor adoption ≥ 70% in 30 days | BR-01, BR-02, BR-03, BR-14, BR-17 |
| BO-04 | Demo-to-pilot conversion ≥ 40% | BR-07, BR-08, BR-09, BR-15, BR-19 |
| BO-05 | ≥ 1 paid contract by Q4 2026 | BR-07, BR-15, BR-19 |
| BO-06 | Legally defensible; zero unvetted AI content on air | BR-02, BR-03, BR-04, BR-05, BR-06, BR-08, BR-10 |

---

## 15. Glossary

| Term | Definition |
|---|---|
| **ORA** | Alternative product name for Reson8. Used interchangeably with "Reson8" in commercial and product contexts. The platform may be deployed under either name or under a white-label client brand. |
| **Sentra AI** | The proprietary shared intelligence layer that powers all Reson8 modules. Responsible for content generation (scripts, bulletins), confidence band computation, triage scoring, and source citation attachment. Not exposed directly to end clients. |
| **Call Moment** | A defined, discrete editorial event in election coverage that requires a broadcast script: (a) winner declared in a constituency, (b) a party crossing the majority seat threshold, (c) an upset detected based on a configurable deviation from baseline expectation. |
| **Confidence Band** | A three-value signal (High / Medium / Low) computed by Sentra AI and attached to every content item. It indicates the AI's assessed reliability of the generated content given the source data. Always surfaced to the editor before an approval action is enabled. |
| **Editor Dashboard** | The primary interface for broadcaster editors. A lean, single-screen view showing incoming content items with inline AI-generated content, raw source data, confidence band, source attribution, and the three approval action buttons. |
| **Approval Gate** | The mandatory, non-bypassable human control point in the Reson8 workflow. No content item may proceed to export or playout without an explicit editor Approve or Edit-then-Approve action. This constraint is permanent — it is not a configuration option. |
| **Kill Switch** | An emergency control available to authorised operator roles (News Director, System Administrator). Activation halts all content generation, editor queue population, and playout handoffs within 5 seconds. |
| **Playout** | The technical process of delivering approved broadcast content (scripts, graphics data) to the on-air display or presentation system used by the broadcaster. |
| **Vizrt** | The primary target playout and graphics system for Phase 1 integration. A leading broadcast graphics and data-driven storytelling platform used widely in TV news production. |
| **Chyron** | An alternative broadcast graphics playout system. A post-pilot, deal-specific fast-follow integration target. Out of scope for Phase 1. |
| **Demo-Grade** | The first delivery tier. Capabilities: JSON export of approved content + a documented Vizrt import schema for manual playout operator import. All content watermarked "DEMO DATA — NOT CERTIFIED". Targeting August 2026 regional network demos. |
| **Pilot-Grade** | The second delivery tier. Capabilities: one native Vizrt integration; approved content delivered to playout within 10 seconds of sign-off; no manual transfer. Targeting September/October 2026. |
| **Production-Grade** | The third delivery tier. Full production hardening, additional integrations (Chyron, etc.), and post-pilot scope. Not defined in this document. |
| **Quarantine** | The holding state for ingest records that fail validation (malformed schema, missing attribution, invalid timestamp, duplicate ID). Quarantined records are blocked from entering the editor workflow and are logged to the audit trail. |
| **Correction / Retraction Workflow** | The automated process triggered when an upstream source (election data provider or wire service) issues a correction or retraction. The system immediately blocks content derived from the corrected data and alerts active editors within 2 minutes (P95). |
| **Audit Log** | An immutable, append-only record of every state transition for every content item in the system, from ingest to output. Retained for 30 days minimum. Not accessible to editor or news director roles. Retrievable by compliance/audit role within 60 seconds. |
| **Wire Service** | A subscription-based news distribution service that transmits breaking news items to subscribing organisations in near real time. Phase 1 minimum: Reuters and AP. |
| **Triage Score** | The Sentra AI-computed assessment of an incoming wire item across three dimensions: significance (local / national / international), urgency (breaking / developing / background), and category (politics / conflict / economics / other). Used to prioritise the editor queue. |
| **RACI** | Responsible, Accountable, Consulted, Informed — a framework for mapping stakeholder roles to activities. |
| **MoSCoW** | Must Have, Should Have, Could Have, Won't Have — a prioritisation framework used in this document to classify requirement importance. |
| **BRD** | Business Requirements Document — this document. Captures the business context, objectives, scope, stakeholders, and requirements for Phase 1 of Reson8 / ORA. |
| **FR** | Functional Requirement — a specific system behaviour or capability. Prefixed FR-E- (Elections), FR-BN- (Breaking News), or FR-S- (Shared Sentra/Editorial Layer). |
| **BR** | Business Requirement — a higher-level statement of what the business needs the system to do, traceable to a business objective. |
| **NFR** | Non-Functional Requirement — a quality attribute of the system (performance, security, availability, etc.), distinct from functional behaviour. |

---

*End of Document — BRD-RESON8-P1-001 v1.0 — DRAFT — 2026-06-10*
