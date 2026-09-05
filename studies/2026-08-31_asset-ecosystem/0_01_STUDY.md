<!-- GW:FRONT:BEGIN schema=gw.front.v1
kind: STUDY
keeper: 26083101
phase: complete
campaign: —
GW:FRONT:END -->

# STUDY — Reusable Game Assets and an MCP-Native Universal Asset Platform

authored by: `26083101` · `gpt-5.6-sol` · `high` · 2026-08-31

## DIGEST

1. Question and why it matters: Can we use free assets from Fab/Unreal and elsewhere in a Godot game, can those assets enter our future store, and is an MCP-native universal asset platform a credible business?
2. Sources examined and commands run: Current Fab and legacy Epic licenses, Unity terms, Godot Asset Library design, Cursor Origin, Kenney, Poly Haven, ambientCG, Quaternius, OpenGameArt, itch.io, GitHub MCP prior art, one real Kenney download, and one real installation attempt of the strongest direct MCP candidate.
3. Findings: Free does not mean redistributable. Many assets may be modified and embedded in a completed game but may not be republished as assets—even after modification. CC0 and our own work are the clean first catalog. Fab already spans tools, but direct MCP prior art stops at generation/local files rather than a governed universal marketplace.
4. Adopt/refuse: Use our own work and admitted CC0 for the first game; permit project-local use of individually cleared Fab assets; never upload Fab Standard, Unity, current Quaternius, or ambiguous itch.io source assets into our public library. Reference Godot’s commit-pinned catalog and Fab’s reference-asset idea.
5. STUDIER'S JUDGMENT — The business opportunity is real, but “MCP store” alone is not the moat. The defensible product is a trusted, engine-neutral asset contract plus native CLI/MCP workflow, provenance, compatibility checks, versioned dependencies, and lawful creator distribution. MCP is the easiest door into that system.

ACTION: Ratify the three-lane admission policy before the Asset Library contract is written: HOSTED, REFERENCE-ONLY, REFUSED.

## MAP — your seat and assignment

Keeper: 26083101, studying prior art and licenses before the engine architecture hardens.

## DISPOSITION — how deep, decided before you search

- **Disposition:** `comprehensive` · **Why:** Asset reuse, redistribution rights, and marketplace architecture are strategic core boundaries in mature domains; a wrong assumption could invalidate both the first game and the proposed business.

## GOALS — what we needed to learn

- **Question:** Which existing free game assets may be lawfully used and modified outside their native engines, which may be redistributed through our future platform, and what existing marketplaces/MCP projects teach us about an AI-native universal asset workflow?
- **Waiting decision:** Define the Asset Library contract, source-admission rules, first-game reuse policy, and whether the MCP asset platform is a credible differentiated business.
- **Scope:** No public upload, no marketplace implementation, no pricing forecast, and no legal opinion beyond recording published license terms and operational consequences. This study does not approve any particular third-party asset; each asset still needs admission under the license attached when acquired.

## HISTORY — what we actually examined

| source | type | where it lives | state | what we did with it |
|---|---|---|---|---|
| Fab Standard EULA | official agreement | https://www.fab.com/eula | live; last-updated text says 2024-10-01 | Direct fetch hit Cloudflare; retrieved the same URL through Jina’s text proxy and read license grants/restrictions |
| Fab licenses/pricing and purchasing docs | official docs | https://dev.epicgames.com/documentation/en-us/fab/licenses-and-pricing-in-fab and `/purchasing-and-downloading-assets-in-fab` | live | Fetched and read license types, legacy-license warning, formats, and DCC/engine exports |
| Epic Content License Agreement | official agreement | https://www.unrealengine.com/en-US/eula/content | live | Read legacy UE Marketplace project-use, source-distribution, UE-Only, AI, and standalone restrictions |
| Unity Asset Store Terms/EULA | official agreement | https://unity.com/legal/as-terms | live | Read embedded-product grant, restricted assets, standalone distribution, contractor, and AI-input restrictions |
| Godot Asset Library submission documentation | official docs | https://docs.godotengine.org/en/stable/community/asset_library/submitting_to_assetlib.html | live; page identified Godot docs 4.7 | Read review gate, repository indirection, commit pin, version, compatibility, license, previews, and download behavior |
| Cursor Origin Code Hosting | official changelog + docs | https://cursor.com/changelog/origin-code-hosting and https://cursor.com/docs/origin | early beta, launched 2026-08-17 | Read hosting, standard Git, PR, browsing/search, GitHub mirror, availability, namespace, access, and source-of-truth behavior; searched examined docs for binary/LFS/releases/API/public-download claims |
| Kenney Platformer Art Deluxe | official asset/listing | https://kenney.nl/assets/platformer-art-deluxe | live | Read asset-specific CC0 listing; downloaded and unpacked the real 6.58 MB pack; read its included license |
| Poly Haven license | official terms | https://polyhaven.com/license | live | Read CC0 use and explicit redistribution grant |
| ambientCG license | official terms | https://docs.ambientcg.com/license/ | live | Read CC0 use, modification, distribution, and commercial grant |
| Quaternius Asset License 1.0 | official terms | https://quaternius.com/license.html | live; last updated 2026-08-28 | Read completed-product grant and explicit ban on standalone redistribution of original or modified assets |
| OpenGameArt FAQ | official docs | https://opengameart.org/content/faq | live | Read mixed-license rules, commercial use, attribution, redistribution, CC0, CC-BY and CC-BY-SA summaries |
| itch.io creator FAQ | official docs | https://itch.io/docs/creators/faq | live | Confirmed itch.io hosts creator-owned content; no universal downstream asset license was stated |
| GitHub repository search | API result | https://api.github.com/search/repositories | live | Searched `mcp server game assets`, Godot MCP, Blender MCP, Unity MCP, and Unreal MCP; recorded leading candidates |
| `MubarakHAlketbi/game-asset-mcp` | repository + experiment | https://github.com/MubarakHAlketbi/game-asset-mcp at `d6769f7ad07641d6169bcbc392366f3b00ca8f1b` | live repo; package v0.3.0 | Cloned, read README/code/package/license, and attempted a clean install on Node 24 Apple Silicon |
| `Coding-Solo/godot-mcp`, `ahujasid/blender-mcp` | repositories | GitHub | live | Screened identity/activity/license through GitHub API; retained as later integration references, not marketplace answers |

### Commands run

```sh
python3 - <<'PY'
# requests.get official URLs; print status, byte count, resolved URL; save responses under /tmp
PY
```

```text
fab_eula 403 25199 https://www.fab.com/eula
fab_licenses 200 98938 https://dev.epicgames.com/documentation/en-us/fab/licenses-and-pricing-in-fab
unity_terms 200 384469 https://unity.com/legal/as-terms
godot_assetlib 200 1398273 https://docs.godotengine.org/en/stable/community/asset_library/submitting_to_assetlib.html
polyhaven 200 71934 https://polyhaven.com/license
ambientcg 200 34106 https://docs.ambientcg.com/license/
quaternius 200 10301 https://quaternius.com/license.html
opengameart_faq 200 70164 https://opengameart.org/content/faq
```

```sh
python3 - <<'PY'
from bs4 import BeautifulSoup
# convert fetched HTML pages to searchable text
PY
```

```text
ModuleNotFoundError: No module named 'bs4'
```

**Banked lesson before retry:** The environment does not include BeautifulSoup. Installing a dependency would not improve the study result; the second extraction used Python’s standard-library `html.parser`.

```sh
python3 - <<'PY'
# GitHub Search/Repository APIs for five MCP/game-engine queries
PY
```

```text
mcp server game assets: MubarakHAlketbi/game-asset-mcp 153 stars MIT; HurtzDonutStudios/ai-forge-mcp 90; Flux159/mcp-game-asset-gen 21
godot mcp: Coding-Solo/godot-mcp 5444 stars MIT
blender mcp: ahujasid/blender-mcp 26562 stars MIT
unity mcp: CoplayDev/unity-mcp 13788 stars MIT
unreal mcp: chongdashu/unreal-mcp 2071 stars, no detected license
```

```sh
python3 - <<'PY'
# fetch Cursor Origin official changelog/docs through the text proxy; search for Git, GitHub, LFS, binary, storage, release, API, public and access
PY
```

```text
Origin is an early-beta Git forge on paid plans with repositories, standard clone/push/pull, pull requests, browsing/search, GitHub sync and agent integrations.
For GitHub-synced repositories, GitHub remains source of truth and Origin is the mirror.
The examined overview documents did not state public anonymous repository/package access, Git LFS, release artifacts, binary quotas, object storage, or a catalog API.
```

```sh
git clone --depth 1 https://github.com/MubarakHAlketbi/game-asset-mcp.git /tmp/game-asset-mcp
git -C /tmp/game-asset-mcp rev-parse HEAD
```

```text
d6769f7ad07641d6169bcbc392366f3b00ca8f1b
```

```sh
cd /tmp/game-asset-mcp && npm ci && env -u HF_TOKEN -u MODEL_SPACE npm start
```

```text
npm error canvas@2.11.2: no Node 24/darwin-arm64 prebuilt binary (HTTP 404); source fallback failed because pkg-config/pixman-1 were absent. npm start did not run.
```

**Banked lesson before any retry:** This direct MCP candidate is not installation-clean on the current Node 24 Apple Silicon environment. No local Node LTS was installed. Installing another runtime or system libraries merely to rescue a study subject would not change the architectural finding, so the honest result remains red.

```sh
curl -L --fail 'https://kenney.nl/media/pages/assets/platformer-art-deluxe/cb30f83169-1677696393/kenney_platformer-art-deluxe.zip' -o /tmp/kenney-platformer/asset.zip
unzip -q /tmp/kenney-platformer/asset.zip -d /tmp/kenney-platformer/unpacked
```

```text
ZIP_BYTES 6582450
FILES 1021
LICENSE_FILES /tmp/kenney-platformer/unpacked/license.txt
License (CC0). You may use these graphics in personal and commercial projects. Credit would be nice but is not mandatory.
```

## RESULTS — findings

### The direct answer about existing free assets

- We can use and modify many free Fab assets in our completed Godot game, but “free” describes price, not ownership or redistribution. The listing’s license, tier, source/reference format, legacy status, NoAI status, and any UE-Only designation decide the exact use. `[verified — Fab docs, Fab EULA §§2–6, Epic Content License §§2–5]`
- Fab Standard content may be privately modified and incorporated into distributed games; it may not be redistributed standalone, exposed through a world/level/modeling tool for third-party export, or uploaded into our public asset store. Tweaking the mesh or texture does not remove that restriction. `[verified — Fab EULA §§3–6]`
- Legacy UE Marketplace content uses the Epic Content License Agreement. Non-UE-Only content has broad private/project use, while content explicitly designated UE-Only is restricted to Unreal Engine and Unreal-based products. Legacy source content still cannot be republished standalone. `[verified — Epic Content License §§2–5]`
- Fab listings may use CC-BY instead of Standard, and Fab can export applicable products to Unreal, Unity, Maya, 3ds Max, Blender, and Cinema 4D. Godot is not in the listed one-click exports, but engine-neutral source formats can pass through Blender into GLB when the license permits. `[verified — Fab licenses/pricing and purchasing docs]`
- Unity non-restricted assets may be modified and embedded in a substantial original product, but source redistribution is outside the grant. Unity also prohibits using Asset Store assets as AI/ML inputs or gathering/scraping them for AI without express consent. This makes them a poor default source for an MCP-driven pipeline. `[verified — Unity Asset Store EULA §§2.2.1 and 2.2.1.1]`
- Kenney’s examined asset is genuinely CC0 in both its live listing and downloaded package. Poly Haven and ambientCG explicitly publish their downloadable assets under CC0; Poly Haven explicitly permits redistribution. These are the cleanest external sources for the first catalog, alongside our own work. `[verified — official listings/licenses and real Kenney download]`
- Quaternius’ current QAL 1.0 allows modification and use in commercial games but forbids redistribution of original or modified assets as standalone assets or packs. It can help our game, but it cannot seed our public store. `[verified — QAL 1.0 §§2–3, last updated 2026-08-28]`
- OpenGameArt is a mixed-license archive. Assets can be commercial, but obligations differ by item; CC-BY requires attribution and CC-BY-SA adds share-alike restrictions. Starting with an asset-level CC0 whitelist is safer than treating the site as one license. `[verified — OpenGameArt FAQ]`
- itch.io has no single asset license: creators retain their content and set item-specific terms. An itch.io asset is refused until its exact download-time license is admitted. `[verified — itch.io creator FAQ; reasoned operational consequence]`
- A model may help alter a lawfully acquired asset only if the license permits that AI use. Fab NoAI content and Unity’s default AI restriction must not be passed into a generative transformation tool. Metadata-only catalog access is a separate operation from exposing asset bytes to a model. `[verified — Fab license docs/EULA §6 and Unity EULA §2.2.1.1; reasoned system boundary]`

### The platform and business

- Fab is already broader than an “Unreal store”: it supports multiple DCCs, Unity, engine-neutral formats, source assets, reference assets, creator publishing, free/paid tiers, and a universal resource identifier concept. We should not claim to have invented the universal asset store. `[verified — Fab docs and EULA §2(d)]`
- Godot’s library proves a useful low-cost catalog shape: the catalog stores metadata and points to third-party repositories; releases are pinned to exact commits, checked for engine compatibility and license correctness, reviewed, versioned, previewed, and downloaded into the project. `[verified — Godot Asset Library submission docs]`
- Cursor Origin is a genuine Git forge, not merely an editor feature: it supports standard Git, repositories, pull requests, browsing/search, agents, and GitHub mirroring. But it launched in early beta on paid plans; the examined overview docs do not establish public anonymous asset delivery, Git LFS/release artifacts, binary quotas, object storage, or a public catalog API. It is suitable for an experiment or mirror now, not yet the sole public asset-distribution authority. `[verified — Cursor Origin official changelog/docs; reasoned fit]`
- A Git forge can bootstrap our catalog but should not define asset identity or hold growing binaries in Git history. Canonical asset addresses must resolve equally to a local package, a Git-hosted package, or later object storage. `[reasoned from Git/catalog boundary]`
- Direct MCP prior art exists. `game-asset-mcp` exposes `generate_2d_asset`, `generate_3d_asset`, and `asset://{type}/{id}` resources backed by Hugging Face/Gradio and local timestamp-named files. It does not provide a marketplace, creator identity, immutable releases, dependencies, license admission, provenance contract, engine/iOS conformance, or CLI-first authority. `[verified — repository at exact commit, README and source inspection]`
- The direct MCP candidate’s package metadata says ISC while GitHub detects MIT and its checked-in MIT file contains placeholder author/year text. It has no test script, and its clean install failed on this machine. We should reference its small MCP resource surface, not adopt the code. `[verified — package.json, LICENSE, GitHub API, npm output]`
- The first-mover claim must be narrower and honest: an AI-native, engine-neutral, licensed asset dependency system with one CLI/MCP grammar remains materially different from the marketplaces and generation adapters examined. `[reasoned from source comparison]`
- MCP is a distribution surface, not the business moat. Trust, lawful provenance, reliable conversion, compatibility guarantees, stable addresses, versioning, curation, and creator economics are the durable value. `[reasoned]`
- The first game is the correct way to seed this platform: our daughter’s characters and our own worlds become first-party packages; admitted CC0 items fill utility gaps; every real game use tests whether packages are actually reusable. Building an empty marketplace first would create a two-sided cold-start problem without proving the asset contract. `[reasoned]`
- Plausible later revenue surfaces are creator-sale commission, generation/conversion/optimization jobs, private team libraries, storage/bandwidth, and verified compatibility. Reselling third-party restricted “free” assets is not a lawful revenue surface. `[reasoned; license constraint verified above]`

### Recommended admission model

- `HOSTED`: our own assets, creator-submitted assets with explicit distribution rights, and correctly recorded CC0/compatible assets. Bytes may live in our store. `[reasoned from verified licenses]`
- `REFERENCE-ONLY`: assets usable in a game but not redistributable—Fab Standard, legacy Epic non-UE-only, current Quaternius, many Unity/itch.io items. Our record may hold metadata, source address, entitlement/license snapshot, and project-local receipt; public bytes remain at the authorized source. `[reasoned from verified licenses]`
- `REFUSED`: UE-Only content for Godot, unclear provenance, noncommercial-only content for a commercial project, missing license, forbidden AI input when transformation is requested, or incompatible share-alike/DRM obligations. `[reasoned from verified restrictions]`
- Modification never changes the admission lane by itself. The original license follows the derivative unless the licensor expressly says otherwise. `[verified for Fab/Unity/Quaternius; general use requires asset-specific confirmation]`

### Deep dossier — Fab

| surface | extract |
|---|---|
| Identity | Epic’s live multi-category marketplace; Standard, CC-BY, and temporarily legacy UE Marketplace licenses |
| Modular design | Listings separate product metadata, license/tier, formats, source/reference assets, library entitlement, export, and engine/DCC integration |
| Features | Search, previews, free/paid acquisition, creator publishing, personal/pro tiers, source/reference assets, one-click export to six named tools |
| Lifecycle | Acquire under the then-current license; library/re-download is offered but not guaranteed; legacy acquisitions retain their governing license unless separately reacquired under new terms |
| Tests | Documentation and EULA read; no account transaction or asset import performed |
| Maturity | Strong marketplace precedent; complicated by legacy licenses, NoAI, Reference Only, UE-only legacy content, plugins, and source-format availability |
| UI | Web, Epic Games Launcher, Unreal/UEFN integrations; no documented Godot/MCP native surface examined |
| Performance and ops | Not measured; account, entitlement and source hosting are platform assumptions |
| Reuse map | Reference its license dimensions, entitlement separation, source/reference distinction, and cross-tool export idea; never mirror Standard bytes |
| Fit | Valuable project-local source and architecture reference; not lawful inventory for our public store unless listing license grants redistribution |

### Deep dossier — Godot Asset Library

| surface | extract |
|---|---|
| Identity | Godot community catalog integrated with the editor/project manager |
| Modular design | Catalog metadata points to third-party Git repositories; exact download commit is explicit; addon/project categories are separate |
| Features | Search/install, review, Godot-version compatibility, version, license, icon/previews, issue/repository addresses |
| Lifecycle | Creator submits; reviewer checks; catalog resolves a pinned repository ZIP; revisions update the entry/internal version |
| Tests | Documentation read; no submission performed |
| Maturity | Simple and proven enough to borrow; one entry cannot represent multiple engine versions, requiring duplicate submissions |
| UI | Project Manager for projects/templates; editor for addons |
| Performance and ops | Avoids hosting package bodies; relies on Git host availability and ZIP behavior |
| Reuse map | Borrow commit pinning, compatibility, review, source indirection, license-file requirement, and preview metadata |
| Fit | Strong catalog precedent, but oriented toward Godot addons/projects rather than universal art, provenance, generated assets, or paid creator commerce |

### Deep dossier — `game-asset-mcp`

| surface | extract |
|---|---|
| Identity | Node package v0.3.0, commit `d6769f7…`, 153 GitHub stars at observation; repository reports MIT but metadata/license file conflict |
| Modular design | MCP handlers → Hugging Face 2D inference or Gradio 3D workflow → local files/resources |
| Features | Two generation tools; list/read `asset://` resources; stdio/SSE/HTTPS claims; PNG/OBJ/GLB outputs |
| Lifecycle | Requires HF token and duplicated model space; long 3D work starts asynchronously; local timestamp files persist without release lifecycle |
| Tests | No package test script; `npm ci` failed before startup on Node 24 Apple Silicon due native `canvas` dependency |
| Maturity | Useful proof of demand and grammar; README promised June 2026 attention, while inspected commit was 2026-05-29; install and license hygiene are weak |
| UI | MCP only; no authoritative CLI or human catalog UI |
| Performance and ops | External model availability, credentials, quota, retries and local disk are assumed; not measured because install failed |
| Reuse map | Reference two simple generation verbs and resource URI concept; do not adopt code |
| Fit | Confirms MCP asset-generation demand but does not solve sharing, licensing, versioning, admission, compatibility, or marketplace trust |

### Deep dossier — CC0 source group

| surface | extract |
|---|---|
| Identity | Kenney (2D/3D packs), Poly Haven (HDRIs/textures/models), ambientCG (materials/models); asset/site-specific identity retained |
| Modular design | Downloadable packs/files with simple asset pages and licenses; no shared universal schema |
| Features | High-quality reusable production inputs, commercial use, modification; examined licenses permit broad redistribution |
| Lifecycle | Source sites publish revisions; our system would need to snapshot source, license, acquisition time, and exact file hash/version |
| Tests | Kenney pack downloaded and included CC0 license verified; other two licenses read but assets not downloaded |
| Maturity | Best lawful seed material, but source quality/style/format compatibility still varies |
| UI | Human-first websites; no common MCP contract examined |
| Performance and ops | Download/storage not measured beyond one 6.58 MB Kenney pack |
| Reuse map | HOSTED when asset-specific CC0 is recorded; always disclose original source even where attribution is not required |
| Fit | Cleanest external inventory for early testing, but our daughter’s first-party art remains the identity of the first game |

## REVIEWS — adopt / borrow / reference / refuse

| candidate | ADOPT / BORROW / REFERENCE / REFUSE | inherited cost or reason | license + required notices |
|---|---|---|---|
| Our own first-game assets | ADOPT | Establishes first-party catalog and real workflow | We choose the license at release; preserve authorship/provenance |
| Kenney asset-specific CC0 | ADOPT selectively | Style fit and technical quality still require checking | CC0; no required credit, but record source and creator |
| Poly Haven | ADOPT selectively | Mostly later 2.5D/3D materials, HDRIs and models | CC0; no required credit, but record source |
| ambientCG | ADOPT selectively | Mostly later materials/models | CC0; no required credit, but record source |
| OpenGameArt CC0 items | ADOPT selectively | Must verify each item and provenance | CC0 item only initially; record source |
| OpenGameArt CC-BY/SA | REFERENCE | Attribution/share-alike/DRM compatibility needs a later policy | Per item and license version |
| Fab Standard free assets | BORROW for private project only | Useful in a completed game; cannot seed public store or authoring exports | Fab Standard EULA; retain acquisition/license record; honor NoAI |
| Fab CC-BY assets | REFERENCE | Potentially redistributable, but attribution and item provenance must be exact | CC-BY version/listing requirements |
| Legacy UE Marketplace assets | BORROW only after item check | Reject UE-Only for Godot; no standalone redistribution | Epic Content License + service/item terms |
| Unity Asset Store assets | REFUSE as default MCP source | No standalone redistribution and default AI-input/scraping restriction | Unity EULA plus restricted/provider terms |
| Quaternius QAL 1.0 assets | BORROW for private project only | Current license forbids standalone redistribution even after modification | QAL 1.0; no credit required; do not repackage |
| itch.io assets | REFERENCE | No platform-wide downstream license | Exact creator/item license required |
| Godot Asset Library architecture | BORROW | Catalog—not full marketplace—and Git-host dependency | Docs/reference only; implementation remains ours |
| GitHub public repo + Cursor Origin mirror | BORROW for bootstrap | GitHub supplies mature public reach while Origin gets real use; binary delivery still needs release/object-storage discipline | Repository/platform terms; asset licenses remain separate |
| Cursor Origin as sole asset authority | REFUSE for now | Early beta, paid availability, immutable beta namespace, and no examined proof of public binary/package/API surfaces | Revisit when documented and tested |
| Fab reference-asset concept | BORROW conceptually | Must not imply source permission or entitlement we do not have | No Fab code/content copied |
| `game-asset-mcp` code | REFUSE | Install failed; no tests; license metadata conflict; missing marketplace/admission boundary | Repository claims MIT but LICENSE has placeholder copyright; copy nothing |
| `game-asset-mcp` tool/resource shape | REFERENCE | Too narrow but proves model demand | No code copied |

## LESSONS — what remains unknown

| open question | why it matters | owner | suggested next step |
|---|---|---|---|
| Public creator admission and moderation | Determines identity proof, copyright response, review, and marketplace liability | `[HUMAN]` + future Architect | Keep first release private/first-party; design only the package fields now |
| First-party asset release license | Determines whether developers can redistribute, modify, resell derivatives, and use assets for AI | `[HUMAN]` | Decide separately from the engine’s open-source code license |
| Exact monetization and creator share | Marketplace economics need evidence from users and costs | `[HUMAN]` | Defer until the local registry and first game prove repeated use |
| Whether a specific Fab asset fits | License and format are listing/acquisition-specific | Asset importer | Admit each exact asset; never approve “Fab” as a whole |
| Trademark/API permission for external catalog indexing | A universal search layer must not become unauthorized scraping | Future Architect/legal review | Begin with direct creator submissions and permitted source connectors |
| Cursor Origin public access, LFS/release limits, API and export guarantees | Determines whether Origin can move from mirror to package host | 26083101 / `[HUMAN]` | Run a small real repo after namespace choice; keep GitHub or another remote as independent authority until proven |
| CC-BY/CC-BY-SA/iOS DRM policy | Could affect credits and distribution compatibility | Future Architect/legal review | Keep v1 HOSTED whitelist to own work and CC0 |
| Generated-output ownership and model terms | Code license does not settle output rights | 2D/3D module owner | Record provider/model/version/input/output terms per generation job |

## VERIFY — before you hand it off

1. **Deliverable:** Yes. The use-versus-redistribution answer, platform differentiation, first-game source policy, and open legal/product decisions are explicit.
2. **Evidence:** Yes for load-bearing findings: official terms/docs, exact repository/commit, source inspection, and real download/install attempts. Reasoned business judgments are labeled.
3. **Execution:** All pasted commands ran. The Kenney pack downloaded and its included license was read. The direct MCP candidate’s install failed before startup; no generation ran because the package did not install and no Hugging Face credential was supplied.
4. **Deviations:** Fab’s direct EULA URL returned Cloudflare 403 to the headless fetch; the same official URL was retrieved through Jina’s text proxy and cross-checked against Epic’s directly fetched documentation. Shell `find` was used twice for temporary-file orientation before returning to TFinder; it did not affect findings.
5. **Authority:** The study read external sources and wrote only this governed project study. No third-party asset or code entered the project; all experiments remained under `/tmp`.

## ARCHITECTURAL JUDGMENT — leave your assessment

1. **State and Logic:** Existing marketplaces often entangle a user’s entitlement with hosted bytes and tool integration. Our Contract must admit immutable asset identity, exact license/acquisition state, provenance, compatibility and distribution lane before any creation/runtime logic sees the asset.
2. **Explicit Schema:** Fab makes tier, license, source/reference format and product identity explicit; Godot makes repository, commit, engine version and license explicit. Direct MCP generation leaves creator, license, provenance, dependencies and compatibility bundled or absent. Our canonical package must expose those dimensions.
3. **Modular Design:** Use one Asset Contract and three storage/admission lanes beneath 2D, 3D, World and Story modules. CLI is authoritative; MCP and Godot are adapters. Remote storage replaces local storage later without changing package identity.
4. **Beyond the Obvious:** The study went beyond Unreal/Fab to Unity, Godot’s catalog, three CC0 sources, a newly restrictive 3D source, a mixed-license archive, itch.io, and direct MCP generation/editor projects.
5. **Depth Decision:** Comprehensive depth was proportionate. The decisive distinction—lawful use in a game versus lawful redistribution through our platform—would have been missed by a marketplace feature scan.

## NECESSITY AUDIT — answer before handoff

1. No action fell outside deciding legal reuse, architecture or business differentiation. The real Kenney download and direct MCP install tested the two strongest operational claims.
2. No extra framework, benchmark or implementation was added. Deep dossiers are required by the comprehensive study form and were limited to the selected candidates.
3. The failed BeautifulSoup extraction could have been avoided with standard-library parsing. The two temporary shell `find` calls could have been TFinder calls. Neither changed the result; both are disclosed. Installing Node LTS or native graphics libraries, generating an asset with credentials, testing every editor MCP, and downloading Fab content were deliberately omitted because they would not change the waiting decision.
