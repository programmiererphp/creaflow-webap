# 📄 Product-Requirements Document  
### **CreaLove · One-Screen Web-App (≤ 2 000 LoC)**  
*Deutsch | ironisch-romantische Story-Co-Creation nach Arthur Arons 36 Fragen*

---

## 1 · Ziel & Elevator Pitch  
Auf EINEM Smartphone-Screen verfassen zwei Personen (oder eine Person + KI) in 36 Runden eine augenzwinkernde Liebesgeschichte.  
Die KI liefert subtil eskalierende Fragen (angelehnt an Arons 36 Questions) und webt die Antworten direkt in den fortlaufenden Text.  
Alles ist client-seitig, offline cachbar, ohne Build-Tool – **eine** `index.html` samt Inline-CSS & JS **< 2 000 Zeilen**.

---

## 2 · Umfang & Grenzen  

| In Scope (MVP) | Out of Scope |
|----------------|--------------|
| • Eine Sprache (DE) <br>• Eine Story-Variante (ironisch-romantisch) <br>• Nur ein einziger Screen (Story + Input + Settings) | ✕ Multilingualität <br>✕ Szenario-Wechsel <br>✕ TTS/Audio <br>✕ Server-Datenbank |

---

## 3 · UI-Layout (HTML-Gerüst)  

```html
<header>CreaLove ♥ – 36 Fragen</header>

<main id="storyPane"></main>          <!-- Scrollbarer Verlauf -->

<section id="playArea">
  <p id="cue">…KI-Frage…</p>

  <div id="options">
    <button class="opt"></button>
    <button class="opt"></button>
    <button class="opt ironic"></button>
  </div>

  <textarea id="input" rows="3" placeholder="Oder eigene Antwort…"></textarea>
  <button id="send" disabled>Senden</button>
</section>

<footer>Runde <span id="round">1</span>/36</footer>

<details id="prefs">
  <summary>⚙️ Einstellungen · Debug</summary>
  <label>OpenRouter-Key <input id="apiKey" type="password"></label>
  <label><input id="dbg" type="checkbox"> Debug an</label>
  <button id="export">Story exportieren</button>
  <pre id="log"></pre>
</details>

Inline-CSS (~60 Zeilen): Flex-Column, max-width 480 px, system-Font, .ironic {color:#d22}.

StoryPane: max-height:55vh; overflow-y:auto; – letzter Absatz hellblau hinterlegt.



---

4 · Interaktionsfluss

1. App-Start

localStorage.session vorhanden? → laden & rendern; sonst getCue(1).



2. Pro Runde (1 … 36)

1. KI-Frage → #cue + drei Buttons.


2. User klickt Button oder tippt eigene Antwort → Senden aktiviert.


3. appendStory("user", text) → getMerge(last, fullStory) → appendStory("ai", merge).


4. round++; bei 37 → Banner „Geschichte fertig!“ + Export-Hinweis.




3. Fehler (try/catch) → alert() + Eintrag im Debug-Log.




---

5 · KI-Prompts (hartkodiert, Deutsch)

const cuePrompt = n => `
Du bist ein ironischer Liebesbegleiter. Stelle Frage ${n}/36
(≤20 Wörter) und liefere danach 2 ernsthafte und 1 ironische
Antwortvorschläge (je ≤10 Wörter, mit Aufzählungszeichen).`;

const mergePrompt = ({ last, full }) => `
Füge folgende neue Nutzerantwort nahtlos in die bisherige
ironisch-romantische Geschichte ein.
---
Bisherige Geschichte:
${full}
---
Nutzerantwort:
${last}
---
Antwort des Erzählers (2-3 Sätze, ironischer Ton):
`;


---

6 · Funktionale Anforderungen

ID	Requirement

F-01	App funktioniert offline nach erstem Laden (Service-Worker optional, sonst Browser-Cache).
F-02	Ohne gültigen API-Key ist Senden deaktiviert.
F-03	#send wird auch per Ctrl/Enter ausgelöst.
F-04	Scroll-Autofokus nur, wenn der User nah am Ende ist (<=200 px).
F-05	Export erzeugt Blob(JSON.stringify(session)) ➜ Download crealove.json.
F-06	Bei gesetztem „Debug an“ werden max. 150 Log-Zeilen im <pre> angezeigt (FIFO).



---

7 · Technik-Leitplanken & Code-Budget

Block	Max Zeilen	Notizen

HTML (+ Inline-CSS)	150	statisch, semantisch
JS Logik	1 600	fetch-Wrapper, State-Machine, UI-Bindings
Templates + Utils	200	Prompts, appendStory, saveLocal
Summe	≈ 1 950	Reserve ≈ 50 Zeilen


Keine Frameworks, kein Build-Step.

Nur ES-Modules (<script type="module">).

Minimal-Polyfills (Fetch & Promise sind überall mobil verfügbar).



---

8 · Edge-Cases & Abhilfe

Fall	Lösung

Model liefert <3 Buttons	Dupliziere den letzten; >3 → nimm die ersten drei •-Bullets.
Antwort >280 Zeichen	Hart kürzen substr(0,277)+"…".
QuotaExceededError bei Autosave	Zeige Hinweis „Speicher voll – exportieren & löschen?“.
User scrollt weit hoch	Zeige „↓ Neu“-Button, der ans Ende scrollt.



---

9 · Unique Selling Points trotz Minimalismus

1. 36-Fragen-Dramaturgie ↔ messbar steigende Intimität.


2. Ironischer Ton vermeidet Kitsch und erzeugt Lacher.


3. Zero-Friction – ein Bildschirm, keine Menüs, sofort loslegen.


4. Take-Home-Memory – Export/Import macht es zum digitalen Tagebuch.



> Definition of Done: Story lässt sich in < 30 Sek. starten, Runde dauert < 5 Sek. Latenz, gesamte Codebasis bleibt unter 2 000 Zeilen.





