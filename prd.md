# CreaFlow – Product Requirements Document

## 1. Purpose  
Create a lightweight, client-only webapp that lets one or two users **co-create content with an AI model**. The same flow powers multiple “use cases” (story writing, coaching, language learning, etc.) by swapping prompt templates in *Settings*.  
Runs completely in the browser (GitHub Pages hosting) and calls external services only through user-provided API keys.

---

## 2. Core Use-Cases  
| ID | Title | Short Description |
|----|-------|-------------------|
| U1 | **Story Co-Creation** | Romantic-comedic fiction in a shared “yes-and” style; two serious options + one ironic per turn. |
| U2 | **Positive-Irony Coaching** | AI acts like a modern, slightly ironic “Jesus-style” coach; reflects on user input. |
| U3 | **German B1 Tutor** | Incremental language exercises; AI analyses mistakes and adapts difficulty. |
| U4 | **Community Proposal Builder** | Draft local direct-democracy proposals collaboratively (stretch). |
| U5 | **Custom** | Users can add new scenarios entirely via the Settings modal. |

---

## 3. High-Level Flow (per session)  

1. **Select use-case** → Provide *User 1* (+ optional *User 2*) names.  
2. **AI Opening** – 1-2 sentences introducing the scenario *(Prompt A\_intro)*.  
3. **AI Prompt / Question** – asks user(s) to contribute *(Prompt B\_cue)*.  
4. **AI Suggests Three Options** – two earnest + one ironic *(Prompt C\_options)*.  
5. **Users Respond** – pick an option **or** type free text; press **Send**.  
6. **AI Comment** on that contribution *(Prompt D\_feedback)*.  
7. **AI Integrates** new input into the *growing markdown story* *(Prompt E\_merge)*.  
8. **Render Story Panel**  
   * Long text lives in a **scrollable container**.  
   * Latest user addition is **highlighted** (“User 1” = blue tint, “User 2” = green).  
9. Loop back to *step 3* until **Reset** or **Export** chosen.

---

## 4. UI / UX Guidelines  

| Area | Key Decisions | Failure Modes ➜ Mitigations |
|------|---------------|-----------------------------|
| **Layout** | 2-column desktop, single-column mobile. Left = Interaction, Right = Story. | Small screens ➜ Collapse Story panel under a toggled accordion. |
| **Focus Control** | Non-relevant buttons are grayed out (e.g., **Export** hidden until first content exists). | Cognitive overload ➜ Progressive disclosure & tooltips. |
| **Story Panel** | `overflow-y: auto; max-height: 60vh`. New chunk smoothly scrolls into view and is shaded. | Very long stories ➜ Virtualize list or “Load more” slices. |
| **Read-Aloud Mode** | Uses Gabber API. Default reads only the **latest integrated chunk**. “Read All” button available but warns if >5 min. | Audio length blow-up ➜ Split text into ≤3 min parts, queue playback. |
| **Form Validation** | Disable **Send** until API keys & names are set. Highlight empty required fields. | Missing keys ➜ Inline error, link to Settings. |
| **Offline / Quota** | Detect `fetch` errors; show modal with retry & switch-to-Mock toggle. | API quota exhausted ➜ Auto-switch mock after user confirmation. |
| **Accessibility** | Keyboard nav everywhere, ARIA labels, high-contrast mode toggle. | Screen-reader loop in scrollable area ➜ Provide “Skip story” landmark. |

---

## 5. Functional Requirements  

### 5.1 Front-End
* **HTML/JS (ES2022)** – no build step; optional CDNs for libraries (htmx, marked.js, lit-html, etc.).
* **State** kept in browser memory + localStorage (keys, settings, last session).
* **Import/Export** XML `<session>` file containing scenario ID, prompts, full story, contributions log.
* **Settings Modal**  
  * For each use-case store five prompt templates (`A_intro…E_merge`).  
  * CRUD for custom use-cases.  
  * API keys (OpenRouter, Gabber).  
  * Language selector (`de`, `en`, `ru`).  
  * Toggles: **Read-Aloud**, **Mock Mode**, **Debug Log**.  
  * Debug area = collapsible `<pre>` streaming all function calls & payloads (auto-truncated after 1 MB).

### 5.2 AI Integration
* **callOpenRouter(prompt, systemPrompt, apiKey)** returns `assistant.content`.  
* Retry with exponential back-off (max 3).  
* Strip leading/trailing whitespace; sanitize markdown.  
* Log full request/response pairs in Debug when enabled (redact keys).

### 5.3 Internationalization
* All static strings piped through `t(key)`; translations file in JSON.

### 5.4 Security / Privacy
* Keys stored in localStorage only.  
* No server logging.  
* Content never leaves user browser except to OpenRouter or Gabber.

---

## 6. Failure Modes & Mitigations (expanded)

| Step | Possible Failure | Mitigation |
|------|------------------|------------|
| API init | Invalid key | Modal pops “Invalid API key”; keep focus on key field. |
| 1-2 sentences intro | Model returns >2 lines | Hard-truncate after 280 chars + ellipsis; log warning. |
| Option list | Model returns <3 / >3 items | Fallback: parse first 3 `•` bullets; else treat whole text as one option. |
| User sends empty string | Block **Send**; shake field. |
| Merge step | Output >10 kB | Chunk story; older parts collapsed under “Show earlier”. |
| Scroll focus | Autoscroll fights user manual scroll | Only autoscroll if user is near bottom (`scrollTop + offset >= scrollHeight - 200`). |
| Read-Aloud network fail | Catch & queue retry; after 2 fails, show inline audio-disabled banner. |
| Import corrupt XML | Validate against XSD; show “Import failed – invalid file”. |
| LocalStorage full | Detect `QuotaExceededError`; prompt for download & clear logs. |

---

## 7. Metrics of Success
* **Session completion rate** (≥3 loops).  
* Average AI latency <4 s.  
* Bug reports from Debug Log upload <1 % of sessions.  
* NPS prompt on exit ≥8/10.

---

## 8. Tech Stack
| Layer | Choice | Rationale |
|-------|--------|-----------|
| Rendering | Vanilla JS + lit-html | Small bundle, fast DOM updates. |
| Markdown | marked.js | Safe HTML rendering. |
| Storage | localStorage + File API | GitHub Pages friendly. |
| Audio | Gabber TTS REST | Lightweight; supports streaming. |

---

## 9. Out-of-Scope
* Multiplayer sync across browsers.
* Server-side persistence.
* Fine-tuned AI models.
