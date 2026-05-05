# MTDev — Technical Specification for Claude Code

> This document is the single source of truth for building the MTDev studio website.
> Read it fully before writing any code. Do not invent anything not specified here.

---

## 1. PROJECT OVERVIEW

**Studio name:** MTDev  
**Type:** Multi-page marketing website + portfolio  
**Goal:** Attract businesses and startups, showcase work, collect project inquiries via form  
**Languages:** English + Russian (language switcher in nav)  
**Deployment:** Vercel  

---

## 2. TECH STACK

```
next: ^15.5.15 (App Router)
typescript: latest
tailwindcss: latest
gsap: latest (with ScrollTrigger plugin)
@studio-freight/lenis: latest (smooth scroll)
framer-motion: latest (page transitions)
three: latest (background grid)
@types/three: latest
next/font (Geist from next/font/google)
```

Install all at project start. No other animation or 3D libraries.

---

## 3. FILE STRUCTURE

```
/app
  layout.tsx              — root layout: fonts, Lenis, SmoothScroll, PageTransition, cursor
  page.tsx                — homepage: Hero + Portfolio + Services + Process + About snippet + Contact CTA
  globals.css             — CSS variables, resets, base styles
  /about
    page.tsx
  /work
    page.tsx              — full portfolio grid
    /[slug]
      page.tsx            — case study page
  /contact
    page.tsx

/components
  /layout
    Nav.tsx               — navigation with language switcher and theme toggle
    Footer.tsx
    PageTransition.tsx    — orange bar transition wrapper
    SmoothScroll.tsx      — Lenis provider
  /canvas
    GridBackground.tsx    — Three.js interactive grid, rendered once, fixed position
  /cursor
    Cursor.tsx            — custom small cursor dot
  /sections
    Hero.tsx
    PortfolioGrid.tsx     — homepage 3-card asymmetric grid
    Services.tsx
    Process.tsx
    AboutSnippet.tsx      — short about block on homepage
    ContactCTA.tsx        — contact call to action on homepage
  /work
    WorkGrid.tsx          — full portfolio grid on /work
    WorkCard.tsx          — single card with hover behavior
    CaseHero.tsx          — fullscreen site preview on case page
    CaseContent.tsx       — case study text content
  /ui
    Button.tsx
    Tag.tsx
    SectionLabel.tsx

/lib
  projects.ts             — project data (source of truth)
  i18n.ts                 — all site copy EN + RU

/hooks
  useLanguage.ts          — language state (EN/RU), stored in localStorage
  useTheme.ts             — theme state (dark/light), stored in localStorage
```

---

## 4. DESIGN SYSTEM

### 4.1 Colors

```css
/* globals.css */
:root {
  /* Dark theme (default) */
  --bg:        #0A0A0A;
  --bg-2:      #111111;
  --fg:        #F0EDE8;
  --fg-2:      #888888;
  --fg-3:      #444444;
  --orange:    #FF5500;
  --orange-10: rgba(255, 85, 0, 0.10);
  --orange-20: rgba(255, 85, 0, 0.20);
  --border:    rgba(255, 255, 255, 0.07);
  --grid-line: rgba(255, 255, 255, 0.04);
}

[data-theme="light"] {
  --bg:        #F5F2ED;
  --bg-2:      #ECEAE5;
  --fg:        #0A0A0A;
  --fg-2:      #666666;
  --fg-3:      #BBBBBB;
  --border:    rgba(0, 0, 0, 0.07);
  --grid-line: rgba(0, 0, 0, 0.04);
  /* --orange stays the same in both themes */
}
```

### 4.2 Typography

```tsx
// app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})
```

```css
/* Usage in globals.css */
body {
  font-family: var(--font-geist), sans-serif;
  background: var(--bg);
  color: var(--fg);
}

.mono {
  font-family: var(--font-geist-mono), monospace;
}
```

### 4.3 Type Scale

```css
--text-xs:   11px;  /* labels, tags, nav links */
--text-sm:   13px;  /* body small */
--text-base: 15px;  /* body */
--text-lg:   18px;  /* lead */
--text-xl:   24px;  /* subheadings */
--text-2xl:  32px;  /* section headings small */
--text-3xl:  48px;  /* section headings */
--text-hero: clamp(52px, 8vw, 108px); /* hero headline */
```

### 4.4 Spacing & Layout

```css
--container: 1280px;
--gutter:    40px;   /* 20px on mobile */
--section-v: 120px;  /* vertical padding per section, 80px mobile */
```

### 4.5 Transitions

```css
--ease:      cubic-bezier(0.16, 1, 0.3, 1);  /* all UI transitions */
--ease-out:  cubic-bezier(0.0, 0.0, 0.2, 1);
--dur-fast:  0.2s;
--dur-base:  0.4s;
--dur-slow:  0.7s;
```

---

## 5. COMPONENTS — DETAILED SPEC

---

### 5.1 GridBackground.tsx

**What:** Three.js canvas, fixed to viewport, behind all content, pointer-events none.  
**Renders once on mount, never unmounts.**

**Setup:**
```
Scene: THREE.Scene
Camera: THREE.OrthographicCamera matching viewport
Renderer: THREE.WebGLRenderer, alpha: true, antialias: true
Canvas: position fixed, inset 0, z-index 0, pointer-events none
```

**Geometry:**
```
Grid of points (not PlaneGeometry).
Spacing: 60px
Cols: Math.ceil(window.innerWidth / 60) + 1
Rows: Math.ceil(window.innerHeight / 60) + 1
Draw lines between adjacent points using THREE.LineSegments or BufferGeometry lines.
Line color: var(--grid-line) → in Three.js use 0xffffff with opacity 0.04 dark / 0x000000 opacity 0.04 light
```

**Mouse interaction:**
```
Track mousemove on window.
For each grid point, calculate distance to mouse.
If distance < 150px:
  displace point toward mouse by: (1 - dist/150) * 28px
  displace both X and Y proportionally to direction vector
Points smoothly return to origin: lerp factor 0.08 per frame
Intersection nodes (grid points) near cursor glow orange:
  opacity of orange dot at node = (1 - dist/120) * 0.6
  render as small THREE.Points with orange color, size 3px
```

**Scroll interaction:**
```
Read window.scrollY each frame.
Offset entire grid Y by scrollY * 0.15 (parallax, grid moves slower than content)
```

**Theme change:**
```
Listen for [data-theme] attribute change on document.
Update line material color accordingly.
```

**Performance:**
```
RequestAnimationFrame loop.
Dispose on component unmount.
Renderer pixel ratio: Math.min(window.devicePixelRatio, 2)
```

---

### 5.2 Cursor.tsx

**What:** Replaces default cursor. Small, minimal, never distracts.

```
Default state:
  - dot: 7px × 7px circle
  - color: var(--orange)
  - position: follows mouse with slight lag (lerp 0.15)
  - mix-blend-mode: normal
  - z-index: 9999
  - pointer-events: none

Hover state (on <a>, <button>, [data-cursor]):
  - dot shrinks to 4px
  - a small text label appears next to dot: content from data-cursor attribute
  - label font: Geist Mono, 10px, color var(--fg-2)
  - label fades in over 0.15s

Hidden state:
  - hide cursor dot when mouse leaves window
  - hide on touch devices (detect via pointer: coarse)
```

**Implementation:** Use `useEffect` with `requestAnimationFrame` for smooth lerp. Render as fixed `div`, not canvas.

---

### 5.3 Nav.tsx

**Layout:**
```
Fixed top. Height 56px. Full width.
Background: var(--bg) at 85% opacity, backdrop-filter blur(16px)
Border bottom: 0.5px solid var(--border)
z-index: 100

Left:   Logo "MTDev" — Geist, 14px, weight 600, letter-spacing 0.08em
Center: Nav links — Work / About / Process / Contact (EN) or Работы / О нас / Процесс / Контакт (RU)
Right:  [EN/RU toggle] [theme toggle] [Start a project →]
```

**Nav links:**
```
Font: Geist, 12px, weight 400, letter-spacing 0.06em
Color: var(--fg-2)
Hover: color var(--fg), transition 0.2s
Active page: color var(--fg), weight 500
data-cursor="view" on each link
```

**Language toggle:**
```
Simple text button: "EN" / "RU"
Font: Geist Mono, 11px
Click toggles useLanguage hook
No animation needed, just instant switch
```

**Theme toggle:**
```
Icon only — sun/moon SVG, 16px
Click triggers circle wipe transition then toggles theme
```

**CTA button:**
```
Text: "Start a project" / "Начать проект"
Style: border 0.5px solid var(--orange), color var(--orange), padding 8px 16px, border-radius 4px
Hover: background var(--orange-10)
Font: Geist, 12px
Links to /contact
data-cursor="open"
```

---

### 5.4 PageTransition.tsx

**What:** Wraps all page content. On route change, an orange bar sweeps across the screen.

**Behavior:**
```
Exit animation:
  1. Orange bar (full width, 3px height) starts at left: -100%, top: 45vh
  2. Animates to left: 0 over 0.35s ease-in
  3. Bar expands height to 100vh over 0.1s
  4. Page content fades out opacity 0 over 0.15s (starts when bar hits center)

Enter animation:
  1. New page renders behind bar (opacity 0)
  2. Bar sweeps right: animates to left: 100% over 0.35s ease-out
  3. Page content fades in opacity 1 over 0.25s

Total transition time: ~0.7s
```

**Implementation:** Use Framer Motion `AnimatePresence` with custom variants. Orange bar is a fixed `div` managed by a global transition context.

---

### 5.5 SmoothScroll.tsx

```tsx
'use client'
import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])
  return <>{children}</>
}
```

---

### 5.6 Hero.tsx

**Layout:**
```
min-height: 100vh
display: flex, flex-direction: column, justify-content: center
padding: var(--gutter), padding-top: 56px (nav height)
```

**Elements (top to bottom):**
```
1. Tag label — "Digital Studio · Almaty" / "Диджитал Студия · Алматы"
   Font: Geist Mono, 11px, color var(--orange), letter-spacing 0.16em, uppercase
   Left side: short 16px orange line before text

2. Main headline — "Websites built\nto be noticed." / "Сайты, которые\nневозможно не заметить."
   Font: Geist, var(--text-hero), weight 700, line-height 0.92, letter-spacing -0.03em
   Color: var(--fg)
   "noticed" / "заметить" — color var(--orange)

3. Subheadline
   Font: Geist, 15px, weight 400, line-height 1.65
   Color: var(--fg-2)
   Max-width: 380px
   Margin-top: 28px

4. CTA row
   Margin-top: 44px
   [View our work] button — filled orange, color white, 12px Geist Mono uppercase, padding 13px 28px, border-radius 4px
   [How we work →] — ghost, color var(--fg-2), 12px, hover color var(--fg)

5. Bottom bar (absolute bottom 36px, full width)
   Left: scroll indicator — vertical 0.5px line 28px + "Scroll" text 10px Geist Mono
   Center: nothing
   Right: page counter "001 / 004" — 10px Geist Mono, color var(--fg-3)
```

**Parallax on headline:**
```
useEffect: track mousemove
translateX: (mouseX - centerX) * 0.015
translateY: (mouseY - centerY) * 0.015
Apply to headline element via transform
Lerp factor 0.05 — very slow follow, barely perceptible
```

**Entrance animation (GSAP):**
```
On mount, timeline:
  t=0:    tag label: y: 10 → 0, opacity 0 → 1, duration 0.5
  t=0.1:  headline line 1: y: 30 → 0, opacity 0 → 1, duration 0.6
  t=0.25: headline line 2: y: 30 → 0, opacity 0 → 1, duration 0.6
  t=0.4:  subheadline: y: 16 → 0, opacity 0 → 1, duration 0.5
  t=0.55: CTA row: y: 12 → 0, opacity 0 → 1, duration 0.4
  t=0.65: bottom bar: opacity 0 → 1, duration 0.4
All easing: power2.out
```

---

### 5.7 PortfolioGrid.tsx (homepage)

**Layout — asymmetric CSS Grid:**
```
grid-template-columns: 1fr 1fr
grid-template-rows: auto

Card 1 (SquidWTF):    col 1, row 1 — aspect-ratio 4/3
Card 2 (Monochrome):  col 2, row 1 — aspect-ratio 4/3
Card 3 (Blue River):  col 1-2, row 2 — aspect-ratio 21/9 (full width, cinematic)

Gap: 3px
```

**WorkCard.tsx behavior:**
```
Default state:
  - Background: screenshot image, object-fit cover
  - Overlay: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)
  - Bottom left: project name + tags
  - Cursor: data-cursor="view"

Hover state (CSS transition, duration 0.4s ease):
  - Image scale: 1 → 1.04 (on inner image element, card clips overflow hidden)
  - Overlay darkens slightly
  - Bottom bar slides up 8px
  - Top right corner: small "↗" link appears (opacity 0 → 1, translateY 4 → 0)

Click: navigate to /work/[slug] via Next.js router with PageTransition
```

**Card text:**
```
Project name: Geist, 16px, weight 500, color white
Tags: Geist Mono, 10px, letter-spacing 0.1em, color rgba(255,255,255,0.5), uppercase
```

**Section above grid:**
```
Row: "Work" label left — "All projects →" right
Label: Geist Mono, 11px, color var(--fg-2), uppercase, letter-spacing 0.16em
Link: Geist, 13px, color var(--orange), hover underline
```

**Scroll entrance (GSAP ScrollTrigger):**
```
Section label: opacity 0 → 1, y 10 → 0, trigger: top 85%
Cards stagger: opacity 0 → 1, y 30 → 0, stagger 0.12s, trigger: top 80%
Duration: 0.7s, ease: power2.out
```

---

### 5.8 Services.tsx

**Layout:**
```
Section label: "What we do" / "Что мы делаем"
Headline: "The full stack, without the agency overhead." / "Полный стек — без раздутой команды."

5-column grid of service items.
Each item:
  - Number: "01" etc — Geist Mono 11px, color var(--orange)
  - Title: Geist 16px weight 500
  - Description: Geist 13px color var(--fg-2) line-height 1.6
  - Top border: 0.5px solid var(--border) — animates width 0 → 100% on scroll
  - Hover: background var(--orange-10), transition 0.2s
```

**Scroll animation:**
```
Top borders draw left to right on scroll (width 0% → 100%, duration 0.8s each, stagger 0.1s)
Then items fade in: opacity 0 → 1, y 16 → 0, stagger 0.08s
```

---

### 5.9 Process.tsx

**Layout:**
```
Section label: "How we work" / "Как мы работаем"
Headline: "Four steps. A few days." / "Четыре шага. Несколько дней."

4 items in a row (2-col on mobile).
Each item:
  - Step number: "01" large, Geist Mono, 48px, weight 700, color var(--fg-3)
  - Label: Geist, 16px, weight 500, color var(--fg)
  - Description: Geist, 13px, color var(--fg-2), line-height 1.65
  - Vertical line on left: 0.5px solid var(--border), height 0 → 100% animated on scroll
```

**Scroll animation:**
```
Vertical lines draw top to bottom, stagger 0.15s
Numbers count up from 0 to their value on scroll enter
Items fade in y 20 → 0, stagger 0.1s
```

---

### 5.10 AboutSnippet.tsx (homepage block)

**Layout:**
```
Two columns: 60% text / 40% stats

Left:
  Section label: "About" / "О нас"
  Headline: "Built in Almaty.\nBuilt to last." / "Сделано в Алматы.\nСделано надолго."
  Paragraph: studio description (from copy)
  Bold statement: "Every project gets everyone." / "Каждый проект получает всю команду."
  Link: "Learn more →" → /about

Right (stats, stacked vertically):
  Three stat blocks:
    Large number + label
    "7"   People on every project / Человек на каждом проекте
    "2"   Average days to delivery / Средний срок в днях
    "$1K" Starting price / Стартовая цена
  
  Numbers animate (count up) when scrolled into view
  Separator lines between stats: 0.5px solid var(--border)
```

---

### 5.11 ContactCTA.tsx (homepage)

**Layout:**
```
Full-width section, centered content.
Large headline: "Let's build something." / "Давайте построим что-то."
Subtext: 1 sentence from copy
Button → /contact (orange filled)
```

**Animation:**
```
Headline clip-path reveal: clipPath "inset(0 100% 0 0)" → "inset(0 0% 0 0)"
Duration 0.8s, ease power3.out, trigger scroll
```

---

### 5.12 CaseHero.tsx

**Layout:**
```
Full viewport height (100vh), no padding top (behind nav)
Background: screenshot of project at full size, object-fit cover
Dark overlay: rgba(0,0,0,0.4)

Content centered:
  Tag: project type tags
  Title: project name, var(--text-hero) * 0.6, weight 700
  One-liner: 15px, color rgba(255,255,255,0.7)
  "Visit site →" link — opens in new tab, color var(--orange)

Bottom: scroll hint "↓ Case study"
```

---

### 5.13 CaseContent.tsx

**Layout:**
```
Max-width: 760px, centered, padding: 100px var(--gutter)

Sections in order:
  1. Tags row (Web App · UI/UX · Music etc)
  2. "Challenge" label + text
  3. "Solution" label + text
  4. "Result" label + text
  5. "Visit site →" link

Section labels: Geist Mono 10px, var(--orange), uppercase, letter-spacing 0.16em
Body text: Geist 16px, line-height 1.75, var(--fg)
```

**Scroll animation:**
```
Each section: opacity 0 → 1, y 24 → 0, duration 0.6s, stagger 0.15s
ScrollTrigger: start "top 80%"
```

---

### 5.14 Footer.tsx

```
Border top: 0.5px solid var(--border)
Padding: 40px var(--gutter)
Layout: 3 columns
  Left:  Logo "MTDev" + tagline below
  Center: Nav links (same as nav)
  Right: "© 2025 MTDev" + Privacy Policy link
Font: Geist 12px, color var(--fg-2)
```

---

## 6. PAGES

### 6.1 Homepage `/` — app/page.tsx

```tsx
<Hero />
<PortfolioGrid />      {/* 3 projects, asymmetric grid */}
<Services />
<Process />
<AboutSnippet />
<ContactCTA />
```

### 6.2 Work page `/work` — app/work/page.tsx

```
Same asymmetric grid as homepage but shows all 3 projects.
Page headline: "Work" / "Работы" — large, var(--text-3xl)
Subtext: "Selected projects — 2025" / "Избранные проекты — 2025"
```

### 6.3 Case study `/work/[slug]` — app/work/[slug]/page.tsx

```tsx
<CaseHero project={project} />
<CaseContent project={project} />
```

Data comes from `lib/projects.ts` matched by slug.

### 6.4 About page `/about` — app/about/page.tsx

```
Page headline: "Built in Almaty. Built to last."
Studio description paragraph
Bold statement
Stats row (same 3 stats as snippet)
Services list (same as homepage Services section)
```

### 6.5 Contact page `/contact` — app/contact/page.tsx

```
Headline: "Let's build something." / "Давайте построим что-то."
Subtext paragraph
Form:
  Fields: Name, Company, Project description, Budget (all text inputs)
  Submit button
  Note below: "We respond within 24 hours." / "Мы отвечаем в течение 24 часов."

Form: use React state, no library. On submit: POST to /api/contact (stub, just console.log for now)
Validation: all fields required, show inline error if empty on submit
```

---

## 7. DATA — lib/projects.ts

```typescript
export interface Project {
  slug: string
  name: string
  url: string
  screenshotPath: string   // /images/[slug].jpg — place screenshots in /public/images/
  cardLabel: { en: string; ru: string }
  tags: string[]
  oneLiner: { en: string; ru: string }
  challenge: { en: string; ru: string }
  solution: { en: string; ru: string }
  result: { en: string; ru: string }
  gridSize: 'normal' | 'wide'   // wide = full-width card
}

export const projects: Project[] = [
  {
    slug: 'squidwtf',
    name: 'SquidWTF',
    url: 'https://qobuz.squid.wtf',
    screenshotPath: '/images/squidwtf.jpg',
    cardLabel: {
      en: 'Music downloader for audiophiles',
      ru: 'Музыкальный загрузчик для аудиофилов',
    },
    tags: ['Web App', 'UI/UX', 'Music'],
    oneLiner: {
      en: 'A browser-based interface for Qobuz that turns a command-line workflow into something you actually want to use.',
      ru: 'Браузерный интерфейс для Qobuz — для тех, кто хочет музыку в высоком качестве без командной строки.',
    },
    challenge: {
      en: 'Downloading high-quality audio from Qobuz required technical knowledge and comfort with the command line — putting it out of reach for most users.',
      ru: 'Загрузка аудио высокого качества с Qobuz требовала технических знаний и работы в терминале — большинству пользователей это недоступно.',
    },
    solution: {
      en: 'We designed and built a clean, fast browser interface that handles the entire download flow without exposing any technical complexity. Search, select, download — three steps, no friction.',
      ru: 'Мы спроектировали и разработали чистый быстрый браузерный интерфейс, который берёт на себя весь процесс загрузки без технических сложностей. Поиск, выбор, скачивание — три шага, ноль лишнего.',
    },
    result: {
      en: 'A production-ready web app that makes high-quality music accessible to anyone — not just developers.',
      ru: 'Готовое к продакшену веб-приложение, которое делает музыку высокого качества доступной для любого пользователя.',
    },
    gridSize: 'normal',
  },
  {
    slug: 'monochrome',
    name: 'Monochrome',
    url: '#',  // update when live
    screenshotPath: '/images/monochrome.jpg',
    cardLabel: {
      en: 'Browser music player, refined',
      ru: 'Браузерный плеер без компромиссов',
    },
    tags: ['Web App', 'UI/UX', 'Music'],
    oneLiner: {
      en: 'A desktop-grade music player in the browser — library, editorial picks, and rare releases in one clean dark interface.',
      ru: 'Музыкальный плеер уровня десктопного приложения — прямо в браузере.',
    },
    challenge: {
      en: 'Streaming platforms are bloated and cluttered. Users who care about music needed a player that felt focused, fast, and built for listening — not engagement metrics.',
      ru: 'Стриминговые платформы перегружены и работают на удержание, а не на слушателя. Нужен был плеер — сфокусированный, быстрый, без лишнего.',
    },
    solution: {
      en: 'We built Monochrome as a browser application that behaves like a native desktop app. Sidebar navigation, persistent playback, editorial picks, and access to rare material — all in a minimal dark interface with no visual noise.',
      ru: 'Мы создали Monochrome как браузерное приложение, которое ведёт себя как нативный десктоп. Sidebar-навигация, непрерывное воспроизведение, редакционные подборки и редкие релизы — в минималистичном тёмном интерфейсе без визуального шума.',
    },
    result: {
      en: 'A music player that respects the listener. Clean, functional, and genuinely different from what the market offers.',
      ru: 'Музыкальный плеер, который уважает слушателя. Чистый, функциональный и непохожий на то, что есть на рынке.',
    },
    gridSize: 'normal',
  },
  {
    slug: 'blueriver',
    name: 'Blue River',
    url: 'https://traiding-company-almaty-blue-river-2555.fly.dev',
    screenshotPath: '/images/blueriver.jpg',
    cardLabel: {
      en: 'E-commerce with a visual identity',
      ru: 'Интернет-магазин с характером',
    },
    tags: ['E-commerce', 'UI/UX', 'Web'],
    oneLiner: {
      en: 'A full-cycle online store for an Almaty trading company — aesthetic goods in conceptual collections, built for real commerce.',
      ru: 'Полноценный интернет-магазин для алматинской компании — эстетичные товары в концептуальных коллекциях с полным циклом покупки.',
    },
    challenge: {
      en: 'The client sold visually distinctive products but had no online presence that matched their aesthetic. They needed a store that felt as considered as the goods inside it, with a complete purchase flow.',
      ru: 'Клиент продавал визуально сильные товары, но не имел онлайн-присутствия, которое соответствовало бы их уровню. Нужен был магазин, выглядящий так же продуманно, как сам продукт.',
    },
    solution: {
      en: 'We structured the catalog around four conceptual collections: Nature, Urban, Ocean, and Space. We built the full purchase cycle: product pages, cart, favorites, account, and support. The interface is minimal and image-forward.',
      ru: 'Мы выстроили каталог вокруг четырёх концептуальных коллекций: Nature, Urban, Ocean и Space. Разработали полный цикл покупки: карточки товаров, корзина, избранное, личный кабинет и поддержка.',
    },
    result: {
      en: 'A complete e-commerce platform that gives Blue River a digital presence as strong as their product selection.',
      ru: 'Полноценная e-commerce платформа, которая даёт Blue River такое же сильное онлайн-присутствие, как и их ассортимент.',
    },
    gridSize: 'wide',
  },
]
```

---

## 8. INTERNATIONALIZATION — lib/i18n.ts

```typescript
export type Lang = 'en' | 'ru'

export const t = {
  nav: {
    work:    { en: 'Work',    ru: 'Работы' },
    about:   { en: 'About',   ru: 'О нас' },
    process: { en: 'Process', ru: 'Процесс' },
    contact: { en: 'Contact', ru: 'Контакт' },
    cta:     { en: 'Start a project', ru: 'Начать проект' },
  },
  hero: {
    tag:      { en: 'Digital Studio · Almaty', ru: 'Диджитал Студия · Алматы' },
    headline: { en: 'Websites built\nto be noticed.', ru: 'Сайты, которые\nневозможно не заметить.' },
    sub:      { en: 'MTDev is an Almaty-based studio building premium digital experiences for businesses and startups. Seven people. One project at a time. Delivered in days, not months.', ru: 'MTDev — студия из Алматы. Мы создаём премиальные digital-продукты для бизнеса и стартапов. Семь специалистов. Один проект в работе. Готово за дни, а не месяцы.' },
    ctaPrimary:   { en: 'View our work',   ru: 'Смотреть работы' },
    ctaSecondary: { en: 'How we work →',  ru: 'Как мы работаем →' },
    scrollHint:   { en: 'Scroll', ru: 'Скролл' },
  },
  portfolio: {
    label:    { en: 'Work',           ru: 'Работы' },
    seeAll:   { en: 'All projects →', ru: 'Все проекты →' },
  },
  services: {
    label:    { en: 'What we do',     ru: 'Что мы делаем' },
    headline: { en: 'The full stack, without the agency overhead.', ru: 'Полный стек — без раздутой команды.' },
    items: [
      { en: { title: 'Web Design',         desc: 'Interfaces built around clarity, hierarchy, and visual impact.' },
        ru: { title: 'Веб-дизайн',         desc: 'Интерфейсы, построенные на ясности, иерархии и визуальном воздействии.' } },
      { en: { title: 'Web Development',    desc: 'Production-grade code. Next.js, TypeScript, built to scale.' },
        ru: { title: 'Разработка',         desc: 'Продакшн-код. Next.js, TypeScript, с расчётом на рост.' } },
      { en: { title: 'Motion & Animation', desc: 'Scroll animations and interactions that enhance, never distract.' },
        ru: { title: 'Анимация и motion',  desc: 'Анимации при скролле, которые дополняют опыт, а не мешают ему.' } },
      { en: { title: 'E-commerce',         desc: 'Online stores built for real purchase flows — catalog to checkout.' },
        ru: { title: 'E-commerce',         desc: 'Интернет-магазины с реальным циклом покупки — от каталога до оплаты.' } },
      { en: { title: 'Web Apps & UI',      desc: 'Complex browser applications with interfaces users understand.' },
        ru: { title: 'Веб-приложения',     desc: 'Сложные браузерные приложения с понятными интерфейсами.' } },
    ],
  },
  process: {
    label:    { en: 'How we work',          ru: 'Как мы работаем' },
    headline: { en: 'Four steps. A few days.', ru: 'Четыре шага. Несколько дней.' },
    steps: [
      { en: { label: 'Brief & Discovery', desc: 'We learn your goals, audience, and constraints. One focused conversation is usually enough.' },
        ru: { label: 'Бриф и погружение', desc: 'Узнаём ваши цели, аудиторию и ограничения. Обычно хватает одного разговора.' } },
      { en: { label: 'Design',            desc: 'We design the full interface — no generic templates, no placeholders.' },
        ru: { label: 'Дизайн',            desc: 'Проектируем полный интерфейс — без шаблонов и заглушек.' } },
      { en: { label: 'Development',       desc: 'The entire team builds in parallel. Clean code, tested, production-ready.' },
        ru: { label: 'Разработка',        desc: 'Вся команда строит параллельно. Чистый код, протестированный, готовый к запуску.' } },
      { en: { label: 'Launch',            desc: 'We deploy, hand over, and stay available. The relationship does not end at launch.' },
        ru: { label: 'Запуск',            desc: 'Деплоим, передаём, остаёмся на связи. Отношения не заканчиваются на запуске.' } },
    ],
  },
  about: {
    label:     { en: 'About',  ru: 'О нас' },
    headline:  { en: 'Built in Almaty.\nBuilt to last.', ru: 'Сделано в Алматы.\nСделано надолго.' },
    paragraph: { en: 'MTDev was founded in 2025 with one conviction: that speed and quality are not opposites. We are a team of seven specialists based in Almaty, working exclusively with businesses and startups who want a digital presence that performs at the highest level. We dedicate the full team to one client at a time — that is how we deliver in days without cutting corners.',
                 ru: 'MTDev основана в 2025 году с одним убеждением: скорость и качество — не противоположности. Нас семь специалистов из Алматы. Мы работаем с бизнесом и стартапами, которым нужно цифровое присутствие на высшем уровне. Мы отдаём всю команду одному клиенту — именно поэтому сдаём за дни и без компромиссов.' },
    statement: { en: 'Every project gets everyone.', ru: 'Каждый проект получает всю команду.' },
    teamNote:  { en: '7 specialists · 1 project at a time · Almaty', ru: '7 специалистов · 1 проект одновременно · Алматы' },
    learnMore: { en: 'Learn more →', ru: 'Подробнее →' },
    stats: [
      { value: '7',   label: { en: 'People on every project',       ru: 'Человек на каждом проекте' } },
      { value: '2',   label: { en: 'Average days to delivery',      ru: 'Средний срок сдачи в днях' } },
      { value: '$1K', label: { en: 'Starting price',                ru: 'Стартовая цена' } },
    ],
  },
  contact: {
    label:     { en: 'Contact', ru: 'Контакт' },
    headline:  { en: "Let's build something.", ru: 'Давайте построим что-то.' },
    sub:       { en: 'Tell us about your project. We work with businesses and startups, starting from $1,000. Most projects are delivered within a few days.', ru: 'Расскажите о своём проекте. Мы работаем с бизнесом и стартапами, от $1 000. Большинство проектов сдаём за несколько дней.' },
    fields: {
      name:    { en: 'Name',                ru: 'Имя' },
      company: { en: 'Company',             ru: 'Компания' },
      desc:    { en: 'Project description', ru: 'Описание проекта' },
      budget:  { en: 'Budget',              ru: 'Бюджет' },
    },
    submit:    { en: 'Send →',   ru: 'Отправить →' },
    note:      { en: 'We respond within 24 hours.', ru: 'Мы отвечаем в течение 24 часов.' },
  },
  footer: {
    tagline:   { en: 'Premium web. Delivered fast.', ru: 'Премиальный веб. Быстрая сдача.' },
    copyright: { en: '© 2025 MTDev', ru: '© 2025 MTDev' },
    privacy:   { en: 'Privacy Policy', ru: 'Политика конфиденциальности' },
  },
  case: {
    challenge:   { en: 'Challenge',   ru: 'Задача' },
    solution:    { en: 'Solution',    ru: 'Решение' },
    result:      { en: 'Result',      ru: 'Результат' },
    visitSite:   { en: 'Visit site →', ru: 'Открыть сайт →' },
    scrollHint:  { en: '↓ Case study', ru: '↓ О проекте' },
  },
}
```

---

## 9. HOOKS

### useLanguage.ts
```typescript
'use client'
import { useState, useEffect } from 'react'
import type { Lang } from '@/lib/i18n'

export function useLanguage() {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang
    if (stored === 'en' || stored === 'ru') setLang(stored)
  }, [])

  const toggle = () => {
    const next = lang === 'en' ? 'ru' : 'en'
    setLang(next)
    localStorage.setItem('lang', next)
  }

  return { lang, toggle }
}
```

### useTheme.ts
```typescript
'use client'
import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'dark' | 'light'
    if (stored) {
      setTheme(stored)
      document.documentElement.setAttribute('data-theme', stored)
    }
  }, [])

  const toggle = (originX: number, originY: number) => {
    // circle wipe transition then toggle
    const next = theme === 'dark' ? 'light' : 'dark'
    // clip-path animation via Web Animations API
    const maxRadius = Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY)
    )
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${originX}px ${originY}px)`, `circle(${maxRadius}px at ${originX}px ${originY}px)`] },
      { duration: 500, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
    )
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  return { theme, toggle }
}
```

---

## 10. ANIMATION PRINCIPLES — RULES FOR CLAUDE CODE

1. **Never animate things that are already visible.** Animations only trigger when element enters viewport.
2. **ScrollTrigger start:** always `"top 85%"` — elements appear before user reaches them, not after.
3. **No elements flying in from far away.** Max translateY displacement: 30px. Max translateX: 20px.
4. **Opacity + subtle Y is the default.** Add scale only when it adds real value (card hover).
5. **Stagger max 0.15s.** More than that and the sequence feels slow.
6. **All durations:** fast UI = 0.2s, entrance = 0.5-0.7s, page transition = 0.7s total.
7. **Easing:** power2.out for entrances, power2.inOut for transitions, linear for counters.
8. **GSAP + ScrollTrigger for scroll animations. Framer Motion only for page transitions.**
9. **Lenis handles scroll. Do not use any other scroll library or CSS scroll-behavior.**
10. **Three.js grid must not affect performance.** Target 60fps. Use `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))`.

---

## 11. SCREENSHOTS

Place project screenshots in `/public/images/`:
```
/public/images/squidwtf.jpg     — 1600×900px minimum, JPG, quality 85
/public/images/monochrome.jpg   — 1600×900px minimum
/public/images/blueriver.jpg    — 1600×900px minimum (used as wide card, 21:9 crop needed)
```

If screenshots are not yet available, use placeholder divs with the project's dominant background color:
```
squidwtf:   #150D1E (dark purple)
monochrome: #0D0D0D (near black)
blueriver:  #0A1628 (dark navy)
```

---

## 12. WHAT NOT TO DO

- Do not use any CSS animation library other than what is listed in the stack
- Do not add `overflow: hidden` to `body` or `html` — Lenis needs free scroll
- Do not use `useRouter().push()` for navigation — wrap in PageTransition logic
- Do not use placeholder text (lorem ipsum) anywhere — all copy is provided in lib/i18n.ts
- Do not add any colors not in the design system
- Do not make the cursor large or distracting
- Do not add loading spinners — transitions handle perceived loading
- Do not add any third-party UI component libraries (no shadcn, no MUI, no Radix for styling)
- Do not skip TypeScript types
