---
project: Temperance Engine landing page
phase: complete
progress: 32/32
mode: algorithm
updated: 2026-06-12T12:35:00Z
---

## Problem

The landing page target directory is empty, while the public Temperance Engine repo needs a polished, standalone website that explains the runtime in a client-readable way.

## Vision

The page should feel like a premium operator console: clear, cinematic, and specific to Temperance Engine rather than a generic SaaS page.

## Out of Scope

Deployment, analytics, CMS integration, and modifying the existing Thoughtseed Labs website app are out of scope for this pass.

## Constraints

- Build inside `/Volumes/madara/2026/twc-vault/01-Projects/thoughtseed/website/temperence engine ` only.
- Keep the page standalone unless explicitly asked to integrate it elsewhere.
- Link to the public GitHub repo instead of duplicating installer docs.
- Respect reduced-motion preferences.

## Goal

Create a standalone Vite React landing page for Temperance Engine with motion-site-inspired interactions, clear system narrative, and tool-verified build plus browser evidence.

## Criteria

- [x] ISC-1: `package.json` defines dev, build, preview, and test scripts.
- [x] ISC-2: Verification script fails before landing page source exists.
- [x] ISC-3: `index.html`, `src/main.jsx`, `src/App.jsx`, and `src/styles.css` exist.
- [x] ISC-4: Hero names Temperance Engine and links to the public GitHub repo.
- [x] ISC-5: Page explains the Hook -> Delivery -> Finding mechanism.
- [x] ISC-6: Page names CodeGraph, skill clusters, and peon-ping.
- [x] ISC-7: App implements GSAP ScrollTrigger reveal behavior.
- [x] ISC-8: App implements typewriter behavior.
- [x] ISC-9: App implements cursor-trail behavior.
- [x] ISC-10: CSS includes reduced-motion handling.
- [x] ISC-11: CSS includes a mobile responsive breakpoint.
- [x] ISC-12: `npm run test` and `npm run build` pass.
- [x] ISC-13: Hero and section copy describe the installable inference/runtime product, not the design process.
- [x] ISC-14: Oversized display headings are reduced enough to keep copy inside section rhythm on desktop and mobile.
- [x] ISC-15: Static verification rejects visible design-reference scaffolding and preview-media domains.
- [x] ISC-16: Media uses prompt-embedded source assets from the MotionSites export, not `video_preview_url` / final-design previews.
- [x] ISC-17: Browser screenshots confirm the corrected hero on desktop and mobile.
- [x] ISC-18: Hero uses the requested `hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4` CloudFront video.
- [x] ISC-19: App uses GSAP, `@gsap/react`, and `ScrollTrigger` for production scroll motion.
- [x] ISC-20: CSS includes typography measurement guardrails for balanced headings and readable line lengths.
- [x] ISC-21: Browser screenshots confirm the upgraded hero on desktop and mobile.
- [x] ISC-22: Supporting media uses generated local Temperance image assets under `public/assets`.
- [x] ISC-23: Static verification rejects retired remote image domains and retired remote asset IDs.
- [x] ISC-24: Browser console has no missing-favicon error.
- [x] ISC-25: Browser screenshots confirm generated assets render on desktop and mobile.
- [x] ISC-26: Browser screenshot confirms generated asset deck renders in the runtime section.
- [x] ISC-27: Page metadata attributes Temperance Engine to Thoughtseed without turning it into the Thoughtseed homepage.
- [x] ISC-28: Footer visibly says the page is done by Thoughtseed and links to `thoughtseed.space`.
- [x] ISC-29: Footer uses both supplied Thoughtseed logo assets from the press kit.
- [x] ISC-30: Social metadata includes canonical URL, Open Graph, Twitter, and JSON-LD schema for Temperance Engine.
- [x] ISC-31: `robots.txt` and `sitemap.xml` advertise the canonical `thoughtseed.space/temperance-engine/` page.
- [x] ISC-32: Browser screenshots confirm the Thoughtseed attribution footer on desktop and mobile.

## Features

- Scaffold | satisfies ISC-1, ISC-2, ISC-3 | depends_on none | parallelizable false
- Narrative UI | satisfies ISC-4, ISC-5, ISC-6 | depends_on Scaffold | parallelizable false
- Motion interactions | satisfies ISC-7, ISC-8, ISC-9, ISC-10 | depends_on Narrative UI | parallelizable false
- Verification | satisfies ISC-11, ISC-12 | depends_on all | parallelizable false
- Product copy correction | satisfies ISC-13, ISC-14 | depends_on browser feedback | parallelizable false
- Source asset correction | satisfies ISC-15, ISC-16, ISC-17 | depends_on user correction | parallelizable false
- GSAP hero upgrade | satisfies ISC-18, ISC-19, ISC-20, ISC-21 | depends_on user correction | parallelizable false
- Generated website assets | satisfies ISC-22, ISC-23, ISC-24, ISC-25, ISC-26 | depends_on brand references | parallelizable false
- Thoughtseed attribution and SEO | satisfies ISC-27, ISC-28, ISC-29, ISC-30, ISC-31, ISC-32 | depends_on user correction | parallelizable false

## Test Strategy

- ISC-1 | file probe | read `package.json` scripts | present | Read
- ISC-2 | red test | run `npm test` before app source | nonzero | Bash
- ISC-3 | file probe | verify required files | present | Bash
- ISC-4..11 | content probe | `npm test` static checks | pass | Bash
- ISC-12 | build probe | `npm run build` | exit 0 | Bash
- ISC-13..16 | content probe | `npm test` static checks | pass | Bash
- ISC-17 | browser probe | Playwright desktop/mobile screenshots | readable first fold | Bash + Read
- ISC-18..20 | content/dependency probe | `npm test` plus package inspection | pass | Bash + Read
- ISC-21 | browser probe | Playwright desktop/mobile screenshots | readable upgraded first fold | Bash + Read
- ISC-22..23 | content/file probe | `npm test` requires local PNG assets and rejects retired remote media | pass | Bash
- ISC-24 | browser console probe | Playwright console after fresh page load | 0 errors, 0 warnings | Bash
- ISC-25..26 | browser probe | Playwright desktop/mobile/scrolled screenshots | generated assets visible | Bash + Read
- ISC-27..31 | content/build probe | `npm test`, `npm run build`, and `dist` metadata grep | pass | Bash + Grep
- ISC-32 | browser probe | Playwright desktop/mobile footer screenshots | Thoughtseed footer visible | Bash + Read

## Decisions

- Use plain CSS plus React hooks instead of Tailwind setup to keep the standalone page minimal.
- Use static verification probes as the TDD harness because the target has no existing test framework.
- Added `tsconfig.json` after browser verification exposed Vite 8's OXC transform requirement in dev mode.
- Refined: Replaced prompt/design metalanguage with product copy about the one-time installer, guarded templates, backup-first writes, CodeGraph routing, skill-cluster routing, peon-ping, dry-run, verify, and rollback.
- Refined: Reduced display heading scale after browser screenshots showed section headings behaving like full-page H1 treatments.
- Refined: Replaced MotionSites preview/final-design media with prompt-embedded source assets from raw network responses; the verifier now rejects `image.mux.com`, `motionsites.ai/assets`, and `stream.mux.com` preview metadata usage.
- Refined: Replaced the previous hero source with the user-specified CloudFront MP4 and kept the neutral source image only as the video poster / card asset.
- Refined: Upgraded scroll motion from IntersectionObserver + CSS transitions to GSAP `ScrollTrigger` via `@gsap/react`, with reduced-motion fallback.
- Refined: Applied web/UI typography guardrails: tighter display scale, balanced headings, readable line lengths, and less aggressive section H2 sizing.
- Refined: Generated native Temperance website PNG assets from the existing banner and icon references using local Codex OAuth via `codex-gpt-image`.
- Refined: Replaced supporting remote image/video cards with local `/assets/*.png` files while preserving the exact user-requested CloudFront hero MP4.
- Refined: Added an inline SVG favicon after browser verification exposed a missing `/favicon.ico` request.
- Refined: Clarified user intent after an earlier misread; attribution belongs on the Temperance Engine page rather than replacing it with a Thoughtseed homepage.
- Refined: Added Thoughtseed footer attribution using the supplied press-kit mark and lockup, linking to `https://thoughtseed.space`.
- Refined: Added production SEO/social metadata, JSON-LD, `robots.txt`, and `sitemap.xml` for `https://thoughtseed.space/temperance-engine/`.

## Verification

- ISC-1: Read/package probe — `package.json` defines `dev`, `build`, `preview`, and `test` scripts.
- ISC-2: Red test — first `npm test` failed with 15 missing page checks before source files existed.
- ISC-3: File probe — `npm test` now reports required `index.html`, `tsconfig.json`, and source files exist.
- ISC-4: Static content probe — `npm test` confirms title and GitHub repo link are present.
- ISC-5: Static content probe — `npm test` confirms Hook, Delivery, and Finding copy is present.
- ISC-6: Static content probe — `npm test` confirms CodeGraph, skill clusters, and peon-ping copy is present.
- ISC-7: Static content probe — `npm test` confirms GSAP `.reveal` behavior, `data-reveal-delay`, and `toggleActions` are implemented.
- ISC-8: Static content probe — `npm test` confirms `useTypewriter` behavior is implemented.
- ISC-9: Static content probe — `npm test` confirms cursor-trail state via `trailMarks` is implemented.
- ISC-10: Static content probe — `npm test` confirms `prefers-reduced-motion` CSS is present.
- ISC-11: Static content probe — `npm test` confirms `@media (max-width: 720px)` responsive CSS is present.
- ISC-12: Build/browser probes — `npm test`, `npm run build`, `npm audit --audit-level=moderate`, `curl -sf http://127.0.0.1:5177`, and desktop/mobile Playwright screenshots completed.
- ISC-13: Static content probe — `npm test` confirms product copy for safer inference loop, one-time installer, install-route-verify loop, backup-first setup, dry-run, verify, and rollback.
- ISC-14: Browser probe — final desktop and mobile screenshots show shorter hero/section hierarchy without page-sized section headings.
- ISC-15: Static content probe — `npm test` confirms visible design-reference scaffolding and preview-media domains are absent.
- ISC-16: Static content probe — `npm test` confirms prompt-embedded source assets from raw MotionSites network responses are used.
- ISC-17: Browser probes — final screenshots captured at `/var/folders/zx/_wycnwwx3p1f_4gclpnhr8rm0000gn/T/opencode/temperance-final-desktop.png` and `/var/folders/zx/_wycnwwx3p1f_4gclpnhr8rm0000gn/T/opencode/temperance-final-mobile.png`.
- ISC-18: Static content probe — `npm test` confirms the exact requested `hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4` hero video URL is present.
- ISC-19: Static/dependency probes — `npm test` confirms `gsap.registerPlugin(ScrollTrigger, useGSAP)`, and `package.json` contains `gsap` plus `@gsap/react`.
- ISC-20: Static CSS probe — `npm test` confirms `max-width: 65ch` and `text-wrap: balance` typography guardrails.
- ISC-21: Browser probes — upgraded screenshots captured at `/var/folders/zx/_wycnwwx3p1f_4gclpnhr8rm0000gn/T/opencode/temperance-gsap-hero-desktop.png` and `/var/folders/zx/_wycnwwx3p1f_4gclpnhr8rm0000gn/T/opencode/temperance-gsap-hero-mobile.png`.
- ISC-22: Codex OAuth/file probes — generated `temperance-hero-poster.png`, `temperance-runtime-panel.png`, `temperance-guarded-runtime.png`, `temperance-evidence-loop.png`, `temperance-codegraph-map.png`, and `temperance-rollback-posture.png` under `public/assets`.
- ISC-23: Static content probe — `npm test` confirms local generated asset paths are used and `res.cloudinary.com`, `images.higgs.ai`, `image.mux.com`, `motionsites.ai/assets`, `stream.mux.com`, `video_preview_url`, plus retired remote asset IDs are absent from `src/App.jsx`.
- ISC-24: Browser console probe — fresh Playwright load reports `Errors: 0, Warnings: 0`; only the standard React DevTools info message remains.
- ISC-25: Browser probes — generated-asset screenshots captured at `/var/folders/zx/_wycnwwx3p1f_4gclpnhr8rm0000gn/T/opencode/temperance-generated-assets-desktop.png` and `/var/folders/zx/_wycnwwx3p1f_4gclpnhr8rm0000gn/T/opencode/temperance-generated-assets-mobile.png`.
- ISC-26: Browser probe — scrolled runtime screenshot captured at `/var/folders/zx/_wycnwwx3p1f_4gclpnhr8rm0000gn/T/opencode/temperance-generated-assets-runtime-section.png` showing generated asset deck cards.
- ISC-27: Static metadata probe — `npm test` confirms title and metadata use `Temperance Engine | Done by Thoughtseed`, not a generic Thoughtseed homepage title.
- ISC-28: Static footer probe — `npm test` confirms `Done by Thoughtseed`, `thoughtseed.space`, and footer link wiring are present in `src/App.jsx`.
- ISC-29: File/image probes — copied and read `/public/brand/thoughtseed-logo-lockup.png` and `/public/brand/thoughtseed-mark.png` from the supplied press-kit paths.
- ISC-30: Build/metadata probes — `npm test`, `npm run build`, and `dist` grep confirm canonical, Open Graph, Twitter, and `SoftwareApplication` JSON-LD metadata.
- ISC-31: Build/file probes — `npm test`, `dist/robots.txt`, and `dist/sitemap.xml` confirm `https://thoughtseed.space/temperance-engine/` sitemap/canonical entries.
- ISC-32: Browser probes — footer screenshots captured at `/var/folders/zx/_wycnwwx3p1f_4gclpnhr8rm0000gn/T/opencode/temperance-thoughtseed-footer-desktop.png` and `/var/folders/zx/_wycnwwx3p1f_4gclpnhr8rm0000gn/T/opencode/temperance-thoughtseed-footer-mobile.png`.
