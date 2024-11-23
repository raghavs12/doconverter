const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function convertDocxToPdf(file, enableEncryption, userPassword, ownerPassword) {
  const inputPath = file.path;
  const outputDir = path.join(__dirname, 'converted');
  const outputFilePath = path.join(outputDir, `${file.filename}.pdf`);

  try {
    const command = `soffice --headless --convert-to pdf --outdir "${outputDir}" "${inputPath}"`;
    console.log('Running LibreOffice Command:', command);

    execSync(command);
    console.log('Word document successfully converted to PDF.');

    if (enableEncryption) {
      console.log('Encrypting PDF with user and owner passwords:', userPassword, ownerPassword);
      const encryptedPath = encryptPdfWithQpdf(outputFilePath, userPassword, ownerPassword);
      console.log('Encrypted PDF created at:', encryptedPath);
      return path.basename(encryptedPath);
    }

    return path.basename(outputFilePath);
  } catch (error) {
    console.error('Error during LibreOffice conversion:', error.message);
    throw new Error('LibreOffice conversion failed.');
  }
}

function encryptPdfWithQpdf(inputPath, userPassword, ownerPassword) {
  const outputPath = inputPath.replace('.pdf', '_protected.pdf');
  const command = `qpdf --encrypt ${userPassword} ${ownerPassword} 256 -- ${inputPath} ${outputPath}`;


  try {
    console.log('Running QPDF Command:', command);
    execSync(command, { stdio: 'inherit' });
    console.log('PDF successfully encrypted at:', outputPath);
    return outputPath;
  } catch (error) {
    console.error('Error encrypting PDF:', error.message);
    throw new Error('PDF encryption failed.');
  }
}

module.exports = { convertDocxToPdf };
