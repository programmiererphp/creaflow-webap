# 0 · Purpose (refresher)  
CreaFlow is a **client-only, mobile-first** web-app that runs on GitHub Pages.  
Two users share the same phone/tablet to co-create a story, practise languages, or get light coaching from an LLM (OpenRouter). The growing text can be read aloud via Gabber TTS.

---

# 1 · Lean Delivery Road-map (feature slices)  
Implement thin, end-to-end strips instead of giant chunks.

| Slice | What ships | Why it’s valuable |
|-------|------------|-------------------|
| **S1 Skeleton** | Pure HTML/CSS: multi-step shell (Select Scenario → Names → Session), static buttons, dummy story panel. | Lets designer fine-tune UX & gestures before any API work. |
| **S2 Single-turn AI** | Wire OpenRouter; only *A_intro* renders. Hard-code one scenario. | Confirms key setup, latency, error paths. |
| **S3 User Reply Loop** | Add text input + “Send” → *D_feedback* round-trip; append to story feed. | Core mechanic proven. |
| **S4 Three-option UI** | Generate & display *C_options* chips; pick or custom. | Brings real choice UX. |
| **S5 Persistent Storage** | Export/Import XML & auto-save last session in localStorage. | Safety net for long stories. |
| **S6 Read-Aloud** | Gabber integration; default plays latest chunk. | Polishes accessibility. |
| **S7 Settings Modal** | CRUD scenarios, placeholder validation, keys, debug log. | Opens power-user path. |
| **S8 Polish / Perf** | Virtualise long story list, quota alerts, dark-mode, PWA manifest. | Production readiness. |

Ship *one* slice, then dog-food, then the next.

---

# 2 · Mobile-first Multi-Step UI
Select Scenario  →  Enter Names  →  Live Session  →  Settings / Export / etc.
### 2.1 Step 1: **Scenario Select**  
*Single-page list of cards (tap)*  
- Title bar: “Pick a use-case”  
- Cards show icon · title · 1-line desc.  
- Floating “＋ New” for custom scenario.

### 2.2 Step 2: **Names**  
*One required, one optional input*  
- “Next” enabled when User 1 ≥ 2 chars.  
- “Back” returns to scenario without data loss.

### 2.3 Step 3: **Session (Live Turn Loop)**  

| UI Zone | Elements | Buttons (icon · tooltip / label) |
|---------|----------|----------------------------------|
| **Top Bar** | hamburger (opens Settings) · session title · overflow | `refresh · Restart`   `file_open · Import`   `file_download · Export` |
| **Prompt Card** | current AI cue / feedback | — |
| **Option Row** | 3 Assist Chips (two serious, one ironic) | — |
| **Custom Reply** | multiline textfield | **Send** (filled) |
| **Footer Strip** | pill “Turn N” · `article` opens Story Drawer | `pause · Pause`   `play_arrow · Resume` |
| **Story Drawer** | modal 90 % height, scrollable markdown, read-aloud toggle | `volume_up · TTS` |
| **FAB (contextual)** | appears if story exists: `replay · Reset` | resets after confirm |

Behavior notes  
* **Start/Pause/Resume**: first “Send” starts the loop, *Pause* disables Send & chips, *Resume* reenables.  
* **Reset** clears story & returns to Names step.  
* **Import** opens XML modal; after success jumps directly to Live Session.  
* **Export** banner slides up with download/share.

---

# 3 · UX Principles & Hints  

1. **Thumb-reach** — primary actions (Send, chips) sit in lower half; drawers & modals drag from bottom.  
2. **Minimal chrome** during a turn: hide overflow, disable Settings to keep focus.  
3. **Back-stack clarity** — hardware back:  
   * If Story Drawer open → close it  
   * Else if on Live Session → ask “End session?”  
   * Else pop to previous step.  
4. **Read-Aloud ≠ Autoplay** — only latest chunk, with “Read all” in Drawer menu.  
5. **Colour-coding** contributions: blue bg for User 1, green for User 2, grey for AI.

---

# 4 · Button Inventory (Live Session)  

| Btn/Chip | Icon / Label | Visible when | Action |
|----------|--------------|--------------|--------|
| **Send** | “Send” | textfield not empty **or** chip selected | Post contribution |
| Refresh | `refresh` | always | Hard-reset turn (replays last AI cue) |
| Reset | `replay` (FAB) | story length >0 | Confirm → wipe session |
| Pause | `pause` | active turn | Lock input & chips |
| Resume | `play_arrow` | when paused | Unlock input |
| Import | `file_open` | always | Open XML dialog |
| Export | `file_download` | story length >0 | Show banner → download |
| Settings | `menu` | always | Modal with tabs |
| TTS | `volume_up` | Drawer open | Toggle play/stop |

---

# 5 · Implementation Nuggets  

*Use these guard-rails to keep each slice tiny.*

* **State machine** – simple enum: `setup`, `turn_active`, `paused`. One reducer handles transitions.  
* **Components as functions** – `renderStep(step, state)`; swapping steps ≈ swapping roots.  
* **Service wrappers** – `openRouter(prompt, sys, key)` & `gabber(text, key)` return promises; mock easily.  
* **Scroll edge detection** – only autoscroll if `(scrollTop+offset) ≥ (scrollHeight-200)`.  
* **Placeholder injection** – compile template once per turn with a thin `{{token}}` regex; warn on miss.  
* **Virtual list** – if `story.length > 50`, render only ±10 around scroll viewport.

---

> **Next action for the team:** build **Slice S1** (static multi-step shell) and verify tap-flows on a phone before touching any API.
