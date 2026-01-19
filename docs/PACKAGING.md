# Packaging & Release Plan

This document details the build, versioning, and release strategy for the Ingestro SDK.

## Package Structure
The project is a **pnpm monorepo**:

- `packages/core`: Framework-agnostic logic (parsing, state, validation).
- `packages/react`: React adapter (hooks, provider).
- `apps/demo`: Example application (not published).

## Build Strategy (TSUP)
We use [tsup](https://tsup.egoist.dev/) for our build pipeline.
See **[ADR-002: Build Tools](./ADR-002-build-tools.md)** for why we chose this over Webpack or `tsc`.

**Outputs per package (`dist/`):**
- `index.js` (ESM) - for modern bundlers
- `index.cjs` (CommonJS) - for Node/legacy
- `index.d.ts` (Types)

## Cross-OS Compatibility
To ensure consistent behavior across Windows (Powershell) and Linux/macOS (Bash), we avoid shell glob expansion in scripts.

**Bad:** `pnpm --filter './packages/*'` (Fails on Windows if not escaped)
**Good:** `pnpm --filter "@borta/*"` (Works everywhere)

All root-level scripts use explicit package names or scopes to guarantee cross-platform compatibility.

## Versioning & Publishing (Changesets)

We use **[Changesets](https://github.com/changesets/changesets)** to manage versioning.

This tool solves the "why":
1. **Automated SemVer**: It calculates the correct semantic version bumps based on the intent of your changes.
2. **Lockstep Versioning**: It ensures `@borta/core` and `@borta/react` stay in sync to avoid compatibility issues.
3. **Changelog Generation**: It automatically generates changelogs from the changeset descriptions.

### Workflow

1. **Develop**: Make changes to the code.
2. **Document**: Run `pnpm changeset` to create a "changeset file" describing the change.
3. **Release**:
   - `pnpm version-packages` consumes changesets and bumps versions.
   - `pnpm release` builds and publishes to npm.

## CI/CD Pipeline
In a production setup, releases would be automated via CircleCI, Github Actions or another CI/CD service.
- **PRs**: Lint, Test, Typecheck, Build.
- **Main**: Publish updated packages via Changesets.
