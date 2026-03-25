# Portfolio — Project Scope

## Overview
A personal portfolio for Shweta Sharma, UX Researcher, built as an animation-heavy, scroll-driven single-page experience. The goal is to communicate personality, craft, and professional depth — not just list projects.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | CSS Modules + CSS custom properties (no Tailwind) |
| Animation | Framer Motion 12 + GSAP 3 + Lenis smooth scroll |
| Icons | Lucide React |
| Fonts | Inter Display (custom woff2), Kepler Std Extended Italic Display (custom woff2), IBM Plex Sans, IBM Plex Serif, JetBrains Mono |
| Images | Next.js `<Image>` component with optimized loading |
| External | Klyro widget (embedded analytics/survey) |

---

## Design System

### Color Palette
| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#f2f2f2` | Page background |
| `--color-surface` | `#ffffff` | Cards, panels |
| `--color-text` | `#1c1c1c` | Primary text |
| `--color-text-secondary` | `#595959` | Supporting text |
| `--color-accent` | `#8b69fa` | CTAs, highlights, scrollbar |
| `--color-border` | `#e8e8e8` | Dividers, outlines |
| `--color-lilac` | `#b59bff` | Display accents, cube colors |

### Typography
| Token | Font | Usage |
|---|---|---|
| `--font-primary` | Inter / IBM Plex Sans | Body copy, UI labels |
| `--font-display` | Inter Display (700/800) | Section titles, headings |
| `--font-script` | Kepler Std Extended Italic | Italic accent words in headings |

### Spacing
- `--space-xl`: 32px
- `--space-2xl`: 48px
- `--space-3xl`: 80px

### Radii
- `--radius-card`: 32px
- `--radius-pill`: 999px

### Responsive Breakpoints
| Breakpoint | Behavior |
|---|---|
| `≤ 1440px` | Slightly tighter font/layout |
| `≤ 1180px` | Grid collapses to single column |
| `≤ 768px` | Mobile layout, hide cube fields |
| `≤ 480px` | Small mobile refinements |

---

## Pages & Routes

| Route | File | Description |
|---|---|---|
| `/` | `src/app/page.tsx` | Home — all major sections stacked |
| `/experience` | `src/app/experience/page.tsx` | Full work history |
| `/work/abim` | `src/app/work/abim/page.tsx` | ABIM case study |
| `/work/crypto-secure` | — | CryptoSecure case study |
| `/work/design-thinking` | — | Design Thinking case study |
| `/work/gesturepro` | — | GesturePro case study |
| `/work/healthcare-bias` | — | Healthcare Bias case study |
| `/work/john-deere` | — | John Deere case study |
| `/work/personalization` | — | Personalization case study |
| `/work/stories-by-children` | — | Stories by Children case study |

---

## Section Architecture (Home Page)

### 1. Hero (`HeroSection.tsx`)
- 26-cube 3D grid explosion on load
- Profile bio with circular image
- Kepler script "UX" overlay
- Gradient fog layers for cinematic depth

### 2. About Me (`AboutMeSection.tsx`)
- 300vh sticky scroll container
- Word-by-word text reveal animation (Framer Motion scroll-driven)
- Heading scale + blur entrance
- 5 floating glass cube backgrounds

### 3. When I'm Not Researching (`AboutSection.tsx`)
- 400vh sticky scroll container
- **Heart animation**: 80 cubes tornado → assemble into pixel heart
- **3D carousel gallery**: 7 personal photos in a 360° rotating ring
  - 14 cards total (doubled for density)
  - 1100px radius, 280×380px cards
  - Front card scaled 1.4×, back cards fade/shrink
  - Parallax image pan inside card frame
  - Entry: cards rise from depth on scroll
  - Rotation: -540° sweep (shows all images)

### 4. Featured Work (`FeaturedWork.tsx`)
- Blueprint grid background aesthetic
- 2-column featured projects + 6-card "more work" grid
- Engineering corner marks, animated pill tags
- Hover lift effects on all cards

### 5. Work Experience (`WorkExperience.tsx`)
- Timeline data structure with expandable achievements

### 6. Contact (`ContactSection.tsx`)
- Physics-based draggable tool tiles (gravity, bounce, friction)
- Contact links (LinkedIn, Email, CV)
- "OPEN TO WORK" animated badge

---

## Key Component Files

```
src/
├── app/
│   ├── layout.tsx           Root layout (Navbar, CustomCursor, SmoothScroll, BackgroundScene)
│   ├── globals.css          Design tokens, reset, font imports
│   └── page.tsx             Home page assembly
└── components/
    ├── HeroSection.tsx/.css
    ├── AboutMeSection.tsx/.css
    ├── AboutSection.tsx/.css   ← "When I'm not researching" + carousel + heart
    ├── FeaturedWork.tsx/.css
    ├── WorkExperience.tsx/.css
    ├── ContactSection.tsx/.css
    ├── Navbar.tsx/.css
    ├── SmoothScroll.tsx         Lenis + GSAP ScrollTrigger integration
    ├── CustomCursor.tsx/.css
    ├── BackgroundScene.tsx/.css
    ├── GlassCube.tsx/.css
    └── casestudy/               Shared case study layout components
```

---

## Animation Architecture

### Scroll Driver
- **Lenis** handles smooth scrolling (duration 1.2s, exponential easing)
- **GSAP ScrollTrigger** syncs with Lenis via `requestAnimationFrame`
- **Framer Motion** `useScroll` + `useSpring` for per-section progress values

### Per-Section Pattern
Each animated section uses:
1. `useScroll({ target: sectionRef, offset: ["start end", "end start"] })` — raw scroll progress
2. `useSpring(scrollYProgress, { stiffness: 90, damping: 22 })` — smoothed progress
3. `useTransform` chains mapping progress → visual properties (opacity, scale, y, rotateY, etc.)

### Reduced Motion
All animation components check `useReducedMotion()` and render static fallbacks.

---

## Assets

| Path | Contents |
|---|---|
| `public/assets/SelfImages/` | 7 personal photos for carousel |
| `public/assets/` | Project cover images (Cryptosecure, Ecommerce, DesignThinking, etc.) |
| `public/assets/UX_Researcher_Resume.pdf` | CV download |

---

## Design Exploration Files (Untracked)

Located in `/Portfolio/` — these are design concept explorations not yet committed:
- `advanced-design-options.html`
- `more-design-options.html`
- `option-c-preview.html`
- `concept-poster.pdf`

---

## Known Constraints
- No Tailwind — all styling is pure CSS Modules with design tokens
- Custom cursor is active site-wide (`cursor: none` on body/links/buttons)
- Klyro widget requires `prevent` rule in SmoothScroll to allow native scrolling inside it
- 3D transforms use `transform-style: preserve-3d` and `perspective: 1500px` on carousel container
- `-webkit-box-reflect` used for glass reflection on gallery cards (Chrome/Safari only)
