document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadBtn');
    
    downloadBtn.addEventListener('click', function() {
        const element = document.body;
        const options = {
            margin: 1,
            filename: 'Omar-CV.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(options).from(element).save();
    });
});
