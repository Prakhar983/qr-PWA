# QR Code Scanner PWA

This project is a Progressive Web App (PWA) that utilizes the `html5-qrcode` library to scan QR codes and log the scanned data along with GPS coordinates.

## Getting Started

Follow these steps to set up and run the QR Code Scanner PWA on your local machine.

### Prerequisites

Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

### Step 1: Install http-server

To serve your application locally, you'll need to install `http-server`. Open your terminal and run:

```bash
npm install -g http-server
```

### Step 2: Start the Server

Navigate to the project directory where your `index.html` file is located. Then, run the following command to start the server:

```bash
http-server
```

### Step 3: Access the Application

Once the server is running, open your web browser and go to:

```
http://localhost:8080
```

Replace `8080` with the port number displayed in your terminal if it's different.

### Features

- **QR Code Scanning**: Use the device's camera to scan QR codes.
- **Geolocation**: Captures the current GPS coordinates when a QR code is scanned.
- **JSON Data Logging**: Logs scanned data along with geolocation in JSON format.
- **JSON Data uploading to Firebase**: Uploads the data to the Firebase Realtime Database.

### Notes

- Ensure that you allow camera and location permissions when prompted by your browser.
- This PWA can be installed on supported devices for offline access.

### Troubleshooting

If you encounter a "404 Not Found" error for `style.css` or `favicon.ico`, ensure that these files are present in your project directory. 