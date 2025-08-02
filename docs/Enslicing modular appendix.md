## 📦 APPENDIX — “Slice-First Architecture” template
*(Add this block at the end of ANY PRD before handing it to an AI-coding agent.  
It prescribes a hyper-modular, AI-friendly structure so each task can be scoped to **one slice = one file**.)*

---

### 0 · Why this matters for AI code-generation
* AI agents perform best when they only need **local context**.
* A “slice-first” layout isolates every UI element, data service, or flow step in its **own ES-module** with zero implicit coupling.
* Review, testing, and later refactors stay bounded to ±100 LoC chunks.

---

### 1 · Folder & naming convention

/src
├─ app.config.js        ← global constants, feature registry
├─ store/               ← one “global brain” (tiny Redux or Signal store)
│    └─ index.js
├─ slices/              ← 💡 one folder per FEATURE or FLOW-STEP
│    ├─ story/          (e.g. story rendering)
│    │    ├─ Story.el.js      ← Web-Component / Custom-Element
│    │    ├─ story.reducer.js ← pure state logic
│    │    └─ story.styles.css
│    ├─ cue/
│    ├─ suggestions/
│    ├─ input/
│    └─ settings/
├─ services/            ← API wrappers, no DOM access
│    ├─ openRouter.js
│    └─ ttsGabber.js
├─ util/                ← small pure helpers
├─ index.html           ← boots main.js
└─ main.js              ← lazy-imports all enabled slices

---

### 2 · Contract of a *slice*

Each folder under `/slices/XYZ/` exposes **exactly three files** so AI agents never guess interface shapes:

| File | Responsibility | Exports |
|------|----------------|---------|
| `XYZ.el.js` | CustomElement `<x-xyz>` handling its own shadow DOM & events | `define()` (self-register) |
| `XYZ.reducer.js` | Pure functions for state update | `XYZSlice` object with `name`, `initialState`, `reducers` |
| `XYZ.styles.css` | Slice-specific CSS (scoped via ShadowDOM) | *(none)* |

> **Messaging rule:** cross-slice communication travels only through the central store *or* CustomEvents—never direct imports.

---

### 3 · Event & data flow (Request->Effect->Render)

UI event (button click)
↓ 
dispatch(action)
Redux/Signal store updates state
↓ 
Selector notifies interested <x-*> components
Component re-renders ShadowDOM
↓ 
If side-effect needed → service.openRouter(prompt)
Service returns Promise → dispatch(resultReceived)
↺

---

### 4 · Task-sizing guideline for AI agents

| Task type            | Max scope            | Deliverable file(s)               |
|----------------------|----------------------|-----------------------------------|
| Visual tweak         | only `XYZ.styles.css`|
| New UI element       | a new slice folder (3 files) |
| Logic fix            | ≤30 LoC patch inside one `*.reducer.js` |
| External API change  | edit `services/*.js` only |
| Global concern (e.g. dark-mode) | touch **app.config.js + one new util**; existing slices stay untouched |

---

### 5 · Automated build / serve

* **No framework** required: vanilla ES-modules + native `CustomElement`.
* Local dev server: `vite` (zero config) for live-reload and import maps.
* Build step only bundles & minifies; file/folder structure remains identical in `dist/` for traceability.

---

### 6 · Quality gates (CI)

1. **Unit tests** in `/__tests__/XYZ.reducer.test.js` – Jest or Vitest.
2. **Lint & Format** – ESLint + Prettier with standard config.
3. **Bundle check** – `dist/` gzip ≤ 150 kB, fail otherwise.
4. **Slice-coupling check** – custom script ensures slices import only from `store`, `services`, `util`.

---

> **Usage note:**
> When you ask an AI coding agent to work on a feature, point it to *one and only one* slice folder.
> Provide the slice’s current 3 files + the store signature – nothing else.
> That constraint keeps the reasoning graph tiny and nearly eliminates hallucinated cross-references.```
