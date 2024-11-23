const express = require('express');
const fs = require('fs');
const path = require('path');
const upload = require('./uploadService');
const { convertDocxToPdf } = require('./conversionService');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Upload route
app.post('/upload', (req, res) => {
  upload.array('files', 10)(req, res, async (err) => {
    if (err) {
      console.error('Error during file upload:', err.message);
      return res.status(400).json({ message: err.message });
    }

    const { enableEncryption, userPassword, ownerPassword } = req.body;
    const metadata = [];
    try {
      for (const file of req.files) {
        console.log(`Processing file: ${file.originalname}`);
        const pdfFilename = await convertDocxToPdf(file, enableEncryption === 'true', userPassword, ownerPassword);

        // Gather metadata
        const convertedPath = path.join(__dirname, 'converted', pdfFilename);
        const convertedStats = fs.statSync(convertedPath);

        metadata.push({
          originalFile: {
            name: file.originalname,
            size: `${(file.size / 1024).toFixed(2)} KB`,
            type: file.mimetype,
          },
          convertedFile: {
            name: pdfFilename,
            size: `${(convertedStats.size / 1024).toFixed(2)} KB`,
            type: 'application/pdf',
          },
          encryption: enableEncryption === 'true' ? 'Yes' : 'No',
        });
      }

      res.status(200).json({ message: 'Files converted successfully', metadata });
    } catch (error) {
      console.error('Error during conversion:', error.message);
      res.status(500).json({ message: 'An error occurred during conversion.' });
    }
  });
});

const { convertMultipleDocx, mergePdfs } = require('./multiUploadService');

app.post('/upload/multiple', (req, res) => {
  upload.array('files', 10)(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });

    try {
      const metadata = await convertMultipleDocx(req.files);
      res.status(200).json({ metadata });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred during conversion.' });
    }
  });
});

app.post('/merge', async (req, res) => {
  const { pdfFiles, outputFilename } = req.body;
  try {
    const mergedPath = await mergePdfs(
      pdfFiles.map((file) => path.join(__dirname, 'converted', file)),
      outputFilename
    );
    res.status(200).send(`/view/${path.basename(mergedPath)}`);
  } catch (error) {
    console.error('Error merging PDFs:', error.message);
    res.status(500).json({ message: 'Failed to merge PDFs.' });
  }
});






// Route to serve converted PDFs
app.get('/view/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'converted', req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
