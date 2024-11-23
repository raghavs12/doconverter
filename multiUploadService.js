const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { PDFDocument } = require('pdf-lib');

// Convert multiple DOCX to PDFs
async function convertMultipleDocx(files) {
  const outputDir = path.join(__dirname, 'converted');
  const metadata = [];
  for (const file of files) {
    const inputPath = file.path;
    const outputPath = path.join(outputDir, `${file.filename}.pdf`);
    try {
      execSync(`soffice --headless --convert-to pdf --outdir "${outputDir}" "${inputPath}"`);
      const stats = fs.statSync(outputPath);
      metadata.push({
        originalName: file.originalname,
        size: stats.size,
        convertedName: `${file.filename}.pdf`,
      });
    } catch (error) {
      console.error(`Error converting ${file.originalname}:`, error.message);
    }
  }
  return metadata;
}

// Merge selected PDFs
async function mergePdfs(pdfPaths, outputFilename) {
  const pdfDoc = await PDFDocument.create();
  for (const pdfPath of pdfPaths) {
    const fileBytes = fs.readFileSync(pdfPath);
    const donorPdfDoc = await PDFDocument.load(fileBytes);
    const pages = await pdfDoc.copyPages(donorPdfDoc, donorPdfDoc.getPageIndices());
    pages.forEach((page) => pdfDoc.addPage(page));
  }
  const mergedBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, 'converted', outputFilename);
  fs.writeFileSync(outputPath, mergedBytes);
  return outputPath;
}

module.exports = { convertMultipleDocx, mergePdfs };
