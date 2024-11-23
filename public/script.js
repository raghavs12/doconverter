const darkModeToggle = document.getElementById('darkModeToggle');
const fileInput = document.getElementById('fileInput');
const fileNameDisplay = document.getElementById('fileName');
const enableEncryptionCheckbox = document.getElementById('enableEncryption');
const passwordInputs = document.getElementById('passwordInputs');
const convertBtn = document.getElementById('convertBtn');
const progressSection = document.getElementById('progressSection');
const pdfViewer = document.getElementById('pdfViewer');
const mergeButton = document.getElementById('mergeBtn');
const mergeSection = document.getElementById('mergeSection');
const metadataSection = document.getElementById('metadataSection');
const downloadPdfButton = document.getElementById('downloadBtn'); // Main "Download PDF" button

// Toggle Dark Mode
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Handle file selection and update UI
fileInput.addEventListener('change', () => {
  const enableEncryptionSection = document.querySelector('.encryption-section');
  const fileCount = fileInput.files.length;

  console.log('Number of files uploaded:', fileCount); // Debugging to check file count

  // Reset visibility for sections
  mergeSection.style.display = 'none';
  mergeButton.style.display = 'none';
  pdfViewer.style.display = 'none';
  downloadPdfButton.style.display = 'none'; // Always reset the button initially

  if (fileCount > 1) {
    // Hide encryption and Download PDF button for multiple files
    enableEncryptionSection.style.display = 'none';
    passwordInputs.style.display = 'none';
    console.log('Multiple files uploaded, hiding Download PDF button'); // Debugging
  } else if (fileCount === 1) {
    // Show encryption options for a single file
    enableEncryptionSection.style.display = 'block';
    passwordInputs.style.display = enableEncryptionCheckbox.checked ? 'block' : 'none';
    console.log('Single file uploaded, waiting for conversion'); // Debugging
  }

  // Update file name display
  fileNameDisplay.textContent = fileCount > 1 ? `${fileCount} files selected` : fileInput.files[0]?.name || 'No file chosen';
});

// Show or hide password inputs based on encryption checkbox
enableEncryptionCheckbox.addEventListener('change', () => {
  passwordInputs.style.display = enableEncryptionCheckbox.checked ? 'block' : 'none';
});

// Set default progress text
progressSection.textContent = 'Start Conversion';

// Handle file conversion
convertBtn.addEventListener('click', async () => {
  if (fileInput.files.length === 0) {
    alert('Please upload one or more Word documents!');
    return;
  }

  const formData = new FormData();
  Array.from(fileInput.files).forEach((file) => formData.append('files', file));

  const enableEncryption = enableEncryptionCheckbox.checked;

  if (enableEncryption && fileInput.files.length === 1) {
    const userPassword = document.getElementById('userPassword')?.value;
    const ownerPassword = document.getElementById('ownerPassword')?.value;

    if (!userPassword || !ownerPassword) {
      alert('Please provide both user and owner passwords for encryption.');
      return;
    }

    formData.append('userPassword', userPassword);
    formData.append('ownerPassword', ownerPassword);
  }

  formData.append('enableEncryption', enableEncryption);

  progressSection.textContent = 'Conversion in progress...';

  try {
    const response = await fetch(
      fileInput.files.length === 1 ? '/upload' : '/upload/multiple',
      { method: 'POST', body: formData }
    );
    const data = await response.json();

    if (response.ok) {
      progressSection.textContent = 'Conversion Completed!';
      fileInput.files.length === 1 ? displaySingleFileMetadata(data.metadata[0]) : displayMetadata(data.metadata);
    } else {
      alert(data.message || 'An error occurred.');
      progressSection.textContent = 'Start Conversion';
    }
  } catch (error) {
    console.error('Fetch error:', error);
    progressSection.textContent = 'Start Conversion';
  }
});

// Display metadata for a single file
function displaySingleFileMetadata(metadata) {
  const metadataList = document.getElementById('metadataList');
  metadataList.innerHTML = `
    <li style="margin-bottom: 10px;">
      <div><strong>Uploaded File:</strong> ${metadata.originalFile.name}</div>
    </li>
    <li style="margin-bottom: 10px;">
      <div><strong>File Size:</strong> ${metadata.originalFile.size} KB</div>
    </li>
    <li style="margin-bottom: 10px;">
      <div><strong>File Format:</strong> DOC/DOCX</div>
    </li>
    <li style="margin-bottom: 10px;">
      <div><strong>Converted File:</strong> ${metadata.convertedFile.name}</div>
    </li>
    <li style="margin-bottom: 10px;">
      <div><strong>File Size:</strong> ${metadata.convertedFile.size} KB</div>
    </li>
    <li style="margin-bottom: 10px;">
      <div><strong>File Format:</strong> PDF</div>
    </li>
    <li style="margin-bottom: 10px;">
      <div><strong>Encryption:</strong> ${metadata.encryption}</div>
    </li>
  `;
  metadataSection.style.display = 'block';

  downloadPdfButton.onclick = () => window.open(`/view/${metadata.convertedFile.name}`, '_blank');
  downloadPdfButton.style.display = 'block'; // Show the Download PDF button after conversion
  pdfViewer.querySelector('iframe').src = `/view/${metadata.convertedFile.name}`;
  pdfViewer.style.display = 'block';

  console.log('Single file converted, Download PDF button displayed');
}



// Display metadata for multiple files
function displayMetadata(metadata) {
  const metadataList = document.getElementById('metadataList');
  metadataList.innerHTML = '';
  metadata.forEach((file, index) => {
    metadataList.innerHTML += `
      <li style="margin-bottom: 20px; padding: 15px; background: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong >File ${index + 1}:</strong>
          <ul style="list-style: none; padding-left: 0; margin: 10px 0;">
            <li><strong>Uploaded File:</strong> ${file.originalName}</li>
            <li><strong>File Size:</strong> ${(file.size / 1024).toFixed(2)} KB</li>
            <li><strong>File Format:</strong> DOC/DOCX</li>
            <li><strong>Converted File:</strong> ${file.convertedName}</li>
            <li><strong>File Size:</strong> ${(file.size / 1024).toFixed(2)} KB</li>
            <li><strong>File Format:</strong> PDF</li>
            <li><strong>Encryption:</strong> ${file.encryption}</li>
          </ul>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
          <button class="download-button" style="background: linear-gradient(90deg, #28a745, #218838); color: white; border: none; padding: 10px 20px; border-radius: 20px; font-size: 1rem; cursor: pointer; transition: transform 0.2s, box-shadow 0.3s;" onclick="downloadPdf('${file.convertedName}')">📥 Download</button>
          <input type="checkbox" class="merge-checkbox" value="${file.convertedName}">
        </div>
      </li>
    `;
  });
  metadataSection.style.display = 'block';

  // Hide "Download PDF" button and PDF viewer for multiple files
  downloadPdfButton.style.display = 'none';
  pdfViewer.style.display = 'none';

  // Update merge button visibility
  updateMergeButtonVisibility();
}



// Update merge button visibility based on the number of converted files
function updateMergeButtonVisibility() {
  const metadataItems = document.querySelectorAll('#metadataList li');
  if (metadataItems.length > 1) {
    mergeSection.style.display = 'block';
    mergeButton.style.display = 'block';
    console.log('Merge button displayed after conversion');
  } else {
    mergeSection.style.display = 'none';
    mergeButton.style.display = 'none';
    console.log('Merge button hidden - not enough files converted');
  }
}

// Download a specific PDF
function downloadPdf(filename) {
  window.open(`/view/${filename}`, '_blank');
}

// Merge selected PDFs
mergeButton.addEventListener('click', async () => {
  const selectedFiles = Array.from(document.querySelectorAll('.merge-checkbox:checked')).map((checkbox) => checkbox.value);

  if (selectedFiles.length < 2) {
    alert('Please select at least two PDFs to merge.');
    return;
  }

  const response = await fetch('/merge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pdfFiles: selectedFiles, outputFilename: 'merged_output.pdf' }),
  });

  if (response.ok) {
    const mergedPdfUrl = await response.text();
    window.open(mergedPdfUrl, '_blank');
  } else {
    alert('Failed to merge PDFs.');
  }
});
