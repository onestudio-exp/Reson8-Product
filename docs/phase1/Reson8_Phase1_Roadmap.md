# Reson8 / ORA — Phase 1 Roadmap

**Modules:** Elections + Breaking News
**Document date:** 2026-06-10
**Status:** Roadmap planning — pre-build. No paying customers yet; some prior UI exists, nothing in production.
**Source:** Synthesized from a structured Senior PM ↔ Senior BA debate.

---

## 1. Product in one line

Reson8 (ORA) turns live world events into on-air-ready content in seconds, in any language, fully reviewed by editors before broadcast. White-label B2B, sold to TV channels and broadcast networks. All modules share one intelligence layer: **Sentra AI**.

## 2. The Phase 1 bet

> **"Under 60 seconds from event to editor-approved, ready for playout."**

- The metric is measured **event trigger → editor dashboard, fully sourced and confidence-scored** (target **45s**), leaving a ~15s approval window **inside** the headline.
- This framing is deliberate: the <60s claim only survives a broadcaster's legal/editorial scrutiny if the human approval step is *inside* the clock, not excluded from it.
- Competitive frame: most regional newsrooms run an 8–12 minute manual workflow today.

## 3. Sequencing

1. **Elections ships first.** It is a scheduled, high-stakes event with a hard air date; broadcasters budget for it 6–12 months ahead. That hard date is a forcing function for both us and the buyer — it is our acquisition play.
2. **Breaking News follows** as the always-on retention/upsell module.

**Critical path to first signed broadcaster:**
`Elections demo to 3 regional networks (Aug 2026) → pilot agreement (Sept 2026) → Breaking News alongside/after → 1 paid contract (Q4 2026).`

## 4. Scope — IN vs OUT

### Elections
**IN:** live results ingest; auto seat/vote tallies; Sentra narrative for call moments (winner declared, majority crossed, upset detected); multi-language output; editor approve / edit / reject; broadcast-ready script export; constituency-level drill-down (regional differentiation).
**OUT (→ Phase 1.1):** historical trend analysis; predictive modeling; interactive voter maps; second-screen / social publishing.

### Breaking News
**IN:** inbound wire monitoring (Reuters, AP minimum); Sentra triage scoring (significance / urgency / category); auto-draft first-read bulletin in target language; editor priority queue; one-click push to teleprompter / rundown.
**OUT:** custom RSS; social-signal ingestion; archive search; multi-anchor routing; deep CMS integration beyond a single flat API export.

## 5. The three-grade delivery framework

This tiering lets us move fast without shipping a liability.

| Grade | Target | Playout handoff |
|---|---|---|
| **Demo-grade** | Aug 2026 | Structured JSON export + documented Vizrt import schema, mapped manually once. Framed honestly as "pilot integration underway." |
| **Pilot-grade** | Sept/Oct 2026 | One native playout integration — **Vizrt-first** (largest regional install base). Approved content → playout in **<10s** of sign-off. |
| **Production-grade** | Post-pilot | Full handoff. Chyron-only prospects = deal-specific fast-follow, not a Phase 1 blocker. |

## 6. Non-negotiables (settled by both PM and BA)

- **Mandatory human approval gate — permanent.** Auto-publish is off the table: unsellable *and* dangerous.
- **Election data from a contracted, authoritative feed before launch.** No scraped/uncertified sources. Demo data must carry a visible **"DEMO DATA — NOT CERTIFIED"** watermark in any recorded footage.
- **Audit log from day one.** Invisible to editors, 30-day retention. Retroactive reconstruction after a wrong-number incident is legally/reputationally untenable.
- **Sentra must surface confidence + source attribution** in the review UI before approval.
- **Kill switch, ingest quarantine, retraction alerting** adopted as pilot-grade requirements.

## 7. The lean editor workflow (BA-signed-off minimum)

Editor dashboard shows **inline**:
1. AI-generated content
2. Raw source excerpt it was derived from
3. Sentra confidence band (high / medium / low)

Actions: **one-click approve** · **one-click reject + free-text note (logged)** · **one mandatory tick** — editor confirms the data-feed timestamp.

No multi-tier review, no committee. The audit log runs in the background; the editor never experiences it as overhead.

## 8. Success metrics

| Metric | Target |
|---|---|
| Demo → pilot conversion (60 days) | ≥ 40% |
| Median time-to-editor-ready | < 60s |
| Editor adoption in pilot newsroom (30 days) | ≥ 70% of bulletins/scripts pass through ORA |
| Factual error rate (via editor correction logs) | < 2% |
| Paid contracts | ≥ 1 by Q4 2026 |

## 9. Acceptance criteria (Phase 1 gate)

1. Simulated election night at **full historical volume** — **zero** incorrect figures reach the output stage (caught by validation or human review).
2. Editor receives an AI item, reviews source, and approves/rejects within **90s** on a live Breaking News item.
3. Approved content reaches the integrated playout system within **10s** of sign-off, **no manual file transfer** (pilot-grade).
4. Deliberately injected bad data is flagged and quarantined before the editor queue in **100%** of test cases.
5. Full audit trail for any on-air item retrievable within **60s** by any authorized user.
6. Upstream data correction triggers an active-editor alert within **2 min** in **95%** of runs.

## 10. ⚠️ Open decisions — need an owner + date

| # | Open item | Decision needed |
|---|---|---|
| 1 | **Election data provider** | **Select by July 1, 2026** (hard gate — API certification timelines mean a slip here slips election night). Escalated jointly to leadership. **Owner: TBD** |
| 2 | **Playout target = Vizrt?** | PM calls Vizrt-first; validate against the **actual prospect list** before locking. **Needs real target-broadcaster names.** |
| 3 | **Wire integration (~6 wks)** | Convert from assumption → validated dependency **by week 2 of build** (signed API access + confirmed test env). If it fails, **Breaking News slips — Elections does not.** |

## 11. Top risks

- **Election data source reliability** in target markets (throttled/delayed official APIs on the one night it matters most). Fallback-source strategy required *before* go-live.
- **Playout integration** is the longest-lead technical dependency.
- **Sentra accuracy under live conditions** — must be tested at real election-night volume and real wire throughput; lab benchmarks insufficient.

---

*Next candidate steps: requirements deep-dive (user stories + acceptance criteria for Elections build), or a focused resolution round on the three open decisions once prospect/provider inputs are available.*
