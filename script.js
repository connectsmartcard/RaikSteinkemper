document.addEventListener('DOMContentLoaded', (event) => {
  const body = document.body;
  const themeToggleDark = document.getElementById('theme-toggle-dark');
  const themeToggleLight = document.getElementById('theme-toggle-light');
  // Überprüfen, ob das Element existiert, bevor der Event Listener hinzugefügt wird
const downloadButton = document.getElementById('download-pdf');
  if (downloadButton) {
    downloadButton.addEventListener('click', function() {

      html2canvas(document.querySelector('.card'), { 
        scale: 2, // Anpassung der Skalierung für bessere Qualität, damals 2
        useCORS: true
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdf = new jspdf.jsPDF({

           orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
           unit: 'mm',
           format: 'a6'

          // orientation: 'landscape',
          // unit: 'px',
          // format: [canvas.width / scale, canvas.height / scale]
        });
  
        // Berechnen Sie das Seitenverhältnis des Bildes
        const canvasAspectRatio = canvas.width / canvas.height;
        const a4AspectRatio = pdf.internal.pageSize.getWidth() / pdf.internal.pageSize.getHeight();
        let imgWidth = pdf.internal.pageSize.getWidth();
        let imgHeight = pdf.internal.pageSize.getHeight();
        
        // Anpassung der Bildgröße, um Verzerrung zu vermeiden
        if (canvasAspectRatio > a4AspectRatio) {
          // Canvas ist breiter als A4
          imgHeight = imgWidth / canvasAspectRatio;
        } else {
          // Canvas ist höher als A4
          imgWidth = imgHeight * canvasAspectRatio;
        }
  
        const x = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
        const y = (pdf.internal.pageSize.getHeight() - imgHeight) / 2;
  
        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
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
