import React, { useState } from "react";
import Auth from "./components/Auth";
import Scanner from "./components/Scanner";
import ScannedData from "./components/ScannedData";
import "./index.css";

function App() {
  const [user, setUser] = useState(null); // Track logged-in user
  const [view, setView] = useState("auth"); // Toggle between views

  const handleSignIn = (loggedInUser) => {
    setUser(loggedInUser);
    setView("scannedData");
  };

  return (
    <div className="App">
      <h1>Delivery Tracker</h1>
      {view === "auth" && <Auth onSignIn={handleSignIn} />}
      {view === "scannedData" && (
        <ScannedData user={user} onStartScan={() => setView("scanner")} />
      )}
      {view === "scanner" && (
        <Scanner user={user} onStopScan={() => setView("scannedData")} />
      )}
    </div>
  );
}

export default App;
