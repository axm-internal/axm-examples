# axm-examples

Example usage and smoke tests for published `@axm-internal/*` packages.

## Setup

GitHub Packages requires authentication to install packages (even if the package is public).

This repo includes a `.npmrc` with the scoped registry mapping. You only need to add a token locally.
Create or update your user-level `~/.npmrc` with a GitHub token that has `read:packages`:

```text
//npm.pkg.github.com/:_authToken=YOUR_TOKEN
```

Then install:

```bash
bun install
```

## Published Packages

- `@axm-internal/zod-helpers` — `^0.1.0`

## Tests

```bash
bun test
```

## Coverage

```bash
bun run test:coverage
```

## CI Notes

If CI fails to install packages from GitHub Packages, see `CI-PACKAGES-INCIDENT.md` for the root cause and fix details.
