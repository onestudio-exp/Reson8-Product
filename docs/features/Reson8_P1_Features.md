# Reson8 Platform — Phase 1 Feature Definition
## All Five Modules · Core / Launch Scope

**Date:** May 2026  
**Scope:** P1 only — features required for a production-ready broadcast on day one  
**Classification:** Internal Working Document

---

## Structure

```
SENTRA ENGINE (∞ — always active, all modules)
        ↓
RESON8 CORE (P1 — shared across all five modules)
        ↓
MODULE LAYER (P1 — domain-specific per module)
   ORA · ARENA · PULSE · ATMOS · FLASH
```

---

## Sentra Engine — Foundation (Always Active, All Modules)

The Engine is always on beneath every module. These capabilities require no activation — they are the platform's intelligence baseline.

| # | Capability | Description |
|---|---|---|
| E1 | 10-Language NLP | English · Arabic · French · Spanish · Russian · Chinese · German · Portuguese · Persian · Turkish; Arabic dialect recognition |
| E2 | Sentiment Analysis | Positive / Neutral / Negative; multi-language |
| E3 | 6-Emotion Model | Anger / Fear / Joy / Sadness / Disgust / Surprise |
| E4 | Named Entity Recognition | Persons, organisations, locations, events |
| E5 | AI Content Generation | Headlines, captions, talking points |
| E6 | Real-Time Pipeline | 10k+ signals/day; ingest → enrich → embed |
| E7 | Breaking News Signal | Real-time breaking event classification |
| E8 | Anomaly Detection | Spike detection; pattern recognition |
| E9 | Arabic Processing | RTL parity; Shams typeface; dialect |
| E10 | Multi-Model AI Routing | Gemini 2.5 Flash / GPT-4 / Grok |
| E11 | Velocity & Virality Detection | Early viral signal before peak |
| E12 | Source Credibility Scoring | Trust-weighted per source type |

---

## Reson8 Core — P1
### Shared Across All Five Modules

These features are built once at platform level and inherited by every module. They never change regardless of which module is active.

### Editorial Chain

| # | Feature | Description |
|---|---|---|
| C1 | Producer Preparation Queue | Producer selects graphic, populates data, stages for editorial review |
| C2 | Editor Approval Layer | Editor reviews staged graphic; approves or rejects with note |
| C3 | Operator Take to Air | Operator fires approved graphic to Vizrt; logged immediately |
| C4 | Reject & Revise Workflow | Editor rejects back to Producer with comment; revision loop |
| C5 | Live / Preview Separation | Preview pane shows graphic before take; no accidental on-air |
| C6 | Editorial Audit Trail | Immutable log: who prepared, who approved, when taken, what aired |
| C7 | Editorial Review Gate | All AI-generated content reviewed by editor before any take to air |

### Vizrt Integration

| # | Feature | Description |
|---|---|---|
| C8 | Vizrt Scene Binding | Native data container binding to Vizrt scene elements |
| C9 | Direct Data Feed to Vizrt | Data flows from Reson8 to Vizrt engine; no manual entry |
| C10 | Viz Engine Output | Drives existing Vizrt renderer; no graphics engine replacement |

### Control Room

| # | Feature | Description |
|---|---|---|
| C11 | Control Room Dashboard | Single view of all outputs, statuses, and queued graphics |
| C12 | Multi-Screen Management | Assign graphics to specific output screens and channels |
| C13 | Operator Role Assignment | Per-screen operator with permission controls |
| C14 | Real-Time Status Monitor | Live view of what is on air and what is in the queue |
| C15 | Emergency Override | Senior editor clears or overrides any queued graphic instantly |
| C16 | Broadcast Event Log | Full log of every on-air event with timestamp and attribution |

### AI Content Generation

| # | Feature | Description |
|---|---|---|
| C17 | Auto-Generated Headline | AI drafts broadcast headline from live event data |
| C18 | Lower-Third Caption Generation | AI generates lower-third text per graphic type |
| C19 | Bilingual Broadcast Text | All text produced in Arabic + English simultaneously |

### Access & Security

| # | Feature | Description |
|---|---|---|
| C20 | Role-Based Access Control | Producer / Editor / Operator / Admin role separation |
| C21 | Audit Logging | Immutable action trail for all platform events |
| C22 | Multi-Tenant Architecture | Per-client data isolation; tenant-scoped access |
| C23 | Notification System | In-app and push alerts; configurable per user |
| C24 | Broadcast Security & Auth | JWT, OTP, 2FA, SSO, magic link; control room hardened |

### Performance & Reliability

| # | Feature | Description |
|---|---|---|
| C25 | ≤4 Second Wire-to-Air SLA | End-to-end from feed ingestion to graphic on screen |
| C26 | 99.99% Uptime Target | Zero-failure broadcast event requirement |
| C27 | Primary Feed Redundancy | Primary + fallback data sources; automatic switching |
| C28 | Broadcast Output Failover | Automatic failover on Vizrt output path |
| C29 | On-Prem or Cloud Deployment | Deploys in broadcaster's infrastructure or cloud-hosted |

---

## Module 1: ORA — Elections

### System Setup

| # | Feature | Description |
|---|---|---|
| O1 | Election Configuration Wizard | Country, election type, date, seat count, electoral system rules |
| O2 | Candidate Database | Full roster: name, party, district, photo, ID |
| O3 | Party Database | Registry: official colours, symbols, acronyms, leadership |
| O4 | Constituency Mapping | District / constituency geospatial configuration and seat allocation |
| O5 | Results Feed Integration | Official API or data feed: authentication, field mapping, validation |
| O6 | Seat / Vote Threshold Alerts | Configurable alert triggers: majority, seat milestones, concession |
| O7 | Elections Template Library | Pre-built Vizrt scenes: results bar, map, ticker, candidate card |
| O8 | Pre-Election Baseline Load | Historical results and polling data loaded before broadcast night |

### Live Results

| # | Feature | Description |
|---|---|---|
| O9 | Real-Time Vote Count Display | Live tally: percentage + absolute votes; updates as reported |
| O10 | Seat Tally Display | Seats won / projected; majority threshold line shown |
| O11 | Lead / Trail Indicators | Live candidate ranking per constituency; gain / loss markers |
| O12 | Results by Constituency | Drill-down from national aggregate to individual district |
| O13 | Progressive Results Update | % of precincts reporting; confidence indicator per result |
| O14 | Results Validation Layer | Anomaly flag on data jumps before graphic reaches editorial queue |
| O15 | Comparative Results | Side-by-side current vs. prior election result per constituency |

### Interactive Map

| # | Feature | Description |
|---|---|---|
| O16 | Geographic Results Map | National map filled by winning party / candidate colour |
| O17 | Regional Drill-Down | Click-through: National → Province → District |
| O18 | Colour-Coded Party Performance | Configured party colours applied automatically to map |

### Entity Profiles

| # | Feature | Description |
|---|---|---|
| O19 | Candidate Profile Card | Photo, name, party, district, bio, social links |
| O20 | Party Profile Card | Overview, leadership, seat target, coalition history |
| O21 | Candidate Social Sentiment | Live Sentra Engine sentiment on candidate mentions |
| O22 | Candidate Media Presence | Coverage volume + tone across news sources |

### Election Preparations

| # | Feature | Description |
|---|---|---|
| O23 | Historical Election Data | Prior election results pre-loaded per constituency |
| O24 | Polling Data Integration | Pre-election poll data ingested and shown in context |
| O25 | Graphics Template Pre-Load | All Vizrt scenes pre-bound; zero setup during broadcast |

### Social Sentiment

| # | Feature | Description |
|---|---|---|
| O26 | Election Social Listening | Filtered social stream scoped to election topics only |
| O27 | Candidate Sentiment Comparison | Side-by-side sentiment bars per candidate; real-time |
| O28 | Party Sentiment Trend | Sentiment over time per party; direction and magnitude |
| O29 | Hashtag Volume Tracking | Top election hashtags; volume + sentiment per hashtag |

### Breaking News

| # | Feature | Description |
|---|---|---|
| O30 | Elections Breaking Feed | Dedicated breaking stream filtered to elections content |
| O31 | Results Threshold Alert | Alert when result crosses configured milestone |

---

## Module 2: ARENA — Sports

### System Setup

| # | Feature | Description |
|---|---|---|
| A1 | Competition Configuration | League / cup / tournament setup: name, format, season dates |
| A2 | Team Database | Full club registry: name, colours, badge, home ground, squad |
| A3 | Player Database | Full player roster: name, position, nationality, age, photo, shirt number |
| A4 | Match Schedule | Fixture list loaded; match day configuration per broadcast window |
| A5 | Data Feed Integration | Official data provider connection: Opta / Stats Perform / league API |
| A6 | Sports Template Library | Pre-built Vizrt scenes: score bug, events, stats panel, player card |
| A7 | Vizrt Scene Assignment | Match data fields mapped to Vizrt scene data containers |

### Live Match

| # | Feature | Description |
|---|---|---|
| A8 | Live Score Display | Current score; continuously updated |
| A9 | Match Clock | Live match minute; stoppage time display |
| A10 | Live Match Events | Goals, assists, bookings, red cards, substitutions, VAR decisions — each triggers editorial queue |
| A11 | Event Threshold Alert | Alert when configured event occurs: goal, red card, penalty |
| A12 | Live Basic Statistics | Possession %, shots on/off target, fouls, corners, offsides |
| A13 | Results Validation Layer | Cross-check incoming event data before graphic enters editorial queue |

### Entity Profiles

| # | Feature | Description |
|---|---|---|
| A14 | Player Profile Card | Photo, name, position, nationality, current season stats |
| A15 | Team Profile Card | Club badge, manager, formation, current form |
| A16 | Player Social Sentiment | Sentra Engine live sentiment on player mentions during match |

### Competition Context

| # | Feature | Description |
|---|---|---|
| A17 | League Table / Standings | Current standings; points, goal difference, form |
| A18 | Form Guide | Last 5 results per team: W / D / L visual strip |
| A19 | Head-to-Head Record | All-time and recent record between the two teams in play |
| A20 | Top Scorers Tracker | Live golden boot standings updated after each goal |

### Social Sentiment

| # | Feature | Description |
|---|---|---|
| A21 | Match Social Listening | Social stream filtered to match and teams in play |
| A22 | Team Sentiment Comparison | Side-by-side fan sentiment per team; real-time |
| A23 | Trending Match Hashtags | Volume + sentiment for top match hashtags |

### Breaking News

| # | Feature | Description |
|---|---|---|
| A24 | Sports Breaking Feed | Breaking stream filtered to sport: injuries, lineups, statements |
| A25 | Match Alert | Alert on key in-match events from data feed |

---

## Module 3: PULSE — Finance & Markets

### System Setup

| # | Feature | Description |
|---|---|---|
| F1 | Market Configuration | Exchanges, indices, asset classes, coverage regions configured |
| F2 | Instrument Database | Stocks, indices, commodities, currencies, crypto: names, tickers, sectors |
| F3 | Market Data Feed Integration | Connect to live data provider: Bloomberg / Reuters / exchange API |
| F4 | Finance Template Library | Pre-built Vizrt scenes: ticker bar, price panel, index display, gainers/losers |
| F5 | Market Alert Configuration | % move triggers, circuit breaker alerts, index threshold alerts |

### Live Market Data

| # | Feature | Description |
|---|---|---|
| F6 | Live Price Display | Price, absolute change, % change; real-time per instrument |
| F7 | Market Index Display | Major indices live: local + global (e.g. Tadawul, Dow, FTSE, Nikkei) |
| F8 | Gainers & Losers Display | Top movers by % change; filterable by exchange and sector |
| F9 | Currency Exchange Rates | Live FX pairs; configurable per broadcast region |
| F10 | Commodity Prices | Oil (Brent/WTI), gold, key regionally relevant commodities |
| F11 | Market Status Indicator | Open / Closed / Pre-market / After-hours per exchange |
| F12 | Market Opening / Closing Event | Alert and auto-graphic trigger at configured market open/close |

### Entity Profiles

| # | Feature | Description |
|---|---|---|
| F13 | Company Profile Card | Name, ticker, sector, current price, 1-day chart, market cap |
| F14 | Index Profile Card | Index name, current level, daily range, YTD performance |

### Social Sentiment

| # | Feature | Description |
|---|---|---|
| F15 | Market Social Listening | Social stream filtered to financial topics and tickers |
| F16 | Instrument Sentiment | Live sentiment per ticker / commodity from social and news |

### Breaking News

| # | Feature | Description |
|---|---|---|
| F17 | Financial Breaking Feed | Breaking stream filtered to markets: earnings, rate decisions, economic data |
| F18 | Market Alert | Alert when price or index crosses configured threshold |

---

## Module 4: ATMOS — Weather

### System Setup

| # | Feature | Description |
|---|---|---|
| W1 | Coverage Area Configuration | Cities, regions, countries configured for broadcast geography |
| W2 | Weather Data Feed Integration | Connect to weather API provider: Tomorrow.io / AccuWeather / national met service |
| W3 | Weather Template Library | Pre-built Vizrt scenes: current conditions card, forecast display, temperature map, alert overlay |
| W4 | Alert Threshold Configuration | Severe weather thresholds: storm, extreme heat/cold, rainfall |

### Live Weather Data

| # | Feature | Description |
|---|---|---|
| W5 | Current Conditions Display | Temperature, conditions, wind speed/direction, humidity, UV index per location |
| W6 | Short-Range Forecast | 3-day and 7-day forecast per configured location |
| W7 | Temperature Map | Geographic temperature overlay across configured coverage area |
| W8 | Severe Weather Alert Display | Active severe weather warnings surfaced automatically to editorial queue |
| W9 | Weather Symbol Library | Standardised icon set: sun, cloud, rain, thunderstorm, sandstorm, snow |
| W10 | Location-Based Weather Card | Per-city card with conditions, high/low, and 3-day forecast |

### Breaking News

| # | Feature | Description |
|---|---|---|
| W11 | Severe Weather Breaking Alert | Auto-alert when national or regional meteorological authority issues a severe warning |
| W12 | Weather Alert Editorial Queue | Severe weather event enters editorial queue for review before graphic goes to air |

---

## Module 5: FLASH — Breaking News

### System Setup

| # | Feature | Description |
|---|---|---|
| B1 | News Source Configuration | Regions, topics, and source categories configured for monitoring |
| B2 | Severity Classification Setup | Define Major Breaking / Breaking / Developing thresholds |
| B3 | Breaking Template Library | Pre-built Vizrt scenes: flash overlay, ticker, alert card, developing banner |
| B4 | Keyword & Topic Alert Config | Keywords and topic clusters that trigger the breaking news pipeline |

### Live Breaking News

| # | Feature | Description |
|---|---|---|
| B5 | Breaking News Detection | Sentra Engine classifies breaking events from social + news in real time |
| B6 | Breaking News Alert Queue | Detected breaking items surface in editorial queue for review |
| B7 | Severity Classification Display | Each item tagged: Major Breaking / Breaking / Developing |
| B8 | Multi-Source Aggregation | Social signal + news wire + broadcast source triangulated per story |
| B9 | Source Attribution Display | Platform and outlet shown per breaking item |
| B10 | Geographic Tag | Location of breaking event identified and displayed |
| B11 | Cross-Source Verification | Story flagged as confirmed when detected across multiple independent sources |
| B12 | Breaking News Ticker | Continuous ticker display fed from confirmed breaking items |
| B13 | Breaking Flash Overlay | Full-screen or partial overlay graphic fired on major breaking event |

### Editorial Chain (Breaking-Specific)

| # | Feature | Description |
|---|---|---|
| B14 | Breaking Confirmation Workflow | Editor confirms breaking item before any graphic goes to air |
| B15 | Breaking News Audit Trail | Full log: source detected, who confirmed, when taken to air |
| B16 | Developing Story Tracker | Story thread maintained as new information arrives; graphics update live |

---

## P1 Summary — Feature Count

| Layer | Feature Count |
|---|---|
| Sentra Engine Foundation | 12 |
| Reson8 Core (shared) | 29 |
| ORA — Elections | 31 |
| ARENA — Sports | 25 |
| PULSE — Finance & Markets | 18 |
| ATMOS — Weather | 12 |
| FLASH — Breaking News | 16 |
| **Total P1 Features** | **143** |

---

## What P1 Deliberately Excludes

P1 delivers a production-ready broadcast system. The following are intentionally deferred to P2 and P3:

| Excluded from P1 | Deferred to |
|---|---|
| AI Prediction Engine (all modules) | P2 |
| Swing Analysis / Turnout Map (Elections) | P2 |
| Coalition & Seat Mathematics (Elections) | P2 |
| Expected Goals / xG (Sports) | P2 |
| AI-Generated Candidate / Player Brief | P2 |
| Viral Claim Detection | P2 |
| Social-to-Results Correlation | P3 |
| Campaign Promise / Track Record | P2 |
| Constituency Service Record | P3 |
| Multi-Output Management | P2 |
| Ticker Copy Generation | P2 |
| Commentary Talking Points | P2 |
| Transfer & News Intelligence (Sports) | P2 |
| Advanced Market Analytics | P2 |
| Animated Weather Maps | P2 |

---

*ID8 Media · info@id8media.com · Qatar: +974 6626 4422*  
*Reson8 Platform — P1 Feature Definition · May 2026*
