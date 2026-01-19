# ADR-001: Injected Validation Rules in Core (Composable Validators)

**Status:** Accepted

## Context

I am building a data import SDK that imports a JSON file (an array of objects) and lets the user see and correct the data in a spreadsheet UI.
The validation rules vary per customer/dataset. A generic example is type validation (age being a number, name being a string, etc), or domain rules (email must have a valid domain, postal code depends on a country, etc).
That said, I looked for a approach that:
- would keep the Core package framework-agnostic.
- avoid baking business rules into the SDK.
- produces a single source of truth for both errors and data.
- support interactive cell-level editing as a Core requirement.

There were several approaches I considered. Here are them:

## Options Considered
### Option 1: Hardcoded or Inferred Rules in Core
The Core automatically applies a fixed set of validators based on inferred column types.

**Why this is good?**
- Minimal configuration for customers.
- Works for basic type checks.

**What are the consequences?**
- Validation behavior is derived from inferred types, which is often not reliable for imported data.
- Adding domain-specific rules require SDK changes and releases.
- The Core API surface grows over time, increasing maintenance cost.
- Core would need to know business logic, which is not appropriate for a lightweight reusable SDK.

### Option 2: Injected Validation Rules via the Core Store (Dependency Injection)
The consumers provide a map of validation rules when creating the Core store. Rules are sent as composable functions in a dictionary object and executed by the Core.

**Why this is good?**
- Core remains generic and reusable.
- Business rules stay with the consumer.
- Validation is centralized and consistent across all consumers.
- Validation logic is very easy to test.

**What are the consequences?**
- Consumers must explicitly define rules for non-trivial validation.
- Validation behaviour must be clearly documented.
- Rules are configured at store creation time (change of rules must create the store again).

### Option 3: Validation in React Only
Validation logic lives inside React components and runs before updating Core state.

**Why this is good?**
- Fast to implement.
- Easy access to UI state.

**What are the consequences?**
- Violates the framework-agnostic requirement of the Core package.
- Allows Core state to become invalid when used outside React.
- Creates multiple sources of truth for validation.
- Makes Core harder to test and reuse.

### Option 4: Schema-Based Validation
Consumers provide a declarative schema describing valid data, and the Core validates against it.

**Why this is good?**
- Strong, declarative constraints.
- Good fit for template-based or backend-shared validation.

**What are the consequences?**
- Introduces a heavier dependency and API commitment.
- Validation is typically row- or object-based, not naturally cell-based.
- Mapping schema errors to a spreadsheet UI adds complexity.
- Less flexible for interactive editing.

## Decision

I chose **Option 2: Injected Validation Rules via the Core Store (Dependency Injection)**.
This project is fundamentally about reviewing and correcting imported data, not just validating. So validation rules need to reflect domain intent (e.g. "this column represents name") rather than parser heuristics or inferred types.
By injecting validation rules into the Core store, we keep the SDK generic while allowing consumers to define what "valid" means for their specific use case. The Core remains responsible for _when_ validation runs and _how_ errors are stored, but not for _which_ business rules apply.
Validation is executed inside the Core during `updateCell` and initial `loadData`, ensuring that all consumers (React or other frameworks) observe the same data and error state.

The `createStore` function accepts a `rules` map:
```typescript
const store = createStore({
  age: compose(required(), isNumber(), range(0, 100))
});
```

This approach aligns well with the interactive, spreadsheet UI where validation needs to happen at the point of edit and map cleanly to individual cells.

## Consequences

#### 1. Single Source of Truth for Data and Errors: 
All validation happens inside the Core store. Regardless of whether data is updated through React, a future non-React consumer, or direct store APIs, the resulting error state is consistent and centralized.

#### 2. Extensibility Without Core Changes: 
Validation rules are treated as consumer-owned business logic. New constraints can be added or changed without modifying or republishing the SDK, keeping the Core small and reusable.

#### 3. Framework-Agnostic by Design:
Validation logic is implemented as pure Javascript / Typescript functions with no dependency on React or any other lib. The React package acts purely as an adapter that renders state and dispatches edit intents.

#### 4. Invalid Values Are Stored Alongside Errors:
The store accepts user edits even when they are invalid and records validation errors separately. This supports a review and correct workflow where users can freely edit data and resolve issues incrementally.

#### 5. Rules Are Bound to the Store Lifecycle:
Validation rules are configured when the store is created and are treated as stable configuration. Changing rules dynamically would require recreating the store or extending the API (e.g. with a `setRules` method), which is an accepted trade-off for a simpler and more predictable core API.

#### 6. Cell-Level Validation by Default: 
On edits, only the affected cell is revalidated. While validators can inspect the full row, dependent-field revalidation is not automatic and would require additional mechanisms if needed.
