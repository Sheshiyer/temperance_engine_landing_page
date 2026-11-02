# Editorial plan: Temperance Engine website copy

Status: PLAN ONLY. No stage below has run. No artifact, provider result, approval or verification is claimed.
Prepared: 2026-11-02. Inputs read: `README.md`, `docs/positioning.md`, `src/architecture-data.js` (nothing else).

## 1. Scope and hard limits

In scope: a sequential, evidence-bound edit of the product page copy (nine sections, about 1,700 words including the 18 selectable panels).

Out of scope for every agent in this plan:
- Editing `src/`, `index.html` or any application file. Agents write only to `.planning/editorial/`.
- Running scripts, builds or tests; publishing, deploying or touching production.
- Host configuration, OmniRoute, provider setup, or the Product Hunt editor and its schedule.
- Customer metrics, rankings, votes, speed/cost/quality figures, testimonials, user counts. None exist. Any such claim is a defect.

The main coordinator alone applies the approved revision to application copy and verifies it in IAB (the in-app browser). Agents hand over text; they do not apply it.

## 2. Fixed facts (claim ceiling)

Copy may say no more than these, taken from the local docs:

- Product: an AI operator system / shared operating layer for AI coding tools, for developers and small teams. Release 0.8.0.
- Components: project context, reusable skills (discovery, lazy loading), structured work loop (observe, think, plan, build, execute, verify, learn), model routing, verification.
- Clients: OpenCode and Cursor are primary instruction surfaces. Claude Code and Codex are optional integrations. Do not imply parity or end-to-end acceptance.
- OmniRoute owns credentials, models and fallback. GSD is an optional planning backbone, host-selected, not owned or vendored. CodeGraph applies only where configured. Skill resolution depends on a host-configured resolver.
- Advisory organs: optional roles. Only the portable Vestibule handler is a source preview; the other adapters are in development. Selecting a role enables no automatic repair, scheduled work or shared-memory writes.
- Koshas classify work. They are not security boundaries.
- Data: remote model calls are not offline just because the project is local. The data path follows the user's chosen integrations.
- Held, never implied as done: v1.1 clean-host qualification, live hosted-router auth, qualified long-context sessions, durable checkpoint recovery.
- Product Hunt: existing listing, scheduled 2026-11-06 12:01 AM PST, not published. No official embed ID, rank or vote count.
- Superset and Constellation are retired and not mentioned.
- Private founder/company profiles are optional external layers, not bundled.

## 3. Identity constraints (preserve)

- Keep the cinematic hero, the manually played 30-second film (local poster, captions, transcript, explicit controls) and the GSAP and reduced-motion behavior.
- Keep the nine-section structure, three native-radio explorers (18 panels) and existing section anchors, so the structural test expectations stay stable. Any anchor, section or panel-count change is escalated to the coordinator, not decided by an agent.
- Keep the current voice: calm, plain, second person, product-first. Keep the current headline "Give your AI tools a shared way to work." as the incumbent; alternatives must beat it on stated criteria, not novelty.
- Keep sigils and Sanskrit/Latin names as texture, each paired with a plain-language gloss (`plain`, `role` fields already do this).
- No internal commentary, review bookkeeping, receipts or capability matrices in rendered copy.

## 4. Pipeline

Strictly sequential. Each stage reads only the prior stage's accepted artifact plus the source files in section 2. A stage does not start until the previous artifact exists and the coordinator records pass/fail. Artifact paths below are planned, not created.

| # | Owner (custom agent) | Skill basis | Output | Gate to proceed |
|---|---|---|---|---|
| 1 | `positioning-foundation` | growth-content / product-marketing-context | `.planning/editorial/01-positioning-foundation.md` | Coordinator confirms every statement traces to section 2 |
| 2 | `headline-territories` | copywriting | `.planning/editorial/02-headline-territories.md` | Coordinator picks one territory (or keeps incumbent) |
| 3 | `copy-drafter` | copywriting | `.planning/editorial/03-draft.md` | Draft covers all nine sections and 18 panels within the word budget |
| 4 | `copy-critic` | copy-editing (seven sweeps), avoid-ai-writing | `.planning/editorial/04-critique.md` | Every finding cites line/section and a rule |
| 4b | `cro-reviewer` (independent) | page-cro | `.planning/editorial/04b-cro-review.md` | Written without sight of the critic's findings |
| 5 | `copy-reviser` | copywriting, copy-editing | `.planning/editorial/05-revision.md` | Each finding is applied, rejected with reason, or escalated |
| 6 | `fact-acceptor` | none (claim audit) | `.planning/editorial/06-factual-acceptance.md` | Zero unsupported claims; coordinator reads the verdict |

Skill specifications were not opened while writing this plan. Each agent must load its skill itself and record in its artifact which skill it actually loaded. If a skill is unavailable, the agent says so and stops rather than imitating it.

### Stage 1: Positioning foundation
Owner builds the product-marketing context: audience (developers, small teams using several AI coding clients), the problem (context, skills and routing scattered per tool), the alternative today (re-explaining the brief in each tool, ad hoc setups), the value ladder, objections (data path, lock-in, "do I need your private setup?", is it ready?), tone, and a banned-claims list drawn from section 2. Output marks each statement `sourced` (with file and line or heading) or `assumption`. Assumptions must not flow into copy. No competitor or market statistics unless the repo supplies them; it does not.

### Stage 2: Headline territory alternatives
Produce 4 to 5 distinct territories, not word-swaps. Candidate axes, to be confirmed by the owner: shared context across tools; a repeatable work loop; control and approvals stay with you; routing without lock-in; incumbent. For each: headline, subhead, one-line rationale, claim risk against section 2, and the page-level consequence for the hero CTA ("getting started" primary, "30-second film" secondary). Rank against stated criteria: truthful, specific, one idea, fits the cinematic hero's size. Include the incumbent as a baseline. Do not claim any territory will lift conversion.

### Stage 3: Draft
Write copy for the chosen territory, keyed to the existing data shapes in `src/architecture-data.js` (`benefits`, `phases`, `koshas`, `organs`, `integrations`, `faqs`) plus hero, film caption area, getting started and launch/footer text. Preserve field names and counts (3, 7, 5, 6, 3, 4) so the coordinator can paste without code changes. Word budget: within roughly +/-10% of the current ~1,700. Focus areas the current copy leaves open:
- Several panels start with abstract verbs ("Connect", "Bring", "Keep"). Prefer concrete outcomes within the claim ceiling.
- The Koshas and organs sections carry the most jargon; each needs an earlier plain-language reason to care.
- The FAQ can answer "what do I need to start?" and "what is optional?" more directly. Do not add FAQ entries without coordinator approval.

### Stage 4: Critique (copy-editing seven sweeps)
Run the seven sweeps in order, one pass each, on the draft only, recording findings per sweep. Sweep names are those defined by the copy-editing skill (expected: clarity, voice and tone, so-what, prove-it, specificity, heightened emotion, zero risk); the agent confirms the real names and order from the skill file and states any difference. Then run avoid-ai-writing as an eighth, separate pass: flag formulaic rhythm, stock phrases, empty intensifiers, tricolon overuse, and em-dash habits. Findings are tagged `must-fix`, `should-fix` or `optional`. "Prove it" findings must resolve to a source in section 2 or a removal; no invented proof.

### Stage 4b: Independent page-CRO review
Runs in a separate agent context that receives only the draft, the stage 1 foundation and the structural facts of the page (section order, CTAs). It does not receive the critique or the drafter's rationale. It reviews: value proposition clarity above the fold, CTA hierarchy and wording, section order and flow, objection handling (data path, readiness, optional integrations), friction, and trust signals that are real. It lists recommendations as untested hypotheses with the reasoning and states that no analytics exist to rank them. Any recommended trust element that needs numbers, logos or testimonials is marked unavailable.

### Stage 5: Revision
One consolidated revision. For each critique and CRO item: applied, rejected (reason), or escalated (changes structure, anchors, video, or exceeds the claim ceiling). Conflicts between critic and CRO reviewer are listed for the coordinator rather than silently resolved. Output the full revised text in paste-ready form plus a short change list.

### Stage 6: Factual acceptance
Claim-by-claim table: each sentence making a factual assertion maps to a section 2 fact with file reference, verdict `supported`, `softened`, `unsupported`. Check explicitly: no performance, speed, cost, savings or adoption claim; clients described as primary versus optional; OmniRoute and GSD described as external and optional; organ status (only Vestibule is a preview); no implication of offline operation, auto-repair, or production qualification; Product Hunt wording remains "Launching November 6" with no ranking. The agent states this is a check against local docs only, not against the upstream repository or a running host, and does not assert approval on behalf of the owner. The coordinator records the verdict.

## 5. Coordinator duties (after stage 6)

1. Read `06-factual-acceptance.md`; proceed only if no `unsupported` items remain.
2. Apply the approved revision to application copy (outside this plan's agents).
3. Run the repo checks and verify the rendered result in IAB: hero, film controls and transcript, three selectors, anchors, narrow viewport, reduced motion. Structural tests do not prove rendering, so IAB observation is separate.
4. Record actual observations in `ISA.md`. Do not deploy, promote or alter the Product Hunt listing; that remains the owner's later review.

## 6. Evidence rules for every artifact

- Open each artifact with: agent name, skill actually loaded, input files read, date.
- Separate `sourced`, `assumption` and `proposed`. Never present a proposal as a result.
- Never write that a provider, model, approval or test succeeded unless the output is quoted from a real run. In this plan no such run is expected from agents.
- Do not fabricate quotes, users, outcomes or benchmarks.

## 7. Risks and open items

- `README.md` and `docs/positioning.md` have missing spaces in places (for example "provide18" and "November6,2026"), and my view of them was partly truncated. Treat numbers there with care. The stage 1 owner should re-confirm counts from `src/architecture-data.js`: 3 benefits, 7 phases, 5 koshas, 6 organs, 3 integrations, 4 FAQ items. The three selectors total 18 panels in the README (likely phases, koshas, organs: 7+5+6); that is an inference, not verified in `App.jsx`.
- The page copy lives partly in `src/App.jsx`, which this plan did not read. Hero, getting started, film captions and footer text must be pulled from it by the coordinator and supplied to stage 1 and stage 3 as read-only input before they start.
- The incumbent headline, subhead and CTA labels in `src/App.jsx` are unverified here. Do not rely on the quoted headline until the coordinator confirms it matches the live source.
- Agent definitions (`positioning-foundation`, etc.) do not exist yet unless the coordinator has created them; this plan does not create them.

## 8. Status tracker (to be filled by the coordinator)

| Stage | Artifact exists | Gate result | Notes |
| --- | --- | --- | --- |
| 1 | not started | n/a | |
| 2 | not started | n/a | |
| 3 | not started | n/a | |
| 4 | not started | n/a | |
| 4b | not started | n/a | |
| 5 | not started | n/a | |
| 6 | not started | n/a | |
| Applied and verified in IAB | not started | n/a | |
