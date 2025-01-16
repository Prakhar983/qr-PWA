import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, update } from "firebase/database";
import { Html5Qrcode } from "html5-qrcode";

const Scanner = ({ user, onStopScan }) => {
  const [reader, setReader] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Ensure the scanner is stopped when the component unmounts
    return () => {
      if (reader) {
        reader.stop().catch((err) => console.error("Error stopping scanner:", err));
      }
    };
  }, [reader]);

  const startScanning = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Initialize the QR code reader
        const qrReader = new Html5Qrcode("reader");
        setReader(qrReader);

        qrReader
        .start(
            { facingMode: "environment" }, // Use rear camera if available
            { fps: 10, qrbox: { width: 400, height: 400 } }, // Define FPS and QR Box size
            (decodedText) => {
            // Handle QR code data
            console.log("Decoded QR Data:", decodedText);
            const userPath = user.email.replace(".", "-");
            const sanitizedData = decodedText.replace(/[.,#\[\\\]$/]/g, "-");
            const scanRef = ref(database, `data/scans/${userPath}/${sanitizedData}`);

            const scanData = {
                coordinates: { x: latitude, y: longitude },
                timestamp: Date.now(),
            };

            // Update data to Firebase
            update(scanRef, scanData)
                .then(() => {
                setMessage("Data saved successfully");

                // Call onStopScan() to stop the scanning process after successful data update
                onStopScan();
                })
                .catch((err) => {
                setMessage(`Error saving data: ${err.message}`);
                });
            },
            (error) => {
            setMessage(`Error scanning QR code: ${error}`);
            }
        )
        .then(() => {
            setScanning(true);
            setMessage("Scanning started...");
        })
        .catch((err) => {
            setMessage(`Error starting scanner: ${err.message}`);
        });
      });
    } else {
      setMessage("Geolocation is not supported by this browser.");
    }
  };
  

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>QR Code Scanner</h2>
      <div id="reader" style={{ width: "100%", height: "300px" }}></div>
      <button onClick={startScanning}>Start Scanning</button>
      <div>{message}</div>
    </div>
  );
};

export default Scanner;
