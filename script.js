document.addEventListener('DOMContentLoaded', (event) => {
  const body = document.body;
  const themeToggleDark = document.getElementById('theme-toggle-dark');
  const themeToggleLight = document.getElementById('theme-toggle-light');
  // Überprüfen, ob das Element existiert, bevor der Event Listener hinzugefügt wird
const downloadButton = document.getElementById('download-pdf');
  if (downloadButton) {
  downloadButton.addEventListener('click', function() {
    // Bestimmen Sie die Skalierung basierend auf der Geräteauflösung
    const scale = window.devicePixelRatio;
    const cardElement = document.querySelector('.card');
    const canvasWidth = cardElement.offsetWidth * scale;
    const canvasHeight = cardElement.offsetHeight * scale;

    html2canvas(cardElement, {
      scale: scale, // Anpassung der Skalierung für bessere Qualität
      useCORS: true, // Ermöglicht das Laden von Bildern mit CORS-Policy
      width: canvasWidth,
      height: canvasHeight
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = canvas.width / scale; // Breite im PDF anpassen
      const pdfHeight = canvas.height / scale; // Höhe im PDF anpassen

      // Erzeugen Sie ein PDF im passenden Format zur Visitenkarte
      const pdf = new jspdf.jsPDF({
        orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
        unit: 'px',
        format: [pdfWidth, pdfHeight]
      });

      // Bild ohne Skalierung hinzufügen, da wir die Größe bereits angepasst haben
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('visitenkarte.pdf');
    });
  });
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
