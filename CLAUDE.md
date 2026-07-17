# ZenduWaste Intelligence Platform — Project Context

## Who I Am
**Dhruv Thakar** — dhruvthakar@zenduit.com  
Product / strategy role at GoFleet (ZenduIT). Working on ZenduWaste, a waste management intelligence platform built on top of GoFleet's existing telematics infrastructure.

---

## The Product

**ZenduWaste** is GoFleet's waste management intelligence platform. It runs on:
- **ZenduONE** — GoFleet's telematics platform (GPS, routing, dispatch, driver behavior)
- **ZenCam** — AI dash cameras already physically installed on customer trucks (road-facing, driver-facing, and side cameras)
- **ZenduONE Driver app** — mobile app drivers use for routes, HOS, DVIR

The key hardware differentiator: **ZenCam cameras are already on the trucks**. No competitor has this without a separate hardware sale.

---

## Key People

| Name | Role | Contact |
|------|------|---------|
| **Vishal Singh** | Boss / decision-maker | — |
| **Musa Khan** | Manages CR&R relationship | — |
| **Raul Duran** | CR&R pilot customer — operations lead | — |
| **JJ** | Dev lead, 4-stage roadmap owner | — |
| **Larissa Moreno** | Designer — leads design, runs syncs with Dhruv | larissamoreno@zenduit.com |
| **Michelle** | Designer — work settings & operational rules research | — |
| **Aditia** | Designer — route planning optimization (step 0/1) | — |
| **Joseph Joy** | Attends Larissa/Dhruv syncs | josephjoy@zenduit.com |
| **Andre** | Developer — backend complete (route completion, missed stops, deviations), blocked on UI | — |
| **Aditya Sharma** | Designer — route planning optimization, ZenduOne Route Optimizer app | adityasharma@zenduit.com |

---

## Pilot Customer: CR&R

- **ERP**: Soft-Pak / MAP-PAK
- **Key pain**: CS lookup speed (<10 sec), email/print of service confirmations, secure scoped customer links
- **Meeting cadence**: Biweekly (Raul Duran attends)

---

## Product Roadmap (JJ's 4-Stage Plan)

1. **Pickup confirmation** ✅ — per-stop proof of service via ZenCam
2. **Plan vs. actual** — route deviation tracking
3. **Anomaly UI** — dispatcher alerts for exceptions
4. **Automation / self-service** — customer portal, auto-reporting

---

## Active Work Stream: AI DVIR with Larissa

### What We're Building
A **voice-first AI DVIR** built into the ZenduONE Driver app. Driver does a walk-around, speaks what they see, AI auto-fills the DVIR form with pass/fail per component. Eventually powered by ZenCam to auto-detect defects without the driver needing to say anything.

### Prototype (Larissa's current design)
7-screen flow: **Home → Start of Day → DVIR Start → Recording → Analyzing → Review → Done**

- Driver taps mic, talks during walk-around ("Brakes good, small crack on left headlight")
- AI transcribes and maps speech → DVIR form fields with pass/fail
- Defects require a photo before submission
- "Add more by voice" to supplement
- Offline capable

**Links:**
- https://claude.ai/design/p/7b9e2bb4-15d2-4460-8c4b-701d6b5e4c93 (view)
- https://claude.ai/design/p/32290676-8185-416f-a71a-8adc7d3f611c (edit/remix)

### What's Strong in the Prototype
- Voice-first is right for gloved drivers
- AI summary banner ("5 good · 1 defect") is clear and fast
- Defect photo gate is smart compliance enforcement
- "Try saying…" prompt is best-in-class onboarding
- Clean 7-step flow, single CTA per screen

### Open Gaps — Prioritized

| # | Gap | Priority | Notes |
|---|-----|----------|-------|
| 1 | No FMCSA driver signature | 🔴 P0 | Legally required under 49 CFR 396.11. Add tap-to-certify between Review and Done. |
| 2 | No ZenCam integration | 🔴 P0 | **Biggest differentiator.** Use ZenCam footage at engine start to pre-populate form. No competitor does this. |
| 3 | No ZenCam auto-photo for defects | 🔴 P0 | Driver must manually photograph defects. ZenCam can supply the frame automatically. |
| 4 | Done screen goes nowhere | 🟠 P1 | Must show who defect was sent to — "Marcus at Depot 3 notified." |
| 5 | No repeat defect alerts | 🟠 P1 | Highlight if same item flagged 2+ inspections in a row. |
| 6 | No trailer DVIR | 🟠 P1 | Unit 4471 is CDL Class A — legally requires trailer inspection under 396.11. |
| 7 | No prior inspection context | 🟡 P2 | Show last inspection result; pre-fill known-good items. |
| 8 | No AI confidence indicators | 🟡 P2 | Distinguish high-confidence auto-filled vs. inferred items visually. |
| 9 | No offline mode UI indicator | 🟡 P2 | File is named "(offline)" but no UI shows this state. |
| 10 | No ELD/HOS gating | 🟡 P2 | ZenduONE telematics can block route start until DVIR is certified. |

### FMCSA Compliance Context
- Rule **FMCSA-2025-0115** (effective March 23, 2026) explicitly authorizes eDVIR under 49 CFR 396.11 and 396.13
- Paper-only objection is now gone — eDVIR is legally mainstream
- Still requires: driver certification/signature, timestamped GPS record, 3-month retention

### Competitive Position on AI DVIR

| | Samsara DVIR 2.0 | Motive | Geotab/Lytx | ZenduONE Prototype | ZenduONE + ZenCam |
|--|--|--|--|--|--|
| Voice auto-fills form | ❌ (notes only) | ❌ | ❌ | ✅ | ✅ |
| Camera auto-detects defects | ❌ | ✅ (manual upload) | ❌ | ❌ | ✅ **unique** |
| Driver signature | ✅ | ✅ | ✅ | ❌ gap | ✅ |
| Mechanic notification | ✅ | ✅ | ✅ | ❌ gap | ✅ |

**The ZenCam auto-fill is a true first-mover opportunity — no competitor can replicate it without a separate hardware sale.**

### Files for Reference
- `AI_DVIR_Competitive_Research.xlsx` — feature matrix, enhancement recs, market landscape (3 tabs)
- `AI_DVIR_Prototype_Review_and_Enhancements.md` — full write-up with context on all 10 recommendations

---

## Active Work Stream: Command Center / Live View

### Context (from Larissa sync — July 15, 2026)
The team is building a **live view Command Center** for fleet/waste dispatch operations. This is an exception-driven live operations tool — NOT a dashboard, NOT a pre-route planning tool.

**Team division of work:**
- **Aditia** — Step 0/1: Route planning and optimization (build the plan, assign drivers/vehicles/stops, customer time windows)
- **Michelle** — Work settings and operational rules (what rules govern operations)
- **Dhruv** — **Step 3**: Exception handling during live execution — driver app status automation, native proof outcomes, exception detection & dispatcher action for missed stops, time window violations, vehicle failures, etc.

### Scope: What belongs in the Command Center (live view)
✅ **In scope:**
- Real-time tracking of active routes and vehicles
- Exception detection during execution (missed stops, vehicle breakdown, driver issues, time window violations, route blockages)
- Dispatcher tools to take immediate action on exceptions
- Sub-second data refresh, 1-click actions on every displayed object
- Live status of what's happening vs. what was planned

❌ **Out of scope for live view:**
- Pre-route planning (that's Aditia's step 0/1)
- Cross-industry filtering within a single customer's view — one company = one industry focus
- Static reporting / historical dashboards

### Key Design Decisions (aligned July 15, 2026)
1. **Exception-driven, not monitoring**: The goal is to surface exceptions and enable immediate action, not just show status
2. **Single industry per customer**: The platform is versatile and can be sold to different industries, but a single customer/company focuses on ONE industry. Do not design for cross-industry filtering within a session.
3. **List view prototype**: Larissa has a list-view prototype complementing the map view. Dhruv should use this as the reference starting point and duplicate/improve it.

### Updated Design Decisions (July 16, 2026 — Work Management Plan + ZenduWork meetings)

**Command Center:**
- **Shift from severity labels to operational clarity** — exceptions should be grouped/filtered by type and operational impact (late routes, missed stops, contamination) NOT abstract Critical/High/Medium labels. Severity stays as a secondary visual indicator (colored border) only.
- **Map is secondary** — list/panel views are the primary interface for daily operations. Map is supporting context, not the hero. Dispatcher should be able to hide it entirely.
- **Alerts must force action** — Larissa and Joseph want exceptions to be more prominent, with a CTA that compels immediate response. Passive monitoring is not enough.
- **Operational filtering by route** — dispatcher should be able to filter exceptions by specific route.

**Overall UI structure (locked decisions):**
- **Today tab = primary landing page** — live operations and exceptions; this is where dispatchers start every shift
- **Plans + Jobs → merged** into a single Operations view (Today · Upcoming · Completed tabs inside)
- **Routes = floating CTA button** — not a nav menu item; accessible from all views
- **History + Insights → unified** — history focused on operational insights (driver scorecards, savings, deviations)
- **Settings → module-level** — settings live within each module, not in a separate global settings page; tailored by role (manager vs. driver)

**Prototype consolidation:**
- **Larissa owns single source of truth** — all disparate prototypes (Aditia, Dhruv) consolidate into one unified prototype
- **Remove debug/demo tools** — X-ray, ML insights, simulation parameters are for demos only; strip from production prototype
- **Compare feature = button** — route comparison is a button in the upload/planning flow, not always-visible UI
- **Customer ETA notifications** — automated, configured in system settings; not a manual dispatcher workflow
- **Panel width +50%** — exception detail panels should use more horizontal space

**Backend status (Andre):**
- Andre has completed: route completion, missed stops, deviation tracking
- He is blocked waiting on finalized frontend UI — this is the team's highest priority
- New deadline: unified design finalized by **10:00 AM July 17, 2026** to unblock Andre

**Dhruv's open action items (from July 16 meetings):**
- Get Fuel ETA data availability from dev team
- Send Command Center design links to team group chat
- Create GitHub branch for prototype consolidation
- Update Command Center to prioritize operational issues over severity filtering (done in prototype)

### Deliverables Due
- **Proposal for command center design** → **Friday July 18, 2026**
- **Prototype for live view exception management** → Friday July 18, 2026
- **Unified design for Andre** → **10:00 AM July 17, 2026** (hard deadline to unblock dev)

### Reference Materials to Review
- Michelle's work settings/rules documentation
- Aditia's route planning optimization research (step 0/1)
- Larissa's list view prototype (shared in design tool — duplicate and experiment)
- ZenduOne Route Optimizer repo (Aditia's working app) — Command Center at `/live` integrates here

---

## Other Files in This Folder

| File | Description |
|------|-------------|
| `ZenduWaste_Competitive_Feature_Spreadsheet.xlsx` | Master competitive feature matrix (6 tabs incl. CR&R meeting notes, requirements, action items) |
| `Waste Management Intelligence Platform — Full Strategy.xlsx` | Full strategy doc sent to Vishal Singh |
| `ZenduWaste_JTBD_Presentation.pptx` | Jobs-to-be-done presentation (9 slides, 8 roles) |

---

## Key Terminology

| Term | Meaning |
|------|---------|
| ZenduONE | GoFleet's telematics platform |
| ZenCam | GoFleet's AI dash camera hardware (already on trucks) |
| DVIR | Driver Vehicle Inspection Report (pre/post-trip, FMCSA-regulated) |
| eDVIR | Electronic DVIR (authorized March 2026) |
| Soft-Pak / MAP-PAK | Incumbent waste ERP used by CR&R and most NA haulers |
| CR&R | Pilot customer (waste hauler) |
| JTBD | Jobs-to-be-done framework |
| ELD | Electronic Logging Device (HOS compliance) |
| HOS | Hours of Service (driver hours regulation) |
| EPR | Extended Producer Responsibility (recycling compliance regulation) |

---

## How to Help Me

- Always use ZenduWaste / ZenduONE / ZenCam terminology
- Frame everything through: **what can we do that competitors can't because ZenCam is already on the trucks?**
- CR&R is the pilot — validate features against Raul's stated needs
- Vishal Singh is the boss — comms to him: concise, evidence-based, no fluff
- Larissa owns design — feedback should be framed as product gaps, not design critique
- Output files go to this folder; spreadsheets use openpyxl with the green palette (DARK_GREEN #1A3C34, MID_GREEN #2E7D52, ACCENT #E8772E)