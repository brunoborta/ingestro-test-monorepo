# ADR-001: Injected Validation Rules in Core (Composable Validators)

**Status:** Accepted

## Context

We are building a data import SDK that allows users to review and correct uploaded data.

The core challenge is that **validation rules vary wildly** between different datasets. One customer might need simple type checking (e.g., "Age is a number"), while another needs complex domain logic (e.g., "SKUs must start with 'X-'").

We needed a way to support these custom rules without:
1.  Baking business logic into the generic SDK.
2.  Locking the validation logic inside a UI framework like React (ADR-003).

## The Choices

We considered **Hardcoded or Inferred Rules**.
It would be easiest to just let the parser guess ("This looks like a number") and enforce it. But inferred types are often wrong for real-world messy data, and this approach breaks down immediately when you need something specific like email validation.

We considered **Validation in React**.
We could have just let the React components validate the data before saving. This is easy to build, but it means our `core` business logic is no longer safe or portable. If we ever moved to Vue or a headless script, we'd lose all our validation rules.

We also looked at **Schema Libraries (Zod, Yup)**.
These are excellent for validating full objects. However, a spreadsheet UI is inherently cell-based. You want to validate *this specific cell* when the user types. Mapping a full-row Zod schema error back to a specific cell in a grid can get complicated quickly.

## The Decision

We chose **Injected Validation Rules (Dependency Injection)**.

When you create the store, you pass in a map of validation rules.
The Core doesn't know *what* "valid" means, it just knows *how* to run the functions you give it.

```typescript
const store = createStore({
  age: compose(required(), isNumber(), range(0, 100))
});
```

This gives us the best of both worlds:
1.  **The SDK is generic**: It doesn't contain your business logic.
2.  **The Logic is central**: Validation runs inside the Core, so it works exactly the same in React, Vue, or CLI scripts.
3.  **It supports "Fix Later"**: Unlike a rigid schema that might reject a whole row, our store accepts the invalid value but flags it with an error, allowing the user to correct it in the UI.

## Consequences

*   **Configuration**: Consumer have to define the rules when initialize the store.
*   **Single Source of Truth**: The store holds both the data and the error state.
*   **Framework Agnostic**: The validation functions are just pure JavaScript, with no dependencies.
