<!-- GW:FRONT:BEGIN schema=gw.front.v1
kind: TRACKER
keeper: architect
phase: live
campaign: —
GW:FRONT:END -->

# TRACKER — PlayGrove: current state and results index

```text
initialized at Klay's direct request by: 26083101 · openai-codex/gpt-5.6-sol · 2026-09-04
keeper after initialization: the appointed PlayGrove Architect
```

SPEC owns the roadmap; this file reports current truth and preserves receipts. No campaign may be invented here. Landed result rows are append-only.

## NEXT — read this first

**Pen holder:** `26083101 · since 2026-09-04 · transfers to the next Codex project session` — one writer at a time.

### → SUCCESSOR HANDOFF — Pi to Codex

| field | value |
|---|---|
| read order | `0_08_TRACKER.md` §NEXT → `README.md` → `studies/2026-08-31_asset-ecosystem/0_01_STUDY.md` → `github/README.md` and `npm/README.md` when operating those services |
| successor | next Codex project session · holds project coherence and this mutable NEXT pen; Architect authority is not assigned until Klay appoints it |
| live seats | none deployed by this session |
| what is left | 1. Appoint the Codex Architect. 2. Agree what the first game will be and its delivery date. 3. Write and ratify `0_03_SPEC.md`; the future Architect also creates `0_02_MAP.md`. 4. Ratify asset-admission lanes and design the first Asset Contract. 5. Select code and first-party artwork licenses. 6. Build only from the ratified roadmap. |
| decisions made | GitHub is canonical because Cursor Origin excludes unpaid readers. Product `PlayGrove`; GitHub organization `playgrovehq`; repository and npm package `playgrove`; executable `grove`; asset addresses `grove://`; registered domain `playgrovehq.com`. Godot 4 is the runtime and Blender is the 3D tool. First game is 2D for iPad first and iPhone second. |
| stamped | 2026-09-04 EDT |

Delete this handoff block only after the Codex successor has read it and signed its first NEXT update.

### State — what is true right now

| state | fact | verification | checked at |
|---|---|---|---|
| live/done | Public GitHub repository `playgrovehq/playgrove` exists on branch `main`. | `gh repo view playgrovehq/playgrove --json visibility,defaultBranchRef,url` | 2026-09-04 |
| live/done | npm package `playgrove@0.0.1` is public, maintained by npm user `playgrove`, and installs executable `grove`. | `NPM_CONFIG_USERCONFIG=/dev/null npm view playgrove version bin maintainers --json` plus clean temporary install | 2026-09-04 |
| live/done | `playgrovehq.com` is registered by Klay; no website or DNS binding has been established in this repository. | Klay's direct report | 2026-09-04 |
| live/done | Asset ecosystem study is complete and public. | `studies/2026-08-31_asset-ecosystem/0_01_STUDY.md` | 2026-09-04 |
| pending/risk | No `0_03_SPEC.md` exists. Product builds must wait for a settled design, delivery date, roadmap, and Klay's ratification. | project root has no `0_03_SPEC.md` | 2026-09-04 |
| pending/risk | Code and first-party artwork licenses are undecided; npm `0.0.1` therefore declares `UNLICENSED`. | `packages/cli/package.json` and npm registry | 2026-09-04 |
| pending/risk | Website hosting and DNS are not selected. | repository and GitHub homepage contain no live website binding | 2026-09-04 |

### Active contract — exactly one

| contract | owner | started | done when | gated by | immediately after |
|---|---|---|---|---|---|
| — no active build contract | — | — | — | Klay appoints the next Architect and settles the first-game design and date | Architect writes the candidate SPEC; Klay ratifies before any build |

### HANDS — batched human steps

| # | owner | action | self-verification | rollback | needed by |
|---|---|---|---|---|---|
| 1 | `[HUMAN] Klay` | Appoint the next Codex session as PlayGrove Architect and begin the first-game design conversation. | Architect states the appointment and reads this handoff. | End the appointment before any governed artifact is signed. | Before `0_02_MAP.md` or `0_03_SPEC.md` is authored. |

### Queue — top item is next

| priority | item | tier | owner | state | dependency / revisit trigger |
|---|---|---|---|---|---|
| P0 | Settle the first game's movement, interaction loop, delivery date, and SPEC. | design | `[HUMAN] Klay` + appointed Architect | queued | Architect appointment |
| P1 | Ratify HOSTED, REFERENCE-ONLY, and REFUSED asset-admission lanes; design the first universal Asset Contract and local/remote resolver. | campaign candidate | appointed Architect | blocked | ratified SPEC and roadmap |
| P1 | Select separate licenses for engine code and first-party artwork. | decision | `[HUMAN] Klay` + appointed Architect | queued | license discussion during SPEC |
| P2 | Point `playgrovehq.com` to a website host and set the GitHub repository homepage. | errand | `[HUMAN] Klay` + future implementer | deferred | website content and host selected |
| P2 | Add a Homebrew distribution route for package `playgrove` and executable `grove`. | task candidate | future Holder/Builder | deferred | a real stable CLI release exists |
| P2 | Publish a later npm version with real asset operations. | task candidate | future Holder/Builder | blocked | Asset Contract is ratified and implemented |

### Position

| field | value |
|---|---|
| active campaign | — |
| active folder | — |
| last box checked | — · no SPEC roadmap or campaign exists |
| human gate | Klay appoints the Codex Architect and ratifies the first SPEC |
| **blocked?** | **YES** · no ratified SPEC, roadmap, or delivery date |

### Before releasing the pen

1. Reverified GitHub public status, npm public package `0.0.1`, Git synchronization, source paths, and absence of a SPEC.
2. No active contract is claimed; the project is truthfully waiting at its human design gate.
3. Every unresolved item has an owner, state, and dependency or revisit trigger.
4. Pre-tracker foundation work is preserved as result row 1 below.

---

## CAMPAIGNS — boxes against the SPEC roadmap

No campaigns exist. The appointed Architect will copy campaign rows only from a ratified `0_03_SPEC.md` roadmap.

## RESULTS — append-only index

| # | campaign | question it answered | headline result | conformance (Architect) | status |
|---|---|---|---|---|---|
| 1 | `— · pre-tracker public-foundation work` | Are PlayGrove's public source and package identities established? | Public GitHub `playgrovehq/playgrove`; public npm `playgrove@0.0.1`; anonymous clone, registry read, install, `grove --version`, and `grove --help` passed. Receipts: commits `224fe37`, `38ba12f`, `3fb0160`, and operational record `024c458`. | — · work predates a ratified SPEC | waived · completed by Klay's direct instruction before tracker creation |

## CORRECTIONS

Never edit a landed result row silently. Correct with a dated row.

| id | date | campaign · box/row | correction | authority |
|---|---|---|---|---|
| — | — | — | — | — |

## UGLY BOXES — standing self-audit

| # | off? `Y/N` | finding |
|:--|:---|:---|
| T1 | N | No checked box has an empty receipt. |
| T2 | N | No campaign is active. |
| T3 | N | No campaign is marked closed. |
| T4 | N | Statuses use hard states. |
| T5 | N | Operational depth remains in `github/README.md`, `npm/README.md`, and the study. |
| T6 | N | NEXT states truthfully that no campaign or build contract is active. |

## TRACKER INTEGRITY — creation judgment

1. **Coverage:** Yes. No campaign has been opened; pre-tracker public-foundation work has one explicit result row.
2. **Traceability:** Yes. The result points to public commits and operational records; it explicitly states that no campaign review exists.
3. **Immutability:** Yes. RESULTS and CORRECTIONS begin append-only at creation.
4. **Authority:** Yes. Klay directly requested initialization; no Architect signature, conformance verdict, SPEC, or roadmap was fabricated.
5. **Judgment:** The first-game design and delivery date will determine the sequence. The roadmap does not yet exist and must be written into a ratified SPEC before execution.
