@AGENTS.md

# Millennium Bowl — Next.js Site

## Project Purpose
Production website for **Millennium Bowl** — a 32-lane bowling center at 7200 Counts Massie Rd, North Little Rock, AR 72113.
Migrated from a vanilla HTML/CSS/JS SPA to Next.js 16 (App Router) with TypeScript. Deployed on Vercel.
**This is a live customer-facing site.** Use the branch → preview → merge workflow for all changes (see Deployment section).

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
- **Analytics:** Google Analytics (G-HVS4SJPDDJ) via `next/script` in root layout
- **Deployment:** Vercel (manual `vercel --prod` or auto on push to `main`)

---

## File Structure

```
app/
  layout.tsx                  — Root layout: noise div + GA scripts + font variables
  globals.css                 — @imports all 9 CSS files in order
  not-found.tsx               — Custom 404 page ("Lane Not Found")
  error.tsx                   — 'use client' error boundary for runtime crashes
  og/route.tsx                — Dynamic OG image (1200×630) for social sharing previews
  (public)/                   — Route group: public pages, no auth required
    layout.tsx                — Nav → main → Footer + AnimationsProvider
    page.tsx                  — Home
    about/page.tsx
    bar/page.tsx              — Bar drinks menu (server component)
    contact/
      layout.tsx              — Metadata for client component page
      page.tsx                — 'use client' — contact form with API call
    events/page.tsx
    leagues/page.tsx          — Schedule table + StrikeEngine + LeagueSignupForm
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
    page.tsx                  — 'use client' — food-only menu with category filter tabs
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
  sitemap.ts                  — 14 public URLs (incl. /bar, /kitchen)
  robots.ts                   — Allows /, blocks /api/, /admin/, /kitchen/

components/
  Nav.tsx                     — 'use client'; usePathname for active state, drawer + glow toggle
  NavWithAuth.tsx             — 'use client'; thin passthrough to Nav (simplified)
  Footer.tsx                  — Server component; links to /bar and /kitchen
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
  components.css              — Buttons, exp cards, marquee, pricing, reviews, 404 page
  pages.css                   — All page-specific styles (menu, leagues, about, contact, StrikeEngine, etc.)
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
| `/kitchen` | `kitchen/page.tsx` | Food-only menu with category filter (pizza, apps, salads, mains, basket) |
| `/leagues` | `(public)/leagues/page.tsx` | Schedule table + StrikeEngine + join form |
| `/menu` | `(public)/menu/page.tsx` | Full menu (all categories); uses `MenuFilter` |
| `/parties` | `(public)/parties/page.tsx` | Birthday + corporate packages |
| `/privacy` | `(public)/privacy/page.tsx` | Privacy policy |
| `/proshop` | `(public)/proshop/page.tsx` | Bowl 101 info + brands |
| `/terms` | `(public)/terms/page.tsx` | Terms of service |
| `/og` | `app/og/route.tsx` | Dynamic OG image — 1200×630, edge runtime |
| `/book` | — | 308 redirect → `/contact` |
| `/order` | — | 308 redirect → `/menu` |

---

## Key Architecture Notes

### CSS — always global, never modular
All styles live in `css/*.css`, imported in order in `app/globals.css`. Do not introduce CSS Modules or Tailwind. Keep all class names matching the original design system.

### Font CSS variables
Use these in CSS, never hardcoded font family strings:
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
All public pages (`(public)/`) are **statically prerendered** (`○`). `/og` is edge-rendered (`ƒ`). Firebase and auth are isolated to `(auth)/` and `admin/` so they never affect public page performance.

### Menu data
`lib/menu-data.ts` exports:
- `foodItems` — categories: `pizza | apps | salads | mains | basket`
- `drinkItems` — category: `drinks`
- `allMenuItems` — all combined (used on `/menu`)

The `/kitchen` page shows `foodItems` only (no drinks). The `/bar` page shows `drinkItems` only.

### AnimationsProvider
Client component in `(public)/layout.tsx` that wires all JS behaviors via `useEffect` keyed to `pathname`:
- Page enter animation (`.page-enter` class on `<main>`)
- Scroll `IntersectionObserver` on `[data-animate]` → adds `.in-view`
- Count-up on `[data-count]` elements
- Pin click → STRIKE! popup + confetti (opacity resets to CSS default after strike)
- `[data-confetti]` buttons → confetti burst
- Logo triple-click → pin rain easter egg

Cursor glow mounts once on initial load (not per-route).

### Glow Bowl Mode
`Nav.tsx` toggles `document.body.classList` → `glow-mode`. All glow-mode visual overrides live in `css/base.css`. Toast fires once per toggle (single call in `toggleGlow`, not in useEffect).

### OG Image
`/og` uses Next.js `ImageResponse` (edge runtime) to generate a 1200×630 branded card. Referenced in `app/layout.tsx` metadata for both OpenGraph and Twitter (`summary_large_image`). First load ~3.5s, cached by Vercel CDN after that.

### Security headers
Set in `next.config.ts` on all routes (`/(.*)`):
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `X-DNS-Prefetch-Control: on`

### Error handling
- `app/not-found.tsx` — branded 404 "Lane Not Found" page with nav back home
- `app/error.tsx` — client-side error boundary with retry button

---

## Playful Features

| Feature | Trigger |
|---------|---------|
| Glow Bowl Mode | Toggle in nav |
| Neon cursor glow | Mouse movement (desktop only) |
| Pin strike + STRIKE! popup | Click floating 🎳 pins in hero |
| Count-up stats | Auto on page load / route change |
| Scroll card animations | Scroll — `[data-animate]` → `.in-view` |
| Pin rain | Triple-click the logo |
| Confetti burst | Any `[data-confetti]` button |
| StrikeEngine | Interactive canvas bowling on Leagues page |
| Form success | Submit contact or league form |

---

## Deployment

**This is a live customer-facing site. Do not push directly to `main`.**

### Recommended workflow
```bash
git checkout -b fix/your-change
# make changes + npm run build to verify
git add . && git commit -m "description"
git push origin fix/your-change
# Vercel auto-creates a preview URL — check it
git checkout main && git merge fix/your-change
git push origin main
# then deploy:
vercel --prod
```

### Quick deploy (urgent fixes only)
```bash
git add . && git commit -m "description"
git push origin main
vercel --prod
```

### Environment variables
| Variable | Production | Preview |
|----------|-----------|---------|
| `FIREBASE_SERVICE_ACCOUNT_JSON` | ✅ | ✅ |
| `FIREBASE_PRIVATE_KEY` | ✅ | ✅ |
| `FIREBASE_CLIENT_EMAIL` | ✅ | ✅ |
| `FIREBASE_PROJECT_ID` | ✅ | ✅ |
| `RESEND_API_KEY` | ✅ | ✅ |
| `NEXT_PUBLIC_FIREBASE_*` (5 vars) | ✅ | ✅ |

Local dev: `.env.local` is gitignored and already populated (run `vercel env pull` to refresh).

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
