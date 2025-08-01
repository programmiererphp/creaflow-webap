document.addEventListener('DOMContentLoaded', () => {
  // --- Page Elements ---
  const landingPage = document.getElementById('landing-page');
  const scenarioPickerPage = document.getElementById('scenario-picker-page');
  
  // --- Navigation Buttons ---
  const startSessionBtn = document.getElementById('start-session-btn');
  const backToLandingBtn = document.getElementById('back-to-landing-btn');
  
  // --- Slice 00: Landing Page Logic ---
  const langPicker = document.getElementById('uiLangPicker');
  if (langPicker) {
    const langButtons = langPicker.querySelectorAll('.segmented-button');
    langButtons.forEach(button => {
      button.addEventListener('click', () => {
        langButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        console.log(`UI Language selected: ${button.textContent}`);
      });
    });
  }
  
  startSessionBtn.addEventListener('click', () => {
    console.log('Start session button clicked.');
    landingPage.classList.add('hidden');
    scenarioPickerPage.classList.remove('hidden');
  });
  
  // --- Slice 01: Scenario Picker Logic ---
  backToLandingBtn.addEventListener('click', () => {
    scenarioPickerPage.classList.add('hidden');
    landingPage.classList.remove('hidden');
  });
  
  const scenarioCards = scenarioPickerPage.querySelectorAll('.elevated-card');
  scenarioCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.card-title').textContent;
      console.log(`Scenario card clicked: ${title}`);
      // In a future slice, this will navigate to the names screen.
      alert(`Selected scenario: ${title}`);
    });
  });
  
  const fab = scenarioPickerPage.querySelector('.fab');
  fab.addEventListener('click', () => {
    console.log('FAB clicked: New Scenario');
    // In a future slice, this will open the new scenario wizard.
    alert('New scenario wizard will open here.');
  });
});