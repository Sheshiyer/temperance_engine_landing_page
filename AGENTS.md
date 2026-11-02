# Agent operating contract

Repository: `temperance_engine_landing_page`

<!-- temperance:project-rail:start -->
## Temperance project rail

This repository is registered with **Temperance Engine** as a project rail.
Host runtime (models, OmniRoute, OpenCode plugins) lives under `~/.temperance_engine`
and `~/.config/opencode`; this repo owns planning and acceptance.

| Concern | Authority |
|---|---|
| Models / failover / budgets | Host OmniRoute + temperance combos |
| Planning spine | `.planning/` (GSD) + `temperance-next-wave` |
| Human roadmap | one GitHub Project per repo (`temperance-gh-plan`) |
| Acceptance | `ISA.md` when present |
| Session loop | `/gsd:goal` → `.temperance/goal.json` (not a second planner) |
| Handoff (if present) | `.project/HANDOFF.md` |
| Parallel execute | `noesis-execute` / `temperance-batch` |

`/gsd:*` binds the mode. A card only on a bare first prompt with no saved session/cwd mode.

### Auto next-wave

When an agent session starts in this cwd, enrich injects `dispatch: NEXT-WAVE …`.
The injected next-wave is a proposal only. Do not dispatch until a matching
approval receipt has been atomically claimed by the swarm control ledger.

```bash
temperance-next-wave --cwd .
temperance-project-init --cwd . --check
manifest-bridge init --cwd .
manifest-bridge sync --cwd .
temperance-swarm-dispatch --request .planning/swarm-claim.json --dry-run
```

Manifest: `.temperance/project.json` (schema temperance.project.v1)
<!-- temperance:project-rail:end -->


## Product copy workflow

Start from `.agents/product-marketing-context.md` and the growth-content cluster. Load the actual copywriting skill before drafting. Compare distinct headline and CTA options before selecting a direction. A separate editor runs all seven copy-editing sweeps and avoid-ai-writing; an independent page-CRO reviewer sees the draft and foundation without the editor findings. Revise against both reviews and audit the factual claims before integration.

Functional checks prove controls and rendering. They do not establish copy quality or conversion improvement. Keep internal release matrices, private profile inventories, source receipts and implementation-status commentary in planning or documentation. The product engineering backlog is in `Sheshiyer/temperance_engine`, issue45 and Project27.

Preserve the brand, controlled film, accessibility, configured client boundaries and original upstream ownership. Record actual routed-provider outcomes, including failures. An advisory skill match, loaded file or configured route is not a completed model or tool result.
