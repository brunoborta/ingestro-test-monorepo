# ADR-004: Functional Validator Composition

**Status:** Accepted

## Context

Once we decided that validation rules would be **injected** from the outside (see [ADR-001](./ADR-001-validation-injection.md)), we needed a way to apply *multiple* rules to a single column.

It's rarely enough to check if a value is "Just a Number". Often, it needs to be "A Number" AND "Required" AND "Between 0 and 100".

We needed a pattern to combine these rules that was:
1.  **Readable**: easy to understand at a glance.
2.  **Extensible**: easy for consumers to add their own custom logic without subclassing anything.

## The Choices

We considered **Fluent Chaining** (like Joi or Yup).
`validator.string().required().email()`
This is the gold standard for Developer Experience (DX) because of autocomplete. However, it requires a monolithic "Builder" class. If a consumer wants to add a custom rule like `isDisposableEmail()`, they can't easily chain it unless we expose a complex `extend()` API or they wrap our builder in their own.

We considered **Schema Objects**.
`{ type: 'string', required: true, format: 'email' }`
This is great for serializing rules to JSON (e.g., saving them in a database), but implementing the interpreter in the Core is complex. You effectively have to write a parser for your own schema language.

## The Decision

We chose **Functional Composition**.

We simply compose small, pure functions.
We provide a helper `compose` that takes a list of validators and runs them in order, stopping at the first error.

```typescript
const ageRules = compose(
  required(),  // Validates presence
  isNumber(),  // Validates type
  range(1, 99) // Validates domain logic
);
```

This approach wins on **extensibility**.
A validator is just *any function* that matches the `(value) => Result` signature.
If a user wants a custom rule, they just write a function. They don't need to register it, extend a class, or configure a schema parser. They just pass it to `compose`.

## Consequences

*   **Slightly Verbose**: It's arguably less "pretty" than `v.string().email()`, but the trade-off for infinite extensibility is worth it.
*   **Tree Shaking**: Because we export individual functions (`isNumber`, `required`), unused validators can be tree-shaken out of the final bundle, keeping the specific application small.
