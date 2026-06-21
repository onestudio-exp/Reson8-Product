# Feature: Sentra Section · Breaking News + Module Breaking Feed Layer (Spec 16 v2.0)


**Author:** PM Lead (Mo Salah) — for Mahmoud
**Date:** 2026-06-03
**Status:** v2.0 — architecture-locked; ready for implementation
**Updates:** Spec 16 v1.0 (2026-05-13) — resolves 3 open architecture decisions; adds module breaking feed layer
**Phase:** Phase 1 (ORA) + Phase 2 scaffold (ARENA · FLASH) + Phase 3 scaffold (PULSE · ATMOS)


**Builds on:** Spec 16 v1.0 (`sentra-world-breaking-news.md`), Spec 3 (`main-platform-shell.md`), Spec 10 (`user-management.md`), Spec 12 (`ora-broadcast-cockpit.md`), Spec 13 (`ora-ticker.md`), Spec 14 (`admin-others-activity-settings.md`), `ora-knowledge/pm/sentra-mvp-spec.md`.
**Supersedes:** Spec 16 v1.0 sections: *Action path*, *Module routing*, *Acceptance criteria*. All v1.0 UI anatomy, card components, and E2=B controls survive unchanged.
**Sibling of:** Spec 17 (`elections-overview-breaking-news.md`), Spec 13 (`ora-ticker.md`).


---


## Three Architecture Decisions — Resolved


Three questions were left open after the v1.0 review. This spec locks all three. No further discussion.


### D1 — Who builds the detection pipeline?

**Locked: Sentra Engine owns detection. Reson8 owns consumption.**

Reson8 does NOT build a detection pipeline. Sentra Engine (E1–E12) classifies, scores severity, and corroborates. Reson8 receives pre-classified items via the typed `sentraQuery()` adapter. The adapter shape is already correct in v1.0. Nothing changes in the adapter contract.

Consequence: BN-C1 through BN-C5 (Detection Pipeline, Severity Classification Engine, Cross-Source Verification, Source Attribution, Geographic Tagging) are **Sentra Engine responsibilities** — they are not Reson8 sprint work. They are surfaced as fields on `SentraItemSchema` (`severity`, `corroboration_state`, `corroboration_sources`, `country_iso`, `region_m49`).


### D2 — One global surface or two surfaces?

**Locked: Two surfaces, one data source, two action paths.**

| Surface | Location | Purpose | Action |
|---|---|---|---|
| **A — Sentra global map** | `Sentra → Breaking News` (top-level nav) | Intelligence monitoring — world view, all categories | Send to Ticker → Spec 13 |
| **B — Module breaking feed** | Inside each module (ORA cockpit, ARENA cockpit, etc.) | Editorial operations — module-scoped, action-ready | Editor confirms → Operator takes to air → Vizrt direct |

The world map (Surface A) is a **monitoring and discovery surface** — operators see what is happening globally and route items to the ticker. The module breaking feed (Surface B) is an **editorial operations surface** — items are already scoped to the module's domain and the operator takes them directly to air.

Both surfaces consume the same Sentra adapter. Surface B additionally receives **data-driven threshold alerts** injected by the official data feed (O31 for elections, F18 for finance, W11 for weather) — these never appear on the global map.


### D3 — What is the complete action path?

**Locked: Two routes, both require a human gate.**

**Route A — Content-driven, global surface → Ticker**
```
Sentra item detected (E7 · E11 · E12 in Sentra Engine)
  → Adapter delivers to Reson8
  → Appears on Sentra world map + module breaking feed (if matches module filter)
  → Operator clicks Send to Ticker
  → High severity: typed acknowledgment required
  → Routes to Spec 13 News or Breaking queue (draft state)
  → Senior Editor approves in Spec 13 ticker UI
  → Vizrt ticker strip / breaking overlay via Spec 12 Vizrt adapter
```

**Route B — Module breaking feed → Direct editorial → Vizrt**
```
Content-driven: Sentra item matches module filter profile
  → Appears in module breaking queue (Surface B only — NOT on global map)
  |
Data-driven: Official feed threshold crossed (O31 / F18 / W11)
  → Threshold engine injects alert directly into module breaking queue
  |
Both routes surface in the same module breaking queue panel
  → Editor confirms (breaking-confirmation workflow)
  → Linked graphic auto-staged for Operator
  → Operator takes to air via C3 (Spec 12 Vizrt adapter)
  → BN-C10 flash overlay + BN-C11 ticker strip fire to Vizrt
  → Developing story tracker activates (BN-C9)
```

Route A is for **discovery and distribution** (what is happening globally → get it into the ticker stream). Route B is for **on-air editorial operations** (what is happening in my module → confirm it and put it on screen).

---


## Goal


**v1.0 goal stands** — the world map surface is unchanged. v2.0 adds the architectural layer beneath it.

Give MENA newsroom operators:
1. A **global intelligence surface** (`Sentra → Breaking News`) — world map with severity choropleth, category filtering, and one-click route to the Spec 13 ticker. Unchanged from v1.0.
2. A **module-scoped editorial surface** (inside each module cockpit) — severity-sorted breaking queue covering both Sentra-sourced content and data-driven threshold alerts, with a direct editorial confirmation chain to Vizrt. New in v2.0.
3. A **developing story tracker** — once a breaking item is confirmed to air, a thread monitors all subsequent updates and groups them under the same story. New in v2.0.
4. A **module filter profile** system — each module registers a configuration that scopes the global Sentra stream to its domain. ORA ships in Phase 1. ARENA and FLASH ship in Phase 2. PULSE and ATMOS ship in Phase 3. New in v2.0.


---


## Scope


### New files — v2.0


```
components/main/ora/breaking-news/
├── ora-breaking-feed.tsx                           [Surface B panel — elections-scoped breaking queue; mounts inside ORA cockpit]
├── threshold-alert-card.tsx                        [data-driven alert card — distinct from sentra content card; no severity bar; data-source badge instead]
├── developing-story-panel.tsx                      [story thread view — timeline + update cards + close-story action]
├── developing-story-card.tsx                       [individual update card inside story thread]
└── module-filter-config-panel.tsx                  [Admin UI for editing module filter profile; mounts in /settings/integrations]


lib/data/sentra/
├── module-filter-profile.ts                        [ModuleFilterProfile typed store — list/get/update; tenant-scoped; one profile per module per tenant]
├── threshold-alert-store.ts                        [typed adapter for data-driven alerts; mirrors sentra-store.ts shape; injected by O31/F18/W11 engines]
├── developing-story-store.ts                       [story thread state — create/append/close; keyed by (module, story_id)]
└── breaking-action-router.ts                       [determines Route A vs Route B per item; pure function — no side effects]


app/(main)/api/tenants/[tenant]/sentra/
├── module-filter/route.ts                          [GET current profile · PUT update profile (Tenant Admin only) · POST test-filter against sample payload]
├── threshold-alerts/route.ts                       [GET active threshold alerts for module · POST inject (internal — called by threshold engines O31/F18/W11)]
└── developing-stories/
    ├── route.ts                                    [GET active story threads for module · POST create thread]
    └── [storyId]/
        ├── route.ts                                [GET story thread detail]
        ├── updates/route.ts                        [POST append update to thread]
        └── close/route.ts                          [POST close thread (Editor only)]


app/(main)/[locale]/[tenant]/(shell)/ora/cockpit/
└── breaking-news/                                  [new route group; server-renders OraBreakingFeed panel; lazily loaded below the cockpit main view]
    └── page.tsx


tests/unit/
├── module-filter-profile.test.ts                   [filter matching logic — category · entity · location · keyword inclusion/exclusion]
├── threshold-alert-store.test.ts                   [inject · GET · expiry · deduplication]
├── developing-story-store.test.ts                  [create · append · close · re-open guard]
└── breaking-action-router.test.ts                  [Route A vs Route B decision logic per item source]
```


### Modified files — v2.0


```
lib/data/sentra/schema.ts                           [MODIFY — add ThresholdAlertSchema · DevelopingStorySchema · ModuleFilterProfileSchema · BreakingActionRouteSchema · extend SentraItemSchema with action_route field]
lib/data/sentra/sentra-store.ts                     [MODIFY — expose listByModuleFilter(profileId) method; existing methods unchanged]
lib/data/sentra/world-aggregation.ts                [MODIFY — add matchesModuleFilter(item, profile) boolean export; used by Surface B panel]
lib/auth/role-permissions.ts                        [MODIFY — add sentra.viewModuleFeed · sentra.confirmBreaking · sentra.manageFilterProfile actions]
lib/data/activity-log/schema.ts                     [MODIFY — add 4 new breaking-news actions: breaking_confirmed · breaking_dismissed · threshold_alert_acknowledged · developing_story_closed]
components/main/ora/cockpit/ora-cockpit.tsx         [MODIFY — mount <OraBreakingFeed> panel below main results queue; lazy-load; collapsed by default; expands on new item]
messages/{en,ar}.json                               [MODIFY — add sentra.moduleFeed.* · sentra.threshold.* · sentra.story.* · sentra.filter.* · activityLog.action.breaking_* keys]
```


### Files that do NOT change — v2.0


- All Spec 16 v1.0 components (`world-map.tsx`, `breaking-news-card.tsx`, `country-detail-dialog.tsx`, `send-to-ticker-dialog.tsx`, all others) — Surface A anatomy is unchanged.
- Spec 13 ticker stores — Route A still calls `createNews()` / `createBreaking()` directly; no schema change.
- Spec 12 Vizrt adapter — Route B calls `takeToAir()` via the existing typed adapter; no change.
- Spec 14 Activity Log page — schema extends; page renders new entries generically.


---


## Updated Sidebar Nav


```
Elections                      ← existing
ORA                            ← existing
├─ Cockpit                     ← Spec 12 (now contains embedded Breaking Feed panel)
└─ Ticker                      ← Spec 13
Sentra                         ← top-level parent (v1.0 unchanged)
└─ Breaking News               ← /sentra/breaking-news (Surface A — global map)
Admin                          ← existing
Others                         ← existing
```

The module breaking feed (Surface B) does NOT appear in the sidebar. It is an embedded panel inside the ORA Cockpit — below the main results queue, collapsed by default, expanding with a count badge when new items arrive. The separation is deliberate: the Cockpit is where operators take action; the Sentra section is where operators monitor.


---


## Updated Permission Map


| Action | Tenant Admin | EP | Senior Editor | Producer | Anchor | Graphics Op |
|---|---|---|---|---|---|---|
| `sentra.view` (Surface A) | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `sentra.sendToTicker` (Surface A) | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `sentra.toggleOnAirAttribution` | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| `sentra.viewModuleFeed` (Surface B) | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `sentra.confirmBreaking` (Surface B) | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ |
| `sentra.manageFilterProfile` | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |

`sentra.confirmBreaking` is restricted to EP and Senior Editor — the same roles that approve Spec 13 ticker items. Producer can view the module feed but cannot confirm. Graphics Op has no access to either surface.

`sentra.manageFilterProfile` is Tenant Admin only. Filter profile changes are audit-logged per C21.


---


## Updated Data Model


### `lib/data/sentra/schema.ts` — additions


```typescript
import { z } from "zod";
// SentraItemSchema, SeveritySchema, SentraCategorySchema, CorroborationStateSchema
// — all unchanged from v1.0; only extensions below.


// ─── v2.0 additions ───────────────────────────────────────────────────────────


export const BreakingActionRouteSchema = z.enum([
  "ticker",        // Route A — send to Spec 13 ticker via Surface A or Surface B
  "direct_air",    // Route B — Editor confirms → Operator takes to air via Spec 12
]);


// Extend SentraItemSchema with action_route hint
// (populated by breaking-action-router.ts based on item source + module context)
export const SentraItemWithRouteSchema = SentraItemSchema.extend({
  action_route: BreakingActionRouteSchema.default("ticker"),
  module_context: z.enum(["ora", "arena", "pulse", "atmos", "flash", "global"]).default("global"),
});


// ─── Threshold Alert (data-driven — O31 / F18 / W11) ─────────────────────────


export const ThresholdAlertTypeSchema = z.enum([
  "ora_majority_reached",       // O31 — party reaches 50%+1 seats
  "ora_seat_milestone",         // O31 — configured seat count reached
  "ora_precincts_reported",     // O31 — % precincts milestone (50 / 75 / 100%)
  "ora_results_final",          // O31 — 100% results declared final
  "pulse_price_threshold",      // F18 — instrument crosses configured price level
  "pulse_circuit_breaker",      // F18 — exchange circuit breaker triggered
  "pulse_market_open_close",    // F18 — market open or close event
  "atmos_severe_warning",       // W11 — national met authority issues severe alert
  "atmos_extreme_event",        // W11 — extreme weather event (red alert tier)
]);


export const ThresholdAlertSeverityMapSchema = z.record(
  ThresholdAlertTypeSchema,
  SeveritySchema
);


// Default severity per alert type — configurable by Admin
export const defaultThresholdSeverityMap: z.infer<typeof ThresholdAlertSeverityMapSchema> = {
  ora_majority_reached:   "high",
  ora_seat_milestone:     "medium",
  ora_precincts_reported: "low",
  ora_results_final:      "medium",
  pulse_price_threshold:  "medium",
  pulse_circuit_breaker:  "high",
  pulse_market_open_close: "low",
  atmos_severe_warning:   "high",
  atmos_extreme_event:    "high",
};


export const ThresholdAlertSchema = z.object({
  id: z.string().uuid(),
  alert_type: ThresholdAlertTypeSchema,
  module: z.enum(["ora", "pulse", "atmos"]),
  severity: SeveritySchema,                           // resolved from defaultThresholdSeverityMap unless overridden
  headline_en: z.string().min(1).max(280),
  headline_ar: z.string().min(1).max(280),
  triggered_value: z.string(),                        // human-readable: "Party X — 151 seats (majority: 150)"
  triggered_at: z.string().datetime(),
  acknowledged_at: z.string().datetime().nullable().default(null),
  acknowledged_by: z.string().nullable().default(null),
  linked_graphic_type: z.string().nullable().default(null),  // e.g., "seat_tally" — auto-staged on acknowledge
  action_route: z.literal("direct_air"),              // threshold alerts ALWAYS go Route B — never the ticker
  source_type: z.literal("data_feed"),                // distinguishes from Sentra content items
  expiry_at: z.string().datetime(),                   // auto-expires if not acknowledged
});


// ─── Developing Story Thread ──────────────────────────────────────────────────


export const DevelopingStoryStatusSchema = z.enum([
  "active",       // story is live — tracking updates
  "closed",       // Editor explicitly closed the thread
  "auto_expired", // no updates in 12 hours — auto-closed
]);


export const DevelopingStoryUpdateSchema = z.object({
  id: z.string().uuid(),
  story_id: z.string().uuid(),
  update_type: z.enum(["new_information", "correction", "escalation", "final"]),
  headline_en: z.string().min(1).max(280),
  headline_ar: z.string().min(1).max(280),
  body_en: z.string().max(2000),
  body_ar: z.string().max(2000),
  source_type: z.enum(["sentra", "data_feed"]),
  sentra_item_id: z.string().uuid().optional(),       // reference to the SentraItem that triggered this update
  threshold_alert_id: z.string().uuid().optional(),   // reference to ThresholdAlert if update is data-driven
  detected_at: z.string().datetime(),
  taken_to_air_at: z.string().datetime().nullable().default(null),
  taken_to_air_by: z.string().nullable().default(null),
});


export const DevelopingStorySchema = z.object({
  id: z.string().uuid(),
  module: z.enum(["ora", "arena", "pulse", "atmos", "flash"]),
  status: DevelopingStoryStatusSchema,
  original_item_id: z.string().uuid(),                // the first confirmed item that created this thread
  original_item_type: z.enum(["sentra", "data_feed"]),
  headline_en: z.string(),                            // carried from original item; never overwritten
  headline_ar: z.string(),
  created_at: z.string().datetime(),
  last_updated_at: z.string().datetime(),
  closed_at: z.string().datetime().nullable().default(null),
  closed_by: z.string().nullable().default(null),
  updates: z.array(DevelopingStoryUpdateSchema).default([]),
});


// ─── Module Filter Profile ────────────────────────────────────────────────────


export const ModuleFilterProfileSchema = z.object({
  id: z.string().uuid(),
  module: z.enum(["ora", "arena", "pulse", "atmos", "flash"]),
  tenant_id: z.string(),
  topic_categories: z.array(SentraCategorySchema),    // which Sentra categories to include
  entity_types: z.array(z.enum([
    "candidate", "party", "constituency",             // ORA
    "player", "team", "competition",                  // ARENA
    "company", "index", "exchange",                   // PULSE
    "met_authority", "location",                      // ATMOS
    "all",                                            // FLASH
  ])),
  entity_ids: z.array(z.string()).default([]),        // specific IDs — auto-populated from module databases
  country_scope: z.array(z.string()).default([]),     // ISO 3166-1 alpha-2; empty = global
  keyword_inclusions: z.array(z.string()).default([]),
  keyword_exclusions: z.array(z.string()).default([]),
  updated_at: z.string().datetime(),
  updated_by: z.string(),
});


// ORA default filter profile — auto-configured from O1 · O2 · O3
export const ORA_DEFAULT_FILTER: Partial<z.infer<typeof ModuleFilterProfileSchema>> = {
  module: "ora",
  topic_categories: ["elections", "political"],
  entity_types: ["candidate", "party", "constituency"],
  // entity_ids auto-populated from Candidate Database (O2) + Party Database (O3)
  // country_scope auto-populated from Election Configuration (O1)
  keyword_inclusions: [
    "election", "vote", "ballot", "polling", "constituency",
    "concession", "majority", "coalition", "recount", "electoral commission",
    "انتخاب", "تصويت", "اقتراع", "أغلبية", "ائتلاف",
  ],
};
```


### `lib/data/sentra/breaking-action-router.ts`


```typescript
import type { SentraItemWithRoute, ThresholdAlert } from "./schema";


/**
 * Determines whether a breaking item routes to the ticker (Route A)
 * or direct editorial → air (Route B).
 *
 * Rules (in priority order):
 * 1. Threshold alerts → ALWAYS Route B (data_feed source, confirmed data)
 * 2. SENTRA-ONLY corroboration + High severity → Route A (ticker gate adds second human review)
 * 3. Corroborated High severity + matches module filter → Route B
 * 4. All other items → Route A (default — ticker adds the Senior Editor gate)
 */
export function resolveActionRoute(
  item: SentraItemWithRoute | ThresholdAlert,
  moduleContext: string
): "ticker" | "direct_air" {
  if ("source_type" in item && item.source_type === "data_feed") return "direct_air";
  if ("corroboration_state" in item) {
    if (item.corroboration_state === "sentra_only" && item.severity === "high") return "ticker";
    if (item.corroboration_state === "corroborated" && item.severity === "high") return "direct_air";
  }
  return "ticker";
}
```


---


## Surface A — Global Sentra World Map (v1.0 — Unchanged)


Everything in Spec 16 v1.0 is authoritative and unchanged. The world map anatomy, card components, hover card, country detail dialog, single-item detail dialog, send-to-ticker dialog, radar-ping markers, category filter pills, severity choropleth, E2=B compensating controls, bilingual/RTL rules, and all acceptance criteria from v1.0 stand as written.

**One addendum only:** The `<SendToTickerDialog>` now receives an `actionRoute` prop from `breaking-action-router.ts`. When `actionRoute === "direct_air"`, the dialog body is replaced by the Breaking Confirmation Workflow (see Surface B below). This allows the existing dialog entry point (the "Send to Ticker" button on the card) to route correctly for corroborated items — the user sees a different confirmation flow, not a different button.


---


## Surface B — Module Breaking Feed


### What it is

A **breaking news panel embedded inside the module cockpit** (ORA Cockpit in Phase 1). Not a page — a panel. It lives below the main module queue in the ORA Cockpit. It is collapsed by default and expands with an animated count badge when new items arrive.

The panel shows two types of items in a single severity-sorted list:
1. **Sentra items** that match the module's filter profile (content-driven — social/news detection)
2. **Threshold alerts** for that module (data-driven — official feed threshold crossings)

Items are not separated into two sub-lists. They share the same severity sort. The card anatomy distinguishes them visually (Sentra card = leading-edge severity bar + attribution meta; Threshold card = data-source badge + no leading-edge bar — see card anatomy below).

### Panel anatomy


```
┌─ Breaking News  ● 3                      [▼ collapse]  ┐
│  [● High ×1] [Med ×1] [Low ×1]                         │
│  ─────────────────────────────────────────────────────  │
│  ● DATA  · Elections · EG · 2m ago              [✓] [›]│
│  Party X reaches majority — 151 of 300 seats           │  ← Threshold alert card
│  Official feed · 151/300 seats · Linked: Seat Tally    │
│  ─────────────────────────────────────────────────────  │
│  ● HIGH  · Elections · EG · 4m ago              [✓] [›]│
│  Cabinet minister resigns amid election dispute        │  ← Sentra content card
│  Sentra · Corroborated · by 3 sources                  │
│  ─────────────────────────────────────────────────────  │
│  ○ MED  · Political · EG · 11m ago              [✓] [›]│
│  Opposition leader calls for recount in three...       │  ← Sentra content card
│  Sentra · Pending · by 1 source                        │
└─────────────────────────────────────────────────────────┘
```


**Panel header** (36px, sticky at top of panel):
- Label `Breaking News` (`13/600`) + animated count badge (red pill, count of items in queue that are not yet acknowledged/confirmed, updates in real time).
- Multi-select severity filter chips (same pattern as v1.0 sidebar — multi-select, dark active state, NOT brand-blue).
- Collapse / expand chevron.

**Panel body** — flat list, severity-sorted (High first). No country grouping — unlike the global map sidebar, module breaking feeds are already scoped to a geography; grouping adds no value. Separator hairlines between cards.

**Empty state**: `NoBreakingItems` icon (Lucide `ShieldCheck`, 24px, neutral-400) + `All clear` heading + `No active breaking items for this election.` body.

**Loading state**: 3 placeholder cards (skeleton lines — premium tier per DESIGN-SYSTEM §8.9; v2.0 ships skeletons, not the text-caption placeholder from v1.0).


### Breaking news card anatomy — module feed variant


Two card variants share the same three-line anatomy but differ in the leading-edge treatment and meta content.

**Sentra card (content-driven)** — same as v1.0 card, no changes:
```
[● High · 🗳 Elections · EG · 4m ago]                   [✓] [›]
Cabinet minister resigns amid election dispute
Sentra · Corroborated · by 3 sources
```
Leading-edge: 3px severity-color bar.

**Threshold alert card (data-driven)**:
```
[DATA · 🗳 Elections · EG · 2m ago]                     [✓] [›]
Party X reaches majority — 151 of 300 seats
Official feed · 151/300 seats · Linked: Seat Tally ▸
```
Leading-edge: **no severity bar** — replaced by a 3px `--ora-neutral-400` border (neutral, not severity-colored, because data-driven alerts have already been validated by O14; they don't carry the uncertainty that makes severity coloring important).

Line 1 meta: `DATA` badge (uppercase, 11px, neutral-600, filled `--ora-neutral-100` bg, 2px rounded border) in place of the severity dot + tier word. Signals "official data source" at a glance.

Line 3: `Official feed · {triggered_value} · Linked: {linked_graphic_type} ▸` — the linked graphic is shown inline as a text link that opens the linked graphic's preview pane. No Sentra attribution line (this item is not from Sentra).

**Action buttons** (trailing edge, both card types):
- `[✓]` — confirm action (opens `<BreakingConfirmationWorkflow>`). Visible to EP + Senior Editor only (matches `sentra.confirmBreaking` permission). Hidden for other roles.
- `[›]` — detail chevron (opens `<BreakingNewsDetailDialog>` for Sentra cards; opens `<ThresholdAlertDetailDialog>` for data cards).

**Hover state** (same as v1.0): bg-neutral-50 + border-neutral-300 + chevron fade-in.
**Retracted** (Sentra cards only): strike-through + danger-50 tint + inline retraction banner.
**Expired threshold alerts**: opacity 50% + `EXPIRED` uppercase label + confirm action hidden.


### Breaking confirmation workflow (Route B gate)


Triggered when EP or Senior Editor clicks `[✓]` on any card in the module breaking feed. This is the Route B gate — the human decision that sends an item directly to the Operator's take-to-air queue.

Two confirmation flows depending on item type:


**Sentra item confirmation dialog** (max-w-2xl):
```
┌─────────────────────────────────────────────────────┐
│  ● HIGH   CORROBORATED · by 3 sources               │
│                                                      │
│  Cabinet minister resigns amid election dispute      │  ← H2 22/600
│                                                      │
│  Source: Sentra AI · by Reuters + AP + AFP           │
│  Country: EG · Region: Northern Africa               │
│  Detected: 4 minutes ago                             │
│                                                      │
│  ─── Link graphic to air ────────────────────────   │
│  [○ No linked graphic]                               │
│  [○ Breaking overlay ▸]                              │  ← selects BN-C10 flash overlay
│  [○ Breaking ticker entry ▸]                         │  ← selects BN-C11 ticker
│  [○ Both ▸]                                          │
│                                                      │
│  HIGH severity — type to confirm:                    │
│  "I have reviewed this source"                       │  ← required for High (same as v1.0)
│  [ input field ]                                     │
│                                                      │
│              [Cancel]    [Confirm & Send to Operator]│
└─────────────────────────────────────────────────────┘
```
On confirm: item enters Operator's take-to-air queue. Editor receives a queue-badge update. `breaking_confirmed` ActivityLog entry written. Developing Story Tracker thread created (BN-C9).


**Threshold alert confirmation dialog** (max-w-2xl):
```
┌─────────────────────────────────────────────────────┐
│  DATA ALERT   Elections · EG                        │
│                                                      │
│  Party X reaches majority — 151 of 300 seats        │  ← H2 22/600
│                                                      │
│  Source: Official results feed                       │
│  Triggered: 151 seats (threshold: 150 = majority)   │
│  Results validated: ✓ (O14 passed)                  │
│                                                      │
│  ─── Linked graphic ─────────────────────────────   │
│  Seat Tally graphic auto-staged  [Preview ▸]         │  ← linked_graphic_type auto-resolved
│                                                      │
│  ─── Additional graphics ───────────────────────    │
│  [○ Breaking overlay also]                           │
│  [○ Breaking overlay only]                           │
│                                                      │
│              [Dismiss]   [Confirm & Send to Operator]│
└─────────────────────────────────────────────────────┘
```
No typed acknowledgment for threshold alerts — O14 (results validation layer) has already passed. The data is confirmed. The human gate here is the editorial decision to take it to air, not source verification.

On confirm: linked graphic + selected overlay both enter Operator queue. `breaking_confirmed` ActivityLog entry includes `source_type: data_feed` + `threshold_alert_id` + `triggered_value`. Developing Story Tracker thread created.

On dismiss: `breaking_dismissed` ActivityLog entry. Item opacity 50% in panel + `DISMISSED` label. Dismissed items stay visible for 2 hours (audit visibility) then auto-archive.


### Developing Story Tracker (BN-C9)


Activates after any item is confirmed to air via the breaking confirmation workflow (either Sentra or threshold). Creates a story thread that monitors for related updates.

**Tracker panel** — opens as a right-side drawer within the ORA Cockpit context (not a new page). Width 480px. Triggered by clicking `[Story thread ▸]` badge that appears on the confirmed card after confirmation.


```
┌─ Story Thread ──────────────────── [● Active] [Close] ┐
│                                                        │
│  Cabinet minister resigns amid election dispute        │  ← H2 — original story headline
│  Confirmed 14:32 UTC · EP (Rania) · Breaking overlay  │
│                                                        │
│  ● Timeline ────────────────────────────────────────  │
│                                                        │
│  14:32  ● Confirmed to air (Rania · EP)               │
│  14:38  Update — Sentra                               │
│         Minister names successor; PM accepts           │  ← Update card (compact)
│         Corroborated · by Reuters                [✓]  │
│  14:45  Update — Official feed                        │
│         Seat count revised: Party X now 152 seats      │
│         Data-driven · O31 threshold update       [✓]  │
│                                                        │
│  ── Close story ─────────────────────────────────────  │
│  [ Close story thread ]  ← Editor/EP only             │
└────────────────────────────────────────────────────────┘
```

**Thread auto-detection:** Every new Sentra item or threshold alert checked against active story threads. Matching criteria (AND logic):
1. Same module
2. Same country (`country_iso` match)
3. At least one matching entity ID (from the module's entity set)
4. Within 24 hours of original story creation

Matched items appear as updates in the timeline. Editor can confirm update items to air via `[✓]` — same breaking confirmation workflow, but pre-populated with "Update" graphic type.

**Thread lifecycle:** Active → Editor closes explicitly → status `closed`. Auto-expires to `auto_expired` after 12 hours of no new updates. Closed threads viewable in `Activity → Breaking News History` (read-only; last 30 days).


---


## Module Filter Profile — Admin Configuration


Accessible at `Settings → Integrations → Breaking News Filter` (Tenant Admin only, `sentra.manageFilterProfile`).

ORA's filter profile is **auto-configured** from:
- `country_scope` ← election country from O1 (Election Configuration Wizard)
- `entity_ids` ← all candidate IDs from O2 + all party IDs from O3 (auto-sync; updates when database changes)
- `topic_categories` ← `["elections", "political"]` (ORA default, editable)
- `keyword_inclusions` ← ORA defaults (see schema above, editable)

Admin can extend or restrict any field. Auto-populated fields show a `[Auto]` badge — they can be overridden but a warning shows when the auto-source changes (e.g., new candidate added to O2) and the manual override may be stale.


```
┌─ ORA · Breaking News Filter Profile ──────────────────────────────────────┐
│                                                                             │
│  Categories          [✓ Elections] [✓ Political] [ Geopolitical] [ Sports]│
│  Entity scope        Auto · 24 candidates · 8 parties  [+ Add manually]   │
│  Country scope       Auto · EG  [+ Add country]                            │
│  Keywords include    election, vote, ballot ... [+ Add]                    │
│  Keywords exclude    [ ] (none)  [+ Add]                                   │
│                                                                             │
│  [ Test filter against sample ]  → opens test panel with 10 sample items   │
│  Last updated: never · Changes are audit-logged.                            │
│                                                                             │
│                              [Cancel]  [Save filter profile]               │
└─────────────────────────────────────────────────────────────────────────────┘
```

Filter profile changes take effect within 60 seconds. No restart required. ActivityLog entry `sentra_filter_profile_updated` written on every save with before/after diff.


---


## Phase 2 & Phase 3 Module Filter Profiles (Scaffold — Not Shipped in Phase 1)


The schema, store, and API routes for module filter profiles support all 5 modules from Phase 1. The ARENA, FLASH, PULSE, and ATMOS profiles are not auto-configured yet — they have no source databases in Phase 1. They ship as empty profiles in Phase 1 and are configured when each module launches.


**ARENA profile defaults (Phase 2):**

| Field | Value |
|---|---|
| topic_categories | `["sports"]` |
| entity_types | `["player", "team", "competition"]` |
| entity_ids | Auto from Team DB (A2) + Player DB (A3) |
| country_scope | Global (empty = no restriction) |
| keyword_inclusions | injury, transfer, lineup, postponed, VAR, red card |


**FLASH profile defaults (Phase 2):**

| Field | Value |
|---|---|
| topic_categories | `["geopolitical", "sports", "weather", "elections", "political"]` — all |
| entity_types | `["all"]` |
| entity_ids | Not set — global scope |
| country_scope | Global |
| keyword_inclusions | Admin-configured per deployment |

FLASH is the only module with `entity_types: ["all"]` — it is intentionally unscoped. Every breaking item that passes severity classification reaches the FLASH feed.


**PULSE profile defaults (Phase 3):**

| Field | Value |
|---|---|
| topic_categories | `["geopolitical", "political"]` (financial news spans categories) |
| entity_types | `["company", "index", "exchange"]` |
| entity_ids | Auto from Instrument Database (F2) |
| country_scope | Configured market regions from F1 |
| keyword_inclusions | earnings, rate decision, GDP, inflation, merger, bankruptcy, IPO, sanctions, central bank |


**ATMOS profile defaults (Phase 3):**

| Field | Value |
|---|---|
| topic_categories | `["weather"]` |
| entity_types | `["met_authority", "location"]` |
| entity_ids | Auto from Coverage Area Configuration (W1) met authority IDs |
| country_scope | Configured coverage area from W1 |
| keyword_inclusions | storm warning, extreme heat, flood, earthquake, tsunami, evacuation |


---


## Threshold Alert Engine — Per Module (Route B only)


Each module's threshold engine injects directly into the module breaking queue via `POST /api/tenants/[tenant]/sentra/threshold-alerts`. The injection is an internal server-to-server call — not user-initiated.


| Module | Threshold engine | Alert types | Severity map |
|---|---|---|---|
| ORA | O31 (Results Threshold Alert) | majority_reached · seat_milestone · precincts_reported · results_final | High / Medium / Low (see schema) |
| PULSE | F18 (Market Alert) | price_threshold · circuit_breaker · market_open_close | High / Medium / Low |
| ATMOS | W11 (Severe Weather Alert) | severe_warning · extreme_event | High / High |

Threshold alerts are ALWAYS Route B (`action_route: "direct_air"`). They never appear on the global Sentra world map (Surface A). They are data-verified items that belong in the editorial operations surface, not the intelligence monitoring surface.

Alert expiry: `ora_majority_reached` → no expiry (this is a permanent electoral fact). All other alert types → 4 hours. Expired, unacknowledged alerts are archived with `auto_expired` status and generate an Admin notification.


---


## Updated E2=B Compensating Controls (5 → 6)


| # | Control | Where | Changed? |
|---|---|---|---|
| 1 | Sentra attribution on every Surface A card | `breaking-news-card.tsx` Line 3 | Unchanged |
| 2 | Typed acknowledgment for High-severity Send-to-Ticker | `send-to-ticker-dialog.tsx` | Unchanged |
| 3 | `sentra_sourced: true` audit-log flag on every ticker submission | ActivityLog | Unchanged |
| 4 | Sonner toast reads `Sent to ticker · Source: Sentra AI` | `send-to-ticker-dialog.tsx` | Unchanged |
| 5 | Tenant Admin on-air attribution toggle | `sentra-attribution-toggle.tsx` | Unchanged |
| **6** | **Threshold alert cards do NOT carry Sentra attribution** — they carry `Source: Official feed · O14 validated`. Operators see an explicit distinction between AI-sourced and data-sourced breaking items at a glance. | `threshold-alert-card.tsx` Line 3 | **New in v2.0** |

Control 6 is an editorial-defense addition: operators should never be uncertain about whether a breaking item came from Sentra AI or from a validated official data feed. The card anatomy makes this unambiguous.


---


## Bilingual + RTL — Additions for v2.0


All v1.0 bilingual rules apply unchanged. Additions:

- Threshold alert headlines are pre-populated bilingually by the threshold engine at injection time — not generated by Sentra. Template: `"[Party X] reaches majority — [N] of [M] seats"` resolved from O1/O2/O3 data. Arabic template uses Right-to-left number formatting and Arabic-Indic numerals for seat counts.
- Breaking confirmation typed phrase — unchanged (Route A). Route B (threshold) has no typed phrase — the phrase was designed for source uncertainty; data-driven items have no source uncertainty.
- Developing story tracker timeline — all timestamps shown in UTC with `dir="ltr"` (identifiers); all headline/body content is locale-resolved.
- Module filter profile admin UI — all labels bilingual; keyword inclusions and exclusions are free-text and are NOT translated (they are matching patterns, not display strings).

New i18n key namespaces: `sentra.moduleFeed.*` · `sentra.threshold.*` · `sentra.story.*` · `sentra.confirmation.*` · `sentra.filter.*`.


---


## Acceptance Criteria — v2.0 Additions


All v1.0 acceptance criteria are unchanged and still required. The following are additions only.


### Architecture


- [ ] `breaking-action-router.ts` returns `"direct_air"` for: (a) all threshold alerts, (b) corroborated High-severity Sentra items. Returns `"ticker"` for: (a) SENTRA-ONLY High items, (b) all Medium/Low items.
- [ ] Route A and Route B are never mixed for the same item — an item has exactly one resolved `action_route`.


### Module Filter Profile


- [ ] ORA filter profile is auto-configured from O1 (country) + O2 (candidate entity IDs) + O3 (party entity IDs) on first module load.
- [ ] Filter changes take effect within 60 seconds — verified by submitting a test item that matches the new profile, confirming it appears in the breaking feed within 60 seconds.
- [ ] A test item that does NOT match the active ORA filter does NOT appear in the ORA module breaking feed — even if it appears on the global Sentra world map.
- [ ] Filter profile update writes ActivityLog entry with before/after diff. Diff shows both old and new values, not just "profile changed."
- [ ] ARENA, FLASH, PULSE, ATMOS profiles exist in the schema and store as empty profiles. They produce no breaking feed items (empty state correctly rendered) until configured in their respective phases.


### Surface B — Module Breaking Feed Panel


- [ ] Panel mounts inside ORA Cockpit below the main results queue. Default state: collapsed. Expands automatically when first breaking item arrives.
- [ ] Count badge on panel header is real-time (WebSocket push) — updates within 2 seconds of a new item entering the feed.
- [ ] Sentra cards and threshold alert cards are visually distinct: Sentra = 3px severity-color leading-edge bar; threshold = 3px neutral-400 border + `DATA` badge in meta line. No severity bar on threshold cards.
- [ ] Severity filter chips filter the module feed list. They do NOT affect the global world map (independent channels — same as v1.0 sidebar severity chips).
- [ ] `sentra.confirmBreaking` permission gate enforced: `[✓]` button is absent from cards rendered for Producer and Anchor roles. The card body and detail chevron remain accessible.


### Breaking Confirmation Workflow


- [ ] Sentra item confirmation dialog shows: severity · corroboration state · source attribution · country/region · detected timestamp · graphic type selector · typed phrase field (High severity only).
- [ ] Threshold alert confirmation dialog shows: `DATA ALERT` label · triggered value · O14 validation status · auto-resolved linked graphic with preview link · additional graphic selector. No typed phrase.
- [ ] On confirm: item enters Operator queue within 3 seconds. Queue badge updates. `breaking_confirmed` ActivityLog written with full context.
- [ ] On dismiss: `breaking_dismissed` ActivityLog written. Item shows `DISMISSED` label at 50% opacity. Stays visible for 2 hours then auto-archives.
- [ ] Linked graphic (for threshold alerts) is auto-staged in Spec 12 Operator queue alongside the breaking overlay selection. Operator sees both as a grouped take-to-air action.


### Developing Story Tracker


- [ ] Thread created automatically on every `breaking_confirmed` action (both Sentra and threshold sources).
- [ ] `[Story thread ▸]` badge appears on the confirmed card in the module breaking feed within 3 seconds of confirmation.
- [ ] Auto-detection of updates: a new Sentra item matching (same module + same country + overlapping entity IDs + within 24h) automatically appears as an update in the thread — no Editor action required to surface it.
- [ ] Update items in the thread are confirmable via `[✓]` using the same confirmation workflow. Confirmed updates enter Operator queue individually.
- [ ] Thread closes when Editor clicks `[Close story thread]`. Closing creates `developing_story_closed` ActivityLog entry.
- [ ] Thread auto-expires to `auto_expired` after 12 hours with no new updates. Auto-expiry does NOT close confirmed updates that have not yet been taken to air.
- [ ] Closed and auto-expired threads are readable in Activity → Breaking News History for 30 days. Read-only.


### Threshold Alert Engine


- [ ] O31 `ora_majority_reached` alert fires within 5 seconds of the seat count crossing the majority threshold in the results feed.
- [ ] Alert headline is bilingual and uses O3 party name in both Arabic and English.
- [ ] Alert appears in the ORA module breaking feed (Surface B) only — NOT on the Sentra world map (Surface A).
- [ ] Alert `expiry_at` is not set for `ora_majority_reached` (permanent). All other alert types expire in 4 hours.
- [ ] Expired unacknowledged alerts generate an Admin notification within 30 seconds of expiry.
- [ ] `POST /api/tenants/[tenant]/sentra/threshold-alerts` is an internal-only endpoint (bearer token required; not accessible via browser session). Verified by attempting a browser-origin POST — returns 401.


### Bilingual


- [ ] Threshold alert headlines in Arabic use Arabic-Indic numerals for all numerical values (seat counts, percentages). English headlines use Western-Arabic numerals.
- [ ] Breaking confirmation dialog — typed phrase field renders the Arabic prompt when `locale === "ar"`. Match logic is locale-aware (AR phrase accepted only in AR locale).
- [ ] EN + AR have full key parity for all v2.0 namespaces.


### Gates


- [ ] `pnpm typecheck` exits 0 with all v2.0 schema additions and component additions.
- [ ] `pnpm lint` exits 0.
- [ ] `pnpm test` passes 100% including new test files: `module-filter-profile.test.ts` · `threshold-alert-store.test.ts` · `developing-story-store.test.ts` · `breaking-action-router.test.ts`.
- [ ] `pnpm build` succeeds with all new routes registered.


---


## Out of Scope (Carry-forwards — v2.0)


- **Spec 16.1 — Sentiment + Social sub-tabs.** Unchanged from v1.0.
- **Spec 16.5 — UAE per-jurisdiction default-attribution-ON override.** Unchanged from v1.0.
- **Spec 16.7 — Two-person co-confirm on High-severity send.** Unchanged from v1.0.
- **Spec 16.8 — ARENA filter profile + module breaking feed panel.** Schema and API scaffolded; UI deferred to Phase 2 Sprint 5.
- **Spec 16.9 — FLASH module breaking feed panel.** Deferred to Phase 2 Sprint 6.
- **Spec 16.10 — PULSE + ATMOS filter profiles + panels.** Deferred to Phase 3 Sprint 9.
- **Spec 16.11 — Rotating Senior Editor typed-confirmation phrase (every 30 min).** Open question 2 from v1.0 — unchanged; build if founder decides.
- **Spec 16.12 — Critical-tier alert rate cap at EP view ≤3/min.** Open question 3 from v1.0 — unchanged.
- **Spec 16.13 — MCR queue chip + soft-block primitive.** Open question 4 from v1.0 — push to Spec 13.2.
- **Spec 16.14 — Developing Story Tracker for Surface A (global map).** The tracker is module-scoped (Surface B) in v2.0. A future version could surface a global story thread view on the world map; deferred.


---


## Open Questions — v2.0


Questions 1–6 from v1.0 carry forward unchanged. New questions:


| # | Question | Owner | Status |
|---|---|---|---|
| 7 | Threshold alert for `ora_majority_reached` has no expiry (it's a permanent electoral fact). Should the Developing Story Tracker thread for a majority alert also have no expiry — staying active until the Editor explicitly closes it? Or should a 24h auto-expiry apply regardless? | Mahmoud | **Open** |
| 8 | When the same breaking item matches multiple modules' filter profiles (e.g., a political story that is both `elections` and `political` and appears in both ORA and FLASH feeds) — should confirmation in ORA automatically close the same item in FLASH? Or can both feeds confirm independently? Cross-module deduplication may cause operator confusion if FLASH gets a "closed by ORA" item in their feed. | Mahmoud | **Open** |
| 9 | Developing Story Tracker auto-groups updates using (module + country + overlapping entity IDs). A story about Candidate A could share entity IDs with a completely unrelated story that mentions Candidate A tangentially. Is the current matching rule tight enough, or should we require the original item's `sentra_id` to appear in the update's `related_ids` field (a Sentra Engine-level grouping signal)? Requires confirming whether Sentra Engine exposes `related_ids` in the adapter. | Mahmoud + Sentra team | **Open** |
| 10 | Route B confirmed items enter the Operator queue via Spec 12. Spec 12 currently shows a single queue. Should breaking-confirmed items appear in a visually distinct section ("Breaking — confirmed") at the top of the Operator queue, or mixed with regular staged graphics? If mixed, an Operator could miss a time-critical breaking item buried under scheduled results graphics. | Mahmoud | **Open** |


---


## Iteration History


- **v1.0 (2026-05-13):** Initial spec. World map surface, category filter pills, card anatomy, send-to-ticker dialog, E2=B compensating controls, Tenant Admin attribution toggle. Authored by PM Lead (Mo Salah). Full specialist dispatch (UX · elections · broadcast · personas).

- **v2.0 (2026-06-03):** Architecture layer added. Resolves D1 (Sentra owns detection; Reson8 owns consumption), D2 (two surfaces: global map + module feed), D3 (two action routes: ticker vs. direct editorial). Adds: module filter profile system (BN-C12); ORA module breaking feed panel (Surface B); threshold alert engine and card variant (O31 data-driven path); breaking confirmation workflow (Route B gate); developing story tracker (BN-C9); updated permission map (`sentra.viewModuleFeed` · `sentra.confirmBreaking` · `sentra.manageFilterProfile`); Phase 2/3 module filter scaffolds (ARENA · FLASH · PULSE · ATMOS). E2=B control 6 added (explicit source distinction between Sentra AI and official data feed on card anatomy). Surface A (global map) UI anatomy unchanged from v1.0. Authored by PM Lead (Mo Salah).


— Mo Salah, PM Lead
