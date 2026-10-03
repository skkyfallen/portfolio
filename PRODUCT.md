# Product Requirements Document (PRD)
## Personal Portfolio Web Application

**Document Version:** 1.0
**Date:** October 2, 2026
**Author:** Kenechukwu Alexander Ekwonu
**Status:** Draft

---

## 1. Overview

A single-page personal portfolio web application that presents who I am, what I do, my resume, selected projects, and a way to get in touch. The application is a static, frontend-only build with no backend at launch. It is designed to be visually striking, ultra-modern, and clean, using a monochrome black-and-white aesthetic with full dark mode support.

The site is built to make a strong first impression while remaining fast, accessible, and easy to maintain. It is intended to be deployed as a static site (e.g., Vercel, Netlify, GitHub Pages) and to later accommodate a backend if dynamic functionality is needed.

**Incremental Build Approach:** This project will be built incrementally, feature by feature, rather than all at once. Each milestone (see Section 16) represents a discrete, shippable increment. The foundation (project setup, design tokens, dark mode, navigation shell) is established first, then each view (Home, About, Resume, Projects, Contact) is added and refined in sequence. This approach ensures a working application at every stage, allows for early feedback and course correction, and reduces risk by isolating changes to one feature at a time.

---

## 2. Goals & Objectives

### Primary Goals
- Showcase my identity, skills, and work in a memorable, modern interface.
- Provide a single, polished entry point for recruiters, collaborators, and visitors.
- Demonstrate front-end craft through thoughtful design, motion, and responsiveness.

### Secondary Goals
- Keep the codebase simple and dependency-light so it is easy to extend.
- Support dark mode natively with a seamless toggle.
- Ensure the contact form is secure and spam-resistant even without a custom backend.
- Lay a clean architecture foundation so a backend can be added later without rework.

### Non-Goals (for now)
- No user accounts, authentication, or admin panel.
- No CMS or dynamic content management.
- No blog or CMS-driven articles.
- No server-side rendering or API layer (unless later required).

---

## 3. Target Audience

| Audience | What they care about |
|----------|----------------------|
| Recruiters & hiring managers | Quick sense of skills, resume, projects, contact info |
| Collaborators & peers | Who I am, what I have built, how to reach me |
| General visitors | A polished, professional impression |

---

## 4. Scope

### In Scope (v1)
- Hero section with name, role/tagline, and animated banner
- Right-sided vertical navigation bar
- Home (hero) view
- About view with personal and professional info
- Resume view that opens my resume PDF in a modal
- Projects view listing selected projects
- Contact view with personal contact info and a secure contact form
- Dark mode toggle with system-preference detection
- Responsive layout (mobile, tablet, desktop)
- Smooth animations and transitions
- Basic SEO meta tags and Open Graph tags

### Out of Scope (v1)
- Backend API or database
- Form submission handling server-side (handled via third-party service)
- Multi-language support
- Analytics dashboard
- Admin/content management

---

## 5. Technology Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | React 18+ (with Vite) | Fast dev server, modern tooling |
| Language | TypeScript | Type safety, better maintainability |
| Styling | Tailwind CSS | Utility-first, design tokens via CSS variables |
| UI Components | shadcn/ui | Accessible, customizable, Radix-based |
| Icons | Lucide React | Clean, consistent icon set |
| Animations | Framer Motion | Declarative, performant animations |
| PDF Display | react-pdf or native embed | Resume modal rendering |
| Deployment | Vercel / Netlify | Static hosting, CI from Git |

---

## 6. Design System

### 6.1 Aesthetic Direction
- **Mood:** Ultra-modern, clean, confident, minimal
- **Palette:** Strictly monochrome — black, white, and grayscale tones
- **Dark Mode:** First-class citizen, not an afterthought
- **Typography:** A single modern sans-serif (e.g., Inter or Geist) with clear hierarchy
- **Spacing:** Generous whitespace, consistent 8px grid
- **Borders & Radius:** Subtle borders, small-to-medium border radius for a refined feel

### 6.2 Color Tokens

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Background | `#FFFFFF` | `#0A0A0A` |
| Foreground (text) | `#0A0A0A` | `#FAFAFA` |
| Muted | `#F5F5F5` | `#171717` |
| Muted Foreground | `#737373` | `#A3A3A3` |
| Border | `#E5E5E5` | `#262626` |
| Accent | `#0A0A0A` | `#FAFAFA` |

### 6.3 Typography Scale
- Display (hero name): 48–72px, bold
- H1: 36–48px
- H2: 28–36px
- H3: 20–24px
- Body: 16px
- Small / Caption: 14px

### 6.4 Motion Principles
- Subtle, purposeful animations only
- Entrance animations on scroll (fade + slide)
- Hover states with gentle scale or color transitions
- Respect `prefers-reduced-motion`
- Duration: 200–500ms, ease-out curves

---

## 7. Information Architecture & Navigation

### 7.1 Navigation Pattern
A **fixed right-sided vertical navbar** — a deliberate departure from the conventional top bar. This is the signature UI element of the site.

```
┌─────────────────────────────────────┬──────────┐
│                                     │          │
│           Main Content              │   Nav    │
│           (per view)                │  (fixed) │
│                                     │          │
│                                     │  Home    │
│                                     │  About   │
│                                     │  Resume  │
│                                     │ Projects │
│                                     │ Contact  │
│                                     │          │
│                                     │  [Theme] │
└─────────────────────────────────────┴──────────┘
```

### 7.2 Navbar Behavior
- Fixed to the right edge, vertically centered
- Each item: icon + label (label appears on hover or is always visible at wider widths)
- Active item is highlighted with an accent indicator
- Smooth scroll or view transition between sections
- Collapses to a compact icon-only rail on mobile (or moves to a bottom bar)
- Dark mode toggle at the bottom of the navbar

### 7.3 Views / Routes
Since this is a single-page app, "pages" are views rendered in the main content area. Client-side routing (React Router) or state-based view switching can be used.

| View | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero with name, tagline, animated banner |
| About | `/about` | Personal and professional background |
| Resume | `/resume` | Resume PDF in a modal overlay |
| Projects | `/projects` | Grid/list of selected projects |
| Contact | `/contact` | Contact info + secure contact form |

---

## 8. Page & Feature Specifications

### 8.1 Home (Hero)

**Purpose:** Immediate, memorable introduction.

**Elements:**
- My name (large, bold display type)
- What I do (role / tagline, e.g., "Student & Aspiring Security Professional")
- A short supporting sentence or two
- Animated banner / visual element (see 8.1.1)
- Subtle call-to-action buttons (e.g., "View Projects", "Get in Touch")

**8.1.1 Animated Banner**
- A horizontal or geometric animated element beneath the hero text
- Could be: an animated gradient line, a typing/rotating word effect, a particle field, or a subtle geometric motion
- Must be performant (GPU-accelerated, `transform`/`opacity` only)
- Must respect `prefers-reduced-motion`

**Behavior:**
- Content animates in on load (staggered fade-up)
- Banner loops continuously but subtly
- Fully responsive — scales down gracefully on mobile

---

### 8.2 About

**Purpose:** Give visitors a clear, human picture of who I am.

**Elements:**
- A short bio paragraph (who I am, what I do, what I care about)
- Personal details presented cleanly, such as:
  - Current status (student, field of study)
  - Interests and focus areas
  - Location
  - A few personal facts or hobbies
- Optional: a portrait or avatar image
- Optional: a timeline or "facts" card layout

**Layout:**
- Single column or two-column (text + visual) depending on content
- Clean typography, generous spacing
- Subtle entrance animations on scroll

---

### 8.3 Resume

**Purpose:** Let visitors view or download my resume easily.

**Elements:**
- A button or card that opens the resume PDF in a **modal overlay**
- Modal contains:
  - The rendered PDF (via `react-pdf` or a native `<embed>`/`<iframe>`)
  - A download button (direct link to the PDF file)
  - A close button (and click-outside-to-close / Escape-to-close)
- The PDF file is stored in the `public/` folder so it is served statically

**Behavior:**
- Modal is accessible (focus trap, ARIA attributes, Escape to close)
- Background is dimmed and non-interactive while modal is open
- PDF is scrollable within the modal
- On mobile, the modal takes most of the viewport

---

### 8.4 Projects

**Purpose:** Showcase a curated set of projects I have built.

**Elements:**
- A grid or list of project cards
- Each card contains:
  - Project title
  - Short description
  - Tech stack tags
  - Link to live demo (if available)
  - Link to source code (GitHub)
- Optional: a thumbnail or screenshot per project
- Optional: a "featured" flag for standout projects

**Layout:**
- Responsive grid (1 column mobile, 2 tablet, 3 desktop)
- Cards have subtle hover elevation/animation
- Clicking a card could open a detail modal or navigate to the live project

**Data:**
- Projects are defined in a local data file (e.g., `src/data/projects.ts`) so they are easy to update without touching component code

---

### 8.5 Contact

**Purpose:** Make it easy and secure to reach me.

**Elements:**

**8.5.1 Contact Info**
- Email address
- Phone number (optional)
- Location
- Social links (GitHub, LinkedIn, etc.) as icon buttons

**8.5.2 Contact Form**
- Fields: Name, Email, Message
- Client-side validation (required fields, email format)
- Secure submission (see 8.5.3)
- Success and error states with clear feedback
- Accessible labels and error messages

**8.5.3 Form Security (No Backend)**
Since there is no backend, the form must be handled securely via a third-party service:

| Option | Approach | Security Benefit |
|--------|----------|-----------------|
| **Formspree** (recommended) | Form POSTs to Formspree endpoint | Spam filtering, reCAPTCHA, no custom server |
| **Netlify Forms** | Netlify handles submissions | Built-in spam protection, honeypot |
| **EmailJS** | Sends email via client-side JS | No backend needed, template-based |

**Security measures regardless of provider:**
- Honeypot field to catch bots
- reCAPTCHA (v3 invisible or v2 checkbox) via the provider
- Input sanitization (React escapes by default; no `dangerouslySetInnerHTML`)
- Rate limiting handled by the provider
- No sensitive data stored client-side
- Form uses HTTPS (enforced by hosting provider)

---

## 9. Dark Mode

### 9.1 Behavior
- Toggle in the navbar (sun/moon icon)
- Detects system preference on first visit (`prefers-color-scheme`)
- Persists user choice in `localStorage`
- No flash of wrong theme on load (inline script in `index.html` to set initial class)
- All components and tokens switch cleanly

### 9.2 Implementation
- Tailwind `dark:` variants throughout
- CSS custom properties for theme tokens
- `class` strategy for dark mode in Tailwind config

---

## 10. Responsiveness

| Breakpoint | Layout Changes |
|------------|----------------|
| Mobile (<640px) | Navbar becomes bottom bar or hamburger; single column; smaller type |
| Tablet (640–1024px) | Navbar may shrink to icons; two-column grids |
| Desktop (>1024px) | Full right-sided vertical navbar; multi-column grids |

---

## 11. Accessibility

- Semantic HTML (`header`, `nav`, `main`, `section`, `footer`)
- ARIA labels on interactive elements
- Keyboard navigation support (tab order, focus states)
- Sufficient color contrast in both light and dark modes
- `prefers-reduced-motion` respected for all animations
- Alt text on images
- Form inputs have associated labels

---

## 12. Performance

- Vite for fast builds and optimized bundles
- Lazy loading for below-the-fold content and the PDF modal
- Optimized images (WebP/AVIF where possible)
- Minimal dependencies
- Target: Lighthouse performance score 90+

---

## 13. SEO & Meta

- Title, description, and keywords in `index.html`
- Open Graph and Twitter Card tags
- Semantic heading structure
- `robots.txt` and `sitemap.xml` (if applicable)
- Favicon and apple-touch-icon

---

## 14. Project Structure

```
portfolio/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── public/
│   ├── resume.pdf
│   ├── favicon.ico
│   └── og-image.png
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── components/
    │   ├── layout/
    │   │   ├── RightNav.tsx
    │   │   └── ThemeToggle.tsx
    │   ├── home/
    │   │   ├── Hero.tsx
    │   │   └── AnimatedBanner.tsx
    │   ├── about/
    │   │   └── AboutSection.tsx
    │   ├── resume/
    │   │   └── ResumeModal.tsx
    │   ├── projects/
    │   │   ├── ProjectCard.tsx
    │   │   └── ProjectGrid.tsx
    │   ├── contact/
    │   │   ├── ContactInfo.tsx
    │   │   └── ContactForm.tsx
    │   └── ui/              (shadcn components)
    ├── data/
    │   └── projects.ts
    ├── hooks/
    │   └── useTheme.ts
    └── lib/
        └── utils.ts
```

---

## 15. Future Considerations (Backend Roadmap)

When a backend is added, the following can be integrated without major rework:

- **Contact form:** Replace third-party service with a custom API endpoint (e.g., `/api/contact`) with server-side validation, rate limiting, and email delivery (e.g., SendGrid, Resend).
- **CMS:** Add a headless CMS (e.g., Sanity, Contentful) to manage projects and bio content.
- **Analytics:** Add privacy-friendly analytics (e.g., Plausible).
- **Authentication:** If an admin panel is ever needed, add auth (e.g., NextAuth).
- **Database:** A simple DB (e.g., PostgreSQL via Supabase) for project data or messages.

The current architecture (separate data files, component-based structure, clear separation of concerns) is designed to make these additions straightforward.

---

## 16. Milestones

| Phase | Scope | Est. Timeline |
|-------|-------|---------------|
| **M1: Foundation** | Vite + React + TS + Tailwind + shadcn setup, theme tokens, dark mode, right nav shell | Week 1 |
| **M2: Home** | Hero, animated banner, responsive layout | Week 1–2 |
| **M3: About & Resume** | About section, resume PDF modal | Week 2 |
| **M4: Projects** | Project data, grid, cards, links | Week 2–3 |
| **M5: Contact** | Contact info, secure form (Formspree), validation | Week 3 |
| **M6: Polish** | Animations, accessibility audit, performance, SEO, deploy | Week 3–4 |

---

## 17. Success Metrics

- **Engagement:** Time on page, scroll depth
- **Contact:** Form submission rate, completion rate
- **Performance:** Lighthouse scores (90+ across the board)
- **Uptime:** 99.9%+ (static hosting)

---

## 18. Open Questions

1. Which third-party form provider is preferred — Formspree, Netlify Forms, or EmailJS?
2. Should the resume PDF be downloadable directly from the modal, or view-only?
3. Is a portrait/avatar photo desired on the About page?
4. Should projects link to live demos, source code, or both?
5. Is a custom domain planned for deployment?

---

*End of document.*
