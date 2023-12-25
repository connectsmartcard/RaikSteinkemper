document.addEventListener('DOMContentLoaded', (event) => {
  const body = document.body;
  const themeToggleDark = document.getElementById('theme-toggle-dark');
  const themeToggleLight = document.getElementById('theme-toggle-light');
  // Überprüfen, ob das Element existiert, bevor der Event Listener hinzugefügt wird
const downloadButton = document.getElementById('download-pdf');
if (downloadButton) {
  downloadButton.addEventListener('click', function() {
    const cardElement = document.querySelector('.card');
    const scale = window.devicePixelRatio; // Geräte-Pixel-Ratio für eine hohe Auflösung
    const width = cardElement.offsetWidth * scale;
    const height = cardElement.offsetHeight * scale;

    html2canvas(cardElement, {
      scale: scale,
      width: width,
      height: height,
      useCORS: true, // Erlauben Sie das Laden von Ressourcen über Domains hinweg
      // ...weitere Optionen...
    }).then(canvas => {
      // Erstellen Sie das PDF mit den Maßen des Canvas
      const pdf = new jspdf.jsPDF({
        orientation: 'p', // 'p' für Portrait, 'l' für Landscape
        unit: 'px',
        format: [width, height],
      });

      // Fügen Sie das gerenderte Bild dem PDF hinzu
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, width, height);
      pdf.save('visitenkarte.pdf');
    });
  });
} else {
  // Fehlerbehandlung, falls der Button nicht gefunden wurde
  console.error('Download-Button wurde nicht im DOM gefunden.');
}


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

  // PDF-Download-Funktionalität


  

});
