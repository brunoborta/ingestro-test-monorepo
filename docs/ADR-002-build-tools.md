# ADR-002: Build Tool Selection (TSUP)

**Status:** Accepted

## Context

We are building a monorepo with multiple packages (`@borta/core`, `@borta/react`). We need a build tool that can support our development loop without getting in the way.

Specifically, we need to:
1. Compile TypeScript to JavaScript with declaration files (`.d.ts`).
2. Output both **ESM** (for modern bundlers) and **CommonJS** (for Node.js) from the same source.
3. Keep local development fast.

## The Choices

We looked at the standard **TypeScript Compiler (`tsc`)** first. While it's the native solution, it's notoriously slow for watching large projects and doesn't handle dual-format output (ESM + CJS) easily. You often end up with complex config chains or multiple `tsconfig.json` files just to get the right outputs.

We also considered full bundlers like **Webpack** or **Rollup**. They are powerful, but setting them up for a simple library is often overkill. You spend more time configuring plugins for "TypeScript + CJS + ESM + Types" than you do writing code.

## The Decision

We chose **TSUP**.

It’s essentially a zero-config wrapper around `esbuild`. It allows us to build the entire library in milliseconds—orders of magnitude faster than `tsc`—and handles the ESM/CJS split with a single command line argument.

For a library of this size, `tsup src/index.ts --format cjs,esm --dts` replaces about 50 lines of Webpack config. It lets us focus on the library features rather than maintaining the build pipeline.

## Consequences

*   **Dev Dependency**: We rely on `tsup` as our primary build tool.
*   **Simple Scripts**: `package.json` scripts remain one-liners.
*   **Polyfills**: Since `esbuild` can be aggressive with polyfills, we just need to be mindful not to accidentally use Node-specific APIs in the `core` package, which should remain browser-friendly.
