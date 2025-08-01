# CreaFlow – Product Requirements Document  
*Browser-only AI co-creation playground (GitHub Pages)*

---

## 1 · Purpose  
Empower one or two users to co-create stories, practise languages, receive coaching, etc., by swapping prompt templates in **Settings**.  
Runs 100 % in the browser; third-party traffic is limited to user-supplied OpenRouter (LLM) and Gabber (TTS) APIs.

---

## 2 · Use-Cases  
| ID | Title | Goal |
|----|-------|------|
| U1 | Story Co-Creation | Write a romantic-comedy tale together. |
| U2 | Positive-Irony Coaching | Friendly, slightly sarcastic guidance to act “like Jesus”. |
| U3 | German B1 Tutor | Adaptive exercises; AI analyses mistakes, escalates level. |
| U4 | Community Proposal Builder | Draft local degrowth proposals collaboratively. |
| UX | **Custom** | Users create their own scenario in Settings. |

---

## 3 · Prompt Template System  

### 3.1 Placeholder Catalogue  
| Token | Meaning | Example | Required? |
|-------|---------|---------|-----------|
| `{{current_scenario}}` | Active use-case label | Story Co-Creation | ✔︎ |
| `{{content_language}}` | Language for AI output | de / en / ru | ✔︎ |
| `{{ui_language}}` | Interface chrome language | de / en / ru | ✔︎ |
| `{{user1_name}}` / `{{user2_name}}` | Participants | Anna / Ben | ✖︎ |
| `{{last_contribution}}` | Latest user text | “He kissed her hand.” | ✔︎ after 1st turn |
| `{{full_text}}` | Entire accumulating story / exercise log (includes hidden metadata) | *dynamic* | ✔︎ |
| `{{user_progress}}` | Aggregated errors / wins (tutor) | “Wrong gender: *der* Haus” | ✖︎ |
| `{{tone}}` | Requested flavour | serious / ironic | ✖︎ |
| `{{desired_length}}` | Soft cap | ≤ 400 words | ✖︎ |
| `{{difficulty_level}}` | Tutor difficulty flag | B1 / B2 | ✖︎ |
| `{{timestamp}}` | ISO time of call | 2025-08-01T18:42Z | ✖︎ |

> **Validation rule:** any unresolved `{{…}}` blocks a save in Settings and throws a red banner.

### 3.2 Template Keys per Use-Case  
| Key | Purpose | Must include |
|-----|---------|-------------|
| `A_intro`   | 1-2-sentence scene opener | `{{current_scenario}} {{content_language}}` |
| `B_cue`     | AI prompt / question | `{{last_contribution?}} {{user_progress?}}` |
| `C_options` | 3 answer suggestions | `{{tone}}` |
| `D_feedback`| Comment on user input | `{{last_contribution}}` |
| `E_merge`   | Produce new full story | `{{full_text}} {{last_contribution}}` |

---

## 4 · Session Flow  

1. **Use-case Select** → names.  
2. **A_intro** displayed.  
3. **B_cue** asks for input.  
4. **C_options** (2 serious + 1 ironic) shown.  
5. Users choose or type → **Send**.  
6. **D_feedback** appears.  
7. **E_merge** updates scrollable story (last chunk highlighted by user colour).  
8. Loop to step 3 until **Reset** or **Export**.

---

## 5 · UI / UX Essentials  

| Area | Decision | Failure Mode ➜ Mitigation |
|------|----------|---------------------------|
| Layout | Sidebar (interaction) + main story panel; collapses on mobile. | Small screens ➜ story under toggle. |
| UI-Language | Top-bar dropdown 🇩🇪/🇬🇧/🇷🇺; independent of `{{content_language}}`. | Instant switch restarts tooltips only; keeps story language. |
| Story Overflow | `overflow-y:auto; max-height:60vh`. Virtualise if >50 chunks. | Too long for TTS ➜ auto-queue 3-min segments. |
| Read-Aloud | Default speaks only latest merge; “Read All” warns if >5 min. | Network fail ➜ retry 2× then disable. |
| Debug Log | Collapsible `<pre>` streaming every API call & return. Clips at 1 MB. | `QuotaExceeded` ➜ prompt “download & clear”. |

---

## 6 · Functional Requirements  

* **Front-End:** Plain ES2022, lit-html, marked.js.  
* **Storage:** localStorage + File API (XML import/export).  
* **Settings Modal:**  
  * Tabs: General · Prompts · API Keys · Debug.  
  * General: UI-language, high-contrast, read-aloud, mock-mode.  
  * Prompts: live validation of placeholders.  
* **AI Calls:** `callOpenRouter()` with 3-step back-off; logs scrubbed keys.  
* **Security:** keys stay local; no server.

---

## 7 · Failure Modes & Mitigations (excerpt)  

| Step | Failure | Mitigation |
|------|---------|-----------|
| Placeholder typo | Regex validation on save | Block + tooltip of valid tokens |
| Model returns 1 or 4 options | If `<3` → duplicate best; if `>3` → first 3 bullet lines |
| Intro >2 sentences | Trim to 280 chars + “…”, log warning |
| Story >10 kB | Collapse earlier parts under “Show earlier” |
| Audio mismatch after UI-lang change | Pause TTS, reload in new lang |

---

## 8 · Success Metrics  
* ≥65 % sessions reach ≥3 loops.  
* Mean AI latency <4 s.  
* NPS exit survey ≥8 / 10.

---

## 9 · Out of Scope  
* Real-time multi-browser sync  
* Server-side persistence  
* Custom fine-tuned models
