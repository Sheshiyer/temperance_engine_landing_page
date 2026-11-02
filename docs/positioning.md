# Temperance Engine positioning and source map

Updated 2026-11-02. The current product polish supersedes the earlier architecture-heavy website presentation below. Technical claim records remain documentation; they are not rendered product copy.

## Product direction

Temperance Engine is an **AI operator system**, a shared operating layer for AI coding tools. The audience is developers and small teams working across coding clients. Installation is the distribution and setup path; it is not the primary customer promise.

- Website headline: **From a coding request to a change you can check.**
- Product Hunt tagline: **A shared operating layer for your AI coding tools**
- Product Hunt description: Temperance Engine packages project instructions, a seven-phase work loop, skill-cluster discovery and OmniRoute routing for model requests, set up around coding clients such as OpenCode, Cursor, Claude Code or Codex. Write the expected behavior and checks first, then check the change against them. Preview the installer with a dry run and try it on one project.

The website introduction is: Keep project context, skills, model routing and a clear work loop together. Temperance Engine connects the pieces around your coding agents, so you can focus on the work you want to do.

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

This branch is for a Vercel preview. Production must stay at its current deployment until the owner reviews the preview. Root verification must record actual browser and deployment observations in ISA before marking those criteria complete. The existing Product Hunt launch is scheduled for November 6, 2026, 12:01 AM PST; preserve that schedule. Earlier unscheduled observations are superseded. A new website or description does not accept earlier rejected product graphs or remove runtime holds.


## Historical expanded architecture story — superseded presentation

The fifteen-section experience starts from the restored cinematic React/GSAP source at7e55a26. It adds native-radio educational selectors for an illustrative task, architecture connections, five Koshas, seven phases, six advisory organs and core/profile/company comparison. All panels are read-only explanations; inactive panels remain available in the DOM and selection neither dispatches work nor reads a local store.

Public baseline remains42b391b / release0.8.0. Composition, lifecycle and phase projection claims link to that exact source. The pure no-profile reconciliation and injected read-only Vestibule orientation adapter are review-branch work, explicitly marked draft. The other five concrete adapters remain held. Root review must reconcile the final product source commit before accepting expanded preview claims.

Koshas classify work, not security boundaries. Advisory organs, onboarding infrastructure modules and Cambium company organs have different owners. The existing V4 contract calls the portable product the glove and a selected profile the hand; the website uses portable core / personal profile / company integration to keep setup choices readable without renaming the contract.

No public source fixture proves installation, actual native callbacks, provider authentication or acceptance. v1.1 clean-host, live hosted auth, qualified long-context and durable recovery remain held. Later containment pressure/process/lock changes are a separate promotion. Superset and Constellation remain retired.

Website source implementation does not update the existing Product Hunt editor, push a branch, deploy a preview or promote production. Root owns those authorized next steps and their readback evidence.


## Current product polish — November 2

The owner requested a product-focused experience with internal commentary removed. The current page has nine sections and approximately1,700words including all selectable content. It keeps the cinematic hero and manually played architecture film, then explains practical benefits, seven work phases, five Koshas, optional advisory roles, integrations and setup. Three keyboard-accessible native-radio selectors provide18 explanatory panels. The concise FAQ describes current availability without exposing implementation reviews, private profile inventories or verification bookkeeping.

The primary hero action leads to getting started; the secondary action jumps to the30-second film. The film retains its local poster, descriptive captions, transcript and explicit playback controls. SEO, canonical and social metadata remain useful product metadata.

Removed from the rendered product flow: per-panel source-contract links, revision and capability matrices, receipt/fixture/acceptance commentary, private-profile inventory counts, repeated caveats and obsolete data. Curated documentation links remain available for readers who want installation or compatibility detail. Technical source lineage and known qualification limits remain documented here and in the product repository.

The earlier custom-badge observation is superseded by the November 2 public-source check: the product README supplies post ID 1301098, and the official Product Hunt SVG for that ID was verified separately. The current page uses that asset, a persistent text link to the existing listing, and a separate Launching November 6 date. It adds no vote count or ranking claim. The launch remains scheduled for November 6, 2026, 12:01 AM PST.

The November 2 editorial integration applies the independently checked candidate literally across 53 App fields and 129 data strings. Metadata and review annotations remain outside display copy. The hero, nine sections, three native-radio explorers, 18 panels and film behavior retain their existing structure. The installed Build guard refused the mechanical integration attempt after a bounded host-pressure wait; the owner authorized deterministic local application of the accepted strings. This application makes no additional provider-production or browser-fit claim.

Editorial production: a routed Plan completed on claude-sonnet-5-5. Separate alternatives, draft and revision requests completed through Phloem on claude-opus-5-5. A separate native editor completed seven sweeps after its governed Verify request timed out without output; an independent native CRO reviewer and factual auditor checked the revision. The later mechanical integration request was refused by the normal host-pressure guard, then applied locally from the accepted strings. Provider attribution applies only to the recorded completed stages. Root IAB checks cover actual desktop/mobile rendering, all 18 selector states, keyboard operation, reduced motion and the official badge.
