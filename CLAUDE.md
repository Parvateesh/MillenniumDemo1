@AGENTS.md

# Millennium Bowl — Next.js Site

## Project Purpose
Production website for **Millennium Bowl** — a 32-lane bowling center at 7200 Counts Massie Rd, North Little Rock, AR 72113.
Migrated from a vanilla HTML/CSS/JS SPA to Next.js 16 (App Router) with TypeScript. Deployed on Vercel.

**Live URL:** https://millenniumbowllr.com
**Dev server:** `npm run dev` → http://localhost:3000

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack dev)
- **Language:** TypeScript
- **CSS:** Global CSS files imported in `app/globals.css` — no Tailwind, no CSS Modules
- **Fonts:** `next/font/google` — Bowlby One (`--font-bowlby`), Space Mono (`--font-space-mono`); Inter via system-ui fallback (`--font-inter`)
- **Database:** Firebase Firestore (isolated to `app/(auth)` and `app/admin` — never loads on public pages)
- **Email:** Resend API (via `/api/contact`)
- **Deployment:** Vercel (auto-deploys on push to `main`)

---

## File Structure

```
app/
  layout.tsx                  — Root layout: DemoBanner → Nav → {children} → Footer + AnimationsProvider
  globals.css                 — @imports all 9 CSS files in order
  (public)/                   — Route group: public pages, no auth required
    layout.tsx                — Thin wrapper (no extra chrome)
    page.tsx                  — Home
    about/page.tsx
    bar/page.tsx              — Bar drinks menu (server component)
    contact/
      layout.tsx              — Metadata for client component page
      page.tsx                — 'use client' — contact form with API call
    events/page.tsx
    kitchen/page.tsx          — 'use client' — food menu with category filter
    leagues/page.tsx          — Leagues table + StrikeEngine + LeagueSignupForm
    menu/page.tsx             — Full menu (food + drinks); uses MenuFilter client component
    parties/page.tsx
    privacy/page.tsx
    proshop/page.tsx
    terms/page.tsx
  (auth)/                     — Route group: Firebase-authenticated pages
    layout.tsx                — Auth guard
    login/page.tsx
    signup/page.tsx
    account/page.tsx
    account/leagues/page.tsx
    account/reservations/page.tsx
  admin/                      — Protected admin dashboard
    layout.tsx
    page.tsx
    analytics/page.tsx
    lanes/page.tsx
    leagues/page.tsx
    login/page.tsx
    messages/page.tsx
    waitlist/page.tsx
    inventory/[category]/page.tsx
  kitchen/                    — Standalone kitchen page (outside (public) group)
    layout.tsx
    page.tsx
  api/                        — Route handlers
    contact/route.ts
    bookings/route.ts
    health/route.ts
    inventory/[category]/route.ts
    lanes/route.ts
    lanes/public/route.ts
    leagues/interest/route.ts
    leagues/register/route.ts
    order/track/route.ts
    proshop/redirect/route.ts
    users/route.ts
    waitlist/route.ts
    auth/login/route.ts
    auth/logout/route.ts
  sitemap.ts                  — 12 public URLs
  robots.txt/route.ts

components/
  Nav.tsx                     — 'use client'; usePathname for active state, drawer + glow toggle
  NavWithAuth.tsx             — 'use client'; thin passthrough to Nav (simplified)
  Footer.tsx                  — Server component
  AnimationsProvider.tsx      — 'use client'; all JS behaviors via useEffect on pathname
  MenuFilter.tsx              — 'use client'; category tab filter for full menu page
  StrikeEngine.tsx            — 'use client'; interactive canvas bowling game on Leagues page
  LeagueSignupForm.tsx        — 'use client'; league interest form → /api/leagues/interest
  OrderButton.tsx             — 'use client'; links to Square ordering site
  ConfirmModal.tsx            — 'use client'; success modal for contact form
  LaneBoard.tsx               — Admin lane board
  LeagueLeaderboard.tsx       — Admin leaderboard

lib/
  menu-data.ts                — foodItems, drinkItems, allMenuItems arrays + MenuItem type
  confetti.ts                 — confettiBurst(x, y, count) utility

css/
  variables.css               — CSS custom properties (colors, fonts, spacing, z-index)
  base.css                    — Reset, body, background grid, glow mode, scroll animations
  nav.css                     — Nav, mobile left-drawer, overlay, glow toggle button
  hero.css                    — Hero section, floating pins, stats strip
  components.css              — Buttons, exp cards, marquee, pricing, reviews, event cards
  pages.css                   — All page-specific styles (menu, leagues, about, contact, etc.)
  footer.css                  — Footer grid, social links
  animations.css              — Cursor glow, confetti, strike popup, stagger delays
  admin.css                   — Admin dashboard styles
  auth.css                    — Auth page styles
```

---

## Pages & Routes

| Route | File | Notes |
|-------|------|-------|
| `/` | `(public)/page.tsx` | Home — hero, marquee, features, pricing, reviews |
| `/about` | `(public)/about/page.tsx` | Story + CTA to contact |
| `/bar` | `(public)/bar/page.tsx` | Drinks menu (server, no filter) |
| `/contact` | `(public)/contact/page.tsx` | Contact form; metadata in `contact/layout.tsx` |
| `/events` | `(public)/events/page.tsx` | Recurring events + special event CTA |
| `/kitchen` | `kitchen/page.tsx` | Food menu with category filter tabs |
| `/leagues` | `(public)/leagues/page.tsx` | Schedule table + StrikeEngine + join form |
| `/menu` | `(public)/menu/page.tsx` | Full menu (all categories); uses `MenuFilter` |
| `/parties` | `(public)/parties/page.tsx` | Birthday + corporate packages |
| `/privacy` | `(public)/privacy/page.tsx` | Privacy policy |
| `/proshop` | `(public)/proshop/page.tsx` | Bowl 101 info + brands |
| `/terms` | `(public)/terms/page.tsx` | Terms of service |
| `/book` | — | 308 redirect → `/contact` (in next.config.ts) |
| `/order` | — | 308 redirect → `/menu` (in next.config.ts) |

---

## Key Architecture Notes

### CSS — always global, never modular
All styles live in `css/*.css`, imported in order in `app/globals.css`. Do not introduce CSS Modules or Tailwind. Keep all class names matching the original design system.

### Font CSS variables
Use these in CSS, not hardcoded font family strings:
- `var(--font-bowlby)` — Bowlby One (headings)
- `var(--font-space-mono)` — Space Mono (labels, tags, monospace)
- `var(--font-inter)` — Inter / system-ui (body text)

### Header height variables (`css/variables.css`)
```css
--banner-h: 30px;    /* demo banner */
--nav-h: 80px;       /* nav bar */
--header-h: 110px;   /* banner + nav combined */
```
If nav padding changes, update `--nav-h` here.

### Mobile breakpoints
- `1280px` — nav collapses to left-side drawer
- `900px` — two-column layouts go single column
- `480px` — small phone adjustments

### z-index map
| Layer | Value |
|-------|-------|
| Demo banner | 200 |
| Nav bar | 160 |
| Nav drawer | 161 |
| Overlay | 149 |
| Glow toast | 9999 |
| Pin rain | 9999 |

### Static vs dynamic rendering
All public pages (`(public)/`) are **statically prerendered** (`○`). Firebase and auth are isolated to `(auth)/` and `admin/` so they never affect public page performance.

### Menu data
`lib/menu-data.ts` exports:
- `foodItems` — categories: `pizza | apps | salads | mains | basket`
- `drinkItems` — category: `drinks`
- `allMenuItems` — all combined (used on `/menu`)

The `/kitchen` page shows `foodItems` only (no drinks). The `/bar` page shows `drinkItems` only.

### AnimationsProvider
Client component at root layout that wires all JS behaviors via `useEffect` keyed to `pathname`:
- Page enter animation (`.page-enter` class on `<main>`)
- Scroll `IntersectionObserver` on `[data-animate]` → adds `.in-view`
- Count-up on `[data-count]` elements
- Pin click → STRIKE! popup + confetti
- `[data-confetti]` buttons → confetti burst
- Logo triple-click → pin rain easter egg

Cursor glow mounts once on initial load (not per-route).

### Glow Bowl Mode
`Nav.tsx` toggles `document.body.classList` → `glow-mode`. All glow-mode visual overrides live in `css/base.css`. Toast fires once per toggle (no double-fire).

---

## Playful Features

| Feature | Trigger |
|---------|---------|
| Glow Bowl Mode | 🎳 toggle in nav |
| Neon cursor glow | Mouse movement (desktop only) |
| Pin strike + STRIKE! popup | Click floating 🎳 pins in hero |
| Count-up stats | Auto on page load / route change |
| Scroll card animations | Scroll — `[data-animate]` → `.in-view` |
| Pin rain | Triple-click the logo |
| Confetti burst | Any `[data-confetti]` button |
| StrikeEngine | Interactive canvas bowling on Leagues page |
| Form success animation | Submit contact or league form |

---

## Deployment

Vercel — connected to GitHub `main` branch. Every push auto-deploys.

Build command: `npm run build`
Output: all public routes statically prerendered.

---

## Business Info (for content edits)

- **Phone:** (501) 791-9150
- **Email:** info@millenniumbowllr.com
- **Address:** 7200 Counts Massie Rd, North Little Rock, AR 72113
- **Hours:** Mon–Thu 9 AM–12 AM · Fri–Sat 9 AM–2 AM · Sun 10 AM–12 AM
- **Founded:** 2003 (23 years as of 2026)
- **Google Reviews:** 1,076 reviews · 4.2 stars
- **Pro Shop (Bowl 101):** (501) 353-2749 · Brian Kennedy · Ebonite Gold Exclusive
- **Online ordering:** https://millenniumbowl.square.site
- **Bowl 101 online store:** https://www.bowl101.net
