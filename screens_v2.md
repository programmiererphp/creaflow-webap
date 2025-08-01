# 📱 CreaFlow – Mobile Screen Specs (375 × 812 reference frame)

---

## 1. Landing / Splash
| Zone | Components | Notes |
|------|------------|-------|
| Top (64 px) | Small logo mark (center) | Tap → scroll to footer “About” |
| Middle | **Tag-line** (H4, center) <br> “Start Session” primary button (CTA, 48 px height, full-width, 16 px radius) | Button animates pulse |
| Footer (auto) | UI-Language selector (🇩🇪 / 🇬🇧 / 🇷🇺) chips, horizontally scrollable | Persist across app |

Gestures: *Swipe up* on tag-line = same as “Start Session”.

---

## 2. Use-Case Picker
| Zone | Components | Notes |
|------|------------|-------|
| App Bar | Back chevron ←, Title “Choose Scenario” | Sticky |
| Scroll Body | Vertical **Card list** (160 px h, 12 px radius) each with icon, title, 1-line desc | Card tap ⇒ highlight & proceed |
| FAB (bottom-right) | “＋ Custom” mini-fab | Opens Wizard (see #8) |

States: active card gets brand accent border.

---

## 3. Name Entry
| Zone | Components | Notes |
|------|------------|-------|
| App Bar | Back, Title “Participants” |
| Form | TextField User 1 (required) <br> TextField User 2 (optional) | 44 px height, auto-focus User 1 |
| Actions | “Next” button (disabled until User 1 len ≥2) | |

Keyboard pushes content; “Next” floats above keyboard.

---

## 4. Main Interaction (Core Loop)
| Sub-screen | Layout | Components | Actions / Gestures |
|------------|--------|-----------|--------------------|
| **4A • Interaction View** (default) | Vertical scroll | 1. AI **Cue bubble** (Card, muted bg) <br> 2. **Options Row** – three ChoiceChips (2 solid, 1 outlined ironic) <br> 3. OR “Write my own” expandable textarea (min 3 rows) <br> 4. **Send** primary button | Pull-to-refresh retries last AI call |
| **4B • Story Drawer** | Full-screen modal slides up 90 % height | Header: drag-handle + “Story” + Read-Aloud toggle <br> Body: scrollable markdown (virtualised) <br> Highlight: last user addition gets tinted block (blue / green) | Swipe down to close |

Top Bar (always visible): Hamburger ⇒ Settings • Title (scenario) • “Reset” icon • “⋯” menu (Import / Export).

Persistent Bottom Sheet (48 px collapsed) shows current turn indicator “Turn 3”.

---

## 5. Settings (Full-Screen Modal)
Tabs = Segmented control across top.

### 5.1 General Tab
* UI-Language dropdown (native select)
* High-contrast toggle
* Read-Aloud toggle
* Mock-mode toggle
* “Clear Local Data” danger button

### 5.2 Prompts Tab
Accordion list per use-case → expands to show 5 **CodeMirror** textareas (monospace, line numbers).  
Right rail (sticky) = **Placeholder Legend** (pill list with descriptions).

### 5.3 API Keys Tab
OpenRouter key field + eye toggle • Gabber key field.  
“Save” primary button; Snackbar “Keys stored locally”.

### 5.4 Debug Tab
Tall `<pre>` box streaming log; “Download .txt” button.

Gesture: Swipe right from left edge = close settings.

---

## 6. Import Dialog
* Modal sheet 75 % height
* Drop-zone + “Browse files” button
* Filename + meta preview
* Primary = “Import & Continue”; Secondary = “Cancel”

Validation toast if file ≠ XML or invalid schema.

---

## 7. Export Dialog
* Full-width banner slides from bottom
* Shows suggested filename, size
* Buttons: “Download”, “Share…”, “Cancel”

---

## 8. Custom Use-Case Wizard
**Step 1: Details**  
TextFields: Title, Description, Default Content-Language.

**Step 2: Prompts**  
Five collapsible panels (A-E) each with placeholder-aware textarea; live badge shows ✓ when passes validation.

**Step 3: Confirm**  
Summary card of inputs; “Create” CTA.

Stepper at top (dots). Back gesture returns to previous step.

---

## 9. Error / Offline Overlay
* Full-screen, dark scrim
* Lottie error animation + headline
* Context message (e.g., “Invalid API Key”)
* Primary button “Try Again” • Secondary “Switch to Mock”

---

## 10. Read-Aloud Queue
Bottom sheet (peek 64 px)  
Expanded: list of queued chunks with spinner on current, progress bar, “Stop” button.

Tapping chunk jumps playback.

---

## 11. LocalStorage Quota Modal
Icon + message “Debug log exceeded browser storage.”  
Buttons: “Download & Clear”, “Dismiss”

---

### UI Tokens (mobile)
* Spacing scale: 4 px
* Tap target: ≥48 × 48
* Font sizes: H4 = 20/28, Body = 16/24, Caption = 12/16
* Primary colour: #5468FF, Accent (ironic): #FFAA00
* User 1 tint: rgba(84,104,255,.15) – User 2 tint: rgba(0,200,120,.15)
