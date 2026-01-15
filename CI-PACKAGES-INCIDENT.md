# CI Failure Report: GitHub Packages Auth

## Issue Summary
- CI failed at `bun install` with `401` responses from GitHub Packages when fetching `@axm-internal/zod-helpers`.
- Local installs succeeded because the developer machine had a PAT in `~/.npmrc`.
- GitHub Packages requires authentication even for public packages.

## Root Cause
- In CI, the `GITHUB_TOKEN` was written to `~/.npmrc`, but Bun resolved config from the repo `.npmrc` and did not pick up auth from the user-level file.
- As a result, requests to `https://npm.pkg.github.com` were unauthenticated, causing `401` failures.

## Fix Implemented
- Updated both workflows to append the token directly to the repo `.npmrc` and set `always-auth=true`:
  - `.github/workflows/pr.yml`
  - `.github/workflows/coverage.yml`

## Prevention / Best Practices
- For GitHub Packages + Bun, always inject auth into the **project `.npmrc`** during CI.
- Keep a repo `.npmrc` with the scope registry mapping:
  - `@axm-internal:registry=https://npm.pkg.github.com/`
- Ensure workflows declare `permissions: packages: read`.
- If installs still fail, verify the package’s access settings or use a PAT with `read:packages`.
