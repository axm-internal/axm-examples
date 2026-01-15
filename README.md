# axm-examples

Example usage and smoke tests for published `@axm-internal/*` packages.

## Setup

Create a local `.npmrc` with a GitHub token that has `read:packages`:

```text
@axm-internal:registry=https://npm.pkg.github.com
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
