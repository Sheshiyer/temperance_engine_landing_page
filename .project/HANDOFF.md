# Temperance operator-system preview — 2026-11-02

## Current result

- Restored the active cinematic React/GSAP design from `736fd13f7b92e831e7c296321b2dcdbe14a82774`, based on current main `5c5838331b5b8d9207d0c26aeb67dce17e6fe411`. The substantial static replacement was `64f530f`; the later main commit only corrected repository links.
- Category: AI operator system. Headline: “Give your AI tools a shared way to work.” Five sections connect context, skills, workflow, routing and verification; setup is lower on the page. Claims map: `docs/positioning.md`, product source pinned to `42b391b44b7655972d9322d87aa3865956a5165e` (release 0.8.0).
- Verified preview code commit: `c930af92d3176e0b0a2a9ad1b382c9c6273744d9`. READY preview: https://temperance-engine-landing-page-mitxrimmj-sheshiyers-projects.vercel.app/ (`dpl_A57LdT4sTenjcaU2JcavVLhRytMP`). Deployment uses CLI; API Git metadata is empty, so provenance was checked by all49 uploaded file SHA-1 values matching the local source/build at that commit. Later commit content is bounded documentation and verification only.
- Existing Vercel SSO remains enabled; the owner completed normal sign-in and2FA. No bypass/share link, domain change or production promotion was created.
- Production remains `dpl_And7oPASgXBUTCp4asMvMdqPWc3M`, source `5c58383`, retaining `temperance.thoughtseed.space` and its aliases. Preview success is not production acceptance.

## Verification

- `npm test`:7/7 Node tests and Vite5.4.21 production build pass. Tests use rendered App and built metadata/assets, including the reduced-motion playback-control regression.
- Actual authenticated Codex IAB: desktop1440×900; mobile375×812 and320×812; scrollWidth equals clientWidth at each tested width. Working workflow/get-started anchors, visible3px keyboard focus, expandable qualification details, normal-motion video pause, paused poster and no playback button under reduced motion. Visited artwork/footer images loaded; direct social image1200×630. Canonical, OG/Twitter and schema use the product domain. Clean preview tab reports no warn/error logs; earlier Vercel login messages were kept separate.
- Independent source review found no material blocker and verified seven documentation paths against pinned product source. The QATester role's own browser route was unavailable under its CLI-only constraint; root performed the requested IAB browser verification. No independent browser gate is claimed.
- Former landing script had38 baseline failures against deleted files; it is replaced by current tests. Two development-toolchain npm advisories remain in the requested Vite5/esbuild line; no production dependency advisory was reported. Development/preview servers bind loopback.

## Draft and cross-repository handoff

- Existing Product Hunt draft saved and reopened: https://www.producthunt.com/products/temperance-engine?launch=temperance-engine . Tagline: “A shared operating layer for your AI coding tools”. Description matches `docs/positioning.md`; website/source, maker, logo/gallery and tags were preserved. Explicit banner says draft and not scheduled. No second listing, Schedule or Finish setup action.
- Application repository branch `codex/operator-positioning-review`, based on current main `42b391b`: README introduction and badge alt only are staged, uncommitted and unpushed for owner review. Prepared README SHA-256 `0d021793ed1027d774a5ac899a4fa91393353793ffee9eb80dbd6f3ebed4e8d1`.
- Cambium branch `codex/temperance-positioning-proof`: Sapling reference/packet/index mark the old copy superseded while retaining historical observations. Evidence is `docs/evidence/2026-11-02-temperance-positioning.v1.json`; ISA criteria3600–3619 own that repository's correction. Helper17, packet12 and GTM/branch9 tests pass; seven isolated packets validate. Earlier full-suite privacy/fingerprint holds remain separate.
- LumenBar is untouched. Temperance v1.1 clean-host, live hosted authentication, qualified long-context and durable recovery remain held. Historical product graph stays rejected with no vault receipt. Marketing and preview proofs grant no runtime admission or publication.

## Review and rollback

Owner review of this preview is next. Do not merge to main, promote a preview or replace the product domain before that review. Production is already the rollback reference and remains unchanged. If rejected, close/revert this website branch, unstage only the isolated README change and revert only scoped Cambium correction files; preserve original dirty checkouts, prior proof and held gates. Do not delete or schedule Product Hunt as part of rollback.
