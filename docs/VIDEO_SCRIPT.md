# Video Walkthrough Script & Guide 🎥

**Target Length:** 5-10 Minutes
**Audience:** Hiring Manager / Senior Engineers
**Goal:** Demonstrate "Seniority" via clear communication, architectural understanding, and showing off the "Option B: SDK Design" focus.

---

## 0. Preparation
*   **Open VS Code**:
    *   Close all tabs except: `packages/core/src/store/index.ts`, `apps/demo/src/main.tsx`, and `docs/DESIGN.md`.
*   **Open Terminal**: Run `pnpm dev` so the demo is ready at `localhost:5173`.
*   **Open Browser**: Have the Demo App open.

---

## 1. Introduction (30 Seconds)
*   **"Hi, I'm [Your Name]. This is my submission for the Ingestro SDK Case Study."**
*   **State the Goal**: "I built a modular, framework-agnostic data importer. My primary focus was **Option B: SDK & API Design Quality**."
*   **Why**: "I wanted to ensure the core logic is completely decoupled from React, making it stable, testable, and reusable."

## 2. Architecture Overview (2 Minutes)
*   *Switch to VS Code file explorer.*
*   **Monorepo Structure**: Point out `packages/core` and `packages/react`.
    *   "I used a monorepo structure. `core` is pure TypeScript with zero dependencies. `react` is just a thin wrapper."
*   **Build Tools**:
    *   "I chose **TSUP** for building. It allows me to output ESM and CJS instantly with zero config." (Reference `ADR-002`).

## 3. Deep Dive: The Core SDK (3 Minutes)
*   *Open `packages/core/src/store/index.ts`*
*   **State Management**:
    *   "Instead of Redux, I implemented a lightweight **Observer Pattern**. This keeps the bundle size tiny and avoids locking us into a framework."
*   **The "Secret Sauce": Validation Injection**:
    *   "This is a key architectural decision. I didn't want to hardcode validation rules."
    *   "The store accepts a `rules` map injected at initialization."
    *   "This allows the consumer to define custom business logic (like 'Age > 18') without touching the SDK code."

## 4. Deep Dive: React & Demo (2 Minutes)
*   *Open `apps/demo/src/main.tsx`*
*   **Usage**: Show how you import `IngestroProvider` and pass the `rules` object.
    *   "Here in the demo, you can see how flexible this APIs is. I compose validators like `required()` and `isNumber()` and just pass them in."

## 5. Live Demo (2 Minutes)
*   *Switch to Browser*
*   **Upload**: Click "Upload", pick `sample.json`. "Parsing happens in the core."
*   **Editing**:
    *   "I implemented a 'One Active Input' strategy for performance." (Click a cell).
*   **Scenario: The Bug Fix**:
    *   "I handled type compilation carefully. If I type '50' into this Age column..." (Type 50).
    *   "...it automatically casts to a Number. The validation passes."
*   **Scenario: Validation Error**:
    *   "If I type 'abc'..." (Type 'abc').
    *   "You see immediate feedback. The red cell, plus this custom tooltip explaining exactly why it failed."

## 6. Trade-offs (Crucial Section)
*   **"I want to address the elephant in the room: The UI."**
*   **The Decision**: "You'll notice the UI is functional but plain. I did not focus on responsive design, mobile layout, or extensive ARIA patterns."
*   **The Why**: "This was a deliberate scope decision. I selected **Option B (SDK Design)** as my focus area."
    *   "Time spent on CSS media queries would have been time taken away from strictly typing the Validation Engine or ensuring the Store is side-effect free."
    *   "In a real team, I would pair with a designer to polish the interface, but for this SDK challenge, the **API Surface** was my customer."

## 7. Conclusion (30 Seconds)
*   "In summary, this solution meets all baseline requirements but goes deeper on **Code Quality** and **Architecture**."
*   "The strict separation of concerns means this SDK can scale to support Vue, Svelte, or even CLI tools in the future."
*   "Thank you for watching."
