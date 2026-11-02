# Temperance Engine website

A shared operating layer for your AI coding tools.

This repository owns the Temperance Engine product website. The product is an **AI operator system** for developers and small teams: project context, reusable skills, structured workflows, model routing, and verification across selected AI coding clients.

Product source: [Sheshiyer/temperance_engine](https://github.com/Sheshiyer/temperance_engine). Website: [temperance.thoughtseed.space](https://temperance.thoughtseed.space/).

## Development

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview -- --port 4173
```

The page uses React 18, GSAP and Vite 5. Source is `src/App.jsx` and `src/styles.css`; metadata is in `index.html`. Existing public artwork, branding and fonts are under `public/`. Generated build, dependencies and test cache are ignored.

`npm test` builds the site and checks the built head, server-rendered product content, anchor resolution, local assets, social-image dimensions, canonical URLs, release boundaries and integration ownership. Browser QA is separate and must use the actual preview; structural tests do not prove rendered motion, responsive behavior or live runtime acceptance.

## Restoration and content

The visual source is the active cinematic React/GSAP page at `736fd13`. The replacement `64f530f` and latest repository-link fix `5c58383` are documented in [positioning and claim map](docs/positioning.md). The current content has five sections: introduction, shared operating layer, workflow, integrations and boundaries, and getting started.

The site uses existing local artwork, a video with a local poster fallback and pause control, a local body font and system serif display font. Reduced motion disables automatic video and GSAP movement. Product integrations remain opt-in or host-dependent as documented; the 0.8.0 product release does not complete held milestones.

## Preview and rollback

Prepare a preview for owner review. Do not deploy to production, promote a preview, merge to the production branch, or change the public domain without that later review. Record the exact preview and production references in ISA. Before production approval, rollback is simply to leave production untouched and close or revert this implementation branch. Preserve the existing production deployment for any later promotion rollback.

Product Hunt is an unscheduled draft, not a published launch. Changes to draft copy or website messaging do not create runtime qualification or graph acceptance.

Done by [Thoughtseed Labs](https://thoughtseed.space/).
