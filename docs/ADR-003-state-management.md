# ADR-003: Core State Management Strategy

**Status:** Accepted

## Context

The `@borta/core` package is responsible for the heavy lifting: managing thousands of rows, tracking validation errors, and handling loading states.

The main architectural constraint is that this core **must be framework agnostic**. We want to be able to drop this logic into a React app, a Vue app, or even run it in a headless Node.js script for testing. It cannot depend on `react` or `vue`.

## The Choices

We considered standard state libraries like **Redux**, **Zustand**, or **MobX**.
While they are battle-tested, they often come with extra weight or are designed with React hooks in mind (e.g., Zustand). For a library that needs to be "just JavaScript", pulling in a full state machine felt like overkill for what is essentially a list of objects and some errors.

We also considered just using **React Context** and **useReducer**.
This would have been the fastest way to build the UI, but it violates our core requirement: the business logic would be trapped inside React components. We wouldn't be able to reuse it or test it easily without a DOM.

## The Decision

We chose a **Simple Observer Pattern** (a basic vanilla store).

We implemented a lightweight `createStore` factory. It's just a closure that holds the state and a set of listeners. It exposes a few methods like `updateCell` and `subscribe`.

This gives us:
1.  **Zero Dependencies**: It’s pure TypeScript.
2.  **Portability**: It runs anywhere JavaScript runs.
3.  **Control**: We decide exactly when updates happen, which is useful if we ever need to batch updates for performance.

## Consequences

Since the store is "vanilla" JS, it doesn't automatically trigger React renders.

To solve this, we created a thin adapter hook `useIngestroData`. In this version, we implemented it simply using `useState` and `useEffect` to listen for store updates and trigger re-renders. This keeps the React integration simple and decoupled from the core logic.
