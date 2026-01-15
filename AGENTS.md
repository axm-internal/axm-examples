# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds the example code used to exercise published `@axm-internal/*` packages. Entry point: `src/index.ts`.
- `tests/` contains Bun tests (currently `tests/index.test.ts`).
- Root config files: `biome.json` (format/lint), `tsconfig.json` (TypeScript), `lefthook.yml` (Git hooks), `.commitlintrc.json` (commit conventions).

## Build, Test, and Development Commands
- `bun install`: install dependencies (Bun is the runtime/package manager).
- `bun test`: run the smoke tests.
- `bun run test:coverage`: run tests with coverage (lcov output in `coverage/`).
- `bun run lint`: Biome checks (lint + format verification).
- `bun run lint:fix`: auto-fix lint/format issues via Biome.
- `bun run check-types`: TypeScript typecheck without emitting.
- `bun run verify:readme-versions`: confirm README package versions match published versions.
- `bun run validate`: full local gate (lint + typecheck + tests).

## Coding Style & Naming Conventions
- Indentation: 4 spaces; line width: 120; single quotes; semicolons required (Biome config).
- TypeScript is strict (`tsconfig.json`), using ESNext modules with bundler resolution.
- Use clear, package-oriented names for examples and tests (e.g., `zod-helpers` usage in `src/index.ts`).

## Testing Guidelines
- Framework: Bun’s built-in test runner (`bun test`).
- Place tests under `tests/` and name `*.test.ts` (current pattern: `tests/index.test.ts`).
- Keep tests as smoke/compatibility checks for published packages.

## Commit & Pull Request Guidelines
- Commit messages must follow Conventional Commits (enforced by commitlint via Lefthook). Examples: `feat: add zod helper example`, `fix: update smoke test`.
- PRs should describe the change, list test commands run (e.g., `bun run validate`), and link any tracking issue if applicable.

## Security & Configuration Tips
- Create a local `.npmrc` with a GitHub token that has `read:packages` access before installing:
  - `@axm-internal:registry=https://npm.pkg.github.com`
  - `//npm.pkg.github.com/:_authToken=YOUR_TOKEN`
- Avoid committing tokens or local configuration files.
