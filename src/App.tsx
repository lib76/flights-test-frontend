import { useState, useEffect } from "react";
import "./App.css";
import { apiService } from "./services/api";
import type { ApiResponse } from "./services/api";

function App() {
  const [apiStatus, setApiStatus] = useState<string>("Checking...");
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Test backend connection
  const testBackendConnection = async () => {
    try {
      const data: ApiResponse = await apiService.healthCheck();
      console.log("Backend response:", data); // Debug log
      setApiStatus(`Connected: ${data.status}`);
      setIsConnected(true);
    } catch {
      setApiStatus("Failed to connect to backend");
      setIsConnected(false);
    }
  };

  useEffect(() => {
    testBackendConnection();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Boilerplate</h1>
        <p>A basic React application ready for development</p>

        <div className="status-section">
          <h2>Backend Status</h2>
          <div
            className={`status-indicator ${
              isConnected ? "connected" : "disconnected"
            }`}
          >
            {apiStatus}
          </div>
          <button onClick={testBackendConnection} className="test-button">
            Test Connection
          </button>
        </div>

        <div className="info-section">
          <h3>Getting Started</h3>
          <ul>
            <li>
              Edit <code>src/App.tsx</code> to modify this page
            </li>
            <li>
              Add your components in the <code>src</code> directory
            </li>
            <li>
              Configure API calls in <code>src/services/api.ts</code>
            </li>
            <li>
              Backend should be running on <code>localhost:3000</code>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
