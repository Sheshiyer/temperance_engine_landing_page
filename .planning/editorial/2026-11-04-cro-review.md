# Independent page-CRO review — neutral engine preview

Date: 2026-11-04. Reviewer: independent page-CRO review. Status: source review with recommendations; no conversion improvement or browser acceptance is claimed.

## Review boundary

Reviewed `AGENTS.md`, `.agents/product-marketing-context.md`, the indexed `page-cro` skill, `src/architecture-data.js`, and `src/App.jsx`. The editor's findings were neither read nor supplied. Application files were not changed.

The current user decision supersedes the foundation's older fixed-flow positioning: Temperance Engine is client- and flow-agnostic; external workflows own their sequence; the six organs form an optional public pack; Noesis Cambium is a separate personalised consumer with its own acceptance.

- Page type: expanded product homepage and architecture explainer.
- Primary conversion: inspect the v2 guide/source and evaluate it on a disposable target.
- Intended traffic: searchable/shareable product discovery and Product Hunt visitors, as described by the foundation. Actual traffic mix and conversion rates are unknown.
- Audience: technical operators and people building an agent setup. The foundation's developer and small-team personas remain hypotheses.
- Evidence: source inspection only. Rendered layout, link availability, keyboard behaviour, native callbacks, platform qualification and conversion outcomes were not verified by this review.

## Overall assessment

The revised content expresses the core/profile separation and avoids claiming universal client or platform support. The default editorial and incident examples are useful evidence of the intended flow-neutral story. The capability matrix and FAQ give an evaluator a way to distinguish the preview from an accepted installation.

The page still makes the visitor traverse architecture before reaching the actual evaluation path. The earlier Alchemy film also appears before the neutral core, so ordinary scrolling tells a different story from the main promise. Resolve those two hierarchy problems before preview publication, then simplify the explanation of owners and the engine's own contribution.

## High-impact changes

### P1 — Put neutral examples ahead of the earlier Alchemy film

Source: `src/App.jsx` currently renders the film inside the overview section at lines 90–98, before the core at line 100 and external-flow examples at line 110. The film is accurately labelled as an earlier selected composition, but its position gives that composition substantial explanatory priority.

Recommendation: retain the film and its captions/transcript, but place it after the neutral core and default editorial/incident examples, or beside the explicitly labelled Noesis/Alchemy example. Keep the optional Alchemy vocabulary available through progressive disclosure rather than making it the main bridge from examples to modules.

Success condition: a visitor following the page in document order first encounters the generic engine and a neutral flow. The first optional Alchemy material is visibly labelled before playback or interaction.

### P1 — Give ready evaluators a direct route to the v2 guide

Source: the hero has “Explore the engine” to `#core` and “See a workflow example” to `#workflow` (`src/App.jsx:82`). The actual guide link appears in the later setup section (`src/App.jsx:134`). The navigation's “Inspect the source” also leads to that later section rather than directly to the guide.

Recommendation: use a direct “Read the v2 guide” or “Inspect the v2 source” link above the fold. Keep one on-page exploration route as the secondary action. Repeat the same primary evaluation action at the closing section; the current closing emphasis is the Product Hunt badge and a general GitHub link.

This provides a short route for someone who already understands the premise while retaining the expanded explanation for a visitor still learning.

Success condition: the primary evaluation destination is reachable from the hero and the final section without requiring a reader to find the setup panel.

### P1 — Establish preview status before the clone/run path

Source: the hero identifies an AI operator system and describes what it handles, but the explicit v2 source-preview label appears in the setup section. The availability table follows the clone/run instructions (`src/App.jsx:132` through `src/App.jsx:138`).

Recommendation: add one concise preview-status sentence beside the main evaluation CTA, and place the availability/compatibility route before the command block or directly beside it. Keep the detailed matrix; it helps the user decide whether evaluation is appropriate. Do not turn the hero into an internal release report.

Suggested direction: “v2 source preview. Inspect the guide for current adapter and platform qualification.” Confirm the final wording against the actual source evidence at publication.

Success condition: a visitor sees the source-preview boundary before being invited to clone or run it, and can find prerequisites and qualification status from the same decision point.

### P1 — Verify the branch-specific evaluation links before publication

Source: `src/App.jsx:8` and `src/App.jsx:9` point to `codex/generic-glove-20261104` and `docs/generic-engine.md`. The command block clones that feature branch. Availability of those remote destinations was not checked by this review.

Recommendation: after the source is committed/pushed, read back the exact guide, branch and qualification anchor before publishing a preview. The guide should state the Bun prerequisite, show the expected no-profile report, and distinguish inspection from installation. Keep the commands pinned to the source being described rather than silently falling back to an older main-branch guide.

Success condition: every primary evaluation link resolves to the reviewed source, and a clean evaluator can understand the command's prerequisites and expected result.

## Quick wins

### P2 — Define “owner” once

The hero, overview, graph, examples and FAQ repeatedly use “owner”. A first-time visitor may interpret this as a person, a service, a planner or an authority record.

Add a short definition near the core graph: “An owner is the tool, service or process responsible for a decision or action.” Then prefer concrete terms in examples, such as “review tool”, “approval service” or “execution system”. Retain the technical owner terminology in the contracts and guide.

### P2 — Show one concrete engine check in the example

The default flow explains what the external workflow selects and what the writing/review tool returns. Add one short “Temperance checks” line to show the engine's contribution: selected module and dependency pins, the exact task/step identity, matching approval for a write, then the attributable result.

Use an illustrative held case, such as an expired approval, alongside the successful path if space permits. Label it as an example; do not fabricate a terminal success or imply the page invoked a live owner.

### P2 — Align action labels with destinations

“Explore the engine” correctly leads to the core, and the flow selector is labelled read-only. Preserve those useful signals. If “Inspect the source” remains on a navigation link to an on-page setup section, rename it to “Source and setup”; otherwise point it directly to the source or guide.

### P2 — Keep qualification concise and useful

The detailed matrix is helpful, especially “qualification targets” and “portability targets”. Keep its interpretation practical: what can be inspected now, what still needs host proof, and where the reader checks their chosen adapter. Avoid exposing additional internal criterion IDs, source receipts or private inventories in the product journey.

## Framework assessment

| Dimension | Assessment | Recommended emphasis |
| --- | --- | --- |
| Value proposition | The generic boundary is understandable after reading the subhead and core section; the product form remains somewhat abstract above the fold. | Name the source preview and connect the engine to one concrete check/result. |
| Headline | “Bring your client. Keep your flow.” closely matches the new direction and stays concise. | Retain it with a specific subhead and preview status. |
| CTA hierarchy | Exploration is prominent; the actual guide/source evaluation route is late. | Add a direct primary guide route and repeat it at the close. |
| Information order | Expanded structure is workable, but the Alchemy film precedes the neutral core. | Neutral core and flows first; optional composition material later. |
| Trust | No invented metrics, customer logos or endorsements are used. Availability limits are explicit. | Trust through working source links, honest support boundaries and a reproducible check. |
| Objections | Client compatibility, Alchemy optionality, Noesis separation and data flow are addressed. | Move preview/prerequisite information closer to the evaluation action. |
| Friction | Multiple section hops and abstract owner terminology add interpretation work. | Provide one fast path and define the boundary vocabulary once. |

## Headline and CTA alternatives

1. Recommended: **Bring your client. Keep your flow.** Primary: **Read the v2 guide**. Secondary: **Explore the engine**. Keeps the user's boundary clear and gives an immediate evaluation path.
2. **A shared engine for your clients and workflows.** Primary: **Inspect the v2 source**. Secondary: **See a workflow example**. Names the product more directly, with a less distinctive promise.
3. **Keep your workflow. Connect the tools around it.** Primary: **Read the evaluation guide**. Secondary: **Explore the core**. Leads with workflow ownership, while requiring the subhead to name the neutral engine.

These are editorial hypotheses, not measured conversion winners.

## Test ideas and release checks

- Run a short comprehension check after approved publication: can a relevant reader explain what the engine contributes, whether Alchemy/Noesis is required, and what is still a qualification target? No interviews were conducted for this review.
- If meaningful traffic becomes available, compare a direct-guide hero CTA with the current exploration-first hierarchy. Measure guide reach and successful evaluation, rather than treating clicks alone as product acceptance. Do not add analytics under this review.
- During browser QA, verify that changing the workflow resets to its first step, keyboard selection reaches each example, and no illustrative control dispatches work.
- Verify narrow-screen matrix scrolling stays inside its own region and the page remains readable at 320px. Keep keyboard access, reduced motion, original art, controlled film and transcript paths.
- Recheck the exact feature-branch guide, qualification anchor and source links after publishing the reviewed source. Keep Product Hunt scheduling and public-engine acceptance as separately verified operations.

## Disposition

Revise against the hierarchy and evaluation-path findings, then perform the existing functional and browser checks. This independent source review does not establish conversion improvement, clean-host readiness or permission to publish the production site.
