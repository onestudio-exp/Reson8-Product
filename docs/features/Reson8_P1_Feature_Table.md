# Reson8 Platform — P1 Feature Table
## All Modules · Phase 1 · Core / Launch

**Columns:** # · Feature Group · Feature Name · Key Capabilities / Sub-features · Data Sources · Output Surface

---

## Sentra Engine — Foundation (Always Active)

| # | Feature Group | Feature Name | Key Capabilities / Sub-features | Data Sources | Output Surface |
|---|---|---|---|---|---|
| E1 | Engine | 10-Language NLP | English · Arabic · French · Spanish · Russian · Chinese · German · Portuguese · Persian · Turkish · tokenisation · morphological analysis · Arabic dialect recognition | All ingested content | Engine pipeline |
| E2 | Engine | Sentiment Analysis | Positive / Neutral / Negative · confidence score · language-aware · culture-adjusted | Social · news · broadcasts | Sentiment layer |
| E3 | Engine | 6-Emotion Model | Anger / Fear / Joy / Sadness / Disgust / Surprise · per mention · per topic aggregate | Social · news | Emotion scores |
| E4 | Engine | Named Entity Recognition | Persons · organisations · locations · events · auto-extraction · cross-language | All content | Entity records |
| E5 | Engine | AI Content Generation | Headlines · captions · talking points · broadcast copy · bilingual output | Engine-processed signals | Editorial queue |
| E6 | Engine | Real-Time Pipeline | 10k+ signals/day · 3-stage: ingest → enrich → embed · hourly topic clustering · deduplication | All data sources | Processed signals |
| E7 | Engine | Breaking News Signal | Real-time event classification · severity scoring · multi-source confirmation | Social · news wires | Alert queue |
| E8 | Engine | Anomaly Detection | Spike detection · pattern recognition · velocity tracking · volume shift | All content | Alert queue |
| E9 | Engine | Arabic Processing | RTL parity · Shams typeface · Modern Standard Arabic · dialect · bidirectional text handling | All content | All outputs |
| E10 | Engine | Multi-Model AI Routing | Gemini 2.5 Flash (primary) · GPT-4 · Grok · admin-switchable · task-optimised routing | N/A | All AI outputs |
| E11 | Engine | Velocity & Virality Detection | Rate-of-change tracking · viral wave early signal · spread pattern recognition | Social platforms | Alert queue |
| E12 | Engine | Source Credibility Scoring | Trust-weight per source type · authoritative 1.3× · org_upload 1.2× · cross-source weighting | All content | Weighted signals |

---

## Reson8 Core — Shared Across All Modules

| # | Feature Group | Feature Name | Key Capabilities / Sub-features | Data Sources | Output Surface |
|---|---|---|---|---|---|
| C1 | Editorial Chain | Producer Preparation Queue | Graphic selection · data population · staging · draft preview · module-aware template picker | Module data layer | Editorial queue |
| C2 | Editorial Chain | Editor Approval Layer | Graphic review · approve / reject · annotation · inline comment · approval timestamp | Editorial queue | Approval decision |
| C3 | Editorial Chain | Operator Take to Air | One-click fire to Vizrt · immediate audit log entry · confirmation receipt | Approval queue | Vizrt · On-air |
| C4 | Editorial Chain | Reject & Revise Workflow | Editor rejection with note · return to producer · revision cycle · re-submission | Editorial queue | Editorial queue |
| C5 | Editorial Chain | Live / Preview Separation | Side-by-side preview vs. live output · no accidental on-air · scene pre-render | Module data | Preview display |
| C6 | Editorial Chain | Editorial Audit Trail | Immutable log · timestamp · user · action · content captured per event | All platform actions | Audit log |
| C7 | Editorial Chain | Editorial Review Gate | Block on all AI-generated content · no bypass · mandatory review before any take | AI-generated content | Editorial queue |
| C8 | Vizrt Integration | Vizrt Scene Binding | Data container mapping · field-to-scene assignment · multi-scene support | Module data layer | Vizrt scenes |
| C9 | Vizrt Integration | Direct Data Feed to Vizrt | Real-time data push · no manual entry · automated field refresh | Module data layer | Vizrt engine |
| C10 | Vizrt Integration | Viz Engine Output | Drives existing Vizrt renderer · no graphics engine replacement · broadcast-ready | All modules | On-air broadcast |
| C11 | Control Room | Control Room Dashboard | All outputs · statuses · queue depth · next-up preview · single view | Platform state | Control room screen |
| C12 | Control Room | Multi-Screen Management | Per-screen graphic assignment · multi-output control · channel mapping | Module data | Multiple Vizrt outputs |
| C13 | Control Room | Operator Role Assignment | Per-screen operator · permission scope · session handoff | User management | Control room |
| C14 | Control Room | Real-Time Status Monitor | Live on-air indicator · queue depth · next-up preview · output health | Platform state | Control room screen |
| C15 | Control Room | Emergency Override | Instant graphic clear / pull by senior editor · logged immediately | Platform state | On-air · Vizrt |
| C16 | Control Room | Broadcast Event Log | Every on-air event · timestamp · operator · graphic content | Platform state | Log · export |
| C17 | AI Content | Auto-Generated Headline | Draft from live data · event-triggered · character-limit aware · editor reviews before air | Module data + Engine | Editorial queue |
| C18 | AI Content | Lower-Third Caption Generation | Text per graphic type · character-count aware · styled to template · bilingual | Module data + Engine | Vizrt lower-third |
| C19 | AI Content | Bilingual Broadcast Text | Arabic + English simultaneously · RTL-aware layout · no post-processing required | Engine | Both language outputs |
| C20 | Access & Security | Role-Based Access Control | Producer / Editor / Operator / Admin · scope per role · module-level permission | User management | Platform-wide |
| C21 | Access & Security | Audit Logging | Immutable action trail · all platform events · tamper-proof record | Platform state | Audit log |
| C22 | Access & Security | Multi-Tenant Architecture | Per-client data isolation · tenant-scoped access · zero cross-tenant data leak | Platform | Platform-wide |
| C23 | Access & Security | Notification System | Push alerts · in-app · configurable per user · threshold-driven | Platform events | User devices |
| C24 | Access & Security | Broadcast Security & Auth | JWT · OTP · 2FA · SSO · magic link · control room hardened | Authentication layer | Login · access |
| C25 | Performance | ≤4 Second Wire-to-Air SLA | End-to-end latency: feed → process → approve → Vizrt · measured per event | All feeds | On-air graphic |
| C26 | Performance | 99.99% Uptime Target | Redundancy · failover · health monitoring · zero-failure broadcast event requirement | Infrastructure | Platform availability |
| C27 | Performance | Primary Feed Redundancy | Primary + fallback data sources per module · automatic source switching on failure | Data feeds | Uninterrupted data |
| C28 | Performance | Broadcast Output Failover | Automatic Vizrt path failover · secondary output path activated within SLA | Vizrt output | Continued broadcast |
| C29 | Performance | On-Prem or Cloud Deployment | Deploys within broadcaster's own infrastructure or cloud-hosted · no dependency on public cloud | Infrastructure | Deployment flexibility |

---

## Module 1: ORA — Elections

| # | Feature Group | Feature Name | Key Capabilities / Sub-features | Data Sources | Output Surface |
|---|---|---|---|---|---|
| O1 | System Setup | Election Configuration Wizard | Country · election type · format · total seat count · electoral system rules | Admin input | ORA interface · platform config |
| O2 | System Setup | Candidate Database | Full roster: name · party · district · photo · national ID | Admin upload · official electoral data | ORA interface · entity profiles |
| O3 | System Setup | Party Database | Name · official colours · symbols · acronyms · leadership · coalition history | Admin upload | ORA interface · Vizrt (colours) |
| O4 | System Setup | Constituency Mapping | District geospatial data · seat allocation · boundaries · parent-child region hierarchy | Geospatial data · electoral commission | ORA map · Vizrt map scene |
| O5 | System Setup | Results Feed Integration | API authentication · field mapping · validation rules · feed health monitoring | Official results feed · electoral commission API | ORA results layer |
| O6 | System Setup | Seat / Vote Threshold Alerts | Majority · seat milestone · concession thresholds · configurable per election | Platform config | Alert · editorial queue |
| O7 | System Setup | Elections Template Library | Results bar · map · ticker · candidate card · seat projection · coalition panel | Vizrt template files | Vizrt scenes |
| O8 | System Setup | Pre-Election Baseline Load | Historical results · polling data · candidate bios loaded before broadcast night | Historical database · polling agencies | ORA pre-load · Vizrt scenes |
| O9 | Live Results | Real-Time Vote Count Display | Live tally · % + absolute votes · per candidate · per constituency · continuous update | Official results feed | ORA interface · Vizrt · On-air |
| O10 | Live Results | Seat Tally Display | Seats won · seats projected · majority threshold line · running total | Official results feed + Engine projection | ORA interface · Vizrt · On-air |
| O11 | Live Results | Lead / Trail Indicators | Live candidate ranking per constituency · gain / loss markers vs. last election | Official results feed | ORA interface · Vizrt · On-air |
| O12 | Live Results | Results by Constituency | National aggregate to individual district drill-down · sortable · filterable | Official results feed | ORA interface · Vizrt · On-air |
| O13 | Live Results | Progressive Results Update | % of precincts reporting · confidence indicator · expected completion time | Official results feed | ORA interface · Vizrt · On-air |
| O14 | Live Results | Results Validation Layer | Anomaly flag on data jumps · hold before editorial queue · requires editor confirmation | Official results feed + Engine | Editorial queue (flagged) |
| O15 | Live Results | Comparative Results | Current vs. prior election side-by-side · % swing · absolute change per constituency | Official results + historical database | ORA interface · Vizrt · On-air |
| O16 | Interactive Map | Geographic Results Map | National map filled by winning party / candidate colour · live update as results arrive | Official results + geospatial data | ORA interface · Vizrt map scene · On-air |
| O17 | Interactive Map | Regional Drill-Down | Click-through: National → Province → District · breadcrumb navigation | Official results + geospatial data | ORA interface · Vizrt map scene |
| O18 | Interactive Map | Colour-Coded Party Performance | Configured party colours applied automatically to map fill | Party database + results feed | ORA interface · Vizrt map scene · On-air |
| O19 | Entity Profiles | Candidate Profile Card | Photo · name · party · district · bio · social links · constituency history | Admin database + Sentra Engine | ORA interface · Vizrt profile scene · On-air |
| O20 | Entity Profiles | Party Profile Card | Party overview · leadership · seat target · prior coalition governments | Admin database + Sentra Engine | ORA interface · Vizrt profile scene · On-air |
| O21 | Entity Profiles | Candidate Social Sentiment | Live Sentra Engine sentiment on all candidate mentions across social | X · Facebook · Instagram · TikTok · news + Engine | ORA interface · editorial context |
| O22 | Entity Profiles | Candidate Media Presence | Coverage volume + tone across news sources · trend over campaign period | News websites + Engine | ORA interface · editorial context |
| O23 | Election Preparations | Historical Election Data | Prior election results pre-loaded per constituency · multi-election depth | Historical database (pre-loaded) | ORA interface · Vizrt |
| O24 | Election Preparations | Polling Data Integration | Pre-election poll data ingested and shown alongside results as they arrive | Polling agency feeds | ORA interface · Vizrt |
| O25 | Election Preparations | Graphics Template Pre-Load | All Vizrt scenes pre-bound before broadcast · zero technical setup on night | Vizrt template files | Vizrt scenes (ready to fire) |
| O26 | Social Sentiment | Election Social Listening | Full social stream filtered to election topics · candidates · parties · hashtags | X · Facebook · Instagram · TikTok · Snapchat + Engine | ORA interface · editorial context |
| O27 | Social Sentiment | Candidate Sentiment Comparison | Side-by-side sentiment bars per candidate · real-time · directional trend | X · Facebook · news + Engine | ORA interface · Vizrt sentiment graphic · On-air |
| O28 | Social Sentiment | Party Sentiment Trend | Sentiment over time per party · direction · magnitude · 6-emotion breakdown | X · Facebook · news + Engine | ORA interface · Vizrt trend graphic · On-air |
| O29 | Social Sentiment | Hashtag Volume Tracking | Top election hashtags · volume · sentiment · velocity per hashtag | X · Instagram · TikTok + Engine | ORA interface · editorial context |
| O30 | Breaking News | Elections Breaking Feed | Dedicated breaking stream filtered to elections content · AI-classified severity | News wires · X + Engine | ORA interface · alert · editorial queue |
| O31 | Breaking News | Results Threshold Alert | Alert when result crosses configured milestone: majority · seat target · concession language | Official results feed | Alert · editorial queue |

---

## Module 2: ARENA — Sports

| # | Feature Group | Feature Name | Key Capabilities / Sub-features | Data Sources | Output Surface |
|---|---|---|---|---|---|
| A1 | System Setup | Competition Configuration | League / cup / tournament: name · format · season dates · promotion / relegation rules | Admin input | ARENA interface · platform config |
| A2 | System Setup | Team Database | Name · official colours · badge · home ground · squad list · manager | Admin upload · league data | ARENA interface · entity profiles · Vizrt |
| A3 | System Setup | Player Database | Name · position · nationality · age · photo · shirt number · current club | Admin upload · league / data feed | ARENA interface · entity profiles |
| A4 | System Setup | Match Schedule | Fixture list · broadcast window per match · match day configuration | Official league data | ARENA interface · match setup |
| A5 | System Setup | Data Feed Integration | Official data provider connection: Opta / Stats Perform / league API · field mapping · feed health | Official data provider | ARENA data layer |
| A6 | System Setup | Sports Template Library | Score bug · match events · stats panel · player card · table · form guide scenes | Vizrt template files | Vizrt scenes |
| A7 | System Setup | Vizrt Scene Assignment | Match data fields mapped to Vizrt scene data containers · per scene per match | Platform config | Vizrt scenes |
| A8 | Live Match | Live Score Display | Current score · continuously updated · both teams · match date / venue | Official data feed | ARENA interface · Vizrt score bug · On-air |
| A9 | Live Match | Match Clock | Live match minute · first / second half · stoppage time display · kick-off reference | Official data feed | ARENA interface · Vizrt · On-air |
| A10 | Live Match | Live Match Events | Goals · assists · bookings · red cards · substitutions · VAR decisions · penalties · each triggers editorial queue | Official data feed | Editorial queue · alert · Vizrt event graphic · On-air |
| A11 | Live Match | Event Threshold Alert | Alert on configured events: goal · red card · penalty · VAR reversal | Official data feed | Alert · editorial queue |
| A12 | Live Match | Live Basic Statistics | Possession % · shots on / off target · fouls · corners · offsides · blocked shots | Official data feed | ARENA interface · Vizrt stats panel · On-air |
| A13 | Live Match | Results Validation Layer | Cross-check incoming event data against expected patterns before editorial queue | Official data feed + Engine | Editorial queue (flagged) |
| A14 | Entity Profiles | Player Profile Card | Photo · name · position · nationality · current season stats (goals / assists / appearances / cards) | Player database + Engine | ARENA interface · Vizrt profile scene · On-air |
| A15 | Entity Profiles | Team Profile Card | Club badge · manager name · current formation · season form summary | Team database + Engine | ARENA interface · Vizrt · On-air |
| A16 | Entity Profiles | Player Social Sentiment | Sentra Engine live sentiment on player mentions during match window | X · Instagram · TikTok + Engine | ARENA interface · editorial context |
| A17 | Competition Context | League Table / Standings | Current standings · points · goal difference · form · live update after result | Official data feed | ARENA interface · Vizrt table scene · On-air |
| A18 | Competition Context | Form Guide | Last 5 results per team: W / D / L visual strip · home and away split | Official data feed | ARENA interface · Vizrt · On-air |
| A19 | Competition Context | Head-to-Head Record | All-time record + last 5 meetings between the two teams in play | Historical database | ARENA interface · Vizrt · On-air |
| A20 | Competition Context | Top Scorers Tracker | Live golden boot standings · updated after each goal · filtered by competition | Official data feed | ARENA interface · Vizrt · On-air |
| A21 | Social Sentiment | Match Social Listening | Social stream filtered to match · teams · players in play · election equivalent of social listening | X · Facebook · Instagram · TikTok + Engine | ARENA interface · editorial context |
| A22 | Social Sentiment | Team Sentiment Comparison | Side-by-side fan sentiment per team · real-time · directional trend during match | X · TikTok · Facebook + Engine | ARENA interface · Vizrt sentiment graphic · On-air |
| A23 | Social Sentiment | Trending Match Hashtags | Top match hashtags · volume · sentiment · velocity per hashtag | X · Instagram · TikTok + Engine | ARENA interface · editorial context |
| A24 | Breaking News | Sports Breaking Feed | Breaking stream filtered to sport: injuries · confirmed lineups · manager statements | News websites · X + Engine | ARENA interface · alert · editorial queue |
| A25 | Breaking News | Match Alert | Alert on key in-match events from data feed: goal · red card · final whistle | Official data feed | Alert · editorial queue |

---

## Module 3: PULSE — Finance & Markets

| # | Feature Group | Feature Name | Key Capabilities / Sub-features | Data Sources | Output Surface |
|---|---|---|---|---|---|
| F1 | System Setup | Market Configuration | Exchanges · indices · asset classes · coverage regions · display currency | Admin input | PULSE interface · platform config |
| F2 | System Setup | Instrument Database | Stocks · indices · commodities · currencies · crypto: names · tickers · sectors · ISIN | Admin upload · market data provider | PULSE interface · entity profiles |
| F3 | System Setup | Market Data Feed Integration | Bloomberg / Reuters / exchange API connection · field mapping · feed health monitoring | Market data provider | PULSE data layer |
| F4 | System Setup | Finance Template Library | Ticker bar · price panel · index display · gainers / losers table · FX rates · commodity card | Vizrt template files | Vizrt scenes |
| F5 | System Setup | Market Alert Configuration | % move triggers · circuit breaker alerts · index threshold alerts · configurable per instrument | Platform config | Alert · editorial queue |
| F6 | Live Market Data | Live Price Display | Price · absolute change · % change · intraday range · real-time per instrument | Market data feed | PULSE interface · Vizrt price panel · On-air |
| F7 | Live Market Data | Market Index Display | Major local + global indices live · Tadawul · Dow · FTSE · Nikkei · level · change · % | Market data feed | PULSE interface · Vizrt index graphic · On-air |
| F8 | Live Market Data | Gainers & Losers Display | Top movers by % change · filterable by exchange · sector · asset class | Market data feed | PULSE interface · Vizrt · On-air |
| F9 | Live Market Data | Currency Exchange Rates | Live FX pairs · configurable per broadcast region · mid-rate and spread | Market data feed · FX provider | PULSE interface · Vizrt ticker · On-air |
| F10 | Live Market Data | Commodity Prices | Brent oil · WTI · gold · silver · key regionally relevant commodities | Market data feed · commodity provider | PULSE interface · Vizrt · On-air |
| F11 | Live Market Data | Market Status Indicator | Open / Closed / Pre-market / After-hours per exchange · countdown to open / close | Market data feed | PULSE interface · Vizrt · On-air |
| F12 | Live Market Data | Market Opening / Closing Event | Auto-alert and graphic trigger at configured market open and close | Market data feed + platform clock | Alert · editorial queue · Vizrt · On-air |
| F13 | Entity Profiles | Company Profile Card | Name · ticker · sector · current price · 1-day chart · market cap · exchange | Market data feed + Engine | PULSE interface · Vizrt profile scene · On-air |
| F14 | Entity Profiles | Index Profile Card | Index name · current level · daily range · YTD performance · component count | Market data feed | PULSE interface · Vizrt · On-air |
| F15 | Social Sentiment | Market Social Listening | Social stream filtered to financial topics and tickers in play | X · financial news + Engine | PULSE interface · editorial context |
| F16 | Social Sentiment | Instrument Sentiment | Live sentiment per ticker / commodity · investor mood from social and news | X · news + Engine | PULSE interface · editorial context |
| F17 | Breaking News | Financial Breaking Feed | Earnings releases · rate decisions · economic data · regulatory action | News wires · X + Engine | PULSE interface · alert · editorial queue |
| F18 | Breaking News | Market Alert | Alert when price or index crosses configured threshold · volume spike alert | Market data feed | Alert · editorial queue |

---

## Module 4: ATMOS — Weather

| # | Feature Group | Feature Name | Key Capabilities / Sub-features | Data Sources | Output Surface |
|---|---|---|---|---|---|
| W1 | System Setup | Coverage Area Configuration | Cities · regions · countries · priority locations · broadcast geography defined | Admin input | ATMOS interface · platform config |
| W2 | System Setup | Weather Data Feed Integration | API connection to weather provider: Tomorrow.io / AccuWeather / national met service · field mapping | Weather API | ATMOS data layer |
| W3 | System Setup | Weather Template Library | Current conditions card · 3-day forecast · temperature map · severe alert overlay · city card | Vizrt template files | Vizrt scenes |
| W4 | System Setup | Alert Threshold Configuration | Severe weather thresholds: storm · extreme heat / cold · rainfall · sandstorm · flood | Platform config | Alert · editorial queue |
| W5 | Live Weather | Current Conditions Display | Temperature · conditions · wind speed / direction · humidity · UV index per configured location | Weather API | ATMOS interface · Vizrt conditions card · On-air |
| W6 | Live Weather | Short-Range Forecast | 3-day and 7-day forecast per location · high / low · precipitation probability | Weather API | ATMOS interface · Vizrt forecast scene · On-air |
| W7 | Live Weather | Temperature Map | Geographic temperature overlay across configured coverage area · colour-scaled | Weather API + geospatial data | ATMOS interface · Vizrt map scene · On-air |
| W8 | Live Weather | Severe Weather Alert Display | Active severe warnings surfaced automatically to editorial queue from met authority | Weather API · national met service | Editorial queue · alert · Vizrt · On-air |
| W9 | Live Weather | Weather Symbol Library | Standardised icon set: sun · cloud · rain · thunderstorm · sandstorm · snow · fog · haze | Platform asset library | Vizrt scenes |
| W10 | Live Weather | Location-Based Weather Card | Per-city card: conditions · high / low · 3-day summary · wind · humidity | Weather API | ATMOS interface · Vizrt card · On-air |
| W11 | Breaking News | Severe Weather Breaking Alert | Auto-alert when national / regional met authority issues a severe weather warning | National met service · weather API + Engine | Alert · editorial queue |
| W12 | Breaking News | Weather Alert Editorial Queue | Severe weather event enters editorial queue for editor confirmation before graphic goes to air | Weather API + Engine | Editorial queue → Vizrt · On-air |

---

## Module 5: FLASH — Breaking News

| # | Feature Group | Feature Name | Key Capabilities / Sub-features | Data Sources | Output Surface |
|---|---|---|---|---|---|
| B1 | System Setup | News Source Configuration | Regions · topics · source categories · language filters configured | Admin input | FLASH interface · platform config |
| B2 | System Setup | Severity Classification Setup | Major Breaking / Breaking / Developing thresholds · per topic · per region | Admin input | Alert classification · editorial queue |
| B3 | System Setup | Breaking Template Library | Flash overlay · breaking ticker · alert card · developing banner · update graphic | Vizrt template files | Vizrt scenes |
| B4 | System Setup | Keyword & Topic Alert Config | Keywords and topic clusters that activate the breaking news pipeline | Admin input + Engine | Engine monitoring layer |
| B5 | Live Breaking | Breaking News Detection | Engine classifies breaking events in real time · social + news simultaneously · no manual trigger | News wires · X · Facebook · Instagram · TikTok · Telegram + Engine | Alert queue · editorial queue |
| B6 | Live Breaking | Breaking News Alert Queue | Detected breaking items surface in editorial queue for editor review before any action | Sentra Engine | FLASH editorial queue |
| B7 | Live Breaking | Severity Classification Display | Each item tagged: Major Breaking / Breaking / Developing · visual priority indicator | Engine | FLASH interface |
| B8 | Live Breaking | Multi-Source Aggregation | Social + news wire + broadcast source triangulated per story · source count shown | News · social · Engine | FLASH interface |
| B9 | Live Breaking | Source Attribution Display | Platform and outlet shown per breaking item · timestamp of first detection | All ingested content | FLASH interface |
| B10 | Live Breaking | Geographic Tag | Location of breaking event identified and displayed · city / country / region | Engine NER + geolocation | FLASH interface · Vizrt |
| B11 | Live Breaking | Cross-Source Verification | Story flagged as confirmed when detected across multiple independent sources · confidence score | Multi-source Engine | FLASH interface (confidence indicator) |
| B12 | Live Breaking | Breaking News Ticker | Continuous ticker display fed from editor-confirmed breaking items | Confirmed breaking items | Vizrt ticker · On-air |
| B13 | Live Breaking | Breaking Flash Overlay | Full-screen or partial overlay graphic fired on major breaking event after editorial approval | Editorial approval | Vizrt · On-air |
| B14 | Editorial Chain | Breaking Confirmation Workflow | Editor confirms breaking item · reviews source · approves before any graphic goes to air | Editorial queue | Vizrt · On-air |
| B15 | Editorial Chain | Breaking News Audit Trail | Source detected · who confirmed · confirmation time · take timestamp · all logged | Platform state | Audit log |
| B16 | Editorial Chain | Developing Story Tracker | Story thread maintained as new information arrives · graphics update sequentially · timeline view | Multi-source + Engine | FLASH interface · editorial queue |

---

## P1 Summary

| Layer | Features |
|---|---|
| Sentra Engine | 12 |
| Reson8 Core | 29 |
| ORA — Elections | 31 |
| ARENA — Sports | 25 |
| PULSE — Finance & Markets | 18 |
| ATMOS — Weather | 12 |
| FLASH — Breaking News | 16 |
| **Total** | **143** |

---
*ID8 Media · Reson8 Platform · P1 Feature Table · May 2026*
