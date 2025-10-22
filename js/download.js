document.addEventListener('DOMContentLoaded', () => {
  const cv = document.getElementById('cvCard');
  const pdfBtn = document.getElementById('downloadPdfBtn');
  const docBtn = document.getElementById('downloadDocBtn');
  if (!cv) return;

  pdfBtn?.addEventListener('click', () => {
    const opt = {
      margin:       0.5,
      filename:     'Omar-CV.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(cv).save();
  });

  docBtn?.addEventListener('click', () => {
    // Wrap CV HTML for Word
    const header = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">';
    const footer = '</html>';
    const content = header + cv.innerHTML + footer;
    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Omar-CV.doc';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });
});
