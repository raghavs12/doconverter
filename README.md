
# **DOConverter - Document to PDF Conversion Web App**

## **Project Overview**
Doconverter is a web application that allows users to:
1. Upload `.docx` files.
2. View metadata of the uploaded document.
3. Convert the `.docx` file into a `.pdf` format and download it.

This application has been containerized using Docker, deployed on Kubernetes, and exposed via a public URL for testing purposes.

---

## **Features**
1. **File Upload**:
   - Users can upload `.docx` files through a simple UI.
2. **View Metadata**:
   - The application extracts and displays metadata (e.g., title, author) from the uploaded document.
3. **PDF Conversion**:
   - The `.docx` file is converted into a `.pdf` file that users can download.
4. **Hosted Endpoint**:
   - The application is publicly accessible via the following URL:
     ```
     https://3ca3-2409-40d1-15-e94-15ff-7bab-9ab7-f696.ngrok-free.app/
     ```
5. **Dockerized Application**:
   - The app is containerized for easy deployment and scalability.
6. **Kubernetes Deployment**:
   - The application is deployed using Kubernetes manifest files.

---

## **Technologies Used**
1. **Backend**: Node.js (Express.js)
2. **Frontend**: HTML, CSS, JavaScript
3. **Containerization**: Docker
4. **CI/CD**: GitHub Actions
5. **Orchestration**: Kubernetes
6. **Hosting**: Exposed using `ngrok`

---

## **Setup Instructions**

### **Run Locally**
1. Clone the repository:
   ```bash
   git clone https://github.com/raghavs12/doconverter.git
   cd doconverter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   node server.js
   ```
   The app will be accessible at `http://localhost:5000`.

---

### **Run with Docker**
1. Build the Docker image:
   ```bash
   docker build -t doconverter .
   ```

2. Run the container:
   ```bash
   docker run -d -p 5000:5000 --name doconverter-container doconverter
   ```

3. Access the application at `http://localhost:5000`.

---

### **Kubernetes Deployment**
1. Ensure Kubernetes is running (e.g., Minikube or a cloud service).
2. Apply the Kubernetes manifests:
   ```bash
   kubectl apply -f deployment.yaml
   kubectl apply -f service.yaml
   ```

3. Verify that the application is running:
   ```bash
   kubectl get pods
   kubectl get services
   ```

---

### **Hosted Endpoint**
The application is accessible publicly at:
```
https://b929-152-59-83-79.ngrok-free.app
```

---

## **Project Files**
1. **Source Code**:
   - Backend: `server.js`, `conversionService.js`, `uploadService.js`
   - Frontend: `index.html`, `styles.css`, `script.js`

2. **Docker**:
   - `Dockerfile`: Instructions to containerize the app.

3. **Kubernetes**:
   - `deployment.yaml`: Kubernetes Deployment configuration.
   - `service.yaml`: Kubernetes Service configuration.

4. **CI/CD Pipeline**:
   - `.github/workflows/deploy.yml`: GitHub Actions workflow to automate Docker image build and deployment.

5. **Bash Script**:
   - `run.sh`: Script to build and run the container locally.

---

## **How It Works**
1. **File Upload**:
   - The uploaded `.docx` file is saved in a temporary directory.
2. **Metadata Extraction**:
   - Metadata is extracted using a Node.js library.
3. **PDF Conversion**:
   - The file is processed and converted to `.pdf` format.
4. **Download**:
   - The user can download the converted `.pdf` file.

---

## **Enhancements**
🔒 Convert Word to PDF with Password Encryption
Ensure your PDF files are secure with user and owner password protection, making your documents private and tamper-proof.

📂 Upload Multiple Word Files
Save time by uploading and converting multiple Word files to PDFs in one go with just a few clicks.

🔗 Merge Multiple PDFs
Combine multiple PDFs into a single file effortlessly, simplifying document management.

🌗 Dark Mode/Light Mode
Switch between Dark and Light modes for a comfortable viewing experience, day or night.


---

# Project Screenshots

## Screenshots
![Screenshot 383](https://github.com/raghavs12/doconverter/blob/main/images/Screenshot%20(383).png)
![Screenshot 384](https://github.com/raghavs12/doconverter/blob/main/images/Screenshot%20(384).png)
![Screenshot 385](https://github.com/raghavs12/doconverter/blob/main/images/Screenshot%20(385).png)
![Screenshot 386](https://github.com/raghavs12/doconverter/blob/main/images/Screenshot%20(386).png)
![Screenshot 387](https://github.com/raghavs12/doconverter/blob/main/images/Screenshot%20(387).png)
![Screenshot 388](https://github.com/raghavs12/doconverter/blob/main/images/Screenshot%20(388).png)
![Screenshot 389](https://github.com/raghavs12/doconverter/blob/main/images/Screenshot%20(389).png)
![Screenshot 390](https://github.com/raghavs12/doconverter/blob/main/images/Screenshot%20(390).png)
![Screenshot 391](https://github.com/raghavs12/doconverter/blob/main/images/Screenshot%20(391).png)
![Screenshot 392](https://github.com/raghavs12/doconverter/blob/main/images/Screenshot%20(392).png)
![Screenshot 393](https://github.com/raghavs12/doconverter/blob/main/images/Screenshot%20(393).png)
![Screenshot 394](https://github.com/raghavs12/doconverter/blob/main/images/Screenshot%20(394).png)
![Screenshot 395](https://github.com/raghavs12/doconverter/blob/main/images/Screenshot%20(395).png)
![Screenshot 396](https://github.com/raghavs12/doconverter/blob/main/images/Screenshot%20(396).png)


## **DockerHub Repository**
The Docker image for this project is hosted at:
- **DockerHub Link**: [https://hub.docker.com/r/raghavs12/doconverter](https://hub.docker.com/r/raghavs12/doconverter)
- **Pull Command**:
  ```bash
  docker pull raghavs12/doconverter
  ```

---

## **Acknowledgements**
This project was developed as part of the RapidFort Campus Recruitment Drive. Special thanks to the organizers for providing this opportunity.

---
