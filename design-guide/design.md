# FloatLab — Design System

> **rev 2025.1 · v1.0**
> Dark-mode, terminal-flavored UI for an infrastructure / orchestration product.
> Source of truth: `design-system.html`, `FloatLab Logo.svg`, `FloatLab Logo Loader.html`.

---

## 1. Brand

**FloatLab** is a control surface for distributed compute — nodes, containers, replication, tunnels. The visual language is **operational, instrument-grade, and confident**: think NOC dashboard meets developer tool, not consumer SaaS.

**Voice**
- Mono-first, telegraphic, lowercase keys / UPPERCASE LABELS.
- Status before prose. Numbers are first-class citizens.
- Decorative chrome only where it earns attention (hero, primary CTA, live state).

**Logo mark**
Three stacked, isometric parallelograms — bars climbing right. Solid `green-400` fill on dark backgrounds. Single-color only; never gradient, never on busy imagery.

**Wordmark**
Manrope 700, `-0.02em` tracking. Set with the mark on its left at 1.0× cap height.

---

## 2. Color

All UI lives on a **dark, slightly-teal-shifted neutral**. Greens carry brand and "healthy"; reds/ambers/cyans carry semantic state. Saturation is restrained — no neon except inside the primary CTA's glow and the logo bloom.

### Surfaces
| Token | Value | Use |
|---|---|---|
| `--bg-void` | `rgb(9,15,17)` | Page background, terminals |
| `--bg-base` | `rgb(19,28,27)` | App body |
| `--bg-panel` | `rgb(13,26,27)` | Cards, modals, top bar |
| `--bg-elevated` | `rgb(20,49,44)` | Inputs, hovered cells |
| `--bg-hover` | `rgb(28,56,50)` | Sidebar / row hover |
| `--bg-selected` | `rgb(32,64,56)` | Active selection |

### Borders
`--border-subtle` `rgb(19,28,27)` · `--border-default` `rgb(40,75,59)` · `--border-strong` `rgb(56,96,76)` · `--border-focus` `rgb(73,212,155)`

### Brand Green (primary)
`100 → 800` ladder peaking at **`green-400 = rgb(73,212,155)`** ★ — the brand anchor. `--green-glow rgba(12,245,149,0.3)` is reserved for primary-CTA bloom and live "running" pulses.

### Semantic
- **Success / online** → `green-400`
- **Error / offline** → `red-400 rgb(226,92,117)`
- **Warning / degraded** → `amber-400 rgb(245,93,60)`
- **Info / pending** → `cyan-400 rgb(58,184,240)`

Each has a `300` (text on tinted bg), `400` (icon/dot), `500/600` (borders, deeper fills).

### Text
`--text-primary #fff` · `--text-secondary #f0f0f0` · `--text-dim rgba(240,240,240,.4)` · `--text-muted rgb(40,75,59)` · `--text-disabled rgb(40,48,50)` · `--text-inverse rgb(9,15,17)` (on green CTAs).

**Rule:** never invent new colors. Pull from this ladder; if you need something between, step on the existing scale.

---

## 3. Typography

Two families, no third.

| Family | Weight | Role |
|---|---|---|
| **IBM Plex Mono** | 300–700 | Default UI font. All labels, tables, terminal, body. |
| **Manrope** | 400–700 | Brand wordmark and select hero/marketing display. |

**Base:** `html { font-size: 13px; }` — UI is intentionally tight.

**Conventions**
- Section/eyebrow labels: 10px, `letter-spacing: 0.08–0.12em`, `UPPERCASE`, `--text-muted`.
- Body / table cells: 11–12px mono.
- Numbers, IDs, hashes: always mono.
- No italics in UI; reserve `<em>` for highlight in audit log (renders as `green-400`, upright).

---

## 4. Spacing, Radius, Shadow

**Spacing scale** (4px base, with extras at 28/40/48/56/64):
`--sp-1 4` · `2 8` · `3 12` · `4 16` · `5 20` · `6 24` · `7 28` · `8 32` · `9 40` · `10 48` · `11 56` · `12 64`

**Radius — small on purpose.** This UI is not soft.
`--r-sm 2px` (badges, segments) · `--r-md 4px` (inputs, buttons) · `--r-lg 6px` (panels, modals). Never exceed 6px.

**Shadows**
- `--shadow-sm 0 1px 3px rgba(0,0,0,.4)`
- `--shadow-md 0 4px 16px rgba(0,0,0,.5)` — popovers, toasts
- `--shadow-lg 0 8px 32px rgba(0,0,0,.6)` — modals, command palette
- `--shadow-glow-green` and `--shadow-glow-red` — reserved for live/critical state, **not decoration**.

---

## 5. Iconography

**Isometric, low-poly node icons** drawn in single-stroke green at the same axonometric projection as the logo. Used at small sizes (24–48px) inline with status badges. No gradients, no outlines mixing with fills.

For inline UI glyphs (search, close, caret, kbd) use simple monoline SVG in `--text-muted`.

**Never** use emoji. **Never** AI-draw a custom illustration in SVG — placeholder it.

---

## 6. Components

A condensed catalog (see `design-system.html` for live examples).

### Status & tags
- **`.badge`** — pill with pulsing dot for `running / healthy / online / offline / error / warning / degraded / info / pending / stopped`. Tinted bg (10–15%) + colored text.
- **`.app-tag`** — container/app name chip, color-coded per state, hover brightens.
- **`.role-chip`** — terse role label (`APP`, `REP`, `TUN`, `BAC`) in colored outline + 8% fill.

### Resource indicators (signature pattern)
- **`.res-bar-track`** — segmented terminal-style bar made of 5×8px tiles with 2px gap. Tiles light up `green / amber / red / cyan`. Replaces traditional progress fills everywhere.
- **`.dot-matrix`** — same primitive, used for CPU cores or per-disk arrays.
- **`.disk-cyl`** / **`.ram-stick`** — tiny isometric disk and DIMM glyphs that fill bottom-up to show utilization.
- **`.res-popover`** — appears above a bar on hover; lists per-process or per-volume breakdown.

> These are the system's most distinctive idiom — prefer them over solid bars or ring charts.

### Inputs
- **`.input`** — mono, `bg-elevated`, `border-default`. Focus = `green-400` border + 2px `rgba(73,212,155,0.12)` ring.
- **`.search-bar`** — panel-bg, includes icon + `⌘K` kbd hint.

### Buttons
- **`.btn--primary`** — solid `green-400` on `text-inverse`, with built-in scanline texture, glow, and hover sheen sweep. The only "loud" element in the system. Use sparingly.
- **`.btn--outline`** — green ghost outline.
- **`.btn--ghost`** — transparent, hover lifts to `bg-elevated`.
- **`.btn--danger`** — red outline, glow on hover.
- **`.btn--icon`** — square 28×28-ish utility button.
- Sizes: `--sm` (10px) · default (11px) · `--lg` (12px).

### Surfaces
- **`.panel`** — `bg-panel` + `border-default` + `r-lg`. Header is uppercase 10px label + right-aligned actions.
- **`.modal`** — same chrome, `border-strong`, `shadow-lg`, footer in `bg-elevated`.
- **`.cmd-palette`** — fixed 560px max, results list with icon · label · meta · kbd.
- **`.terminal`** — `bg-void` background, mono 11px / 1.7 line-height, log lines: `time · LEVEL · msg`. Levels colored by semantic palette. Blinking caret prompt.

### Tables
- **`.data-table`** — borderless rows with 1px subtle separators. Header: 10px uppercase muted. Hover row → `bg-elevated`. Cells stay mono; mix in `app-tag` / `badge` / `res-bar-track` inline.

### Tabs
- Underline-style, 11px uppercase, active tab gets a `green-400` 2px bottom border.

### Top bar
- 48px, `bg-panel`, includes mark + workspace selector (the workspace pill is a **filled `green-400` button** — the second loud element after primary CTA).
- Right cluster: status indicators (warn dot), icon buttons.

### Sidebar
- 11px mono items, 6×8 padding, hover `bg-hover`, active `bg-selected` + `border-strong`. Offline items at 0.5 opacity.

### Toasts & Alerts
- **`.toast`** — `bg-panel` card with 3px left accent stripe matching variant. 280–400px wide.
- **`.alert-item`** — clickable list row, unread state shows 2px green left border.

### Audit log
- Row: `time · actor (cyan) · event · target (muted)`. `<em>` highlight is brand green; `.highlight-red` for destructive.

---

## 7. Motion

**Tokens**
- `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` — default for entrances, hovers
- `--ease-in: cubic-bezier(0.4, 0, 1, 1)` — exits
- `--dur-fast 80ms` · `--dur-mid 160ms` · `--dur-slow 320ms`

**Patterns**
- **Pulse dots** — live `running / warning / pending` badges pulse at 2s with an expanding shadow ring. Off-states never pulse.
- **Row enter** — table rows fade in with a 6px upward translate, staggered ~60ms.
- **Spinner** — 20px ring, `green-400` top, 0.8s linear.
- **Skeleton shimmer** — 1.5s linear gradient sweep over `bg-elevated → bg-hover`.
- **Scanline** — decorative 2px sweep over terminal-style stages, 2s linear.
- **Caret blink** — 1.2s `step-end`.

**Reduced motion:** all looping animations disable; pulses/blinks resolve to a static 0.7 opacity.

### Logo loader (signature animation)
Three SVG bars cycling with **500ms stagger** over a **1.5s loop**, easing in to bright `green-400` + 12px `rgba(12,245,149,0.85)` drop-shadow, then back to `0.18` rest opacity.

Variants:
- **Blink** (default, 1.5–1.8s) — splash, status pills, hero.
- **Cascade** (2.4s) — sequential fill that holds, for longer-running ops.
- **Scan** (1.05s, slight 1.03× scale punch) — fast / urgent contexts.

Use the loader anywhere FloatLab is doing work on the user's behalf — boot splash, container deploy pill, sync indicator. Never bigger than 180px; never on light backgrounds.

---

## 8. Layout

- **Page max-width: 1200px**, centered, with `--sp-12` (64px) vertical / `--sp-8` (32px) horizontal padding.
- Two- and three-column helpers (`.two-col`, `.three-col`) collapse to single-column under 700px.
- Section heads use a numbered eyebrow: `<span>01</span>` in green-400 + uppercase muted title with bottom rule.

---

## 9. Principles

1. **Information density is a feature.** Tighten before you loosen.
2. **State is visual.** Color, pulse, fill — never rely on text alone for status.
3. **Mono is the default.** Manrope is a guest, used at brand moments only.
4. **Restrain saturation.** Greens aside, semantic colors sit at ~10–15% fill alpha.
5. **Two loud elements per screen, max** — typically the primary CTA and the workspace selector. Everything else whispers.
6. **Small radii, tight gaps, hairline borders.** This is an instrument, not an app store card.
7. **Motion serves status.** Animate live data; don't animate decoration.
8. **Honor reduced-motion.** All pulses and sweeps degrade gracefully.
