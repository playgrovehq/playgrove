# PlayGrove on GitHub

## Official addresses

- Organization: `playgrovehq`
- Repository: `playgrovehq/playgrove`
- Public URL: https://github.com/playgrovehq/playgrove
- Clone URL: `https://github.com/playgrovehq/playgrove.git`
- Default branch: `main`
- Local checkout: `/Users/klaymoon/_dev/_game_engine`
- Git remote: `origin`
- Registered website domain: `playgrovehq.com`

GitHub is PlayGrove's canonical public source. Cursor Origin was rejected as the authority because access to Origin repositories requires a paid Cursor account.

The exact GitHub account address `playgrove` was already occupied when the organization was created. The project therefore uses `playgrovehq` as its organization address while retaining **PlayGrove** as the product and repository name.

## Creation receipt

- Organization created: 2026-09-05
- Public repository created: 2026-09-05
- Initial repository commit: `224fe37af79c7b02b8912f68c14190d5e5ac1c37`
- Initial CLI commit: `38ba12f`
- Public install documentation commit: `3fb0160`

## Local authentication

At setup, GitHub CLI was authenticated as `klay-moon`, the personal account that owns the organization.

```sh
gh auth status
gh repo view playgrovehq/playgrove
git -C /Users/klaymoon/_dev/_game_engine remote -v
```

Never store GitHub tokens, credentials, recovery codes, or private keys in this repository.

## Public verification

These checks do not require repository write access:

```sh
curl -fsS https://api.github.com/repos/playgrovehq/playgrove
git ls-remote https://github.com/playgrovehq/playgrove.git HEAD refs/heads/main
curl -fsS https://raw.githubusercontent.com/playgrovehq/playgrove/main/README.md
```

Expected result: the API reports `private: false`, `visibility: public`, and default branch `main`; `ls-remote` prints `HEAD` and `refs/heads/main`.

## OPEN

- Point `playgrovehq.com` to a website host.
- Add the repository homepage URL after the website is live.
- Select the engine-code license before publishing licensed source releases.
