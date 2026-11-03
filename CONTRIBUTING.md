# Contributing to Temperance Engine Landing Page

First off — thanks for your interest in contributing.

## Getting Started

```bash
git clone https://github.com/Sheshiyer/temperance_engine_landing_page.git
cd temperance_engine_landing_page
npm install
npm run dev
```

The dev server starts at `http://localhost:5173/` with hot module reload.

## Branch Strategy

- `main` — production-ready, deployed to Vercel
- Feature work: branch off `main` with a descriptive name (e.g., `feat/new-section`, `fix/mobile-layout`)

## Code Style

- **React**: Functional components with hooks. `.jsx` extension (TypeScript config present but `.jsx` is the active working format).
- **CSS**: Plain CSS with design tokens in `src/styles.css` at the `:root` level; no Tailwind or PostCSS build is required.
- **Animation**: GSAP + ScrollTrigger for all motion. Use the existing `useGSAP` hook pattern (`@gsap/react`). Respect `prefers-reduced-motion` — the `useReducedMotion` hook is available in `App.jsx`.
- **Formatting**: No enforced formatter yet. Keep JSX readable — reasonable indentation, consistent quote style.

### Conventions

- The reduced-motion hook and GSAP scope are in `App.jsx`; preserve motion cleanup, the poster fallback, and the video pause control when editing animation.
- Asset paths reference `public/` directory. All product images live in `public/assets/`, brand images in `public/brand/`.
- The design system uses CSS custom properties (`--font-display`, `--cream`, `--gold`, etc.) — extend these rather than hardcoding values.

## Testing

```bash
npm test
node scripts/verify-page.mjs
```

`npm test` builds the production site and runs seven Node tests against the built head and server-rendered React page. They check metadata and canonical URLs, section and anchor integrity, local assets and OG dimensions, optional integrations and release boundaries, robots/sitemap consistency, and the reduced-motion control regression. These checks do not replace browser verification.

Before merging, inspect the built page in the in-app browser at desktop and narrow mobile widths. Verify navigation, keyboard focus, media/poster behavior, reduced motion, console errors and overflow. Keep screenshots local. A preview deploy does not authorize production promotion.

## PR Process

1. Fork the repo or create a branch off `main`
2. Make your changes, keeping the diff focused
3. Run `npm test` — all checks must pass
4. Run `npm run build` — build must succeed with no warnings
5. Open a pull request against `main` with a clear description of what changed and why
6. The repo is single-owner — PRs will be reviewed promptly

## Project Structure

See [README.md](./README.md) for the full directory structure and architecture diagram.

## Design Decisions

- **No router**: The page is a single scrollable document — sections are anchors (`#runtime`, `#safety`, `#install`), not routes
- **No external UI library**: Custom CSS with Tailwind utility classes — keeps the bundle lean
- **Local assets only**: All images are generated assets in `public/` — no hotlinked third-party media
- **GSAP over CSS animations**: Scroll-linked motion uses GSAP for performance and control; CSS handles static transitions and keyframes

## Questions?

Open an issue on the repo or reach out at [thoughtseed.space](https://thoughtseed.space).