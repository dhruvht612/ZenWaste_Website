# ZenduWaste Landing Page — UI/UX Specification

**Purpose:** Internal sales/demo page. Shown live to prospects (CR&R and future waste-hauler leads) to prove the platform, not to "look like a SaaS site."
**Audience:** Ops directors and GMs at waste haulers — practical, skeptical of vendor hype, evaluating on evidence (uptime, proof of service, cost). Viewed on a laptop, in an office, mid-workday, alongside a live product demo. Mood: credible, industrial, in-control — not playful, not "startup."
**Register:** Brand (design communicates, not transacts) — but grounded in operational proof, not marketing flourish.

---

## 1. Color Strategy — Committed

Identity already exists (`CLAUDE.md`) and is preserved, not reinvented:

| Role | Hex | OKLCH (approx) | Use |
|---|---|---|---|
| Ink / body bg (dark mode sections) | `#1A3C34` (DARK_GREEN) | `oklch(0.32 0.045 165)` | Hero, footer, CTA band — carries 40–50% of the page |
| Surface (light sections) | `#FFFFFF` | `oklch(1 0 0)` | Problem, features, proof sections — true white, never cream |
| Panel (dark-on-dark card) | `#1F4A3A` | `oklch(0.37 0.05 165)` | Cards inside dark sections |
| Primary brand | `#2E7D52` (MID_GREEN) | `oklch(0.52 0.11 155)` | Section anchors, icons, active states |
| Accent | `#E8772E` | `oklch(0.68 0.16 45)` | CTAs, the one "look here" color — used sparingly, <8% of surface |
| Muted ink (light bg) | `#4B5D57` | tinted toward `165°`, not neutral gray | Body copy on white — never `#6B7280`-style cool gray |
| Faint / dividers | `#A7C4B5` | `oklch(0.78 0.04 155)` | Hairlines, disabled states |

Strategy = **Committed**: the dark green is not a neutral, it's the brand carrying real surface weight (hero + CTA + footer bands), sandwiching white content sections. Reference point: think "industrial safety-green control room," not "eco-startup pastel."

**Contrast rule:** body text on white uses `#2A3B36` (darkened toward ink), not a cool gray — passes 4.5:1 and stays on-brand. Text on the dark green bands is `#FFFFFF` at full opacity for headings, `#D9E8E2` for body (never gray-on-green, which desaturates and looks washed out).

---

## 2. Typography

Existing brand doesn't commit to a typeface yet — this is a genuine choice point.

- **Headings:** `Cambria` (safe-list serif, ships with Office/most systems, renders reliably) — gives the page a "trade publication / industrial authority" voice instead of a generic SaaS sans. Weight 700, tight but not cramped (`letter-spacing: -0.02em`).
- **Body + UI:** `Calibri` or `Arial` — clean, legible, no personality contest with the headline serif.
- This is a **contrast pairing** (serif headline / sans body), not two similar sans-serifs — avoids the "two geometric sans" trap.

**Scale** (fluid, ratio ~1.333):
- Hero H1: `clamp(2.5rem, 5vw + 1rem, 4.25rem)` — well under the 6rem ceiling; this is a sales page, not a poster.
- Section H2: `clamp(1.75rem, 2.5vw + 1rem, 2.5rem)`
- Body: `1.0625rem` (17px), line-height 1.6, max width `68ch`
- Light-on-dark body text: line-height bumped to 1.7 (per the "light text needs more room" rule)

No tiny uppercase tracked eyebrows above sections. No numbered `01 / 02 / 03` scaffolding — the one place numbers are earned is the "How It Works" sequence (see §3.3), because it's a genuine ordered process.

---

## 3. Page Architecture

Long-scroll single page, dark/light sandwich. Each section has a distinct visual treatment — no repeating card-grid template throughout.

### 3.1 — Hero (dark green, full-bleed)
- Left-aligned headline, NOT centered: **"Waste fleet intelligence, running on cameras already on your trucks."**
- Subhead (1 sentence): what it does, who it's for.
- Two CTAs: primary (accent orange, solid) "See it on your routes" / secondary (ghost, white outline) "How it works"
- Right side: a real product screenshot or short looping capture of the pickup-confirmation / exception view (NOT a generic illustration — this is the proof, ship it). If no asset exists yet, use a high-fidelity static mockup of the actual Command Center UI already built (`Command Center exception management HTML prototype`, task #31) — reuse real project artifacts, not stock SaaS art.
- Motion: one orchestrated load-in — headline and image reveal with a staggered fade+8px rise, ~450ms, ease-out-quint. No bounce.

### 3.2 — Problem (white bg)
- Not a 3-card grid. Use an asymmetric two-column layout: left = short, blunt copy ("Dispatchers find out about a missed stop when the customer calls."), right = a real annotated screenshot or a simple before/after diagram (manual dispatch board vs. exception feed).
- This section should feel like a diagnosis, not a bullet list.

### 3.3 — How It Works (dark panel, `#1F4A3A` cards on `#1A3C34` bg)
- This is the ONE place a numbered sequence is earned: 3 real steps (Route runs → ZenCam confirms the stop → Exception surfaces to dispatcher). Use large numerals (not tiny tracked labels) as part of the layout, each with a short line of copy and a small supporting visual (icon or frame grab).
- Horizontal flow on desktop (connected by a thin directional line, not a bordered card edge), stacked on mobile.

### 3.4 — Features (white bg)
- Reject the identical-icon-card grid. Instead: alternating left/right feature rows (image-left/text-right, then flipped), 4 features max:
  1. AI pickup confirmation (ZenCam)
  2. Contamination detection + confidence scoring
  3. Missed-stop / exception alerts
  4. Customer portal + Soft-Pak sync
- Each row gets a real or high-fidelity mock screenshot, not an icon-in-a-circle.

### 3.5 — The ZenCam Differentiator (drenched accent band)
- Short, high-contrast band — could invert to accent orange or stay dark green with an orange underline-free callout (no gradient text, ever).
- One line, large type: **"No new hardware. The cameras are already on your trucks."**
- Directly beneath: a compact 3-column comparison (not bordered cards — use dividers or simple typographic columns) vs. Samsara / Motive / Geotab showing what only ZenduWaste does.

### 3.6 — Proof (white bg)
- CR&R as pilot customer. If not yet approved for public naming, use "A leading Southern California hauler" placeholder — flag this explicitly as pending sign-off.
- Real numbers if available (CS lookup time, exception detection rate) over vague testimonial copy.

### 3.7 — CTA / Footer (dark green)
- Single, confident close: "Ready to see it on your own routes?" + primary CTA.
- Footer: minimal, GoFleet/ZenduONE/ZenCam wordmark lockup, contact.

---

## 4. Components

- **Buttons:** solid accent-orange primary, white-outline ghost secondary. No gradients, no glassmorphism. Radius `8px`.
- **No side-stripe cards anywhere** — feature/step containers use full borders or background tint only, never a colored left border.
- **Dropdowns/nav (if a nav is added):** none needed for a single-scroll sales page — a simple sticky top bar with logo + one CTA is enough. If a menu is added later, respect the popover/`position: fixed` rule to avoid clipping.
- **Screenshots/frames:** consistent rounded-frame treatment (`12px` radius, subtle shadow, no glass) as the one repeated visual motif across the page — this is the "distinctive element repeated" requirement, and it reinforces "this is real software," not decoration.

---

## 5. Motion

- Hero: one staggered load-in (headline → subhead → CTAs → image), ~450–600ms total, ease-out-quint.
- Section reveals: default-visible content with a subtle enhance-on-scroll (8px rise + fade, 300ms) — never gated/hidden-until-triggered.
- Step sequence (3.3): steps light up in order on scroll-into-view, staggered ~120ms apart — this is the one place staggering is earned by content (a real sequence).
- All motion has a `prefers-reduced-motion` crossfade fallback.

---

## 6. Responsive Behavior

- Breakpoint-free grids where possible: `repeat(auto-fit, minmax(280px, 1fr))` for the comparison section.
- Feature rows (3.4) stack vertically under 768px, image always above text on mobile.
- Hero headline copy tested at 375px width — trim to avoid overflow at the top of the clamp scale (5-6 words per line max).

---

## 7. Accessibility

- All body text ≥4.5:1 contrast (verified above — no gray-on-tint failures).
- CTAs have visible focus states (2px accent-orange outline offset 2px).
- Screenshots/images carry real, specific alt text ("ZenduWaste exception feed showing a flagged missed stop on Route 14"), not "dashboard screenshot."

---

## What's still a decision, not yet made
- Whether CR&R can be named publicly on the proof section (needs sign-off).
- Whether to use real product screenshots (recommended, higher trust) vs. polished mockups (faster to ship) for hero and features.
- Whether this lives as a standalone deploy (own URL) or gets folded into the GoFleet marketing site later.