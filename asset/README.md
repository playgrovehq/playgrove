# PlayGrove asset store

Search 2,929 converted 3D assets by their original creator: 1,193 Kenney and 1,736 Quaternius. Each ready package contains native mesh TypeScript, a thumbnail, searchable metadata and source provenance.

## Search from anywhere

Download the CLI from the [GitHub release](https://github.com/playgrovehq/playgrove/releases/tag/search-2026-09-05). The npm registry's earlier 0.0.1 package does not include this search tool.

```sh
npm install --global https://github.com/playgrovehq/playgrove/releases/download/search-2026-09-05/playgrove-0.0.3.tgz
grove assets search "oak tree" --source kenney --type model --limit 5
grove assets search "house" --source quaternius --limit 5
```

Or clone this repository and run `node packages/cli/bin/grove.js assets search "oak tree"`. Installed search uses the public HTTPS catalog; a full checkout uses its local catalog. Pass `--catalog <HTTPS URL or local path>` to select a specific catalog, `--pack <pack-id>` to restrict a pack, and `--offset <number>` for the next page.

Results are JSON with download paths or URLs for the actual TypeScript geometry, PNG thumbnail and metadata. They also include original creator, asset type, tags/category, colors, dimensions, mesh counts, source, license and compatibility. `--type` accepts model, texture or hdri; only models are ready in this release. Use `--availability source` for Poly Haven source listings, or `--availability all` for both. Source entries explicitly contain `availability: "source"`, `nativeReady: false`, null model/descriptor fields and links to the original download manifest. These entries are not converted assets. Search downloads catalog metadata, not every model. Download the returned model URL only when you choose an asset.

## Creator rooms

- [Kenney](collections/kenney/README.md): 1,193 ready models.
- [Quaternius](collections/quaternius/README.md): 1,736 ready models.
- [Poly Haven](collections/poly-haven/README.md): 2,370 source listings with original previews: 521 models, 856 textures and 993 HDRIs. No converted files yet.
- PlayGrove original artwork: planned. Converted third-party artwork stays with its original creator.

## Use the geometry

Each model module exports `asset` and the same object as its default export. It embeds positions, normals, triangle indices, opaque colored parts and four empty static clips. No GLB loader is needed. This is PlayGrove's native asset format, not a promise that arbitrary engines understand it. A renderer must implement that format or adapt its mesh arrays.

Every published model passed PlayGrove native admission individually. Combining models must still fit the engine's limits. The preview is a headless render of converted geometry with native-style lighting; it is not a native Metal capture. Texture maps, transparency and skeletal animation are not included in this release. Original PBR shading is not promised.

## Rights and provenance

Original artwork is by Kenney or Quaternius. These specific published packs retain CC0-1.0 notices in their License.txt files. Quaternius packs were admitted using pack-specific listings and included notices; this does not grant rights to other Quaternius releases. PlayGrove performs conversion and packaging and does not claim creator endorsement. The engine/tool code license is separate and remains unselected.

The ready [catalog](catalog.json) excludes unsupported inputs. Tags and categories derive from source names; they are not human-curated classifications. New compatible assets will be added as converter and engine support improve.

## Browse Poly Haven sources

```sh
grove assets search "wood" --source poly-haven --type texture --availability source --limit 5
grove assets search "sunset" --source poly-haven --type hdri --availability source --limit 5
```

[Source catalog](source-catalog.json) records are from the official Poly Haven API. The preview URLs load images from Poly Haven; this repository does not host those images or original files. Credit: [Poly Haven](https://polyhaven.com/). API callers should send an identifying User-Agent or Referer. The listing count is separate from our ready count.
