const { PDFDocument } = window.pdfLib;

async function editPDF() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) return alert("Please upload a PDF.");

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    // Add a new page with edited text
    const page = pdfDoc.addPage();
    page.drawText("Edited with pdf-lib", {
        x: 50,
        y: page.getHeight() - 60,
        size: 24,
        color: [0, 0.53, 0.75],
    });

    const modifiedPdfBytes = await pdfDoc.save();

    // Trigger download
    const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'edited.pdf';
    link.click();
}