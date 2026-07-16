# Millennium Bowl — Production Website

Next.js 16 (App Router) website for **Millennium Bowl**, a 32-lane bowling center in North Little Rock, AR.

**Live:** https://millenniumbowllr.com

---

## Stack

- **Next.js 16** — App Router, TypeScript, Turbopack dev
- **CSS** — Global CSS files (no Tailwind, no CSS Modules)
- **Firebase Firestore** — auth-only routes; never loads on public pages
- **Resend** — transactional email via `/api/contact`
- **Vercel** — auto-deploy on push to `main`

---

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

---

## Public Routes

| Route | Description |
|-------|-------------|
| `/` | Home — hero, pricing, reviews |
| `/about` | Story, stats, CTA |
| `/bar` | Drinks menu |
| `/contact` | Contact form |
| `/events` | Recurring weekly events |
| `/kitchen` | Food menu with category filter |
| `/leagues` | Schedule, StrikeEngine game, sign-up form |
| `/menu` | Full menu (food + drinks) |
| `/parties` | Birthday & corporate packages |
| `/proshop` | Bowl 101 pro shop |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

Redirects: `/book → /contact`, `/order → /menu`

---

## Key Files

```
app/
  (public)/       Public pages — all statically prerendered
  (auth)/         Firebase-authenticated user pages
  admin/          Protected admin dashboard
  api/            Route handlers (contact, leagues, waitlist, etc.)

components/
  Nav.tsx         Mobile drawer + Glow Bowl Mode toggle
  AnimationsProvider.tsx  All client-side JS behaviors (scroll, count-up, pins, confetti)
  StrikeEngine.tsx  Interactive canvas bowling game on Leagues page
  MenuFilter.tsx  Category tab filter for /menu
  LeagueSignupForm.tsx  League interest form

css/              Global stylesheet (imported in app/globals.css)
lib/
  menu-data.ts    foodItems, drinkItems, allMenuItems
  confetti.ts     confettiBurst() utility
```

---

## Business Info

- **Phone:** (501) 791-9150
- **Email:** info@millenniumbowllr.com
- **Address:** 7200 Counts Massie Rd, North Little Rock, AR 72113
- **Hours:** Mon–Thu 9 AM–12 AM · Fri–Sat 9 AM–2 AM · Sun 10 AM–12 AM
- **Founded:** 2003 (23 years)
- **Pro Shop:** Bowl 101 · (501) 353-2749 · Ebonite Gold Exclusive · bowl101.net
- **Online orders:** millenniumbowl.square.site
