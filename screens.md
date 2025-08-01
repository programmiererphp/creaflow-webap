1. **Welcome / Landing**  
   - Title, tagline, “Start New Session” button, language picker.

2. **Use-Case Selection**  
   - Grid of cards (Story, Coaching, Tutor, etc.) with brief subtitle and icon.  
   - “Create New Use-Case” mini-fab.

3. **Name Entry**  
   - Two text inputs (User 1, User 2 optional).  
   - “Proceed” button disabled until User 1 filled.

4. **Main Interaction Screen**  
   - Left:  
     * AI prompt/question bubble.  
     * Option buttons (3) + “Write my own…” textarea.  
     * “Send” primary button.  
   - Right:  
     * Scrollable Story panel (markdown).  
     * Read-Aloud mini-player controls.  
   - Top bar: Session title, “Reset”, “Export XML”.

5. **Settings Modal**  
   - Tabs: *General · Prompts · API Keys · Debug*  
   - General: language, high-contrast, read-aloud toggle, mock mode.  
   - Prompts: accordion per use-case with 5 textareas.  
   - API Keys: inputs with save, clear.  
   - Debug: auto-scrolling log, “Download Log” link.

6. **Import Dialog**  
   - File picker, drag-and-drop area, sample file link.

7. **Export Confirmation**  
   - Shows filename, size; buttons: “Download”, “Cancel”.

8. **Error / Offline Overlay**  
   - Icon, brief message, “Retry” & “Switch to Mock Data” buttons.

9. **Mobile Story Pop-Up**  
   - Full-screen modal of Story panel with close “x”.

10. **Create New Use-Case Wizard**  
    - Stepper: Details → Prompts → Confirm.

11. **Read-Aloud Queue Panel**  
    - List of upcoming chunks, progress bar, “Stop”.  

12. **Quota Exceeded Screen**  
    - Modal explaining localStorage limit, with “Download & Clear” CTA.
