document.addEventListener('DOMContentLoaded', () => {
  const cv = document.getElementById('cvCard');
  const pdfBtn = document.getElementById('downloadPdfBtn');
  const docBtn = document.getElementById('downloadDocBtn');
  if (!cv) return;

  // download links that should not appear in exported files
  const downloadLinks = cv.querySelectorAll('.download-link');

  function hideLinks() { downloadLinks.forEach(el => el.style.display = 'none'); }
  function showLinks() { downloadLinks.forEach(el => el.style.display = 'inline'); }

  // Utility to apply compact styling during export
  function applyShrink() { cv.classList.add('pdf-shrink'); }
  function removeShrink() { cv.classList.remove('pdf-shrink'); }

  // PDF export
  if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
      if (typeof html2pdf === 'undefined') {
        console.error('html2pdf not loaded');
        return;
      }
      hideLinks();
      applyShrink();

      const opt = {
        margin:       10, // mm
        filename:     'Omar-CV.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      // generate PDF and restore UI afterwards
      html2pdf().set(opt).from(cv).save().then(() => {
        removeShrink();
        showLinks();
      }).catch(err => {
        console.error(err);
        removeShrink();
        showLinks();
      });
    });
  }

  // DOC export (HTML wrapped for Word)
  if (docBtn) {
    docBtn.addEventListener('click', () => {
      hideLinks();

      // Clone the CV and remove download controls
      const clone = cv.cloneNode(true);
      clone.querySelectorAll('.download-link').forEach(n => n.remove());

      const compactStyles = `
        <style>
          body{font-family: 'Inter', sans-serif; font-size:12px; line-height:1.15; color:#000;}
          h1{font-size:20px;}
          h2, .section-title{font-size:13px;}
          .sidebar-title{font-size:12px;}
          .w-32{width:64px;height:64px;}
          img{max-width:100%;height:auto;}
        </style>
      `;

      const header = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8">' + compactStyles + '</head><body>';
      const footer = '</body></html>';
      const content = header + clone.innerHTML + footer;

      const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Omar-CV.doc';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      showLinks();
    });
  }
});
