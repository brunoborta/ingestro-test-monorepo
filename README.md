# **Senior Frontend Engineer - Case Study**

## **Deliverables**

1. A short doc (Notion, Word, or Markdown) with your reasoning. Please include:
    - A **design doc** detailed enough that a mid-level engineer could implement your solution without further explanation
    - At least **one ADR (Architecture Decision Record)** for a critical choice you made
    - A section on your **Packaging & Release Plan** (see below)
2. A **5–10 minute screen-recorded walkthrough** of your solution, code structure, and design decisions
3. A **GitHub repository** (preferred) or CodeSandbox/ZIP with your code, including a **README.md** that explains:
    - how to run the demo locally
    - how to build the packages
    - how the packages are **versioned and released** (publish-ready; actual publishing is optional)
    - and how to test the main flows

---

## **Scenario**

Our engineering team builds **frontend SDKs** that allow users to upload, review, and correct structured data before it enters a system.

In this case study, you will build a **small import & review SDK**, shipped as **two npm packages**:

1. A **framework-agnostic core package** (Vanilla JS / TypeScript)
2. A **React package** that wraps the core and provides a usable UI

The React package should primarily act as an adapter — the **core package must contain the main logic** and be reusable without React.

The packages must be **publish-ready** (proper package structure, build output, and exports), but **actual publishing is optional**.

---

## **Baseline Requirements**

### **1. JSON File Upload**

- Users can upload a **JSON file** through a simple UI.
- The JSON represents a **tabular dataset** (array of objects).
- Handle file-related errors gracefully:
    - invalid JSON
    - empty files
    - unsupported structures (e.g. deeply nested objects)
    - basic size limits (document assumptions)

### **2. Spreadsheet-like Review UI**

- Render the uploaded data in a **spreadsheet-style table** similar to a "review step".
- Must support:
    - column headers derived from the data
    - row rendering
    - basic cell formatting (string, number, boolean, date)
    - **editing cell values**
    - visible feedback for invalid edits (you define the validation rules)

You may use an external table/grid library or build your own solution — explain your choice.

### **3. Package Design & Code Reuse**

- Implement **two npm packages**:
    - core (framework-agnostic)
    - react (React wrapper)
- The **core package** should contain:
    - parsing logic
    - data model
    - validation logic
    - update mechanisms
- The **React package** should:
    - integrate the core with React
    - manage rendering and user interaction
    - avoid duplicating logic from the core

---

## **Additional Focus Area (Choose One)**

Beyond the baseline, choose **one focus area** and make it a central part of your solution.

You don't need to cover everything — depth and clarity matter more than breadth.

### **Option A — Performance & Large Datasets**

Focus on making the review experience usable and responsive for **large datasets**.

Demonstrate how you think about rendering, state updates, and user interaction under performance constraints, and clearly explain the trade-offs you make.

We care more about **strategy and reasoning** than about absolute performance limits.

---

### **Option B — SDK & API Design Quality**

Focus on designing the **core package as a reusable SDK**, independent of React.

Expose a clear public API for loading data, reading state, applying edits, and subscribing to updates, with React acting as a thin integration layer.

Demonstrate how your API design supports testability, extensibility, and future consumers.

---

### **Option C — Accessibility & UX Correctness**

Focus on building a **high-quality and accessible review experience**.

Pay attention to keyboard navigation, focus handling, error feedback, and overall usability when correcting data.

Explain the accessibility trade-offs you made and what you would improve with more time.

---

## **Your Tasks**

1. **Build the SDK**:
    
    Implement the baseline functionality using **TypeScript**, shipped as:
    
    - a **framework-agnostic core package** (Vanilla JS), and
    - a **React package** that wraps and uses the core logic.
    
    The solution must support:
    
    - JSON file upload,
    - rendering the uploaded data in a spreadsheet-like review UI,
    - editing cell values and handling invalid input gracefully.
    
    The SDK should be structured as **publish-ready packages**, with a documented release process.
    
2. **Go deeper**:
    
    Extend your solution in **one chosen focus area** (Performance & Large Datasets, SDK & API Design Quality, or Accessibility & UX Correctness).
    
    Document your reasoning, trade-offs, and any limitations or assumptions you made.
    
3. **Design doc**:
    
    Include:
    
    - Architecture overview (diagrams welcome),
    - Trade-offs of key decisions (core vs React separation, state management, rendering strategy, third-party libraries),
    - **Packaging & Release Plan** (package structure, build setup, versioning, publishing approach),
    - At least **one ADR** (Architecture Decision Record) for a critical choice (e.g. data model updates, core API design, virtualization strategy).
4. **Video walkthrough**:
    
    Record a **5–10 min walkthrough** of your solution, covering the architecture, code structure, focus area implementation, and key design decisions.

---

## **Implementation**

> **Focus Area Chosen**: Option B — SDK & API Design Quality

This implementation focuses on creating a clean, framework-agnostic SDK with a well-designed public API that supports testability, extensibility, and future framework integrations.

### **Quick Start**

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run demo application
pnpm dev

# Run tests
pnpm test
```

### **Project Structure**

```
ingestro-test-monorepo/
├── packages/
│   ├── core/          # Framework-agnostic SDK
│   └── react/         # React wrapper
├── apps/
│   └── demo/          # Demo application
└── docs/              # Documentation
```

### **Documentation**

- [Design Document](./docs/DESIGN.md) - Architecture overview and design decisions
- [Architecture Decision Records](./docs/) - ADR-001, ADR-002, etc.
- [Packaging & Release Plan](./docs/PACKAGING.md) - Build and release strategy
- [API Reference](./docs/API.md) - Complete API documentation

---

## **License**

MIT
