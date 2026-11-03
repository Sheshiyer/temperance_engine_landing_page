# Neutral engine website: editorial review

Date: 2026-11-04. Status: review complete; corrections recommended before the preview is shared. Application copy was not edited by this review.

Reviewed `AGENTS.md`, `.agents/product-marketing-context.md`, `src/architecture-data.js`, and `src/App.jsx`. Applied the indexed `copy-editing` seven-sweep process and `avoid-ai-writing`. This is an independent source-copy review, not rendered-page verification, product acceptance, or a conversion result.

The current founder decision controls this review: Temperance Engine is client- and flow-agnostic; Noesis is a separate personalised consumer of a pinned engine release; the six organs form an optional public pack. Earlier marketing-context statements about a prescribed work loop or default gateway are historical inputs rather than the current product boundary.

## Priority corrections

### P1: Put the preview state beside the hero promise

`src/architecture-data.js:11–12` leads with “Bring your client. Keep your flow.” and present-tense capabilities. The source-preview explanation appears much later. A visitor can read the opening as a released integration promise.

Keep the headline, but make the eyebrow **“AI operator system · v2 source preview”**. Suggested subhead:

> Connect your chosen AI client to a workflow you own. The source preview provides shared contracts for selected work, configured adapters and attributable results. Your profile chooses the tools, services and rules.

This preserves the product direction while distinguishing the preview from an accepted installation. The two interactive neutral flows are useful explanations; retain their read-only labels.

### P1: Make pending callback qualification explicit

`src/architecture-data.js:490` says “Native callbacks are qualified per client and platform.” It can be read as a completed result, even though the row is labelled a qualification target.

Replace the detail with:

> Optional event adapters and pinned setup guidance are present in source. Native callback qualification remains pending for each client and platform.

Do not replace this with “works across clients” or use fixture coverage as proof of actual client callbacks.

### P1: Distinguish a Noesis source pin from accepted installed adoption

`src/architecture-data.js:295` and `:467` say Noesis “pins an engine version” and “selects” the new composition. The architecture boundary is correct. The tense must match the eventual implementation receipt.

Until profile adoption is accepted, use:

> Noesis Cambium is the personalised profile maintained in a separate repository. Its profile is designed to pin a reviewed engine version and select Alchemy, the six organs, OmniRoute, memory and personal policies. Its installation and workflow qualify independently of the public engine.

If the root task has already prepared a real pin, replace “is designed to pin” with **“has a prepared source pin to”** and name accepted adoption separately. Do not imply that a newly written pin proves the installed personal runtime uses those bytes.

### P1: Reconcile the marketing foundation with the new boundary

`.agents/product-marketing-context.md:19` still says PAI supplies the work method; its proof table at `:162` describes OmniRoute as the current default. Other sections describe a defined seven-phase path as the product promise. Those statements conflict with the new neutral core if used as current writing instructions.

Add a dated current-boundary section and mark the affected earlier statements as superseded. It should state: external flows own their sequence; PAI/Alchemy and GSD are selectable integrations; OmniRoute and mandatory memory are Noesis profile choices; the core can inspect itself without them. Preserve the old foundation as dated evidence rather than silently rewriting its historical scope.

### P2: Explain “owner” once and reduce repeated architecture nouns

The draft repeatedly uses “owner”, “selected”, “explicit”, “composition”, “binding”, “reference” and “qualification”. Most are real technical concepts, but the accumulation makes the overview and integration cards sound like an internal contract review.

Add a short definition near the core diagram:

> An owner is the tool, service or policy responsible for a plan, approval, action or acceptance decision.

Then prefer concrete role descriptions where possible: “Your planning tool chooses the next step” and “The execution adapter applies the approved action.” Keep exact contract names in the guide and expandable technical detail.

Suggested heading changes:

| Current | Suggested |
| --- | --- |
| A small core. An explicit composition. | Choose the parts for your setup. |
| Choose with the qualification boundary in view. | See what you can evaluate today. |
| Start with an empty composition. | Inspect the core before adding your tools. |

Keep one concise capability/evidence matrix, as requested by the founder. Its rows should tell a visitor what to check; detailed callback receipts and engineering status belong in the linked guide.

### P2: Make the no-profile check's prerequisite visible

The setup block uses `bun`, but the nearby copy does not identify that prerequisite. Add:

> Requires Bun. This command inspects the core without installing modules.

The current statement that the command does not start models or enable services is useful if the implementation and test evidence support that exact command. Do not extend the assurance to other installer commands or selected adapters.

## Headline and CTA comparison

| Option | Strength | Limitation |
| --- | --- | --- |
| Bring your client. Keep your flow. | Short, memorable, and directly expresses the corrected boundary. | “Client” needs an AI-tool explanation; pair it with the source-preview eyebrow. |
| An engine for the tools and workflows you choose. | Names the category and makes selection clear. | More abstract and less distinctive; “engine” still needs the mechanism below it. |
| Connect AI tools to your own workflow. | Concrete first-read action and clear audience. | Expresses the connection better than the receipt/ownership difference. |

Recommendation: retain the first headline with the P1 qualifier and clearer subhead. Avoid adding a second slogan immediately below it.

| CTA | Appropriate destination | Assessment |
| --- | --- | --- |
| Explore the engine | Core diagram | Accurate low-commitment entry into this expanded page. |
| Read the v2 guide | Neutral-engine guide | Strongest evaluation action for a source preview. Keep visible in navigation and after the core explanation. |
| Try the no-profile check | Setup command | Concrete, but show Bun and branch prerequisites before asking visitors to run it. |

Keep “See a workflow example” as the educational secondary action. Before sharing the preview, verify that the source branch and guide links resolve. This review did not establish link availability.

## Seven editing sweeps

| Sweep | Findings and proposed treatment | Recheck against earlier sweeps |
| --- | --- | --- |
| 1. Clarity | Neutral core/profile separation is understandable. Define “owner”; simplify the three headings above; identify Bun. | Retain one main idea per section and the reader-facing “you” voice. |
| 2. Voice and tone | The hero is calm and direct. Lower sections shift into engineering-review language. Reduce repeated abstract nouns without replacing precise roles with vague synonyms. | The proposed plain-language replacements preserve the technical boundary. |
| 3. So what | Client replacement and externally owned flows matter, but receipt/provenance lists need their consequence stated. Explain that the reader can inspect who performed an action and what result was recorded. | Do not imply measured time savings, portability, or guaranteed successful recovery. |
| 4. Prove it | Correct hero preview proximity, pending native callbacks, and Noesis adoption tense. Retain the explicit source/runtime distinction and absence of invented customer proof. | These corrections preserve the benefit while narrowing the evidence claim. |
| 5. Specificity | Editorial and incident examples make the mechanism concrete. Add a simple owner definition and the exact no-profile prerequisite. | Examples remain illustrative and do not become purported customer outcomes. |
| 6. Heightened emotion | The restrained tone suits technical evaluators. The useful emotional promise is control of an existing setup. Keep that in the headline and avoid invented pain stories or fear of alternatives. | No urgency, productivity claim, or unsupported comparison is introduced. |
| 7. Zero risk | Distinguish source evaluation from activation near the guide CTA. Show prerequisites, actual support status, and what the doctor command does. | No “zero setup”, universal compatibility, privacy guarantee, or fake risk reversal is added. |

All seven sweeps were completed in sequence, then the proposed edits were reread against clarity, tone, reader consequence and evidence scope.

## Avoid-AI-writing audit

The main issue is density and repetition rather than hype. Recommended corrections address:

- **Repeated abstract framing:** “explicit composition”, “qualification boundary”, “selected owners and bindings”. Prefer the concrete alternatives above.
- **Synonym drift:** “owner” can mean a service, tool, policy or reviewer. Define it once and use the relevant role in each example.
- **Repeated three-part lists:** retain real lists such as client/flow/service interfaces, but cut lists that repeat the same argument without adding a reader consequence.
- **Templated staccato:** the hero's short paired sentence works as a single brand line. Avoid reproducing the same two-fragment pattern in every heading.

Checked the other listed pattern families: formatting excess, hedging, hollow intensifiers, inflated significance, promotional language, AI vocabulary, stock transitions, vague attribution, filler, generic conclusions, chatbot artifacts, name-dropping, superficial analyses, formulaic challenges, false ranges, inline-header overuse, title-case inflation, and cutoff disclaimers. No additional blocking pattern was found. Named tools identify actual integrations rather than endorsements. Technical constraints should not be removed merely because they form a list.

### Representative rewrite and second pass

Proposed core introduction:

> Your profile connects the client, workflow and modules for a task. The workflow chooses the next step. Temperance checks the selected module and its dependencies, passes approved work to its execution owner, and records the result. Your acceptance process decides whether the goal was met.

Second-pass result: no hype, fabricated evidence, empty transition, or mandatory Alchemy/client assumption was introduced. The last sentence preserves acceptance ownership. Use the nearby source-preview label so the paragraph describes the evaluated implementation rather than a universally qualified deployment.

## Boundaries of this review

- No application file was changed.
- No browser, responsive-layout, keyboard, reduced-motion, or external-link result is claimed.
- No conversion improvement, platform readiness, or native-client parity is claimed.
- Root should reconcile these findings with the independent CRO review and the final implementation receipts before integrating copy.
