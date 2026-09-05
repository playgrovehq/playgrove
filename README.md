# PlayGrove

PlayGrove is an open-source, AI-native game creation platform and universal asset library for humans and coding agents.

The first target is a responsive 2D game for iPad and iPhone, built with Godot 4. The platform is designed to grow from 2D to 2.5D and eventually 3D, with Blender supporting 3D creation.

## Direction

- `grove` is the authoritative CLI.
- Godot and MCP are adapters over the same operations.
- `grove://` gives assets vendor-neutral addresses.
- Assets work from local and remote storage.
- Shared asset versions are immutable and carry licensing, provenance, compatibility, and preview metadata.
- Engine code and artwork use separate licenses.

## CLI

The initial public package establishes the `playgrove` package and `grove` executable identities:

```sh
npm install --global playgrove
grove --help
```

## Current status

PlayGrove is in its initial design and foundation stage. The first real game will seed the asset library and prove the complete create, package, publish, download, verify, and run workflow.

The initial asset ecosystem study is available at [`studies/2026-08-31_asset-ecosystem/0_01_STUDY.md`](studies/2026-08-31_asset-ecosystem/0_01_STUDY.md).

## Operational records

- [Current project state and NEXT](0_08_TRACKER.md#next--read-this-first)
- [GitHub identity, repository, and verification](github/README.md)
- [npm identity, release, authentication lessons, and verification](npm/README.md)

## Licensing

The code and first-party artwork licenses have not yet been selected. No license should be inferred until the corresponding license files are published.

## Searchable asset store

The [asset store](asset/README.md) contains 2,929 ready native geometry assets from Kenney and Quaternius, plus 2,370 separately marked Poly Haven source listings. Search includes previews, creator and type filters, and explicit ready/source availability. Install the [GitHub search release](https://github.com/playgrovehq/playgrove/releases/tag/search-2026-09-05).
