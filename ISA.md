---
project: Temperance Engine landing page
phase: complete
progress: 12/12
mode: algorithm
updated: 2026-08-22T06:20:00Z
---

## Problem

The landing page needed a complete redesign from a React/GSAP/Tailwind SPA to a single static HTML page with WAAPI animations, local fonts, and zero framework dependencies.

## Vision

Dark minimal, two full-viewport sections. Premium operator console feel — cinematic hero with right-anchored video, wipe-mask headline entrance, and hover-ambient diagram cards. No frameworks, no external CDN requests.

## Out of Scope

Deployment, analytics, CMS integration, and modifying the existing Thoughtseed Labs website app.

## Constraints

- Single static `index.html` with inlined CSS/JS — no build framework
- Local woff2 fonts only (Inter variable + Urbanist variable)
- WAAPI only for all animations — no GSAP, no ScrollTrigger
- `prefers-reduced-motion`: pause video on frame 0, skip all animations
- Zero external CDN/font requests at runtime
- Vite retained only for `vite preview` dev server

## Goal

Replace the React/GSAP/Tailwind SPA with a single static HTML landing page using WAAPI animations, local fonts, and two full-viewport sections (hero + features).

## Criteria

- [x] ISC-1: `index.html` exists at project root with complete HTML structure (nav, hero, features sections).
- [x] ISC-2: Inter variable woff2 and Urbanist variable woff2 exist in `public/assets/fonts/`.
- [x] ISC-3: CSS custom properties define `--black`, `--bg`, `--card`, `--white`, `--gray`, `--border`, `--nav-h`.
- [x] ISC-4: `@font-face` declarations use `font-display: block` for both Inter and Urbanist.
- [x] ISC-5: Hero section contains video element with `preload="auto"`, `autoplay`, `muted`, `loop`, `playsinline`, `object-fit: cover`, `object-position: right center`.
- [x] ISC-6: Hero video URL is `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_114341_c6166862-328b-45ae-b0c0-49fa977875a1.mp4`.
- [x] ISC-7: Hero headline uses wipe-mask technique (`overflow: hidden` parent + `translateY(118%→0%)` child).
- [x] ISC-8: Hero entrance WAAPI sequence: nav lift → headline wipe → subcopy fade → CTA fade with specified easings and durations.
- [x] ISC-9: Section 2 entrance via `actTwo()` — IntersectionObserver at 22% threshold, one-shot, calls `Reel()` for headline lines then cards.
- [x] ISC-10: Hover ambient via `armAmbient()` — WAAPI animations on `[data-ambient]` elements using CSS `--ax`/`--ay`/`--t` vars, play on mouseenter, reverse on mouseleave.
- [x] ISC-11: CSS amplitude classes (`.d-plate-*`, `.d-src-*`, `.d-node-*`) define `--ax`, `--ay`, `--t` custom properties.
- [x] ISC-12: `prefers-reduced-motion` CSS media query disables all animations; JS matchMedia guard pauses video and skips WAAPI calls.

## Features

- Static HTML scaffold | satisfies ISC-1, ISC-2, ISC-3, ISC-4 | depends_on none
- Hero section | satisfies ISC-5, ISC-6, ISC-7 | depends_on scaffold
- Hero animation | satisfies ISC-8 | depends_on hero section
- Section 2 entrance | satisfies ISC-9, ISC-10, ISC-11 | depends_on features section
- Reduced motion | satisfies ISC-12 | depends_on all animations
- Build verification | satisfies all | depends_on all

## Test Strategy

- ISC-1 | file probe | verify `index.html` exists at root | present | Bash
- ISC-2 | file probe | verify woff2 files in `public/assets/fonts/` | present | Bash
- ISC-3..4 | CSS probe | grep for custom properties and @font-face | present | Grep
- ISC-5..6 | HTML probe | grep for video element attributes and URL | present | Grep
- ISC-7 | CSS probe | grep for wipe-mask technique | present | Grep
- ISC-8 | JS probe | grep for hero entrance WAAPI sequence | present | Grep
- ISC-9..10 | JS probe | grep for actTwo/armAmbient functions | present | Grep
- ISC-11 | CSS probe | grep for amplitude classes | present | Grep
- ISC-12 | CSS+JS probe | grep for prefers-reduced-motion and matchMedia | present | Grep
- Build | build probe | `npm run build` | exit 0 | Bash
- Browser | browser probe | Playwright desktop+mobile screenshots | zero console errors | Bash

## Decisions

- Replaced React/GSAP/Tailwind SPA with single static `index.html` — zero runtime dependencies.
- WAAPI replaces GSAP for all animations (hero entrance, section 2 entrance, hover ambient).
- Variable fonts (Inter + Urbanist) as single woff2 files instead of per-weight files.
- Vite retained only as dev server (`vite preview`), not for building React.
- Removed `postcss.config.js` and `tailwind.config.js` — no longer needed.
- Stripped React, ReactDOM, GSAP, @gsap/react, Tailwind, autoprefixer from dependencies.
- `src/` directory removed — all code inlined in `index.html`.

## Verification

- ISC-1: File probe — `index.html` exists at project root with nav, hero, features sections.
- ISC-2: File probe — `public/assets/fonts/Inter-Variable.woff2` (48KB) and `public/assets/fonts/Urbanist-Variable.woff2` (28KB) exist.
- ISC-3: CSS probe — custom properties `--black:#000`, `--bg:#0A0A0A`, `--card:#111`, `--white:#fff`, `--gray:#9CA3AF`, `--border:#1F1F1F`, `--nav-h:56px` present.
- ISC-4: CSS probe — `@font-face` with `font-display: block` for both Inter and Urbanist.
- ISC-5: HTML probe — video element with `preload="auto"`, `autoplay`, `muted`, `loop`, `playsinline`, `object-fit: cover`, `object-position: right center`.
- ISC-6: HTML probe — CloudFront URL `hf_20260808_114341_c6166862-328b-45ae-b0c0-49fa977875a1.mp4` present.
- ISC-7: CSS probe — `.line-mask` with `overflow: hidden` and `.line` with `transform: translateY(118%)` present.
- ISC-8: JS probe — `heroEntrance()` function with nav lift, headline wipe, subcopy fade, CTA fade sequence.
- ISC-9: JS probe — `actTwo()` function with IntersectionObserver at `threshold: 0.22`, calling `Reel()` for headline then cards.
- ISC-10: JS probe — `armAmbient()` function with mouseenter/mouseleave listeners playing/reversing WAAPI animations.
- ISC-11: CSS probe — `.d-plate-a` through `.d-node-r` amplitude classes with `--ax`, `--ay`, `--t` properties.
- ISC-12: CSS+JS probe — `@media (prefers-reduced-motion: reduce)` and `matchMedia('(prefers-reduced-motion: reduce)')` guards.
- Build: `npm run build` exits 0, `dist/index.html` contains all assets, zero external CDN requests.
- Browser: Playwright screenshots at 1440×900 and 375×812, zero console errors.
