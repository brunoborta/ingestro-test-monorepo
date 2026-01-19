# Ingestro – Import & Review SDK (Case Study)

This repository contains a lightweight import & review SDK built as a technical case study.

## Packages

The SDK is a **pnpm monorepo** containing:

- **`@borta/core`**: Framework-agnostic parsing, store, and validation logic.
- **`@borta/react`**: React adapter (Provider + hooks).
- **`apps/demo`**: A demo application showcasing usage (not part of the SDK).

## Documentation

- **[Design Choices](./docs/DESIGN.md)**: Architecture, data model, and trade-offs.
- **[Validation Strategy (ADR-001)](./docs/ADR-001-validation-injection.md)**: Why we use injected validation rules.
- **[Build Tools (ADR-002)](./docs/ADR-002-build-tools.md)**: Why we chose TSUP over Webpack/tsc.
- **[State Management (ADR-003)](./docs/ADR-003-state-management.md)**: Why we use a custom observer pattern.
- **[Validator Composition (ADR-004)](./docs/ADR-004-validator-composition.md)**: How we combine multiple rules (functional composition).
- **[Packaging & Release](./docs/PACKAGING.md)**: Build setup, cross-OS support, and publishing.

---

## Quick Start

### 1. Requirements
- Node.js (`>= 18`)
- pnpm (`>= 8`)

### 2. Setup & Run
This repo uses **pnpm workspaces**. You must build the packages before running the demo.

```bash
# Install dependencies
pnpm install

# Build SDK packages (@borta/core, @borta/react)
pnpm build

# Start the Demo App
pnpm dev
```
> Open http://localhost:5173

## Commands

| Command | Description |
| :--- | :--- |
| `pnpm build` | Build all SDK packages (using TSUP) |
| `pnpm typecheck` | Run TypeScript checks across the workspace |
| `pnpm test` | Run tests (Vitest) |

## Publishing (Changesets)

We use **Changesets** to automate version management and changelogs.
*For a detailed explanation of why and how we use it, see [Packaging & Release](./docs/PACKAGING.md).*

```bash
# Create a new changeset (run this after making changes)
pnpm changeset

# Apply version updates (run this before release)
pnpm version-packages

# Build and publish to NPM
pnpm release
```

## License
MIT
