# PlayGrove on npm

## Official identities

- npm user and maintainer: `playgrove`
- Package: `playgrove`
- Package URL: https://www.npmjs.com/package/playgrove
- Executable installed by the package: `grove`
- Package source: `/Users/klaymoon/_dev/_game_engine/packages/cli`
- GitHub source: https://github.com/playgrovehq/playgrove

The package name and executable intentionally differ:

```sh
npm install --global playgrove
grove --help
```

## Current public release

- Version: `0.0.1`
- Published: 2026-09-05
- Access: public
- Maintainer: `playgrove`
- License field: `UNLICENSED` until the project selects its code license
- Tarball: `https://registry.npmjs.org/playgrove/-/playgrove-0.0.1.tgz`
- SHA-1: `78a07d5e0dd03cda877dd4d485adb4b425f70ed9`
- Contents: `README.md`, `bin/grove.js`, and `package.json`

npm versions are immutable. Never attempt to overwrite `0.0.1`; increment the version for every later publication.

## Authentication and recovery

At setup, the local npm CLI was authenticated as `playgrove`:

```sh
npm whoami
```

The account uses npm two-factor authentication with Apple Touch ID through WebAuthn. Browser authentication must use a normal browser window. Safari Private Browsing lost the callback state and caused publication to hang and fail.

Never store npm tokens, passwords, one-time codes, WebAuthn material, or recovery codes in this repository.

## Registration-day compatibility finding

This is historical troubleshooting evidence, not a permanent version pin:

- Node was `v24.4.1`.
- Installed npm was `11.4.2`; its web-login completion request failed with `E404` at `/-/v1/done?authId=...`.
- npm `11.19.1` supported Node `v24.4.1` and included the upstream fix `add web-login proxy doneUrl regression`.
- npm `12.0.2` did not support Node `v24.4.1` and was rejected.
- The successful first publish used npm `11.19.1` and a non-private Safari window.

Future releases must first check the current Node/npm compatibility rather than blindly reusing these versions.

## Release checks

From `packages/cli`:

```sh
npm test
npm pack --dry-run
```

After incrementing the package version and committing the exact source, publish with a current compatible npm client:

```sh
npm publish --access public
```

Complete WebAuthn in the normal browser window. A successful publish prints a receipt such as `+ playgrove@<version>`.

## Anonymous verification

```sh
npm view playgrove name version maintainers bin dist.shasum --json
rm -rf /tmp/playgrove-public-install
mkdir -p /tmp/playgrove-public-install
NPM_CONFIG_USERCONFIG=/dev/null npm install --prefix /tmp/playgrove-public-install playgrove
/tmp/playgrove-public-install/node_modules/.bin/grove --version
```

Expected result: npm reports package `playgrove`, the `grove` binary, and the current version; the clean installation runs successfully.

## OPEN

- Select the engine-code license and replace `UNLICENSED` only through a new package version.
- Establish the real asset-command contract before adding commands beyond help and version.
- Add trusted publishing after npm supports configuring it safely for this package and repository.
