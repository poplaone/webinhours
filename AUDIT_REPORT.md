# Website Audit Report

> **Scope & method note (read this first).** The requested 28-agent per-page workflow was **not** used: the prior run of it failed on every page with `402 — weekly usage limit reached`, producing zero findings and draining the budget. Re-running it would repeat that failure. This report was produced by a **direct, read-only inline audit** of the shared/foundational layer that governs every page — design tokens (`tailwind.config.ts`, `index.css`), the app shell (`App.tsx`, `AppLayout.tsx`), the core UI kit (`button.tsx`), and site-wide SEO/a11y structure — plus per-page knowledge gathered earlier this session (SEO/content pass).
>
> **Every finding below has a file:line I opened and verified.** Where I have *not* done an exhaustive per-page pixel sweep at all 8 breakpoints, I say so rather than inventing findings. Items needing runtime/browser confirmation are marked **[needs runtime check]**. No files were modified in producing this report.

## Executive Summary
- **Layers audited:** design-token system, app shell/layout, core UI kit, site-wide SEO/a11y/font loading (governs all 21 routes)
- **Total issues found:** 24
- **By severity:** Critical: 3, High: 8, Medium: 9, Low: 4
- **By category:**
  - 1 Visual Consistency & Polish: 6
  - 2 Layout & Responsive: 2
  - 3 Typography & Text: 3
  - 4 Interactive Elements: 2
  - 5 Motion & Transitions: 2
  - 6 Accessibility: 5
  - 7 Performance & Technical: 2
  - 10 Micro-interactions / Nav / Footer: 1
  - 10 SEO & Meta: 1

---

## Design Tokens (Discovered/Extracted)

**Color palette** — HSL CSS variables in `src/index.css` (`:root` L9–71 light, `.dark` L73–128). Semantic tokens: `background, foreground, card, popover, primary, secondary, muted, accent, destructive, border, input, ring, sidebar-*, chart-1..5`. **Off-system raw values found:**
- `--sky-400: #38bdf8` / `--sky-500: #0ea5e9` (index.css L17–18, L103–104) — raw hex injected into an otherwise all-HSL token set; duplicated across both themes.
- `#8B5CF6` hardcoded in `index.html:24` (`theme-color`), `button.tsx:22` (`purple` variant), and `index.css:231` (`.text-gradient-blue`). This equals `hsl(258 89% 66%)` = the `--primary` token — so the brand color exists **twice**, once as a token and once as a raw hex literal in ≥3 places.
- `#25D366` / `#128C7E` (WhatsApp green) hardcoded in `AppLayout.tsx:25` — acceptable as a third-party brand color, but undocumented.
- Raw 6-digit hex appears in **34 component/page files** (grep count) — many should reference tokens.

**Spacing** — `--spacing: 0.25rem` (index.css:70) implies a 4px base scale. Off-scale value found: `p-3.5` (14px) in `AppLayout.tsx:25`.

**Font families** — `Montserrat` (sans + headings), `Poppins` (body + `display`), `Cormorant Garamond` (serif), `IBM Plex Mono` (mono), `Inter` (declared in tailwind, **never loaded**). Loading is split three ways (see Issue #009).

**Shadow values** — **Two parallel systems:** (a) Tailwind `boxShadow.neo` / `boxShadow.glass` (`tailwind.config.ts:250–251`), and (b) CSS vars `--shadow-2xs … --shadow-2xl` (index.css L61–68 / L120–127). The two are unrelated scales. Also note `--shadow-sm` and `--shadow` are **identical** (L63–64), as are several others — the "scale" has duplicate rungs.

**Border radius** — `--radius: 0.5rem` (index.css:42) with `lg/md/sm` derived (tailwind L130–133). Consistent — but raw `rounded-2xl`, `rounded-full`, `rounded-[…]` appear ad hoc in components.

**Transition values** — No standardized duration scale. Observed in the wild: `duration-300` (AppLayout), `transition-colors` (button), `0.5s` (btn-shine, index.css:242), plus tailwind animations at `0.2s / 0.3s / 0.4s / 0.5s / 3s / 8s`. No single easing token.

**Z-index** — Observed: `z-10` (main), `z-20`, `z-50` (header skeleton, WhatsApp button, mobile nav). No named scale; multiple `z-50` elements coexist (see Issue #007).

---

## Site-wide / Shared Layer (affects all pages)

### Issue #001
- **Category:** 6 Accessibility
- **Severity:** Critical
- **Location:** `src/App.tsx:101` **and** `src/components/layout/AppLayout.tsx:19`
- **Description:** Two nested `<main>` landmarks. `App.tsx:101` renders `<main id="main-content" role="main">` around the router; every page then renders `AppLayout`, which renders a **second** `<main>` at `AppLayout.tsx:19`. The HTML spec allows only one visible `<main>`; nesting them is invalid and breaks screen-reader landmark navigation.
- **Current value:** outer `<main id="main-content" role="main">` → … → inner `<main className="pb-24 …">`
- **Recommended fix:** Keep the outer `<main id="main-content">` as the single landmark; change `AppLayout`'s inner element to a `<div>`. Preserve its classes.
- **Estimated effort:** Trivial

### Issue #002
- **Category:** 10 SEO & Meta / 6 Accessibility
- **Severity:** Critical
- **Location:** `src/App.tsx:98`
- **Description:** The app-shell root `<Helmet>` sets a default `<meta name="description">` = *"Get your professional website ready in 24 hours…"*. This is the stale pre-rebrand positioning we replaced everywhere else this session, and because it's the shell-level default it renders as the fallback description for any route whose page-level `SEOHead` hasn't overridden it yet, and can produce a duplicate/competing description tag.
- **Current value:** `content="Get your professional website ready in 24 hours. Choose from our marketplace of premium templates or get a custom design."`
- **Recommended fix:** Update to the new positioning (or remove it and let per-page `SEOHead` own the description). Align with `index.html` and `SEOHead` defaults.
- **Estimated effort:** Trivial

### Issue #003
- **Category:** 1 Visual / 3 Typography
- **Severity:** Critical
- **Location:** `src/index.css:30` (`--muted-foreground: 240 5% 10%`) and `:91` (`.dark --muted-foreground: 0 0% 98%`)
- **Description:** `--muted-foreground` is **identical to `--foreground`** in *both* themes (light: `240 5% 10%`; dark: `0 0% 98%`). Every "muted" text element (helper text, captions, placeholders, secondary labels) therefore renders at full foreground emphasis with **zero visual de-emphasis** — the muted hierarchy is silently broken site-wide. This affects hundreds of `text-muted-foreground` usages.
- **Current value:** `--muted-foreground` == `--foreground`
- **Recommended fix:** Set `--muted-foreground` to a genuinely lower-contrast value that still passes AA on the muted/background surface — e.g. light `240 4% 40%`, dark `240 5% 65%` (verify ≥4.5:1 against `--background`).
- **Estimated effort:** Small

### Issue #004
- **Category:** 6 Accessibility
- **Severity:** High
- **Location:** `src/App.tsx` / `src/components/layout/AppLayout.tsx` (no occurrence)
- **Description:** No skip-to-content link exists, even though a `#main-content` target is already present (`App.tsx:101`). Keyboard users must tab through the entire header/nav on every page.
- **Recommended fix:** Add a visually-hidden-until-focus anchor as the first focusable element: `<a href="#main-content" class="sr-only focus:not-sr-only …">Skip to content</a>`.
- **Estimated effort:** Trivial

### Issue #005
- **Category:** 5 Motion & Transitions / 6 Accessibility
- **Severity:** High
- **Location:** site-wide; only `src/components/ui/text-shuffle/Shuffle.tsx:79` honors it
- **Description:** No global `prefers-reduced-motion` handling. The Tailwind config defines many always-on animations (`fade-in`, `slide-in-*`, `scale-in`, `pulse-slow` 3s infinite, `shiny-text` 8s infinite, `marquee` infinite — `tailwind.config.ts:236–248`) and `html { scroll-smooth }` (index.css:145). Only one component checks the media query. Users who request reduced motion still get infinite marquees, pulsing, and smooth-scroll.
- **Recommended fix:** Add a global `@media (prefers-reduced-motion: reduce)` block in `index.css` that neutralizes animations/transitions (`animation: none; transition: none; scroll-behavior: auto;`) with the standard override snippet.
- **Estimated effort:** Small

### Issue #006
- **Category:** 6 Accessibility
- **Severity:** Medium
- **Location:** `src/components/layout/AppLayout.tsx:14` (`<div className="min-h-screen relative">`)
- **Description:** The layout root is a plain `<div>`; there is no `<header>`/`<nav>`/`<footer>` landmark wrapping provided at the shell level (Header/Footer are separate components — verify each emits a semantic landmark). Combined with the double-`<main>` (Issue #001), landmark structure is unreliable.
- **Recommended fix:** Confirm `Header` renders `<header><nav>` and `Footer` renders `<footer>`; ensure exactly one of each per page.
- **Estimated effort:** Small **[needs per-component check]**

### Issue #007
- **Category:** 1 Visual / z-index
- **Severity:** Medium
- **Location:** `AppLayout.tsx:25` (WhatsApp button `z-50`), `AppLayout.tsx` MobileBottomNav (`z-50`), `App.tsx:105` (header skeleton `z-50`)
- **Description:** Multiple independent fixed/sticky elements share `z-50` with no coordinated scale. The floating WhatsApp button (`fixed bottom-24 right-4`) and the mobile bottom nav can stack ambiguously; equal z-index means paint order decides, which is fragile.
- **Recommended fix:** Introduce a small named z-index scale (e.g. nav=40, floating action=45, header=50, modal=60, toast=70) and apply consistently.
- **Estimated effort:** Medium **[needs runtime check at mobile widths]**

### Issue #008
- **Category:** 4 Interactive Elements
- **Severity:** High
- **Location:** `src/components/ui/button.tsx:8–9, 13–22`
- **Description:** Button base defines `focus-visible` ring and `disabled` styles (good), and hover for each variant — but **no distinct `active`/pressed state** on any variant, and the base transition is `transition-colors` only. Variants that change transform/shadow on interaction (used elsewhere) won't animate. Per the audit spec, every interactive button should style all four states (hover/active/focus/disabled).
- **Current value:** `transition-colors` (L9); variants have `hover:` only (L13–22), no `active:`.
- **Recommended fix:** Add `active:` states (e.g. `active:bg-primary/80`, subtle `active:scale-[0.98]`) and broaden to `transition-[colors,transform]` or `transition-all` with a 150ms duration.
- **Estimated effort:** Small

### Issue #009
- **Category:** 7 Performance / 3 Typography
- **Severity:** High
- **Location:** `src/index.css:1–3`, `index.html:118–175`, `tailwind.config.ts:80–128`
- **Description:** Font loading is inconsistent and partially render-blocking:
  1. `Montserrat`, `Cormorant Garamond`, `IBM Plex Mono` are pulled via `@import url(...)` at the **top of index.css** (L1–3). CSS `@import` is render-blocking and not preconnected via the CSS path.
  2. `index.html` inlines `@font-face` + `<link rel="preload">` only for **Poppins** (L118–167).
  3. Tailwind declares an **`inter`** font family (config L97–108) that is **never loaded** anywhere.
  4. Headings use `Montserrat` (index.css:156) which is only available via the render-blocking `@import`, so first paint of every heading risks FOUT/FOIT despite the Poppins preload work.
- **Recommended fix:** Consolidate: load all used families the same way (preferably `<link rel="preload">` + `font-display: swap` in `index.html`, drop the CSS `@import`s), add `preconnect` (already present for gstatic), and remove the unused `inter` family or actually load it.
- **Estimated effort:** Medium

### Issue #010
- **Category:** 1 Visual Consistency
- **Severity:** High
- **Location:** Shadows — `tailwind.config.ts:250–251` vs `index.css:61–68` & `120–127`
- **Description:** Two unrelated shadow systems coexist (`shadow-neo`/`shadow-glass` vs `--shadow-2xs…2xl`), and within the CSS-var set several rungs are **duplicates** (`--shadow-sm` == `--shadow` == `--shadow-md` base layer differs only slightly; `--shadow-2xs` == `--shadow-xs`). Components mix `shadow-md`, `shadow-lg`, `shadow-glass`, `shadow-sm` without a single source of truth.
- **Recommended fix:** Pick one scale (the `--shadow-*` vars are more complete), map Tailwind `boxShadow` to reference them, and de-duplicate identical rungs so each step is visually distinct.
- **Estimated effort:** Medium

### Issue #011
- **Category:** 1 Visual Consistency
- **Severity:** Medium
- **Location:** `src/index.css:17–18, 103–104`
- **Description:** `--sky-400`/`--sky-500` are raw **hex** values inside an otherwise all-HSL token system, and are duplicated identically in both `:root` and `.dark` (so they don't actually adapt to theme). Off-pattern and redundant.
- **Recommended fix:** Convert to HSL triplet tokens consistent with the rest, or remove if unused (grep usage first).
- **Estimated effort:** Small

### Issue #012
- **Category:** 1 Visual Consistency
- **Severity:** Medium
- **Location:** `src/components/ui/button.tsx:22`
- **Description:** The `purple` button variant hardcodes `bg-[#8B5CF6]` / `hover:bg-[#7C3AED]` instead of using the `primary` token (which is the same hue). Creates a second, un-themeable source of the brand color; won't respond to dark-mode primary shift.
- **Recommended fix:** Replace with `bg-primary hover:bg-primary/90` or add a proper token if a distinct purple is intended.
- **Estimated effort:** Trivial

### Issue #013
- **Category:** 1 Visual / 10 Micro-interactions
- **Severity:** Low
- **Location:** `index.html:24`
- **Description:** `theme-color` hardcodes `#8B5CF6` (duplicate of `--primary`). Harmless but should be sourced from the palette for consistency; also consider a dark variant via `media`.
- **Recommended fix:** Document as the canonical brand hex, or generate from token.
- **Estimated effort:** Trivial

### Issue #014
- **Category:** 1 Visual / Spacing
- **Severity:** Low
- **Location:** `src/components/layout/AppLayout.tsx:25`
- **Description:** Floating WhatsApp button uses `p-3.5` (14px), off the 4px spacing scale implied by `--spacing: 0.25rem`.
- **Recommended fix:** Use `p-3` (12px) or `p-4` (16px).
- **Estimated effort:** Trivial

### Issue #015
- **Category:** 6 Accessibility
- **Severity:** Medium
- **Location:** `src/components/layout/AppLayout.tsx:23–35`
- **Description:** WhatsApp FAB has `aria-label="Chat on WhatsApp"` (good) and a decorative tooltip span. Confirm the icon `<MessageCircle>` isn't announced separately and that the tooltip text isn't duplicated to AT. Minor.
- **Recommended fix:** Add `aria-hidden="true"` to the decorative tooltip span and the icon.
- **Estimated effort:** Trivial

### Issue #016
- **Category:** 3 Typography
- **Severity:** Medium
- **Location:** `src/index.css:136` (body `Poppins`) vs `:156` (headings `Montserrat`) vs `tailwind.config.ts:81` (`sans` default = `Montserrat`)
- **Description:** Font-family intent is ambiguous: Tailwind's default `sans` is Montserrat, but the `body` rule forces Poppins, while headings force Montserrat. Any component using a bare `font-sans` utility gets Montserrat, conflicting with the Poppins body baseline — inconsistent typographic voice depending on whether text inherits from `body` or uses `font-sans`.
- **Recommended fix:** Decide the system (e.g. Poppins body / Montserrat display) and make Tailwind `sans` = Poppins, `display` = Montserrat; remove the conflicting bare rule.
- **Estimated effort:** Small

### Issue #017
- **Category:** 7 Performance
- **Severity:** Medium
- **Location:** `tailwind.config.ts:97–108`
- **Description:** `inter` font family declared but never loaded (dead token) — either a missing `<link>` or leftover config.
- **Recommended fix:** Remove, or load Inter if actually used somewhere (grep first).
- **Estimated effort:** Trivial

### Issue #018
- **Category:** 1 Visual Consistency
- **Severity:** Medium
- **Location:** 34 files under `src/components` & `src/pages` (grep: raw `#RRGGBB`)
- **Description:** Raw hex colors appear in 34 files. In a tokenized HSL system these should mostly be palette references; raw hex won't adapt to dark mode and drifts from the palette.
- **Recommended fix:** Sweep and replace with tokens where a semantic match exists; document any intentional brand exceptions (e.g. WhatsApp green).
- **Estimated effort:** Large **[per-file review]**

### Issue #019
- **Category:** 2 Layout & Responsive
- **Severity:** Medium
- **Location:** `index.css:135, 147` (`overflow-x: hidden` on `body` and `html`)
- **Description:** Horizontal overflow is *masked* globally via `overflow-x: hidden` on both `html` and `body`. This hides real overflow bugs rather than fixing them, and can break position:sticky in some browsers. Any element wider than viewport is silently clipped instead of surfaced.
- **Recommended fix:** Keep as a safety net but audit for the actual overflow sources at 320/375px **[needs runtime check]** so the hidden isn't masking layout breaks.
- **Estimated effort:** Medium

### Issue #020
- **Category:** 2 Layout & Responsive / 6 Accessibility
- **Severity:** Low
- **Location:** `src/index.css:162–185`
- **Description:** Good: a `max-width:768px` block enforces `min-height:44px` tap targets and 16px input font (prevents iOS zoom). But it applies `min-height:44px` to **all** `a` elements including inline text links, which can over-inflate inline links' hit area and cause layout oddities in paragraphs.
- **Recommended fix:** Scope the 44px rule to `a.button`, nav links, and standalone CTAs rather than every `<a>`.
- **Estimated effort:** Small

### Issue #021
- **Category:** 5 Motion & Transitions
- **Severity:** Low
- **Location:** `src/index.css:238–247` (`.btn-shine`)
- **Description:** The `.btn-shine` sweep uses a `0.5s` transition, inconsistent with the 150–250ms interaction standard used elsewhere; also always-on (see reduced-motion, Issue #005).
- **Recommended fix:** Align duration or gate behind reduced-motion.
- **Estimated effort:** Trivial

### Issue #022
- **Category:** 6 Accessibility
- **Severity:** Medium
- **Location:** site-wide route transitions (`App.tsx` router/Suspense)
- **Description:** SPA route changes don't appear to manage focus (no focus reset to `#main-content` / heading on navigation), so keyboard/SR users stay where they were after a page change. **[needs runtime check]**
- **Recommended fix:** On route change, move focus to the main heading or `#main-content` and optionally announce via an `aria-live` region.
- **Estimated effort:** Medium

### Issue #023
- **Category:** 3 Typography / contrast
- **Severity:** High
- **Location:** `src/index.css` light theme — `--secondary: 240 5% 33%` on `--background: 240 4% 95%`, and `--muted-foreground` (Issue #003)
- **Description:** Several token pairs need explicit contrast verification against AA. `--secondary-foreground`/`--secondary` and `--muted`/`--muted-foreground` combinations are suspect (the latter is broken per #003). Exact ratios must be computed. **[needs contrast computation per pair]**
- **Recommended fix:** Run each text/background token pair through a contrast checker; adjust lightness to meet 4.5:1 (normal) / 3:1 (large).
- **Estimated effort:** Medium

### Issue #024
- **Category:** 7 Performance
- **Severity:** Low
- **Location:** `index.html:260–270` (service worker registration) + `console.log` calls
- **Description:** Service-worker registration logs `SW registered` / `SW registration failed` to console on every load (`index.html:264, 266`) — leftover debug output shipping to production.
- **Recommended fix:** Remove or gate the `console.log`s behind a dev check.
- **Estimated effort:** Trivial

---

## Cross-Page Consistency Issues
- **Dual brand-color source** (token `--primary` vs raw `#8B5CF6`) appears in `button.tsx`, `index.css`, `index.html` — Issues #001-adjacent #012/#013/#018.
- **Two shadow systems** (#010) used interchangeably across cards/buttons.
- **Font voice ambiguity** (#016) — bare `font-sans` vs inherited body font differ.
- **Animations ignore reduced-motion** everywhere except one component (#005).

## Missing Elements (Not Found Anywhere)
- **Skip-to-content link** (#004) — target exists, link doesn't.
- **Global `prefers-reduced-motion` handling** (#005).
- **A single canonical spacing/shadow/z-index scale** — values are ad hoc.
- **Route-change focus management / aria-live** (#022).
- **A working muted text tier** (#003 — token is broken).

## Per-page deep sweep — NOT yet performed
The following routes still need an individual pass at the 8 breakpoints (320/375/425/768/1024/1280/1440/1920) for overflow, tap targets, empty/loading/error states, and per-page contrast: `/`, `/about`, `/services`, `/contact`, `/contact/confirmation`, `/faq`, `/how-it-works`, `/pricing`, `/privacy`, `/terms`, `/auth`, `/websites`, `/calculator`, `/blog`, `/blog/:slug`, `/site/:slugOrId`, `/24-hour-website`, `/same-day-delivery`, `/profile`, `/admin-panel`, `*` (404). These require the browser-based checks that the budget-limited workflow was meant to parallelize. I can do them inline, a few pages at a time, on request.

---

## Fixed in this session
- ✅ **#001** nested `<main>` → inner element changed to `<div>` (`AppLayout.tsx:19`).
- ✅ **#002** stale "24 hours" shell meta → updated to new positioning (`App.tsx:98`).
- ✅ **#003** broken muted tier → `--muted-foreground` set to `240 4% 40%` (light, 5.4:1 on bg) / `240 5% 65%` (dark, 6.92:1 on bg), both AA-verified (`index.css:30, 91`).

- ✅ **#004** skip-to-content link added as first focusable element (`AppLayout.tsx`).
- ✅ **#005** global `prefers-reduced-motion` block added (`index.css`, end of base layer).
- ✅ **#008** button `active:` pressed states + broadened transition/`active:scale-[0.98]` (`button.tsx`).
- ✅ **#023** contrast pairs computed (see below). No auto-fix applied — remaining failures all require shifting brand colors (your "preserve identity" constraint).

### #023 Contrast results (computed, WCAG 2.1)
Normal text needs 4.5:1, large text 3:1.

| Pair | Ratio | Verdict |
|------|-------|---------|
| LIGHT primary-fg on **primary** (main CTA: white on purple) | **3.81** | ⚠️ large-text only — **fails for normal-size button labels** |
| LIGHT accent-fg on accent | 3.73 | ⚠️ large-text only |
| LIGHT destructive-fg on destructive | 4.43 | ⚠️ just under 4.5 |
| LIGHT secondary-fg on secondary | 7.65 | ✅ AA |
| LIGHT foreground on background | 15.77 | ✅ AAA |
| DARK secondary/primary/accent/foreground | 4.58–16.93 | ✅ all AA |

**RESOLVED (option a applied):** all three light-mode pairs now pass AA, hue unchanged:
- `--primary` L 66%→**61%** → CTA contrast **3.81 → 4.77** ✅ (also updated the shared `--ring`, `--sidebar-primary`, `--sidebar-ring`, `--chart-4` that used the same value)
- `--accent-foreground` L 65%→**60%** → **3.73 → 4.51** ✅
- `--destructive` L 50%→**49%** → **4.43 → 4.59** ✅

Dark mode already passed; untouched. Shifts are ≤5 lightness points — perceptually minor, brand hue preserved.

### Production-readiness gap: Rate limiting (from stack review) — FIXED
- ✅ Added IP-based rate limiting to the public `send-contact-email` edge function: max **5 submissions per IP per 10 min**, returns 429 when exceeded. Client IP is stored only as a **salted SHA-256 hash** (`ip_hash`), never raw (privacy-preserving). Fail-open on DB error so real leads are never blocked. New migration `20260706120000_contact_rate_limit.sql` adds `ip_hash` + index; edge function now uses a single reused admin client.
- ⚠️ **Requires deploy** (migration + `supabase functions deploy send-contact-email`) to take effect — same deploy step still pending from the contact-form fixes.

All fixes verified via `tsc` (clean). Remaining items below are unfixed and await approval.

## Suggested Implementation Order
1. ~~**Critical:** #001, #002, #003~~ — **done**.
2. ~~**High:** #004, #005, #008, #023(computed)~~ — **done** (#009 font-loading, #010 shadows deferred — architectural, may shift visuals).
2. **High:** #004 (skip link), #005 (reduced-motion), #008 (button states), #009 (font loading), #010 (shadow system), #023 (contrast pairs).
3. **Medium:** #006, #007, #011, #016, #017, #018, #019, #022.
4. **Low:** #013, #014, #015, #020, #021, #024.
