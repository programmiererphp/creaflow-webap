document.addEventListener('DOMContentLoaded', () => {
  const langPicker = document.getElementById('uiLangPicker');
  const langButtons = langPicker.querySelectorAll('.segmented-button');
  
  langButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      langButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to the clicked button
      button.classList.add('active');
      console.log(`UI Language selected: ${button.textContent}`);
    });
  });
  
  const startButton = document.querySelector('.filled-button');
  startButton.addEventListener('click', () => {
    console.log('Start session button clicked.');
    // In a real app, this would navigate to the next screen.
    alert('Starting session!');
  });
});