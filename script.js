document.addEventListener('DOMContentLoaded', (event) => {
  const body = document.body;
  const themeToggleDark = document.getElementById('theme-toggle-dark');
  const themeToggleLight = document.getElementById('theme-toggle-light');


 

  // Funktion, um den Dark Mode zu aktivieren
  function enableDarkMode() {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    themeToggleLight.style.display = 'block';
    themeToggleDark.style.display = 'none';
    localStorage.setItem('darkMode', 'enabled');
  }

  // Funktion, um den Light Mode zu aktivieren
  function disableDarkMode() {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    themeToggleDark.style.display = 'block';
    themeToggleLight.style.display = 'none';
    localStorage.setItem('darkMode', 'disabled');
  }

  // Überprüfen des Zustands beim Laden der Seite
  if (localStorage.getItem('darkMode') === 'enabled') {
    enableDarkMode();
  } else {
    enableDarkMode();
  }

  themeToggleDark.addEventListener('click', enableDarkMode);
  themeToggleLight.addEventListener('click', disableDarkMode);




// Weitere Codebearbeitungen und Funktionen...


  // PDF-Download-Funktionalität


  

});
