import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, get } from "firebase/database";

const ScannedData = ({ user, onStartScan }) => {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    const fetchScans = async () => {
      const userPath = user.email.replace(".", "-");
      const scanRef = ref(database, `data/scans/${userPath}`);
      const snapshot = await get(scanRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const entries = Object.entries(data).map(([key, value]) => ({
          ...value,
          key,
        }));

        // Sort the scans in descending order based on timestamp
        const sortedEntries = entries.sort((a, b) => b.timestamp - a.timestamp);
        setScans(sortedEntries);
      }
    };

    fetchScans();
  }, [user]);

  const truncateText = (text, length = 4) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Scanned Data</h2>
      <div
        className="table-wrapper"
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          border: "1px solid #ccc",
          display: "block",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                  zIndex: 1,
                }}
              >
                QR Data
              </th>
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                  zIndex: 1,
                }}
              >
                Latitude
              </th>
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                  zIndex: 1,
                }}
              >
                Longitude
              </th>
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                  zIndex: 1,
                }}
              >
                Date
              </th>
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                  zIndex: 1,
                }}
              >
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan) => (
              <tr key={scan.key}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {truncateText(scan.key)}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {scan.coordinates.x.toFixed(5)}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {scan.coordinates.y.toFixed(5)}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {new Date(scan.timestamp).toLocaleDateString()}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {new Date(scan.timestamp).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={onStartScan}>Add Scan</button>
    </div>
  );
};

export default ScannedData;
