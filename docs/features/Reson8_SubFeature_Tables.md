# Reson8 Platform — Sub-Feature Tables with Descriptions
## All Five Modules

---

# Module 1 — ORA Elections

| # | Feature Group | Feature Name | Description |
|---|---|---|---|
| 1 | Election System Setup | Election Type Configuration | Define the type of election: Presidential · Senate · Parliamentary · Local / Municipal · Referendum — each type loads its own data model and rules |
| 2 | Election System Setup | Round Configuration | Set up single or multi-round structure · define advancement rules · configure runoff conditions |
| 3 | Election System Setup | Electoral Calendar | Full timeline of election events · registration deadlines · campaign periods · poll open/close times · results announcement schedule |
| 4 | Election System Setup | Candidate Database | Register all candidates: name · party · district · photo · biography · national ID · social handles |
| 5 | Election System Setup | Party Database | Register all parties: official name · colours · symbol · acronym · leadership · founding date · ideology |
| 6 | Election System Setup | Constituency Mapping | Configure geographic districts: boundaries · seat allocation · parent-child region hierarchy · population data |
| 7 | Election System Setup | Seat Configuration | Define total seats available · majority threshold · proportional vs. first-past-the-post rules · quota rules |
| 8 | Election System Setup | Results Feed Integration | Connect official results API or data feed · field mapping · validation rules · feed health monitoring · fallback feed |
| 9 | Election System Setup | Alert Threshold Setup | Configure triggers: majority achieved · seat milestone · % precincts reporting · concession language detected |
| 10 | Election System Setup | Vizrt Template Assignment | Map election data fields to pre-built Vizrt scenes · bind candidate colours · assign constituency to map layer |
| 11 | Live Results | Real-Time Vote Count | Live vote tally per candidate per constituency · percentage and absolute numbers · updates continuously as results are reported |
| 12 | Live Results | Seat Tally | Running count of seats won and projected per party · majority threshold line displayed · updates after each result |
| 13 | Live Results | Lead / Trail Indicators | Live ranking of candidates per constituency · gain/loss markers vs. previous election · colour-coded by party |
| 14 | Live Results | Results by Constituency | Drill-down from national aggregate to province to individual district · sortable by margin · party · swing |
| 15 | Live Results | Progressive Update | % of precincts reporting · estimated time to full results · confidence indicator per result |
| 16 | Live Results | Results Validation | Anomaly detection on incoming data · flags statistical jumps before they enter editorial queue · requires editor confirmation |
| 17 | Live Results | Comparative Results | Side-by-side current vs. previous election result per constituency · % swing · absolute vote change |
| 18 | Interactive Map | Country Map | National geographic map colour-filled by winning candidate or party · live update as results arrive |
| 19 | Interactive Map | District / State Drill-Down | Click through from national to regional to district level · breadcrumb navigation · back to parent level |
| 20 | Interactive Map | Candidate Performance Layer | Overlay showing each candidate's vote share geographically · filterable per candidate |
| 21 | Interactive Map | Swing Visualization | Direction and magnitude of swing vs. previous election per district · arrow or colour-scale display |
| 22 | Interactive Map | Poll Close Tracker | Show which areas have closed polls and which are still open · greyed out until results begin |
| 23 | Interactive Map | Historical Data Overlay | Layer previous election results over current map · compare cycles side by side |
| 24 | Interactive Map | Sorting & Filtering | Filter map by party · region · swing direction · margin of victory · turnout |
| 25 | Interactive Map | Battleground Watch | Highlight closely contested constituencies in real time · margin threshold configurable |
| 26 | Entity Profiles | Candidate Profile Card | Full profile: photo · name · party · district · age · biography · current position held |
| 27 | Entity Profiles | Historical Record | Prior electoral history · previous positions held · political career timeline · notable votes |
| 28 | Entity Profiles | Policy Positions | AI-extracted policy stances on key issues from public statements · speeches · manifestos |
| 29 | Entity Profiles | Related News | Live news feed filtered to this candidate from all monitored sources · sentiment-tagged |
| 30 | Entity Profiles | Social Trends | Candidate social media volume · engagement trends · sentiment direction over campaign period |
| 31 | Entity Profiles | Entity Mapping | Relationship graph showing connections to other political figures · organisations · donors · media |
| 32 | Election Preparations | Campaign Activity Tracker | Monitor campaign events · rallies · advertising activity · media appearances |
| 33 | Election Preparations | Swing Districts / States | Pre-identified battleground areas with historical context · current polling · risk level |
| 34 | Election Preparations | Key City Monitoring | Enhanced monitoring for politically significant cities and capitals during campaign period |
| 35 | Election Preparations | Scheduled Visits & Events | Calendar of candidate appearances · campaign stops · debates · press conferences |
| 36 | Election Preparations | Polling Data Integration | Pre-election polls ingested with source · methodology · date · sample size · margin of error |
| 37 | Coalition & Alliances | Live Coalition Updates | Real-time tracking of party alliance announcements and changes · source-attributed |
| 38 | Coalition & Alliances | Seat Mathematics Simulator | Calculate which party combinations reach majority threshold · updates live as results arrive |
| 39 | Coalition & Alliances | Promises Tracker | Track coalition agreements · policy commitments made during alliance negotiations |
| 40 | Coalition & Alliances | Organisation & Company Backing | Track corporate and institutional endorsements · political donor affiliations |
| 41 | Coalition & Alliances | Local & Global Context | International coalition comparisons · historical precedents from previous elections |
| 42 | Achievements & Track Record | Economic | Policy delivery in economic domain: GDP growth · unemployment · investment · trade agreements |
| 43 | Achievements & Track Record | Social | Healthcare · education · housing · welfare delivery record during term |
| 44 | Achievements & Track Record | Political | Legislative record · cross-party cooperation · reform delivery · campaign promise fulfilment |
| 45 | Achievements & Track Record | Military & Security | Defence and security-related decisions · outcomes · international commitments |
| 46 | Achievements & Track Record | Education | Specific education policy delivery · literacy rates · school building · curriculum reform |
| 47 | Achievements & Track Record | Industrial | Infrastructure projects · industrial policy · development programs delivered |
| 48 | AI Prediction Engine | Win Probability | Real-time probability of winning per candidate / party · updates as results arrive · confidence range shown |
| 49 | AI Prediction Engine | Seat Projection | Projected final seat count per party based on results pattern so far · range displayed |
| 50 | AI Prediction Engine | Turnout Intelligence | Projected final voter turnout based on early reporting · historical comparison |
| 51 | AI Prediction Engine | Swing Prediction | Predicted swing direction and magnitude per region · based on live results pattern |
| 52 | AI Prediction Engine | Called Race Signal | AI signals when a race is statistically determined · editor confirms before any on-air call |
| 53 | Social Intelligence | Candidate Sentiment Comparison | Side-by-side real-time sentiment per candidate across all monitored social platforms |
| 54 | Social Intelligence | Party Sentiment Trend | Sentiment direction and magnitude per party over time · 6-emotion breakdown available |
| 55 | Social Intelligence | Hashtag Volume Tracking | Top election hashtags ranked by volume · sentiment · velocity · language breakdown |
| 56 | Social Intelligence | Viral Claim Detection | Detects rapidly spreading unverified claims before they peak · flags for editorial review |
| 57 | Social Intelligence | Public Mood Analysis | Aggregate emotion across all election social discourse · overall public sentiment direction |
| 58 | Breaking News | Elections Breaking Feed | Dedicated breaking stream filtered to election content only · AI-classified by severity |
| 59 | Breaking News | Results Threshold Alert | Auto-alert when result crosses configured milestone: majority · seat target · lead change |
| 60 | Breaking News | Concession / Victory Detection | NLP detects concession or victory language in candidate public statements · real-time |
| 61 | Breaking News | Anomalous Results Alert | Flags statistically anomalous data before it reaches editorial queue · hold for review |
| 62 | AI Content Generation | Auto-Generated Headline | AI drafts broadcast headline from live results data · character-limit aware · editor reviews |
| 63 | AI Content Generation | Lower-Third Caption | AI generates lower-third text per graphic type · styled to template · bilingual |
| 64 | AI Content Generation | Anchor Talking Points | AI generates contextual talking points per result or graphic · refreshed as data changes |
| 65 | AI Content Generation | AI News List | AI-assembled prioritised list of election news items for anchor reference during broadcast |
| 66 | AI Content Generation | Bilingual Output | All generated text produced in Arabic and English simultaneously · RTL-aware |
| 67 | AI Content Generation | Urgency Calibration | Tone adjusts based on severity: called race vs. developing result vs. concession |
| 68 | Broadcast | Live Channel Monitoring | Monitor what competing channels are covering during the election broadcast |
| 69 | Broadcast | Narrative Tracking | Track which narratives competing networks are emphasising in their coverage |
| 70 | Broadcast | Coverage Intelligence | See which stories competitors are leading with · editorial decision support |
| 71 | Broadcast | First-Mover Detection | Identify which channel broke a story first · competitive awareness |
| 72 | Programs | AI Program Rundown | AI-generated show rundown for election night broadcast · segment by segment |
| 73 | Programs | Pre-Election Show Package | Briefing and content package for pre-election programming the day before |
| 74 | Programs | Bulletin Script | AI-generated election news bulletin script · structured with headlines · context · updates |
| 75 | Programs | Customized Segment List | Tailored content list per show format and duration · anchor-specific |
| 76 | Take to Air | Multi-Selection | Select multiple graphics to queue simultaneously · batch approval workflow |
| 77 | Take to Air | Preview Before Air | See exact graphic as it will appear on screen before taking · no surprises on air |
| 78 | Take to Air | Producer → Editor → Operator | Full three-step editorial approval workflow · no graphic bypasses the chain |
| 79 | Take to Air | Reject & Revise | Editor rejects with inline comment · returns to producer for revision · re-submission loop |
| 80 | Take to Air | Editorial Audit Trail | Immutable log of every action: who prepared · who approved · when taken · what aired |
| 81 | Control Room | Material Approval | Final editorial sign-off before any content goes on air · visible approval status |
| 82 | Control Room | Live On-Air Status | Real-time view of what is currently broadcasting across all output screens |
| 83 | Control Room | Multi-Screen Management | Control graphics across multiple output screens simultaneously · per-screen assignment |
| 84 | Control Room | Emergency Override | Instant pull of any live graphic by senior editor · logged with reason |
| 85 | Control Room | Broadcast Event Log | Complete log of everything that went on air: timestamp · operator · graphic · module |

---

# Module 2 — ARENA Sports

| # | Feature Group | Feature Name | Description |
|---|---|---|---|
| 1 | Sport Type | Sport Selector | Choose active sport: Football · Basketball · Tennis · Formula 1 · Cricket · Combat Sports · Golf · Athletics · sport type loads correct data model · stats · templates · feed |
| 2 | Sport Type | Data Model Loader | Each sport type activates its own event library · statistics set · Vizrt template collection · data feed configuration |
| 3 | Sport Type | Multi-Sport Mode | Run multiple sports simultaneously during the same broadcast window · switch between active sports |
| 4 | Competition Setup | Competition Configuration | Define competition: name · type (League / Cup / Tournament / Knockout) · season dates · number of teams · format |
| 5 | Competition Setup | Team Database | Register all clubs: name · official colours · badge · home ground · squad list · manager · founding year |
| 6 | Competition Setup | Player Database | Register all players: name · position · nationality · age · photo · shirt number · current club |
| 7 | Competition Setup | Match Schedule | Full fixture list · broadcast window per match · match day configuration · venue details |
| 8 | Competition Setup | Data Feed Integration | Connect official data provider: Opta · Stats Perform · league API · field mapping · feed health monitoring |
| 9 | Competition Setup | Vizrt Scene Assignment | Map match data fields to Vizrt scene containers · configure score bug · stats panels · event alerts |
| 10 | Competition Setup | Template Pre-Load | All Vizrt scenes pre-bound before broadcast · zero technical setup during live match |
| 11 | Live Match | Live Score Display | Current score for both teams · continuously updated · venue · competition name · match day |
| 12 | Live Match | Match Clock | Live match minute · first / second half indicator · stoppage time display · kick-off reference |
| 13 | Live Match | Match Events | Goals · assists · bookings · red cards · substitutions · VAR decisions · penalties · each event triggers editorial queue automatically |
| 14 | Live Match | Event Threshold Alert | Configurable alert on key events: goal · red card · penalty · VAR reversal · fires to editorial queue |
| 15 | Live Match | Half-Time / Full-Time Trigger | Auto-trigger for interval and final whistle · loads summary graphic into editorial queue |
| 16 | Live Match | Event Validation | Cross-check incoming event data against expected patterns before entering editorial queue · flag anomalies |
| 17 | Match Statistics | Possession | Live possession % per team · updates every 30 seconds · displayed as running average |
| 18 | Match Statistics | Shots | Shots on target · shots off target · blocked shots · shot accuracy % per team |
| 19 | Match Statistics | Expected Goals (xG) | Live cumulative xG per team · per player · quality of chances created indicator |
| 20 | Match Statistics | Pass Completion | Pass accuracy % per team · total passes attempted · key passes · long ball accuracy |
| 21 | Match Statistics | Defensive Stats | Fouls · offsides · corners · tackles won · interceptions · clearances per team |
| 22 | Match Statistics | Physical Stats | Distance covered · sprints · top speed per player · intensity comparison between teams |
| 23 | Match Statistics | Saves | Goalkeeper saves · save % · distribution accuracy · shots faced |
| 24 | Formation & Tactical View | Live Formation Display | Real-time formation shape for both teams · updates when substitutions or tactical changes occur |
| 25 | Formation & Tactical View | Heat Map | Zones of play for each team and individual players · territorial dominance visualization |
| 26 | Formation & Tactical View | Shot Map | All shots plotted on pitch graphic · colour-coded by outcome · goal / saved / missed / blocked |
| 27 | Formation & Tactical View | Pass Network | Player-to-player pass connections displayed on pitch · line weight shows frequency |
| 28 | Formation & Tactical View | Tactical Shape Analysis | Defensive line height · pressing intensity · width of play · compactness indicators |
| 29 | Formation & Tactical View | Substitution Impact View | Before/after formation and stats comparison following a substitution |
| 30 | Competition & Standings | League Table | Current standings: team · played · won · drawn · lost · goals for/against · points · live update |
| 31 | Competition & Standings | Form Guide | Last 5 results per team: W / D / L visual strip · home and away form split |
| 32 | Competition & Standings | Head-to-Head Record | All-time record between two teams · last 5 meetings · goals scored · venue breakdown |
| 33 | Competition & Standings | Top Scorers / Golden Boot | Live golden boot standings · goals · assists · penalties · updated after each goal |
| 34 | Competition & Standings | Title Race Calculator | Points needed to win title · games remaining · can any team catch the leader |
| 35 | Competition & Standings | Relegation Battle | Teams in danger zone · points above relegation · remaining fixtures difficulty |
| 36 | Competition & Standings | Qualification Scenarios | European / continental competition qualification mathematics · live calculation |
| 37 | Entity Profiles | Player Profile Card | Photo · position · nationality · age · shirt number · current season stats summary |
| 38 | Entity Profiles | Season Statistics | Full season stats per player: goals · assists · appearances · cards · minutes played · rating |
| 39 | Entity Profiles | Career History | Career timeline · clubs · seasons · statistics per club · career totals |
| 40 | Entity Profiles | Manager Profile | Manager name · photo · tactical philosophy · win rate · career history · notable achievements |
| 41 | Entity Profiles | Team Profile | Club badge · colours · home ground · current season record · recent form · squad value |
| 42 | Entity Profiles | Player Comparison Card | Side-by-side stats comparison between two players · filterable by metric |
| 43 | Pre-Match Intelligence | Confirmed Starting Lineup | Official lineup once released · formation · player positions · confirmed vs. predicted |
| 44 | Pre-Match Intelligence | Injury & Suspension Report | Confirmed injuries · suspensions · doubtful players · expected return dates |
| 45 | Pre-Match Intelligence | Team News | Latest official club news: manager press conference · training updates · squad selection signals |
| 46 | Pre-Match Intelligence | Historical Head-to-Head | Detailed all-time record between teams · big wins · goalscorers · notable moments |
| 47 | Pre-Match Intelligence | Tactical Preview | Expected formation and approach · key matchups · danger players · set-piece record |
| 48 | Pre-Match Intelligence | Referee Profile | Referee assignment · cards per game average · penalty decisions · disciplinary record |
| 49 | Transfer & Squad Intelligence | Transfer Window Tracker | Live tracking of transfer activity: confirmed · negotiating · bid submitted · rejected |
| 50 | Transfer & Squad Intelligence | Confirmed Deals | Verified transfers with fee · contract length · sell-on clauses where public |
| 51 | Transfer & Squad Intelligence | Credible Rumours | Transfer rumours from verified credible sources · source credibility score shown |
| 52 | Transfer & Squad Intelligence | Injury & Availability Tracker | Year-round injury monitoring · confirmed diagnosis · return timeline · squad impact |
| 53 | Transfer & Squad Intelligence | Squad Depth Analysis | Per-position squad depth · where reinforcements are needed · age profile |
| 54 | Transfer & Squad Intelligence | Contract Expiry Watch | Players entering final year of contract · free agent candidates · renewal status |
| 55 | Records & Achievements | Club All-Time Records | Goals scored · titles won · unbeaten runs · biggest wins · attendance records |
| 56 | Records & Achievements | Player Milestones | Approaching and achieved milestones: goals · appearances · assists · clean sheets |
| 57 | Records & Achievements | Season Bests | Best defensive record · most goals scored · longest winning run this season |
| 58 | Records & Achievements | Trophy History | Complete trophy cabinet with years · competitions · managers · key players |
| 59 | Records & Achievements | Derby Record | Historical record in local rivalry matches · recent form in derbies |
| 60 | AI Prediction Engine | Match Outcome Probability | Win / Draw / Loss % per team · pre-match and live during match · updates per minute |
| 61 | AI Prediction Engine | Live Win Probability Tracker | Probability trend chart across 90 minutes · shows impact of goals and red cards |
| 62 | AI Prediction Engine | Next Goal Probability | Which team is more likely to score next based on current performance metrics |
| 63 | AI Prediction Engine | Player Most Likely to Score | Individual scoring probability based on position · form · shots taken · xG |
| 64 | AI Prediction Engine | Scoreline Prediction | Most probable final scoreline · range of outcomes with probability |
| 65 | Social Intelligence | Fan Sentiment Per Team | Real-time social sentiment from fans of each team · compared side by side |
| 66 | Social Intelligence | Player Sentiment During Match | Individual player sentiment tracking: praise after a goal · criticism after a miss |
| 67 | Social Intelligence | Trending Match Hashtags | Top match hashtags by volume · sentiment · velocity · language breakdown |
| 68 | Social Intelligence | Viral Moment Detection | Detects match moments spreading rapidly on social before they peak · flags to editorial |
| 69 | Social Intelligence | Post-Event Fan Reaction | Aggregate social reaction immediately after full time · emotion breakdown |
| 70 | Breaking News | Sports Breaking Feed | Breaking stream filtered to sport: injuries · confirmed lineups · manager statements · results |
| 71 | Breaking News | Transfer Alert | Confirmed transfer announcement detected from official club or journalist sources |
| 72 | Breaking News | Match Event Alert | Key in-match events: goal · red card · penalty · final whistle · fires to editorial queue |
| 73 | Breaking News | Manager Statement | Manager press conference and official statement detection · AI-summarised |
| 74 | Breaking News | Disciplinary News | Red card appeals · bans · FA charges · tribunal decisions |
| 75 | AI Content Generation | Match Headlines | Auto-generated broadcast headline from live match data · event-triggered |
| 76 | AI Content Generation | Lower-Third Captions | Caption per event type: goal flash · card · substitution · half-time score |
| 77 | AI Content Generation | Match Summary | Half-time and full-time AI-generated match summary · key moments · stats |
| 78 | AI Content Generation | Anchor Talking Points | Per-stat talking points for anchor: possession context · xG comparison · form reference |
| 79 | AI Content Generation | Bilingual Output | All generated text in Arabic and English simultaneously · RTL-aware |
| 80 | Broadcast | Live Channel Monitoring | Monitor what competing sports channels are covering during the match window |
| 81 | Broadcast | Narrative Tracking | Track which storylines competitors are leading with: result · tactics · controversy |
| 82 | Broadcast | Coverage Intelligence | See which moments competitors are replaying and discussing |
| 83 | Programs | AI Match Preview Rundown | AI-generated show rundown for pre-match programme · segment by segment |
| 84 | Programs | Post-Match Analysis Script | AI-generated post-match analysis programme rundown · stats-driven narrative |
| 85 | Programs | Customized Segment List | Tailored content list per show format and duration · per presenter |
| 86 | Take to Air | Multi-Selection | Select multiple graphics simultaneously · batch approval for half-time or full-time packages |
| 87 | Take to Air | Preview Before Air | See exact graphic on screen before taking · score bug · stats panel · event graphic |
| 88 | Take to Air | Producer → Editor → Operator | Full three-step editorial approval workflow for every graphic |
| 89 | Take to Air | Reject & Revise | Editor rejects with inline comment · returns to producer · revision loop |
| 90 | Take to Air | Editorial Audit Trail | Immutable log: who prepared · who approved · when taken · what aired |
| 91 | Control Room | Material Approval | Final editorial sign-off before any content goes on air |
| 92 | Control Room | Live On-Air Status | Real-time view of what is currently broadcasting: score bug · stats · event graphic |
| 93 | Control Room | Multi-Screen Management | Control graphics across multiple output screens · different content per screen |
| 94 | Control Room | Emergency Override | Instant pull of any live graphic by senior editor |
| 95 | Control Room | Broadcast Event Log | Complete log of everything on air: timestamp · operator · graphic · match event |

---

# Module 3 — PULSE Finance & Markets

| # | Feature Group | Feature Name | Description |
|---|---|---|---|
| 1 | Market Setup | Exchange Configuration | Register exchanges: name · timezone · trading hours · currency · index association |
| 2 | Market Setup | Instrument Database | Register all instruments: stocks · indices · commodities · FX pairs · crypto · bonds · ETFs |
| 3 | Market Setup | Data Feed Integration | Connect market data provider: Bloomberg · Reuters · exchange API · field mapping · feed health |
| 4 | Market Setup | Alert Threshold Configuration | Set % move triggers · circuit breaker alerts · volume spike thresholds · index level alerts |
| 5 | Market Setup | Vizrt Template Assignment | Map market data fields to pre-built Vizrt scenes · ticker bar · price panel · index display |
| 6 | Market Setup | Market Calendar Setup | Configure scheduled events: earnings dates · rate decisions · economic data releases |
| 7 | Market Types | Equities | Stocks and shares: individual company securities traded on exchanges |
| 8 | Market Types | Fixed Income / Bonds | Government and corporate bonds · yield curves · credit ratings · duration |
| 9 | Market Types | Currencies / FX | Foreign exchange pairs: major · minor · exotic · cross rates · spot and forward |
| 10 | Market Types | Commodities | Energy (oil · gas) · Metals (gold · silver · copper) · Agriculture · Livestock |
| 11 | Market Types | Cryptocurrency | Bitcoin · Ethereum · top 10 by market cap · crypto market overall sentiment |
| 12 | Market Types | Derivatives / Futures | Futures contracts · options · volatility instruments · open interest |
| 13 | Market Types | ETFs / Funds | Exchange-traded funds · sector funds · thematic · commodity-backed |
| 14 | Live Market Data | Live Price Display | Price · absolute change · % change · intraday range (high/low) · real-time per instrument |
| 15 | Live Market Data | Volume Indicator | Trading volume vs. average volume · abnormal volume flag · volume trend |
| 16 | Live Market Data | Market Status Indicator | Open / Pre-market / After-hours / Closed per exchange · countdown to open/close |
| 17 | Live Market Data | Bid / Ask Spread | Live bid and ask price · spread width · liquidity indicator per instrument |
| 18 | Live Market Data | Last Trade Time | Timestamp of most recent trade · useful for thinly traded instruments |
| 19 | Indices & Benchmarks | Major Global Indices | S&P 500 · FTSE 100 · DAX · Nikkei 225 · CAC 40 · Hang Seng · live level · change · % |
| 20 | Indices & Benchmarks | Regional Indices | Local market benchmark indices per configured region · live performance |
| 21 | Indices & Benchmarks | Sector Indices | Technology · Energy · Healthcare · Financial · Consumer sector index performance |
| 22 | Indices & Benchmarks | Index Performance Comparison | Side-by-side comparison of multiple indices · YTD · 1-month · 1-week performance |
| 23 | Indices & Benchmarks | 52-Week Range | Current price vs. 52-week high and low per index · where are we in the range |
| 24 | Currencies & Commodities | FX Major Pairs | EUR/USD · GBP/USD · USD/JPY · USD/CHF · live rates · daily change · trend |
| 25 | Currencies & Commodities | Cross Rates | Non-USD pairs · regional currency pairs · configurable per broadcast market |
| 26 | Currencies & Commodities | Oil Prices | Brent crude · WTI crude · live price · daily change · % move · production context |
| 27 | Currencies & Commodities | Precious Metals | Gold · silver · platinum · palladium · spot price · daily range · YTD |
| 28 | Currencies & Commodities | Other Commodities | Natural gas · copper · wheat · corn · coffee · configurable per broadcast focus |
| 29 | Currencies & Commodities | Cryptocurrency | Bitcoin · Ethereum · top 10 · market cap · 24h change · dominance % |
| 30 | Gainers & Losers | Top Gainers | Biggest % movers upward · filterable by exchange · sector · time period |
| 31 | Gainers & Losers | Top Losers | Biggest % movers downward · filterable by exchange · sector · time period |
| 32 | Gainers & Losers | Volume Leaders | Most traded instruments by volume · unusual activity flag |
| 33 | Gainers & Losers | 52-Week Highs & Lows | Instruments hitting new yearly extremes · bullish/bearish signal |
| 34 | Gainers & Losers | Sector Heat Map | All sectors colour-coded by % performance · instant market overview |
| 35 | Economic Calendar | Scheduled Events | Interest rate decisions · GDP releases · inflation data · employment figures · PMI |
| 36 | Economic Calendar | Earnings Announcements | Company earnings release dates · EPS estimate · revenue estimate · analyst consensus |
| 37 | Economic Calendar | IPO Calendar | Upcoming listings · expected price range · sector · exchange |
| 38 | Economic Calendar | Central Bank Meetings | Fed · ECB · BoE · BoJ meeting dates · expected decision · market consensus |
| 39 | Economic Calendar | Expected vs. Actual | When data releases: expected figure · actual figure · previous figure · beat/miss indicator |
| 40 | Market Events | Market Open / Close Trigger | Auto-alert and graphic trigger at each configured exchange open and close time |
| 41 | Market Events | Circuit Breaker Alert | Market-wide trading halt triggered · severity level · duration · affected exchanges |
| 42 | Market Events | Earnings Release | Company earnings published · EPS beat/miss vs. estimate · revenue beat/miss · market reaction |
| 43 | Market Events | Rate Decision Announcement | Central bank rate decision detected · decision vs. expectation · statement summary |
| 44 | Market Events | Flash Crash Detection | Sudden abnormal price move detected · flag before editorial acts on it |
| 45 | Market Events | Regulatory / Government Action | Sanctions · trading restrictions · government intervention detected in market |
| 46 | Entity Profiles | Company Profile Card | Name · ticker · sector · current price · market cap · P/E ratio · 52-week range · exchange |
| 47 | Entity Profiles | Index Profile Card | Index name · methodology · component count · current level · daily range · YTD |
| 48 | Entity Profiles | Central Bank Profile | Institution · governor · meeting schedule · recent decisions · current policy rate |
| 49 | Entity Profiles | CEO / Executive Profile | Executive name · photo · role · company · recent statements · market-moving history |
| 50 | Entity Profiles | Competitor Comparison | Side-by-side company comparison: price · market cap · P/E · revenue · YTD performance |
| 51 | AI Analysis Engine | Market Sentiment Score | Composite score combining social signal · news tone · price momentum per instrument |
| 52 | AI Analysis Engine | Trend Direction Signal | Bull/bear signal per instrument or sector · momentum direction · strength indicator |
| 53 | AI Analysis Engine | Sector Rotation Analysis | Capital flow between sectors · which sectors gaining/losing institutional interest |
| 54 | AI Analysis Engine | Volatility Analysis | VIX and instrument-level volatility · elevated vs. normal · historical comparison |
| 55 | AI Analysis Engine | Post-Event Impact Analysis | Immediate market reaction analysis after rate decision · earnings · economic data |
| 56 | Social Intelligence | Trending Tickers | Most discussed stocks/instruments on social media · volume · sentiment |
| 57 | Social Intelligence | Investor Sentiment Per Instrument | Bullish/bearish sentiment per ticker from social and news · retail vs. institutional signal |
| 58 | Social Intelligence | Viral Financial Claim Detection | Detect rapidly spreading financial claims before they peak · fact-check flag |
| 59 | Social Intelligence | Social Momentum Tracker | Social signal accelerating around an instrument before price moves · early signal |
| 60 | Breaking News | Financial Breaking Feed | Breaking stream: earnings surprises · rate decisions · regulatory action · company announcements |
| 61 | Breaking News | Market Threshold Alert | Alert when price or index crosses configured % move · volume spike alert |
| 62 | Breaking News | Earnings Surprise Alert | EPS or revenue significantly beats or misses expectation · immediate flag |
| 63 | Breaking News | Geopolitical Market Impact | Political or conflict event detected with known market impact · cross-module signal |
| 64 | AI Content Generation | Market Headlines | Auto-generated headline from live market data · move-triggered · editor reviews |
| 65 | AI Content Generation | Lower-Third Captions | Price move captions · index level · rate decision result · earnings beat/miss |
| 66 | AI Content Generation | Market Open / Close Summary | AI-generated opening and closing market summary · key movers · tone |
| 67 | AI Content Generation | Anchor Talking Points | Contextual talking points per market move: sector context · historical comparison |
| 68 | AI Content Generation | Bilingual Output | All generated text in Arabic and English simultaneously |
| 69 | Broadcast | Financial Channel Monitoring | Monitor what Bloomberg TV · CNBC · Reuters TV are covering |
| 70 | Broadcast | Narrative Tracking | Which market stories competitors are leading with · editorial positioning intelligence |
| 71 | Programs | Pre-Market Show Rundown | AI-generated pre-market programme rundown · what to watch · key events today |
| 72 | Programs | Closing Bell Summary | AI-generated end-of-day market summary script · winners · losers · key moves |
| 73 | Programs | Weekly Market Review | AI-assembled weekly performance review · narrative · key chart moments |
| 74 | Programs | Customized Segment List | Tailored content list per show format · per anchor · per broadcast duration |
| 75 | Take to Air | Multi-Selection | Select multiple market graphics simultaneously · price panel · index · ticker |
| 76 | Take to Air | Preview Before Air | See exact graphic before taking: price panel · index display · ticker bar |
| 77 | Take to Air | Producer → Editor → Operator | Full three-step editorial approval for every graphic |
| 78 | Take to Air | Reject & Revise | Editor rejects with comment · returns to producer · revision loop |
| 79 | Take to Air | Editorial Audit Trail | Immutable log: who prepared · who approved · when taken · what aired |
| 80 | Control Room | Material Approval | Final editorial sign-off before any content goes on air |
| 81 | Control Room | Live On-Air Status | Real-time view of what is currently broadcasting: ticker · price panel · index |
| 82 | Control Room | Multi-Screen Management | Control graphics across multiple output screens · ticker on one · price on another |
| 83 | Control Room | Emergency Override | Instant pull of any live graphic in case of data error or breaking development |
| 84 | Control Room | Broadcast Event Log | Complete log of everything on air: timestamp · operator · instrument · graphic |

---

# Module 4 — ATMOS Weather & Natural Disasters

| # | Feature Group | Feature Name | Description |
|---|---|---|---|
| 1 | Weather Setup | Coverage Area Configuration | Define cities · regions · countries · priority locations · broadcast geography scope |
| 2 | Weather Setup | Location Database | Register all locations with coordinates · timezone · elevation · region hierarchy |
| 3 | Weather Setup | Data Feed Integration | Connect weather API: Tomorrow.io · AccuWeather · national met service · field mapping |
| 4 | Weather Setup | Alert Threshold Configuration | Set severe weather thresholds: storm · extreme heat/cold · rainfall · wind · visibility |
| 5 | Weather Setup | Vizrt Scene Assignment | Map weather data fields to Vizrt scenes · conditions card · forecast · map · alert |
| 6 | Weather Setup | Featured Cities Selection | Configure priority cities for headline display · ordered by editorial preference |
| 7 | Weather Phenomena | Standard Conditions | Clear · partly cloudy · cloudy · overcast · light rain · drizzle · fog |
| 8 | Weather Phenomena | Storms & Thunderstorms | Thunderstorm · severe thunderstorm · electrical storm · hail · heavy rain |
| 9 | Weather Phenomena | Extreme Heat / Cold | Heatwave · extreme cold · frost · freeze warning · heat dome events |
| 10 | Weather Phenomena | Sandstorms | Sandstorm · dust storm · haboob · visibility reduction · air quality impact |
| 11 | Weather Phenomena | Tropical Systems | Hurricane · typhoon · cyclone · tropical storm · category classification · path |
| 12 | Weather Phenomena | Winter Events | Snow · blizzard · ice storm · freezing rain · avalanche risk |
| 13 | Weather Phenomena | Flooding | Flash flood · river flood · coastal flood · storm surge · urban flooding |
| 14 | Weather Phenomena | High Wind Events | Gale · severe gale · storm force winds · wind advisory · infrastructure impact |
| 15 | Current Conditions | Temperature Display | Actual temperature · feels like · high/low for the day · unit configurable (°C/°F) |
| 16 | Current Conditions | Weather Description | Text and icon description of current conditions · localised terminology |
| 17 | Current Conditions | Wind | Speed · direction · gusts · Beaufort scale · compass direction display |
| 18 | Current Conditions | Humidity & Pressure | Relative humidity % · atmospheric pressure · rising/falling pressure trend |
| 19 | Current Conditions | UV Index | Current UV level · health advisory · scale 0–11+ · sun protection recommendation |
| 20 | Current Conditions | Visibility | Current visibility distance · reduced visibility flag · fog/haze cause |
| 21 | Current Conditions | Sunrise / Sunset | Today's sunrise and sunset times · day length · golden hour |
| 22 | Forecast | Hourly Forecast | 24-hour granular forecast per location · temperature · conditions · precipitation % |
| 23 | Forecast | 3-Day Forecast | Short-range outlook · high/low · conditions · precipitation probability · wind |
| 24 | Forecast | 7-Day Forecast | Weekly outlook · general conditions · temperature trend · weekend weather |
| 25 | Forecast | 10-Day Extended Outlook | Beyond-7-day forecast · confidence level shown · trend direction |
| 26 | Forecast | Precipitation Probability | % chance of rain/snow per period · expected accumulation · timing |
| 27 | Weather Maps | Temperature Map | Geographic temperature overlay across coverage area · colour-scaled gradient |
| 28 | Weather Maps | Rainfall / Precipitation Map | Rain accumulation overlay · intensity zones · real-time and forecast |
| 29 | Weather Maps | Wind Map | Wind speed and direction vectors · animated movement · high-wind zones |
| 30 | Weather Maps | Pressure Map | Isobar display · high/low pressure systems · front tracking |
| 31 | Weather Maps | Cloud Cover Map | Satellite-based cloud coverage overlay · clear vs. overcast zones |
| 32 | Weather Maps | UV Index Map | Geographic UV distribution · dangerous exposure zones · daily peak time |
| 33 | Weather Maps | Snow Coverage Map | Snow depth overlay · snowfall accumulation · snow line elevation |
| 34 | Weather Maps | Animated Overlays | Animated cloud movement · rain progression · storm tracking · time-lapse mode |
| 35 | Severe Weather | Active Warnings Display | All active warnings and watches from national met authorities · severity · affected areas |
| 36 | Severe Weather | Storm Tracking | Hurricane/cyclone path tracker · current position · projected landfall · intensity |
| 37 | Severe Weather | Flood Alerts | River level monitoring · flood watch/warning · expected peak · affected areas |
| 38 | Severe Weather | Heatwave Alerts | Multi-day extreme heat event · health risk · duration · affected population |
| 39 | Severe Weather | Wildfire Risk Index | Fire weather conditions: wind · humidity · temperature · drought index · risk rating |
| 40 | Severe Weather | Severe Weather Timeline | Chronological timeline of an ongoing severe event · updates as situation evolves |
| 41 | Natural Disasters | Earthquake Detection | Seismic event detection from USGS/EMSC · magnitude · depth · epicentre · tsunami potential |
| 42 | Natural Disasters | Tsunami Alert | Tsunami warning detection · wave height estimate · affected coastlines · arrival time |
| 43 | Natural Disasters | Volcanic Activity | Eruption detection · ash cloud tracking · aviation impact · exclusion zones |
| 44 | Natural Disasters | Disaster Impact Area | Geographic overlay of affected area · population at risk · infrastructure impact |
| 45 | Natural Disasters | International Alert Feeds | GDACS · UN OCHA · national disaster management agency feeds integrated |
| 46 | Location Profiles | Per-City Weather Card | City name · current conditions · today's high/low · 3-day summary · wind · humidity |
| 47 | Location Profiles | Featured Cities Display | Priority city cards displayed in editorial-configured order · instant overview |
| 48 | Location Profiles | Regional Summary | Aggregate conditions for a region: e.g. Northern Europe · Gulf region · Mediterranean |
| 49 | Location Profiles | Country Overview | National weather summary · most extreme condition · alerts active |
| 50 | Climate & Seasonal Context | Historical Average Comparison | Current conditions vs. historical average for same date · above/below normal |
| 51 | Climate & Seasonal Context | Seasonal Outlook | Seasonal forecast from met authorities · temperature and precipitation outlook |
| 52 | Climate & Seasonal Context | Climate Anomaly Detection | Significant departure from long-term normal · record event flag |
| 53 | Climate & Seasonal Context | Record Temperatures | All-time and seasonal record highs and lows · broken today flag |
| 54 | Breaking News | Severe Weather Breaking Alert | Auto-alert when national met authority issues a severe weather warning · fires to editorial |
| 55 | Breaking News | Natural Disaster Alert | Earthquake · tsunami · volcanic eruption detected · immediate flag to editorial queue |
| 56 | Breaking News | Disaster Escalation Signal | Ongoing event escalating: storm intensifies · flood levels rising · aftershock detected |
| 57 | Breaking News | Weather Alert Editorial Queue | All severe events enter editorial queue for editor confirmation before any graphic goes to air |
| 58 | AI Content Generation | Weather Headlines | Auto-generated headline per city or region · severity-aware · editor reviews |
| 59 | AI Content Generation | Forecast Captions | Lower-third text for forecast graphic · conditions · temperature · precipitation |
| 60 | AI Content Generation | Severe Weather Copy | Alert-specific broadcast copy: storm name · affected areas · safety advisory |
| 61 | AI Content Generation | Anchor Talking Points | Contextual talking points: historical comparison · why this matters · what to watch |
| 62 | AI Content Generation | Bilingual Output | All generated text in Arabic and English simultaneously · RTL-aware |
| 63 | Broadcast | Weather Channel Monitoring | Monitor what competing channels are covering: storm · heatwave · disaster |
| 64 | Broadcast | Narrative Tracking | Which weather stories competitors are leading with · editorial positioning |
| 65 | Programs | Morning Forecast Script | AI-generated daily weather show rundown · city by city · severe alerts first |
| 66 | Programs | Severe Weather Special | AI-generated special programme rundown for major weather or disaster event |
| 67 | Programs | Weekly Outlook Summary | AI-assembled weekly weather summary · narrative · key events · weekend outlook |
| 68 | Programs | Customized Segment List | Tailored content list per show format · per presenter · per broadcast region |
| 69 | Take to Air | Multi-Selection | Select multiple weather graphics simultaneously · city cards · map · forecast |
| 70 | Take to Air | Preview Before Air | See exact graphic before taking · map overlay · conditions card · forecast panel |
| 71 | Take to Air | Producer → Editor → Operator | Full three-step editorial approval for every graphic |
| 72 | Take to Air | Reject & Revise | Editor rejects with comment · returns to producer · revision loop |
| 73 | Take to Air | Editorial Audit Trail | Immutable log: who prepared · who approved · when taken · what aired |
| 74 | Control Room | Material Approval | Final editorial sign-off before any content goes on air |
| 75 | Control Room | Live On-Air Status | Real-time view of what is broadcasting: conditions card · map · alert overlay |
| 76 | Control Room | Multi-Screen Management | Control graphics across multiple output screens · map on one · city cards on another |
| 77 | Control Room | Emergency Override | Instant pull of any live graphic · critical for incorrect severe weather information |
| 78 | Control Room | Broadcast Event Log | Complete log of everything on air: timestamp · operator · location · graphic |

---

# Module 5 — FLASH Breaking News

| # | Feature Group | Feature Name | Description |
|---|---|---|---|
| 1 | Source Configuration | Source Categories | Define monitored source types: news wires · social platforms · official government feeds · agency feeds |
| 2 | Source Configuration | Topic & Keyword Monitoring | Configure keywords and topic clusters that activate the breaking detection pipeline |
| 3 | Source Configuration | Geographic Coverage | Define regions and countries in scope for breaking detection · global or filtered |
| 4 | Source Configuration | Language Filters | Select active languages from the 10 approved: English · Arabic · French · Spanish · Russian · Chinese · German · Portuguese · Persian · Turkish |
| 5 | Source Configuration | Trusted Source Whitelist | Designate high-trust sources whose content is fast-tracked through verification |
| 6 | Source Configuration | Blocked Source List | Exclude known unreliable or spam sources from the detection pipeline |
| 7 | Breaking Detection & Alert Queue | Real-Time Event Classification | AI classifies breaking events across all 10 languages simultaneously from social + wires |
| 8 | Breaking Detection & Alert Queue | Multi-Source Aggregation | Social signal + news wire + broadcast source triangulated per story before alerting |
| 9 | Breaking Detection & Alert Queue | Severity Classification | Each detected story auto-tagged: Major Breaking · Breaking · Developing · priority colour-coded |
| 10 | Breaking Detection & Alert Queue | Geographic Tagging | Location of breaking event identified: city · country · region · coordinates |
| 11 | Breaking Detection & Alert Queue | First-Source Attribution | Identifies which source first reported the story · timestamp · platform |
| 12 | Breaking Detection & Alert Queue | Live Alert Queue | All detected breaking items displayed in editorial queue · severity-sorted · time-stamped |
| 13 | Breaking Detection & Alert Queue | Unread / Acknowledged Status | Editor marks items as seen · queue clears as editors act · unread count visible |
| 14 | Breaking Detection & Alert Queue | Age of Story Indicator | Time elapsed since detection · helps editors prioritise freshest stories |
| 15 | Breaking Detection & Alert Queue | Story Assignment | Assign a breaking story to a specific editor for ownership and follow-through |
| 16 | Verification Engine | Cross-Source Verification | Story confirmed when detected across multiple independent sources · source count shown |
| 17 | Verification Engine | Source Credibility Score | Each source scored for reliability · high-credibility sources boost confidence faster |
| 18 | Verification Engine | Confidence Level Display | Visual confidence indicator per story: Unverified · Low · Medium · High · Confirmed |
| 19 | Verification Engine | Unverified Flag | Clear visual flag on any story not yet cross-verified · editors cannot miss it |
| 20 | Verification Engine | Minimum Source Threshold | Configurable minimum number of independent sources before alert fires to editorial |
| 21 | Verification Engine | Rumour vs. Confirmed Distinction | Clear separation between circulating rumour and verified confirmed story |
| 22 | Verification Engine | Official Source Priority | Statements from governments · agencies · official bodies fast-tracked as confirmed |
| 23 | Topic Classification | Politics | Government decisions · elections (outside ORA) · international relations · diplomacy |
| 24 | Topic Classification | Sports | Breaking sports news: results · injuries · transfers · disciplinary · outside scheduled matches |
| 25 | Topic Classification | Finance | Market events · company news · economic data · outside scheduled PULSE coverage |
| 26 | Topic Classification | Weather & Disasters | Severe weather alerts · natural disasters · outside ATMOS scheduled coverage |
| 27 | Topic Classification | World | International events · conflicts · humanitarian situations · global developments |
| 28 | Topic Classification | Technology | Major tech announcements · cybersecurity incidents · product launches · outages |
| 29 | Topic Classification | Crime | Major criminal events · arrests · court decisions · security incidents |
| 30 | Topic Classification | Health | Disease outbreaks · medical breakthroughs · public health emergencies |
| 31 | Topic Classification | Priority Ranking | Each topic assigned a priority weight · configurable per editorial policy |
| 32 | Topic Classification | Editor Topic Filter | Each editor sees only their assigned topics · reduces noise · increases focus |
| 33 | Story Intelligence | Story Profile | Structured summary: what happened · who is involved · where · when · why it matters |
| 34 | Story Intelligence | Related Entities | Persons · organisations · locations automatically linked to the story |
| 35 | Story Intelligence | Background Context | AI-assembled background: who are the key actors · what is the history · why this matters now |
| 36 | Story Intelligence | Historical Precedent | Has this happened before · when · what was the outcome · links to archived stories |
| 37 | Story Intelligence | Key Quotes | AI-extracted direct quotes from key figures in the story · source-attributed |
| 38 | Story Intelligence | Official Statements | Government · institution · person official statements detected and attached to story |
| 39 | Story Development Tracker | Developing Story Thread | All updates to a story collected in a single chronological thread · nothing gets lost |
| 40 | Story Development Tracker | Update History Timeline | Full timeline of how the story developed: first detection · verification · updates · resolution |
| 41 | Story Development Tracker | Story Escalation Signal | Automatic signal when a Developing story escalates to Breaking or Major Breaking |
| 42 | Story Development Tracker | Story De-Escalation | Signal when a story is confirmed to be less significant than initially detected |
| 43 | Story Development Tracker | Social Reaction Thread | How public and social media are responding · integrated into story thread as it develops |
| 44 | Story Development Tracker | Story Resolution / Closure | Editor closes a story when it is resolved · archived with full timeline |
| 45 | AI Analysis Engine | Story Impact Assessment | AI scores each story by potential reach · audience relevance · geopolitical significance |
| 46 | AI Analysis Engine | Market Impact Signal | Cross-module signal: does this breaking story have financial market implications |
| 47 | AI Analysis Engine | Political Escalation Probability | Does this story have the potential to escalate into a larger political event |
| 48 | AI Analysis Engine | Follow-Up Story Prediction | What related stories are likely to follow · helps editorial team prepare |
| 49 | AI Analysis Engine | Related Story Clustering | Groups related breaking items into one story thread automatically · reduces duplication |
| 50 | AI Content Generation | Breaking Headline | Auto-generated breaking headline · urgency-calibrated · Major Breaking vs. Developing tone |
| 51 | AI Content Generation | Flash Overlay Copy | Text for full-screen or partial overlay graphic · punchy · short · verified facts only |
| 52 | AI Content Generation | Ticker Text | Scroll ticker copy from confirmed breaking stories · character-limited · clear |
| 53 | AI Content Generation | Anchor Talking Points | What the anchor needs to say: who · what · where · why it matters · what to watch next |
| 54 | AI Content Generation | Story Summary | 3–5 sentence summary of confirmed facts · used for bulletin or handover briefing |
| 55 | AI Content Generation | Bilingual Output | All generated text in Arabic and English simultaneously · urgency tone preserved |
| 56 | Take to Air | Multi-Selection | Select multiple breaking graphics simultaneously: ticker · flash overlay · alert card |
| 57 | Take to Air | Preview Before Air | See exact graphic before taking · especially critical for breaking: verify text is correct |
| 58 | Take to Air | Breaking Confirmation Workflow | Editor explicitly confirms story before any graphic goes to air · no automated take |
| 59 | Take to Air | Reject & Revise | Editor rejects AI-generated copy with comment · producer revises · re-submits |
| 60 | Take to Air | Editorial Audit Trail | Immutable log: source detected · who verified · who approved · when taken · what aired |
| 61 | Control Room | Material Approval | Final editor sign-off · for breaking news this step is never skipped |
| 62 | Control Room | Live On-Air Status | What is currently on air: ticker · flash overlay · developing banner |
| 63 | Control Room | Multi-Screen Management | Breaking ticker on one screen · flash overlay on another · developing banner on a third |
| 64 | Control Room | Emergency Override | Instant pull of any live graphic · critical if a breaking story turns out to be false |
| 65 | Control Room | Broadcast Event Log | Complete log of everything on air: timestamp · operator · story · graphic type |

---

## Feature Count Summary

| Module | Feature Groups | Sub-Features |
|---|:---:|:---:|
| ORA — Elections | 15 | 85 |
| ARENA — Sports | 18 | 95 |
| PULSE — Finance & Markets | 18 | 84 |
| ATMOS — Weather & Natural Disasters | 15 | 78 |
| FLASH — Breaking News | 11 | 65 |
| **Total** | **77** | **407** |

---
*ID8 Media · Reson8 Platform · Sub-Feature Tables · All Modules · May 2026*
