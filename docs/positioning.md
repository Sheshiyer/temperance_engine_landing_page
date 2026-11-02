# Temperance Engine positioning and source map

Updated 2026-11-02. This document records the approved website and draft messaging. It is not runtime qualification or a release receipt.

## Product direction

Temperance Engine is an **AI operator system**, a shared operating layer for AI coding tools. The audience is developers and small teams working across coding clients. Installation is the distribution and setup path; it is not the primary customer promise.

- Website headline: **Give your AI tools a shared way to work.**
- Product Hunt tagline: **A shared operating layer for your AI coding tools**
- Product Hunt description: Temperance Engine brings a shared operating layer to your AI coding tools. Connect project context, reusable skills, structured workflows, model routing, and verification in one configurable local runtime. Start with guided onboarding, inspect what is enabled, and keep control of approvals and changes.

The website introduction is: Temperance Engine connects project context, reusable skills, structured workflows, model routing, and verification across your AI coding tools. Set up a configurable local operator runtime, choose the integrations you need, and keep control of approvals and changes.

## Claim map

Reviewed public product source: [`Sheshiyer/temperance_engine` at `42b391b44b7655972d9322d87aa3865956a5165e`](https://github.com/Sheshiyer/temperance_engine/tree/42b391b44b7655972d9322d87aa3865956a5165e). Its released product version is 0.8.0. A source reference supports a product description, not proof that a particular host is installed or healthy.

| Website claim | Source at the pinned revision | Boundary |
| --- | --- | --- |
| Project context and selected project approvals | `package/install-surface/docs/agent-operations.md`, `CHANGELOG.md` 0.6.0 | Explicit profile/capsule inputs and operator approval; no automatic project access |
| Skills through discovery and lazy loading | `docs/pai-flow.md`, Architecture | The external skill-cluster resolver must be configured on the host |
| Intent, plan, selected work, verification, learning | `docs/pai-flow.md`, Architecture, Doctrine and ISA Pattern | A readable summary of the PAI loop; no new scheduler, auto-execution, or canonical memory writer |
| PAI work loop with optional GSD planning backbone | `docs/pai-flow.md`, `docs/COMPATIBILITY.md` | Host-selected external dependencies; do not imply Temperance owns them or vendors GSD |
| Model routing via OmniRoute | `CHANGELOG.md` 0.8.0, `docs/COMPATIBILITY.md` | OmniRoute owns credentials, models, combos, and failover. Default router pin 3.8.51 has offline qualification; live hosted auth remains unresolved |
| Client surfaces and optional spine | `README.md` What It Installs, `docs/pai-flow.md` command compatibility | OpenCode/Cursor primary; Claude/Codex opt-in; optional spine wrappers include Grok. Presence is not end-to-end acceptance |
| Structural search | `README.md` What It Installs, `docs/pai-flow.md` | CodeGraph applies where configured, not universal search across every repository |
| Guided onboarding, health and local logs | `package/install-surface/docs/agent-operations.md` | TUI and JSON share gates; health observes prerequisites and install state without inference or implicit repair |
| Organ registry and runtime configuration | `CHANGELOG.md` 0.8.0 | Selection and observed dependencies do not activate or qualify every organ |
| Installer dry run, backups, verification | `README.md` Quick Start and What It Installs | Review before applying changes; package verification is not clean-host or cloud acceptance |

`docs/multi-surface-architecture.md` is retired and points to `docs/pai-flow.md`; it is not an independent current authority. The README still includes historical 9router-leading copy. The current release and compatibility table take precedence: 9router 0.5.75 is a legacy repair route, not the 0.8.0 default.

## Qualification and ownership

Keep v1.1 clean-host qualification, live hosted-router authentication, qualified long-context sessions, and durable checkpoint recovery held. Source/fixture checks do not certify native-client lifecycle or production operation. Private Noesis/Cambium profiles are optional external layers, not bundled product content. No credentials or private material are part of this site.

## Visual recovery and decisions

- Recover the active React/GSAP page at landing-site commit `736fd13f7b92e831e7c296321b2dcdbe14a82774`; its entrypoint was `src/main.jsx`. The unused geological `App.tsx` is not the recovery target.
- Keep the cinematic hero, liquid-glass navigation, editorial serif, cream/copper/gold palette, capability cards, bento, existing local artwork and Thoughtseed footer.
- Replacement commit `64f530f04c743add8aa6b6dd1533868f71ed2863` introduced the two-section static site. Current base `5c5838331b5b8d9207d0c26aeb67dce17e6fe411` corrected repository links; retain those valid links.
- Use the actual Temperance mark in place of the historical letter L. Use local Inter and system Georgia for body/display, avoiding the old external commercial-font imports.
- Retain purposeful GSAP entrances and video parallax. A local poster remains visible if video fails; a pause control and reduced-motion guard keep the page usable. Conceptual artwork is labelled as illustration, not runtime screenshots.
- Remove inactive Login and Pricing controls. Navigation addresses real sections. Canonical, robots, sitemap, social metadata and schema agree on `https://temperance.thoughtseed.space/`.

## Review and rollout

This branch is for a Vercel preview. Production must stay at its current deployment until the owner reviews the preview. Root verification must record actual browser and deployment observations in ISA before marking those criteria complete. Product Hunt remains an unscheduled draft. A new website or description does not accept earlier rejected product graphs or remove runtime holds.
