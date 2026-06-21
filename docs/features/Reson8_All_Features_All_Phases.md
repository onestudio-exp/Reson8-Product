# Reson8 Platform — Full Feature Table · All Phases
## Client Feature Selection Document

**Columns:** # · Module · Feature Group · Feature Name · Key Capabilities / Sub-features · Data Sources · Output Surface · Phase

**Phase Key:**
- **∞** — Always active · infrastructure · cannot be deselected
- **P1** — Core / Launch · required for go-live
- **P2** — Intelligence Layer · deepens capability after launch
- **P3** — Storytelling & Distribution · advanced features

---

## Sentra Engine — Foundation

| # | Module | Feature Group | Feature Name | Key Capabilities / Sub-features | Data Sources | Output Surface | Phase |
|---|---|---|---|---|---|---|:---:|
| E1 | Engine | Language | 10-Language NLP | English · Arabic · French · Spanish · Russian · Chinese · German · Portuguese · Persian · Turkish · Arabic dialect recognition | All ingested content | Engine pipeline | ∞ |
| E2 | Engine | Analysis | Sentiment Analysis | Positive / Neutral / Negative · confidence score · language-aware · culture-adjusted | Social · news | Sentiment layer | ∞ |
| E3 | Engine | Analysis | 6-Emotion Model | Anger / Fear / Joy / Sadness / Disgust / Surprise · per mention · per topic | Social · news | Emotion scores | ∞ |
| E4 | Engine | Extraction | Named Entity Recognition | Persons · organisations · locations · events · auto-extraction · cross-language | All content | Entity records | ∞ |
| E5 | Engine | Generation | AI Content Generation | Headlines · captions · talking points · broadcast copy · bilingual output | Engine-processed signals | Editorial queue | ∞ |
| E6 | Engine | Pipeline | Real-Time Pipeline | 10k+ signals/day · ingest → enrich → embed · hourly clustering · deduplication | All data sources | Processed signals | ∞ |
| E7 | Engine | Detection | Breaking News Signal | Real-time event classification · severity scoring · multi-source confirmation | Social · news wires | Alert queue | ∞ |
| E8 | Engine | Detection | Anomaly Detection | Spike detection · pattern recognition · velocity tracking · volume shift | All content | Alert queue | ∞ |
| E9 | Engine | Language | Arabic Processing | RTL parity · Shams typeface · Modern Standard Arabic · dialect · bidirectional text | All content | All outputs | ∞ |
| E10 | Engine | AI | Multi-Model AI Routing | Gemini 2.5 Flash · GPT-4 · Grok · admin-switchable · task-optimised | N/A | All AI outputs | ∞ |
| E11 | Engine | Detection | Velocity & Virality Detection | Rate-of-change tracking · viral wave early signal · spread pattern recognition | Social platforms | Alert queue | ∞ |
| E12 | Engine | Analysis | Source Credibility Scoring | Trust-weight per source type · authoritative 1.3× · org_upload 1.2× | All content | Weighted signals | ∞ |

---

## Reson8 Core — Shared Across All Modules

| # | Module | Feature Group | Feature Name | Key Capabilities / Sub-features | Data Sources | Output Surface | Phase |
|---|---|---|---|---|---|---|:---:|
| C1 | Core | Editorial Chain | Producer Preparation Queue | Graphic selection · data population · staging · draft preview · template picker | Module data layer | Editorial queue | P1 |
| C2 | Core | Editorial Chain | Editor Approval Layer | Graphic review · approve / reject · annotation · inline comment · approval timestamp | Editorial queue | Approval decision | P1 |
| C3 | Core | Editorial Chain | Operator Take to Air | One-click fire to Vizrt · immediate audit log entry · confirmation receipt | Approval queue | Vizrt · On-air | P1 |
| C4 | Core | Editorial Chain | Reject & Revise Workflow | Editor rejection with note · return to producer · revision cycle · re-submission | Editorial queue | Editorial queue | P1 |
| C5 | Core | Editorial Chain | Live / Preview Separation | Side-by-side preview vs. live · no accidental on-air · scene pre-render | Module data | Preview display | P1 |
| C6 | Core | Editorial Chain | Editorial Audit Trail | Immutable log · timestamp · user · action · content per event | All platform actions | Audit log | P1 |
| C7 | Core | Editorial Chain | Editorial Review Gate | Block on all AI content · no bypass · mandatory review before take | AI-generated content | Editorial queue | P1 |
| C8 | Core | Vizrt | Vizrt Scene Binding | Data container mapping · field-to-scene assignment · multi-scene support | Module data layer | Vizrt scenes | P1 |
| C9 | Core | Vizrt | Direct Data Feed to Vizrt | Real-time data push · no manual entry · automated field refresh | Module data layer | Vizrt engine | P1 |
| C10 | Core | Vizrt | Viz Engine Output | Drives existing Vizrt renderer · no graphics engine replacement · broadcast-ready | All modules | On-air broadcast | P1 |
| C11 | Core | Control Room | Control Room Dashboard | All outputs · statuses · queue depth · next-up preview · single view | Platform state | Control room screen | P1 |
| C12 | Core | Control Room | Multi-Screen Management | Per-screen graphic assignment · multi-output control · channel mapping | Module data | Multiple Vizrt outputs | P1 |
| C13 | Core | Control Room | Operator Role Assignment | Per-screen operator · permission scope · session handoff | User management | Control room | P1 |
| C14 | Core | Control Room | Real-Time Status Monitor | Live on-air indicator · queue depth · next-up preview · output health | Platform state | Control room screen | P1 |
| C15 | Core | Control Room | Emergency Override | Instant graphic clear / pull by senior editor · logged immediately | Platform state | On-air · Vizrt | P1 |
| C16 | Core | Control Room | Broadcast Event Log | Every on-air event · timestamp · operator · graphic content | Platform state | Log · export | P1 |
| C17 | Core | AI Content | Auto-Generated Headline | Draft from live data · event-triggered · character-limit aware · editor reviews | Module data + Engine | Editorial queue | P1 |
| C18 | Core | AI Content | Lower-Third Caption Generation | Text per graphic type · character-count aware · styled to template · bilingual | Module data + Engine | Vizrt lower-third | P1 |
| C19 | Core | AI Content | Bilingual Broadcast Text | Arabic + English simultaneously · RTL-aware layout | Engine | Both language outputs | P1 |
| C20 | Core | Security | Role-Based Access Control | Producer / Editor / Operator / Admin · scope per role · module-level permission | User management | Platform-wide | P1 |
| C21 | Core | Security | Audit Logging | Immutable action trail · all platform events · tamper-proof | Platform state | Audit log | P1 |
| C22 | Core | Security | Multi-Tenant Architecture | Per-client data isolation · tenant-scoped access · zero cross-tenant leak | Platform | Platform-wide | P1 |
| C23 | Core | Security | Notification System | Push alerts · in-app · configurable per user · threshold-driven | Platform events | User devices | P1 |
| C24 | Core | Security | Broadcast Security & Auth | JWT · OTP · 2FA · SSO · magic link · control room hardened | Authentication layer | Login · access | P1 |
| C25 | Core | Performance | ≤4 Second Wire-to-Air SLA | End-to-end: feed → process → approve → Vizrt · measured per event | All feeds | On-air graphic | ∞ |
| C26 | Core | Performance | 99.99% Uptime Target | Redundancy · failover · health monitoring · zero-failure requirement | Infrastructure | Platform availability | ∞ |
| C27 | Core | Performance | Primary Feed Redundancy | Primary + fallback data sources · automatic switching on failure | Data feeds | Uninterrupted data | ∞ |
| C28 | Core | Performance | Broadcast Output Failover | Automatic Vizrt path failover · secondary output activated within SLA | Vizrt output | Continued broadcast | ∞ |
| C29 | Core | Performance | On-Prem or Cloud Deployment | Deploys in broadcaster infrastructure or cloud · no public cloud dependency | Infrastructure | Deployment flexibility | ∞ |
| C30 | Core | AI Content | Ticker Copy Generation | AI generates scroll ticker text from live event data · editor reviews | Module data + Engine | Vizrt ticker · On-air | P2 |
| C31 | Core | AI Content | Commentary Talking Points | AI generates anchor talking points per graphic type · bilingual | Module data + Engine | Editorial context | P2 |
| C32 | Core | Control Room | Multi-Output Management | Manage multiple simultaneous Vizrt output surfaces from single interface | Platform state | Multiple Vizrt outputs | P2 |
| C33 | Core | AI Content | Third Language Output | French as optional third broadcast output language for North Africa markets | Engine | French language output | P2 |

---

## Module 1 — ORA Elections

| # | Module | Feature Group | Feature Name | Key Capabilities / Sub-features | Data Sources | Output Surface | Phase |
|---|---|---|---|---|---|---|:---:|
| O1 | ORA | System Setup | Election Configuration Wizard | Country · election type · format · seat count · electoral system rules | Admin input | ORA interface | P1 |
| O2 | ORA | System Setup | Candidate Database | Full roster: name · party · district · photo · national ID | Admin upload · electoral data | ORA interface · entity profiles | P1 |
| O3 | ORA | System Setup | Party Database | Name · official colours · symbols · acronyms · leadership | Admin upload | ORA interface · Vizrt | P1 |
| O4 | ORA | System Setup | Constituency Mapping | District geospatial data · seat allocation · boundaries · region hierarchy | Geospatial · electoral commission | ORA map · Vizrt map | P1 |
| O5 | ORA | System Setup | Results Feed Integration | API auth · field mapping · validation rules · feed health monitoring | Official results feed | ORA results layer | P1 |
| O6 | ORA | System Setup | Seat / Vote Threshold Alerts | Majority · seat milestone · concession thresholds · configurable | Platform config | Alert · editorial queue | P1 |
| O7 | ORA | System Setup | Elections Template Library | Results bar · map · ticker · candidate card · seat projection · coalition panel | Vizrt template files | Vizrt scenes | P1 |
| O8 | ORA | System Setup | Pre-Election Baseline Load | Historical results · polling data loaded before broadcast night | Historical database · polling | ORA · Vizrt | P1 |
| O9 | ORA | Live Results | Real-Time Vote Count Display | Live tally · % + absolute votes · per candidate · per constituency · continuous update | Official results feed | ORA · Vizrt · On-air | P1 |
| O10 | ORA | Live Results | Seat Tally Display | Seats won · projected · majority threshold line · running total | Results feed + Engine | ORA · Vizrt · On-air | P1 |
| O11 | ORA | Live Results | Lead / Trail Indicators | Live ranking per constituency · gain / loss markers vs. last election | Official results feed | ORA · Vizrt · On-air | P1 |
| O12 | ORA | Live Results | Results by Constituency | National to individual district drill-down · sortable · filterable | Official results feed | ORA · Vizrt · On-air | P1 |
| O13 | ORA | Live Results | Progressive Results Update | % of precincts reporting · confidence indicator · expected completion | Official results feed | ORA · Vizrt · On-air | P1 |
| O14 | ORA | Live Results | Results Validation Layer | Anomaly flag on data jumps · hold before queue · editor confirmation required | Results feed + Engine | Editorial queue (flagged) | P1 |
| O15 | ORA | Live Results | Comparative Results | Current vs. prior election · % swing · absolute change per constituency | Results + historical database | ORA · Vizrt · On-air | P1 |
| O16 | ORA | Interactive Map | Geographic Results Map | National map by winning party / candidate colour · live update | Results + geospatial | ORA · Vizrt map · On-air | P1 |
| O17 | ORA | Interactive Map | Regional Drill-Down | National → Province → District · breadcrumb navigation | Results + geospatial | ORA · Vizrt map | P1 |
| O18 | ORA | Interactive Map | Colour-Coded Party Performance | Configured party colours on map fill · automatic | Party database + results | ORA · Vizrt map · On-air | P1 |
| O19 | ORA | Entity Profiles | Candidate Profile Card | Photo · name · party · district · bio · social links | Admin database + Engine | ORA · Vizrt profile · On-air | P1 |
| O20 | ORA | Entity Profiles | Party Profile Card | Overview · leadership · seat target · coalition history | Admin database + Engine | ORA · Vizrt profile · On-air | P1 |
| O21 | ORA | Entity Profiles | Candidate Social Sentiment | Live Engine sentiment on candidate mentions across social | X · Facebook · Instagram · TikTok · news + Engine | ORA · editorial context | P1 |
| O22 | ORA | Entity Profiles | Candidate Media Presence | Coverage volume + tone across news · trend over campaign | News + Engine | ORA · editorial context | P1 |
| O23 | ORA | Election Prep | Historical Election Data | Prior results pre-loaded per constituency · multi-election depth | Historical database | ORA · Vizrt | P1 |
| O24 | ORA | Election Prep | Polling Data Integration | Pre-election polls ingested and shown alongside results | Polling agency feeds | ORA · Vizrt | P1 |
| O25 | ORA | Election Prep | Graphics Template Pre-Load | All Vizrt scenes pre-bound · zero setup on night | Vizrt template files | Vizrt scenes | P1 |
| O26 | ORA | Social Sentiment | Election Social Listening | Full social stream filtered to election topics · candidates · parties | X · Facebook · Instagram · TikTok · Snapchat + Engine | ORA · editorial context | P1 |
| O27 | ORA | Social Sentiment | Candidate Sentiment Comparison | Side-by-side sentiment bars per candidate · real-time · directional | X · Facebook · news + Engine | ORA · Vizrt · On-air | P1 |
| O28 | ORA | Social Sentiment | Party Sentiment Trend | Sentiment over time per party · direction · magnitude | X · Facebook · news + Engine | ORA · Vizrt · On-air | P1 |
| O29 | ORA | Social Sentiment | Hashtag Volume Tracking | Top election hashtags · volume · sentiment · velocity | X · Instagram · TikTok + Engine | ORA · editorial context | P1 |
| O30 | ORA | Breaking News | Elections Breaking Feed | Breaking stream filtered to elections · AI-classified severity | News wires · X + Engine | ORA · alert · editorial queue | P1 |
| O31 | ORA | Breaking News | Results Threshold Alert | Alert when result crosses milestone: majority · seat target · concession | Official results feed | Alert · editorial queue | P1 |
| O32 | ORA | Interactive Map | Swing Analysis Map | Direction and magnitude of swing vs. last election per district | Results + historical + Engine | ORA · Vizrt map · On-air | P2 |
| O33 | ORA | Interactive Map | Turnout Map | Turnout % per constituency · heat-map overlay | Results feed | ORA · Vizrt map · On-air | P2 |
| O34 | ORA | Interactive Map | Margin of Victory Map | Visual margin size per district on geographic layer | Results feed | ORA · Vizrt map · On-air | P2 |
| O35 | ORA | Entity Profiles | AI-Generated Candidate Brief | Auto-assembled briefing for broadcast anchors · Engine-generated | Engine · news · social | ORA · editorial context | P2 |
| O36 | ORA | Election Prep | Candidate Stance Analysis | AI-extracted positions on key issues from public record | News · social + Engine | ORA · editorial context | P2 |
| O37 | ORA | Election Prep | Pre-Night Editorial Briefing | AI-generated briefing package for editorial team before broadcast | Engine · news · polling | ORA · editorial context | P2 |
| O38 | ORA | Coalition | Seat Mathematics Tracker | Real-time majority threshold calculation · displayed as results arrive | Results feed + Engine | ORA · Vizrt · On-air | P2 |
| O39 | ORA | Coalition | Coalition Scenario Modeller | Models which party combinations reach majority · updates live | Results + Engine | ORA · Vizrt · On-air | P2 |
| O40 | ORA | Coalition | Alliance Formation Alert | Alert when coalition becomes mathematically viable or impossible | Results + Engine | Alert · editorial queue | P2 |
| O41 | ORA | Coalition | Coalition History Display | Prior coalition governments shown as context | Historical database | ORA · Vizrt · On-air | P2 |
| O42 | ORA | Track Record | Parliamentary Voting History | AI-sourced voting record for incumbent candidates | Engine · open sources | ORA · editorial context | P2 |
| O43 | ORA | Track Record | Campaign Promise Tracker | Promises made vs. documented actions taken | Engine · news · social | ORA · editorial context | P2 |
| O44 | ORA | AI Prediction | Real-Time Seat Projection | Dynamic model · recalibrates as actual results arrive | Results + Engine | ORA · Vizrt · On-air | P2 |
| O45 | ORA | AI Prediction | Swing Prediction | Direction and magnitude of swing per region · live update | Results + Engine | ORA · Vizrt · On-air | P2 |
| O46 | ORA | AI Prediction | Turnout Forecasting | Projected final turnout based on reported early results | Results + Engine | ORA · Vizrt · On-air | P2 |
| O47 | ORA | AI Prediction | Majority Probability Model | % probability of outright majority per party · updates live | Results + Engine | ORA · Vizrt · On-air | P2 |
| O48 | ORA | AI Prediction | Called Race Detection | AI signals race called when statistical threshold is reached | Results + Engine | ORA · alert · editorial queue | P2 |
| O49 | ORA | Social Sentiment | Viral Claim Detection | Detects rapidly spreading unverified claims in election discourse | X · TikTok · Facebook + Engine | ORA · alert · editorial queue | P2 |
| O50 | ORA | Social Sentiment | Public Mood Analysis | Aggregate emotion across full election social discourse · 6-emotion model | Social + Engine | ORA · editorial context | P2 |
| O51 | ORA | Breaking News | Concession / Victory Detection | NLP detects concession or victory language in public statements | News · social + Engine | ORA · alert · editorial queue | P2 |
| O52 | ORA | Breaking News | Anomalous Results Alert | Flags statistically anomalous data jumps before editorial review | Results feed + Engine | Editorial queue (flagged) | P2 |
| O53 | ORA | Track Record | Constituency Service Record | Local project delivery for incumbent candidates · structured data | Engine · open sources | ORA · editorial context | P3 |
| O54 | ORA | Social Sentiment | Social-to-Results Correlation | Compare social sentiment shifts against actual results post-night | Results + social + Engine | ORA · post-broadcast report | P3 |
| O55 | ORA | Storytelling | Election Night Story Builder | Automated narrative of the election night arc · key moments · timeline | Results + social + Engine | ORA · editorial export | P3 |
| O56 | ORA | Storytelling | Post-Election Analysis Package | Full results breakdown · swing analysis · turnout report · shareable | Results + Engine | ORA · export · digital | P3 |
| O57 | ORA | Storytelling | Historical Trend Analysis | Multi-election comparison · party performance over time · long-term trends | Historical database + Engine | ORA · Vizrt · On-air | P3 |

---

## Module 2 — ARENA Sports

| # | Module | Feature Group | Feature Name | Key Capabilities / Sub-features | Data Sources | Output Surface | Phase |
|---|---|---|---|---|---|---|:---:|
| A1 | ARENA | System Setup | Competition Configuration | League / cup / tournament: name · format · season dates · rules | Admin input | ARENA interface | P1 |
| A2 | ARENA | System Setup | Team Database | Name · colours · badge · home ground · squad · manager | Admin upload · league data | ARENA · entity profiles · Vizrt | P1 |
| A3 | ARENA | System Setup | Player Database | Name · position · nationality · age · photo · shirt number | Admin upload · data feed | ARENA · entity profiles | P1 |
| A4 | ARENA | System Setup | Match Schedule | Fixture list · broadcast window · match day configuration | Official league data | ARENA · match setup | P1 |
| A5 | ARENA | System Setup | Data Feed Integration | Opta / Stats Perform / league API · field mapping · feed health | Official data provider | ARENA data layer | P1 |
| A6 | ARENA | System Setup | Sports Template Library | Score bug · events · stats panel · player card · table · form guide | Vizrt template files | Vizrt scenes | P1 |
| A7 | ARENA | System Setup | Vizrt Scene Assignment | Match data fields mapped to Vizrt scene containers · per match | Platform config | Vizrt scenes | P1 |
| A8 | ARENA | Live Match | Live Score Display | Current score · continuously updated · both teams · venue | Official data feed | ARENA · Vizrt score bug · On-air | P1 |
| A9 | ARENA | Live Match | Match Clock | Live match minute · first / second half · stoppage time | Official data feed | ARENA · Vizrt · On-air | P1 |
| A10 | ARENA | Live Match | Live Match Events | Goals · assists · bookings · red cards · substitutions · VAR · penalties · each triggers editorial queue | Official data feed | Editorial queue · Vizrt · On-air | P1 |
| A11 | ARENA | Live Match | Event Threshold Alert | Alert on: goal · red card · penalty · VAR reversal | Official data feed | Alert · editorial queue | P1 |
| A12 | ARENA | Live Match | Live Basic Statistics | Possession % · shots on/off target · fouls · corners · offsides | Official data feed | ARENA · Vizrt stats panel · On-air | P1 |
| A13 | ARENA | Live Match | Results Validation Layer | Cross-check event data before editorial queue · anomaly flag | Data feed + Engine | Editorial queue (flagged) | P1 |
| A14 | ARENA | Entity Profiles | Player Profile Card | Photo · name · position · nationality · current season stats | Player database + Engine | ARENA · Vizrt profile · On-air | P1 |
| A15 | ARENA | Entity Profiles | Team Profile Card | Club badge · manager · formation · season form | Team database + Engine | ARENA · Vizrt · On-air | P1 |
| A16 | ARENA | Entity Profiles | Player Social Sentiment | Live Engine sentiment on player mentions during match | X · Instagram · TikTok + Engine | ARENA · editorial context | P1 |
| A17 | ARENA | Competition Context | League Table / Standings | Current standings · points · goal difference · form · live update | Official data feed | ARENA · Vizrt table · On-air | P1 |
| A18 | ARENA | Competition Context | Form Guide | Last 5 results per team: W / D / L · home and away split | Official data feed | ARENA · Vizrt · On-air | P1 |
| A19 | ARENA | Competition Context | Head-to-Head Record | All-time + last 5 meetings between the two teams | Historical database | ARENA · Vizrt · On-air | P1 |
| A20 | ARENA | Competition Context | Top Scorers Tracker | Live golden boot · updated after each goal · per competition | Official data feed | ARENA · Vizrt · On-air | P1 |
| A21 | ARENA | Social Sentiment | Match Social Listening | Social stream filtered to match · teams · players in play | X · Facebook · Instagram · TikTok + Engine | ARENA · editorial context | P1 |
| A22 | ARENA | Social Sentiment | Team Sentiment Comparison | Side-by-side fan sentiment per team · real-time | X · TikTok · Facebook + Engine | ARENA · Vizrt · On-air | P1 |
| A23 | ARENA | Social Sentiment | Trending Match Hashtags | Top match hashtags · volume · sentiment · velocity | X · Instagram · TikTok + Engine | ARENA · editorial context | P1 |
| A24 | ARENA | Breaking News | Sports Breaking Feed | Breaking: injuries · confirmed lineups · manager statements | News · X + Engine | ARENA · alert · editorial queue | P1 |
| A25 | ARENA | Breaking News | Match Alert | Key in-match events from data feed: goal · red card · final whistle | Official data feed | Alert · editorial queue | P1 |
| A26 | ARENA | Live Match | Expected Goals (xG) | Live xG per team · per player · cumulative · updated per shot | Official data feed (Opta) | ARENA · Vizrt stats · On-air | P2 |
| A27 | ARENA | Live Match | Pass Completion Rate | Pass accuracy per team · per player · attacking vs. defensive | Official data feed | ARENA · Vizrt · On-air | P2 |
| A28 | ARENA | Live Match | Heatmap / Zones of Play | Territorial dominance · attacking zones · defensive shape | Official data feed | ARENA · Vizrt · On-air | P2 |
| A29 | ARENA | Entity Profiles | AI-Generated Match Brief | Auto-assembled preview / review for anchors · Engine-generated | Engine · data feed · news | ARENA · editorial context | P2 |
| A30 | ARENA | AI Prediction | Match Outcome Probability | Live win / draw / loss % · updates each minute of match | Data feed + Engine | ARENA · Vizrt · On-air | P2 |
| A31 | ARENA | AI Prediction | Live Win Probability Tracker | Probability trend chart across 90 minutes · goal impact shown | Data feed + Engine | ARENA · Vizrt · On-air | P2 |
| A32 | ARENA | Transfer & News | Transfer Intelligence | Transfer window tracking · rumours from credible sources · confirmed deals | News · X + Engine | ARENA · alert · editorial queue | P2 |
| A33 | ARENA | Transfer & News | Injury & Availability Tracker | Confirmed injury · return date · impact on squad | News · official club + Engine | ARENA · editorial context | P2 |
| A34 | ARENA | Social Sentiment | Viral Moment Detection | Detects rapidly spreading match moments on social before they peak | X · TikTok · Instagram + Engine | ARENA · alert · editorial queue | P2 |
| A35 | ARENA | Storytelling | Post-Match Analysis Package | Full match stats breakdown · key moments · shareable report | Data feed + Engine | ARENA · export · digital | P3 |
| A36 | ARENA | Storytelling | Season Statistics Deep Dive | Full season performance per team and player · trend analysis | Data feed + historical + Engine | ARENA · Vizrt · On-air | P3 |
| A37 | ARENA | Storytelling | Club Historical Records | All-time records · milestone tracking · achievement alerts | Historical database + Engine | ARENA · Vizrt · On-air | P3 |

---

## Module 3 — PULSE Finance & Markets

| # | Module | Feature Group | Feature Name | Key Capabilities / Sub-features | Data Sources | Output Surface | Phase |
|---|---|---|---|---|---|---|:---:|
| F1 | PULSE | System Setup | Market Configuration | Exchanges · indices · asset classes · coverage regions · display currency | Admin input | PULSE interface | P1 |
| F2 | PULSE | System Setup | Instrument Database | Stocks · indices · commodities · currencies · crypto: names · tickers · sectors | Admin upload · market data | PULSE · entity profiles | P1 |
| F3 | PULSE | System Setup | Market Data Feed Integration | Bloomberg / Reuters / exchange API · field mapping · feed health | Market data provider | PULSE data layer | P1 |
| F4 | PULSE | System Setup | Finance Template Library | Ticker bar · price panel · index display · gainers/losers · FX · commodity card | Vizrt template files | Vizrt scenes | P1 |
| F5 | PULSE | System Setup | Market Alert Configuration | % move triggers · circuit breaker · index threshold · per instrument | Platform config | Alert · editorial queue | P1 |
| F6 | PULSE | Live Market | Live Price Display | Price · absolute change · % change · intraday range · real-time | Market data feed | PULSE · Vizrt price panel · On-air | P1 |
| F7 | PULSE | Live Market | Market Index Display | Local + global indices live: Tadawul · Dow · FTSE · Nikkei · level · change | Market data feed | PULSE · Vizrt index · On-air | P1 |
| F8 | PULSE | Live Market | Gainers & Losers Display | Top movers by % · filterable by exchange · sector · asset class | Market data feed | PULSE · Vizrt · On-air | P1 |
| F9 | PULSE | Live Market | Currency Exchange Rates | Live FX pairs · configurable per broadcast region · mid-rate | Market data feed · FX provider | PULSE · Vizrt ticker · On-air | P1 |
| F10 | PULSE | Live Market | Commodity Prices | Brent · WTI · gold · silver · key regional commodities | Market data · commodity provider | PULSE · Vizrt · On-air | P1 |
| F11 | PULSE | Live Market | Market Status Indicator | Open / Closed / Pre-market / After-hours per exchange · countdown | Market data feed | PULSE · Vizrt · On-air | P1 |
| F12 | PULSE | Live Market | Market Opening / Closing Event | Auto-alert and graphic trigger at open and close | Market data + platform clock | Alert · editorial queue · Vizrt · On-air | P1 |
| F13 | PULSE | Entity Profiles | Company Profile Card | Name · ticker · sector · price · 1-day chart · market cap · exchange | Market data + Engine | PULSE · Vizrt profile · On-air | P1 |
| F14 | PULSE | Entity Profiles | Index Profile Card | Index name · level · daily range · YTD performance | Market data | PULSE · Vizrt · On-air | P1 |
| F15 | PULSE | Social Sentiment | Market Social Listening | Social stream filtered to financial topics and tickers in play | X · financial news + Engine | PULSE · editorial context | P1 |
| F16 | PULSE | Social Sentiment | Instrument Sentiment | Live sentiment per ticker / commodity from social and news | X · news + Engine | PULSE · editorial context | P1 |
| F17 | PULSE | Breaking News | Financial Breaking Feed | Earnings · rate decisions · economic data · regulatory action | News wires · X + Engine | PULSE · alert · editorial queue | P1 |
| F18 | PULSE | Breaking News | Market Alert | Price / index crosses threshold · volume spike alert | Market data feed | Alert · editorial queue | P1 |
| F19 | PULSE | Live Market | Advanced Chart Display | Candlestick · OHLC · volume bars · moving averages · configurable timeframe | Market data feed | PULSE · Vizrt · On-air | P2 |
| F20 | PULSE | Live Market | Sector Performance Analysis | All sectors ranked by % performance · heat-map display | Market data feed | PULSE · Vizrt · On-air | P2 |
| F21 | PULSE | Live Market | Custom Watchlist | Client-configured instrument watchlist · priority display | Admin config + market data | PULSE · Vizrt · On-air | P2 |
| F22 | PULSE | Context | Economic Calendar | Scheduled events: rate decisions · GDP · inflation data · earnings dates | Economic data provider | PULSE · alert · editorial queue | P2 |
| F23 | PULSE | Context | Company Earnings Dashboard | EPS · revenue · beat/miss vs. estimate · reaction chart | Market data + earnings feed | PULSE · Vizrt · On-air | P2 |
| F24 | PULSE | AI Prediction | Market Sentiment Score | Composite score: social + news + price momentum per instrument | Market data + social + Engine | PULSE · editorial context | P2 |
| F25 | PULSE | Storytelling | Market Story Builder | Narrative generated from the day's market moves · anchor-ready copy | Market data + Engine | PULSE · editorial export | P3 |
| F26 | PULSE | Storytelling | IPO / Earnings Season Tracker | Calendar of upcoming events · pre/post briefing package | Market data + Engine | PULSE · editorial context | P3 |

---

## Module 4 — ATMOS Weather

| # | Module | Feature Group | Feature Name | Key Capabilities / Sub-features | Data Sources | Output Surface | Phase |
|---|---|---|---|---|---|---|:---:|
| W1 | ATMOS | System Setup | Coverage Area Configuration | Cities · regions · countries · priority locations · broadcast geography | Admin input | ATMOS interface | P1 |
| W2 | ATMOS | System Setup | Weather Data Feed Integration | API: Tomorrow.io / AccuWeather / national met service · field mapping | Weather API | ATMOS data layer | P1 |
| W3 | ATMOS | System Setup | Weather Template Library | Conditions card · forecast · temperature map · severe alert overlay · city card | Vizrt template files | Vizrt scenes | P1 |
| W4 | ATMOS | System Setup | Alert Threshold Configuration | Storm · extreme heat/cold · rainfall · sandstorm · flood thresholds | Platform config | Alert · editorial queue | P1 |
| W5 | ATMOS | Live Weather | Current Conditions Display | Temp · conditions · wind · humidity · UV per configured location | Weather API | ATMOS · Vizrt conditions · On-air | P1 |
| W6 | ATMOS | Live Weather | Short-Range Forecast | 3-day and 7-day per location · high/low · precipitation % | Weather API | ATMOS · Vizrt forecast · On-air | P1 |
| W7 | ATMOS | Live Weather | Temperature Map | Geographic temperature overlay across coverage area · colour-scaled | Weather API + geospatial | ATMOS · Vizrt map · On-air | P1 |
| W8 | ATMOS | Live Weather | Severe Weather Alert Display | Active warnings from met authority surfaced to editorial queue | Weather API · national met | Editorial queue · Vizrt · On-air | P1 |
| W9 | ATMOS | Live Weather | Weather Symbol Library | Sun · cloud · rain · thunderstorm · sandstorm · snow · fog · haze icon set | Platform asset library | Vizrt scenes | P1 |
| W10 | ATMOS | Live Weather | Location-Based Weather Card | Per-city: conditions · high/low · 3-day · wind · humidity | Weather API | ATMOS · Vizrt card · On-air | P1 |
| W11 | ATMOS | Breaking News | Severe Weather Breaking Alert | Auto-alert when met authority issues a severe warning | National met + weather API + Engine | Alert · editorial queue | P1 |
| W12 | ATMOS | Breaking News | Weather Alert Editorial Queue | Severe event enters editorial queue for editor confirmation | Weather API + Engine | Editorial queue → Vizrt · On-air | P1 |
| W13 | ATMOS | Live Weather | Animated Weather Map | Animated cloud · rain · wind movement overlays on geographic map | Weather API + animation engine | ATMOS · Vizrt map · On-air | P2 |
| W14 | ATMOS | Live Weather | Radar / Satellite Imagery | Live radar and satellite imagery integration · configurable overlays | National met · satellite data | ATMOS · Vizrt · On-air | P2 |
| W15 | ATMOS | Live Weather | Hourly Forecast | 24-hour granular forecast per location · hour-by-hour display | Weather API | ATMOS · Vizrt · On-air | P2 |
| W16 | ATMOS | Live Weather | Wind Map | Wind speed and direction overlay · animated vectors | Weather API + Engine | ATMOS · Vizrt map · On-air | P2 |
| W17 | ATMOS | Live Weather | Extended Forecast | 10–14 day outlook per location · confidence interval shown | Weather API | ATMOS · Vizrt · On-air | P2 |
| W18 | ATMOS | Live Weather | UV Index Map | Geographic UV index overlay · health advisory integration | Weather API + health data | ATMOS · Vizrt · On-air | P2 |
| W19 | ATMOS | Storytelling | Historical Weather Comparison | Current conditions vs. historical average for same date | Historical weather + API | ATMOS · Vizrt · On-air | P3 |
| W20 | ATMOS | Storytelling | Climate Trend Analysis | Long-term trend vs. climate baseline · seasonal outlook | Climate data + Engine | ATMOS · editorial export | P3 |
| W21 | ATMOS | Storytelling | Weather Impact Stories | Weather effect on agriculture · energy · transport · AI-generated narrative | Weather + sector data + Engine | ATMOS · editorial context | P3 |

---

## Module 5 — FLASH Breaking News

| # | Module | Feature Group | Feature Name | Key Capabilities / Sub-features | Data Sources | Output Surface | Phase |
|---|---|---|---|---|---|---|:---:|
| B1 | FLASH | System Setup | News Source Configuration | Regions · topics · source categories · language filters | Admin input | FLASH interface | P1 |
| B2 | FLASH | System Setup | Severity Classification Setup | Major Breaking / Breaking / Developing thresholds · per topic · per region | Admin input | Alert classification | P1 |
| B3 | FLASH | System Setup | Breaking Template Library | Flash overlay · ticker · alert card · developing banner · update graphic | Vizrt template files | Vizrt scenes | P1 |
| B4 | FLASH | System Setup | Keyword & Topic Alert Config | Keywords and topic clusters that activate the breaking pipeline | Admin input + Engine | Engine monitoring | P1 |
| B5 | FLASH | Live Breaking | Breaking News Detection | Engine classifies breaking events in real time · social + news · 10 languages | News wires · X · Facebook · Instagram · TikTok · Telegram + Engine | Alert queue · editorial queue | P1 |
| B6 | FLASH | Live Breaking | Breaking News Alert Queue | Detected items surface in editorial queue for editor review | Sentra Engine | FLASH editorial queue | P1 |
| B7 | FLASH | Live Breaking | Severity Classification Display | Each item tagged: Major Breaking / Breaking / Developing · visual priority | Engine | FLASH interface | P1 |
| B8 | FLASH | Live Breaking | Multi-Source Aggregation | Social + news wire + broadcast source triangulated per story | News · social · Engine | FLASH interface | P1 |
| B9 | FLASH | Live Breaking | Source Attribution Display | Platform and outlet per item · first detection timestamp | All ingested content | FLASH interface | P1 |
| B10 | FLASH | Live Breaking | Geographic Tag | Location of breaking event: city / country / region | Engine NER + geolocation | FLASH interface · Vizrt | P1 |
| B11 | FLASH | Live Breaking | Cross-Source Verification | Confirmed when detected across multiple independent sources · confidence score | Multi-source Engine | FLASH interface | P1 |
| B12 | FLASH | Live Breaking | Breaking News Ticker | Continuous ticker from editor-confirmed breaking items | Confirmed breaking items | Vizrt ticker · On-air | P1 |
| B13 | FLASH | Live Breaking | Breaking Flash Overlay | Full or partial overlay on major breaking after editorial approval | Editorial approval | Vizrt · On-air | P1 |
| B14 | FLASH | Editorial Chain | Breaking Confirmation Workflow | Editor confirms · reviews source · approves before any graphic goes to air | Editorial queue | Vizrt · On-air | P1 |
| B15 | FLASH | Editorial Chain | Breaking News Audit Trail | Source detected · who confirmed · time · take timestamp · all logged | Platform state | Audit log | P1 |
| B16 | FLASH | Editorial Chain | Developing Story Tracker | Story thread maintained · graphics update sequentially · timeline view | Multi-source + Engine | FLASH interface · editorial queue | P1 |
| B17 | FLASH | Live Breaking | Story Priority Ranking | AI scores each breaking item by impact · reach · velocity · editorial relevance | Engine | FLASH interface | P2 |
| B18 | FLASH | Live Breaking | Related Stories Clustering | Groups related breaking items into a single story thread automatically | Engine | FLASH interface | P2 |
| B19 | FLASH | Live Breaking | Escalation Detection | Detects when a Developing story escalates to Breaking or Major Breaking | Engine | FLASH interface · alert | P2 |
| B20 | FLASH | Live Breaking | Breaking News Archive | Searchable archive of all past breaking events · filterable by topic · date · severity | Platform database | FLASH interface | P2 |
| B21 | FLASH | Storytelling | Breaking News Timeline Builder | Auto-generated timeline of a breaking story · key moments · sources | Multi-source + Engine | FLASH · editorial export | P3 |
| B22 | FLASH | Storytelling | Crisis Timeline Reconstruction | Full reconstruction of a breaking event arc · post-event narrative | Historical + Engine | FLASH · editorial export | P3 |

---

## Full Feature Count — All Phases

| Layer | P1 | P2 | P3 | ∞ | Total |
|---|:---:|:---:|:---:|:---:|:---:|
| Sentra Engine | — | — | — | 12 | 12 |
| Reson8 Core | 24 | 4 | — | 5 | 33 |
| ORA — Elections | 31 | 21 | 5 | — | 57 |
| ARENA — Sports | 25 | 10 | 3 | — | 38 |
| PULSE — Finance | 18 | 7 | 2 | — | 27 |
| ATMOS — Weather | 12 | 6 | 3 | — | 21 |
| FLASH — Breaking News | 16 | 4 | 2 | — | 22 |
| **Total** | **126** | **52** | **15** | **17** | **210** |

---
*ID8 Media · Reson8 Platform · Full Feature Table · All Phases · May 2026*
