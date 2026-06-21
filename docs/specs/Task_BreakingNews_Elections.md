# Task: Build Election Breaking News & Editorial Confirmation Feature - Just UI with Mockup Data


## Objective


Build a feature to surface, confirm, and take-to-air **election-related breaking news** during presidential and parliamentary election broadcasts.

The goal is to allow the editorial team to receive AI-classified and data-driven breaking events related to the election context, review them, confirm them with a human editorial gate, and route the confirmed event to a Vizrt graphics output (breaking overlay or ticker).

This feature is part of the **Reson8 Broadcast Intelligence Platform**, where breaking news is a shared core service consumed by every module — elections is the first module to use it. The same breaking news pipeline will later serve sports, finance, weather, and global breaking news.

Breaking news classification — detecting that an event is breaking, scoring its severity, and confirming it across multiple independent sources — is the job of Sentra using the inputs from Reson8. Reson8 receives the classified breaking items and provides the editorial surface, confirmation workflow, and Vizrt output path.


---


## Scope


### 1. Breaking News Types Examples


| Breaking News Type | Description |
|---|---|
| Concession Statement | A candidate publicly concedes the race |
| Victory Declaration | A candidate or party publicly declares victory |
| Majority Reached | Official data feed confirms a party has reached the majority seat threshold |
| Seat Milestone | Official data feed crosses a configured seat milestone for a party |
| Precincts Reported | Official data feed crosses a configured % of precincts reporting (50% · 75% · 100%) |
| Results Final | Official data feed declares results final for a constituency or nationally |
| Disputed Result | A candidate, party, or election authority publicly disputes a reported result |
| Recount Request | A formal request for recount is filed by a candidate or party |
| Polling Station Incident | An incident at a polling station is reported (closure, irregularity, violence) |
| Electoral Commission Statement | An official announcement from the election authority |
| Coalition Announcement | A party or bloc announces or breaks a coalition |
| Candidate Withdrawal | A candidate withdraws from the race |
| Anomalous Data Flag | A statistical anomaly in the results feed is flagged for editorial review |


### 2. Breaking News Source Types


| Source Type | Description |
|---|---|
| Sentra (Social) | Breaking signal detected by Sentra from social media in any of the 10 supported languages |
| Sentra (News Wire) | Breaking signal detected by Sentra from news agencies and broadcasters |
| Official Data Feed | Threshold or milestone crossed in the official election results feed |
| Election Authority | A direct statement or release from the official electoral commission |


### 3. Severity Tiers


| Severity | Description |
|---|---|
| Major Breaking | A pivotal moment in the election — majority reached, victory declared, conceded, disputed result, results final |
| Breaking | A confirmed significant event — seat milestone, coalition announcement, candidate withdrawal |
| Developing | A reported event still under verification — single source, awaiting cross-source confirmation |


---


## Short Ticket


**Title:** Build Election Breaking News & Editorial Confirmation Feature


**User Story:**
As an editor/admin, I want to receive election-related breaking news items in a dedicated panel, review their source and severity, confirm them with a human editorial gate, and take them to air via a Vizrt graphic — so that significant moments of the election reach the broadcast within seconds of being detected, without any unverified content reaching the screen.

The scope of this task is within the election module only. The same pattern will be reused later by other modules.


**Description:**
**Build the static UI with mock data** for the election breaking news panel and confirmation workflow.

The module should support:

- A breaking news panel embedded inside the election cockpit, showing both AI-detected breaking items (from Sentra) and data-driven threshold alerts (from the official results feed) in one severity-sorted list.
- Two visually distinct card types — one for AI-sourced items showing the Sentra attribution, source list, and confirmation tier (Corroborated / Pending / Sentra-only); one for data-driven items showing the official data source, the triggered value, and the linked graphic.
- A confirmation workflow that asks the editor to review the item, select the on-air graphic type (breaking overlay, ticker entry, or both), and confirm — with a typed acknowledgment required for high-severity AI items.
- A developing story tracker that opens when an item is confirmed, showing the original event plus any later updates grouped under the same story thread.
- An empty state, a loading state, and a retracted-item state for AI items that are pulled back by Sentra after first publication.
- A filter profile (read-only in this UI scope) showing which categories, candidates, parties, and keywords the breaking feed is scoped to for the configured election.

Each breaking item should be linked to the related election entities (candidates, parties, constituencies) through the existing entity mapping, and to the corresponding Vizrt graphic templates that will be fired on confirmation.
