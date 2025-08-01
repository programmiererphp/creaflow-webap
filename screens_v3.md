# 00 · Landing — Get Started
About CreaFlow: browser-only AI co-creation playground (stories │ coaching │ language tutor).
- **Goal:** Welcome, choose UI language, begin a session.
- **Key Widgets:**
  1. Image — logo (56 × 56, centred)
  2. Headline-medium — “CreaFlow”
  3. Body-medium — “Create with AI right in your browser”
  4. Filled-Button — label “Start session”
  5. Segmented-Button (single-select) — EN · DE · RU  (id `uiLangPicker`)
- **Layout Hints:** Stack with 24 px gaps; portrait 375 × 812.

# 01 · Scenario Picker
About CreaFlow: browser-only AI co-creation playground (stories │ coaching │ language tutor).
- **Goal:** Let user pick or create a use-case scenario.
- **Key Widgets:**
  1. Medium App-Bar — title “Choose scenario”, nav `arrow_back`
  2. Elevated-Card list (92 % width, 12 px radius)  
     • “Story Co-Creation” – subtitle “Rom-com in turns” – icon `favorite`  
     • “Positive Irony Coach” – “Kind but witty” – icon `psychology`  
     • “German Tutor B1” – “Adaptive drills” – icon `translate`  
     • “Community Proposal” – “Local democracy” – icon `groups`
  3. Primary FAB — icon `add`, tooltip “New scenario”
- **Layout Hints:** LazyColumn; tap card ⇒ Names screen.

# 02 · Participant Names
About CreaFlow: browser-only AI co-creation playground (stories │ coaching │ language tutor).
- **Goal:** Record names for colour-coding contributions.
- **Key Widgets:**
  1. Medium App-Bar — title “Participants”
  2. Outlined TextField — “User 1 name *” (id `txtUser1`)
  3. Outlined TextField — “User 2 name” (id `txtUser2`)
  4. Filled-Button — “Next” (disabled until User 1 ≥ 2 chars)
- **Layout Hints:** Keyboard pushes content; button floats above keyboard.

# 03 · Main Interaction
About CreaFlow: browser-only AI co-creation playground (stories │ coaching │ language tutor).
- **Goal:** Core turn loop — AI cue → options → user reply → story update.
- **Key Widgets:**
  1. Small App-Bar — `menu` | title “Rom-Com Session” | `refresh` `more_vert`
  2. Card — id `aiCueCard`, 12 px padding (AI prompt text)
  3. Row of 3 Assist-Chips  
     • “Option A” · “Option B” · “Ironic twist 😉”
  4. Filled TextField — “Write your own answer…” (id `txtCustom`)
  5. Filled-Button — “Send” (id `btnSend`)
  6. Bottom App-Bar — pill “Turn 3” + `article` (opens Story Drawer)
- **Layout Hints:** Chips wrap; autoscroll to newest element unless user scrolled up.

# 04 · Story Drawer
About CreaFlow: browser-only AI co-creation playground (stories │ coaching │ language tutor).
- **Goal:** Show the growing markdown story and control read-aloud.
- **Key Widgets:**
  1. Modal Bottom-Sheet (90 % height) — drag-handle
  2. Small Top-Bar — title “Story”, action `volume_up` (toggle TTS)
  3. LazyColumn — id `storyFeed` (markdown)
  4. Linear Progress-Indicator — id `ttsProgress` (hidden until playback)
- **Layout Hints:** Tint last chunk blue (User 1) or green (User 2); swipe-down to dismiss.

# 05 · Settings
About CreaFlow: browser-only AI co-creation playground (stories │ coaching │ language tutor).
- **Goal:** Configure UI, prompts, API keys, and debug log.
- **Key Widgets:**
  1. Medium App-Bar — nav `close`, title “Settings”, action `save`
  2. Tab-Row — “General” · “Prompts” · “API Keys” · “Debug”
  3. *General Tab*  
     • Dropdown — “UI language” (EN DE RU)  
     • Switch — “High-contrast”  
     • Switch — “Enable read-aloud”  
     • Switch — “Mock-data mode”  
     • Tonal-Button — “Clear local data”
  4. *Prompts Tab*  
     • Accordion per scenario → Code-Editor fields labelled A_intro…E_merge  
     • Side legend of placeholder chips (`{{last_contribution}}` etc.)
  5. *API Keys Tab* — two Outlined TextFields (“OpenRouter key”, “Gabber key”) + eye-icon
  6. *Debug Tab* — Card with scrolling `<pre>` log + Outlined-Button “Download log”
- **Layout Hints:** Snackbar “Settings saved” on exit.

# 06 · Import Session
About CreaFlow: browser-only AI co-creation playground (stories │ coaching │ language tutor).
- **Goal:** Resume an earlier session via XML import.
- **Key Widgets:**
  1. Bottom-Sheet (75 % height) — headline “Import session (.xml)”
  2. Box with dashed border — “Drop file here or tap Browse”
  3. Filled-Button — “Browse files…”
  4. Body-small — filename + size after selection
  5. Button-Bar — Filled-Button “Import & continue” · Text-Button “Cancel”
- **Layout Hints:** Snackbar “File must be .xml” if wrong MIME.

# 07 · Export Session
About CreaFlow: browser-only AI co-creation playground (stories │ coaching │ language tutor).
- **Goal:** Let users download or share the current session.
- **Key Widgets:**
  1. Bottom Banner — icon `file_download`, text “creaflow-session-2025-08-01.xml · 42 KB”
  2. Filled-Button — “Download”
  3. Outlined-Button — “Share…”
  4. IconButton — `close`
- **Layout Hints:** Banner slides up; dismiss on outside tap.

# 08 · New Scenario Wizard (1 / 3 Details)
About CreaFlow: browser-only AI co-creation playground (stories │ coaching │ language tutor).
- **Goal:** Collect basic metadata for a custom scenario.
- **Key Widgets:**
  1. Medium App-Bar — back, title “New scenario 1 / 3”
  2. TextField — “Scenario title *”
  3. TextField — “One-line description *”
  4. Dropdown — “Content language” (EN DE RU)
  5. Filled-Button — “Next”
- **Layout Hints:** Disable Next until required fields valid.

# 09 · New Scenario Wizard (2 / 3 Prompts)
About CreaFlow: browser-only AI co-creation playground (stories │ coaching │ language tutor).
- **Goal:** Enter prompt templates A–E with live placeholder validation.
- **Key Widgets:**
  1. Medium App-Bar — back, title “New scenario 2 / 3”
  2. Accordion ×5 — headers A_intro … E_merge → Code-Editor
  3. Error Banner (hidden by default) — “Unrecognised placeholder”
  4. Filled-Button — “Next”
- **Layout Hints:** Auto-collapse previous accordion when new opens.

# 10 · New Scenario Wizard (3 / 3 Confirm)
About CreaFlow: browser-only AI co-creation playground (stories │ coaching │ language tutor).
- **Goal:** Review inputs and save scenario.
- **Key Widgets:**
  1. Medium App-Bar — back, title “New scenario 3 / 3”
  2. Elevated-Card — shows title, language, prompt count
  3. Filled-Button — “Create”
- **Layout Hints:** Snackbar “Scenario saved”, then return to Scenario Picker.

# 11 · Error / Offline Overlay
About CreaFlow: browser-only AI co-creation playground (stories │ coaching │ language tutor).
- **Goal:** Block interaction on critical failures; offer fallback.
- **Key Widgets:**
  1. Full-screen Dialog — transparent scrim
  2. Illustration — id `errorCloud`
  3. Headline-small — dynamic (e.g. “Invalid API key”)
  4. Body-small — helper copy
  5. Filled-Button — “Try again”
  6. Text-Button — “Switch to mock data”
- **Layout Hints:** Disable background until resolved.

# 12 · Read-Aloud Queue
About CreaFlow: browser-only AI co-creation playground (stories │ coaching │ language tutor).
- **Goal:** Manage queued TTS chunks.
- **Key Widgets:**
  1. Bottom-Sheet — peek 64 px; drag handle
  2. Small Top-Bar — title “Read-aloud queue”, action `close`
  3. LazyColumn — rows: chunk #, preview, `pause` / `play_arrow`
  4. Linear Progress-Indicator inside current row
  5. Tonal-Button — “Stop all”
- **Layout Hints:** Auto-collapse when queue empty.

# 13 · Storage Quota Modal
About CreaFlow: browser-only AI co-creation playground (stories │ coaching │ language tutor).
- **Goal:** Warn when debug log exceeds browser storage.
- **Key Widgets:**
  1. Alert-Dialog
  2. Icon — `warning_amber`
  3. Headline-small — “Local storage full”
  4. Body-small — “Your debug log reached the browser limit.”
  5. Filled-Button — “Download & clear”
  6. Text-Button — “Dismiss”
- **Layout Hints:** Download triggers FileSaver, then clears logs.
