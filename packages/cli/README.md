# PlayGrove CLI

This package supplies the `grove` command. Converter code is in [`../../converter/`](../../converter/README.md); viewer code is in [`../../viewer/`](../../viewer/README.md); converted packages are in [`../../asset/`](../../asset/README.md).

From the project root:

```sh
node packages/cli/bin/grove.js --help
node packages/cli/bin/grove.js assets view asset/kenney-nature-kit/tree-oak/tree-oak.ts
node packages/cli/bin/grove.js assets verify asset/kenney-nature-kit/tree-oak/tree-oak.ts
npm --prefix packages/cli test
```

Run, view and verify use the full repository's sibling converter/viewer directories. Search is included in the standalone package. The npm registry's earlier `playgrove` 0.0.1 still provides only help/version; use the GitHub release for the current search tool.

Conversion saves locally. Use `node converter/kenney.js import` for the approved Kenney collection with temporary downloads and cleanup. Generic remote-source graphs retain their own source cache. See the converter README for local-source jobs and the graph format.

## Search the asset store

Install the standalone CLI from GitHub:

```sh
npm install --global https://github.com/playgrovehq/playgrove/releases/download/search-2026-09-05/playgrove-0.0.4.tgz
grove assets search "oak tree" --source kenney --type model --limit 5
```

Run from the project root:

```sh
node packages/cli/bin/grove.js assets search "oak tree"
node packages/cli/bin/grove.js assets search "car" --limit 5
node packages/cli/bin/grove.js assets search --pack kenney-nature-kit --limit 20 --offset 20
```

The command prints JSON with the total match count and result entries. Each result has a unique pack/asset ID, label, description, license, source record and usable thumbnail/model/descriptor paths. Model paths point to TypeScript containing actual native geometry; descriptor paths point to metadata.json. Results also contain tags, category, colors, dimensions, geometry counts and compatibility limits. An agent can inspect the thumbnail before importing the selected TypeScript. Search returns ready assets by default; it does not download models.

Search matches word prefixes across names, pack names, descriptions, tags, categories and color names, with exact label matches ranked first. All query words must match. This is keyword search, not visual or semantic search. Tags/categories come from source names; color names are nearest named swatches. An empty query browses the catalog. `--pack` requires the exact pack directory name. `--limit` accepts 1–100; `--offset` selects later results.

In a full checkout, search uses local `asset/catalog.json`. When that file is absent, the installed package reads `https://raw.githubusercontent.com/playgrovehq/playgrove/main/asset/catalog.json`. Pass `--catalog /path/to/catalog.json` or `--catalog https://.../asset/catalog.json` to select another catalog. Remote results contain HTTPS download links instead of local file paths. No model download occurs until the caller chooses and fetches a result.

Filter creators with `--source kenney`, `quaternius`, `poly-haven` or `playgrove`. Filter asset types with `--type model`, `texture` or `hdri`. Use `--availability source` to browse Poly Haven source listings, or `--availability all` to search both catalogs. The default `ready` returns only converted assets. Source entries have `availability: "source"`, `compatibility.nativeReady: false`, null model/descriptor fields, an original-source preview, and links to the source page and download manifest. They are not converted packages. Source previews are hosted by Poly Haven; no preview files are republished. Results include the catalog used, creator and type.

```sh
grove assets search "wood" --source poly-haven --type texture --availability source --limit 5
grove assets search "sunset" --source poly-haven --type hdri --availability source --limit 5
grove assets search "chair" --source poly-haven --type model --availability source --limit 5
```

Source browsing reads `source-catalog.json` beside the chosen ready catalog. When using `--catalog`, supply the ready catalog's path or URL; the source catalog is its sibling. Download manifests belong to Poly Haven's API. Identify your client with a User-Agent or Referer when fetching that API; for example, `User-Agent: PlayGrove-AssetConverter/0.0.1`. Select a format and resolution from the manifest rather than downloading every variant.

This is a CLI tool that coding agents can run. It is not an installed MCP server. GitHub release publication does not update the npm registry.

Prior-art choice: reuse the existing pack catalogs and plain JSON. At this collection size, a separate database or semantic-search service is unnecessary for name/description search. Actual-catalog tests cover ranking, image/model path existence, pack filters, pagination and invalid input.

## Install a selected asset

Use the exact ID returned by search:

```sh
grove assets add kenney-nature-kit/tree-oak --into ./assets
grove assets add quaternius-ultimaterpg/pouch --catalog https://raw.githubusercontent.com/playgrovehq/playgrove/main/asset/catalog.json --into ./assets
grove assets add kenney-nature-kit/tree-oak --catalog /path/to/store/asset/catalog.json --into ./assets
```

The command copies or downloads the TypeScript model, metadata, thumbnail, source record and pack license into `<into>/<pack>/<asset>/`. It prints a local import and the minimum game version. Adjust the printed relative import for your game file. Import the asset into your game's asset table through the existing trusted TypeScript authoring path. Installation never executes downloaded TypeScript or modifies the game.

Remote installation accepts only the official PlayGrove raw GitHub catalog URL, using either main or a full commit hash. It resolves main once, then downloads every file from that same commit. `installation.json` records the catalog hash, commit, original locations and SHA-256 of each installed file. Local installation records paths and hashes with no Git dependency. A receipt records acquired bytes; it is not a signature or a new renderer compatibility test.

Only complete admitted CC0 native packages are installable. Source-only Poly Haven listings remain discovery results. Existing destinations are refused; move or remove an old installation explicitly before replacing it. Failed acquisition leaves an existing package untouched.
