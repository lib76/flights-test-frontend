import { useState, useEffect } from "react";
import "./App.css";
import { apiService } from "./services/api";
import type { Flight, FlightsResponse } from "./services/api";
import FlightList from "./components/FlightList";
import NewFlightForm from "./components/NewFlightForm";

// LocalStorage key for flights
const FLIGHTS_STORAGE_KEY = "tracked_flights";

function App() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoadingFlights, setIsLoadingFlights] = useState<boolean>(true);
  const [isAddingFlight, setIsAddingFlight] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Load flights from localStorage on app start
  useEffect(() => {
    const loadFlightsFromStorage = () => {
      try {
        const storedFlights = localStorage.getItem(FLIGHTS_STORAGE_KEY);
        if (storedFlights) {
          const parsedFlights = JSON.parse(storedFlights);
          setFlights(parsedFlights);
        }
      } catch (error) {
        console.error("Error loading flights from localStorage:", error);
      }
    };

    loadFlightsFromStorage();
  }, []);

  // Load flights from backend
  const loadFlights = async () => {
    setIsLoadingFlights(true);
    setError("");

    try {
      const response: FlightsResponse = await apiService.getFlights();
      console.log("Flights response:", response); // Debug log
      setFlights(response.flights);
      // Update localStorage with just the flights array
      localStorage.setItem(
        FLIGHTS_STORAGE_KEY,
        JSON.stringify(response.flights)
      );
    } catch (error) {
      console.error("Error loading flights:", error);
      setError("Failed to load flights from backend");
    } finally {
      setIsLoadingFlights(false);
    }
  };

  // Add new flight
  const handleAddFlight = async (flightNumber: string) => {
    setIsAddingFlight(true);
    setError("");

    try {
      const response = await apiService.createFlight(flightNumber);
      const updatedFlights = [...flights, response.flight];
      setFlights(updatedFlights);
      localStorage.setItem(FLIGHTS_STORAGE_KEY, JSON.stringify(updatedFlights));
    } catch (error) {
      console.error("Error adding flight:", error);
      setError("Failed to add flight");
    } finally {
      setIsAddingFlight(false);
    }
  };

  // Delete flight
  const handleDeleteFlight = async (id: string) => {
    setError("");

    try {
      await apiService.deleteFlight(id);
      const updatedFlights = flights.filter((flight) => flight.id !== id);
      setFlights(updatedFlights);
      localStorage.setItem(FLIGHTS_STORAGE_KEY, JSON.stringify(updatedFlights));
    } catch (error) {
      console.error("Error deleting flight:", error);
      setError("Failed to delete flight");
    }
  };

  // Refresh all flights
  const handleRefreshFlights = async () => {
    setIsRefreshing(true);
    setError("");

    try {
      await apiService.refreshFlights();
      // Reload flights after refresh
      await loadFlights();
    } catch (error) {
      console.error("Error refreshing flights:", error);
      setError("Failed to refresh flights");
    } finally {
      setIsRefreshing(false);
    }
  };

  // Load flights on component mount
  useEffect(() => {
    loadFlights();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flight Tracker</h1>
        <p>Track your flights in real-time</p>

        {error && (
          <div className="error-section">
            <div className="error-message">{error}</div>
            <button onClick={() => setError("")} className="dismiss-error">
              Dismiss
            </button>
          </div>
        )}

        <div className="main-content">
          <div className="left-panel">
            <NewFlightForm
              onSubmit={handleAddFlight}
              isLoading={isAddingFlight}
            />

            <div className="refresh-section">
              <button
                onClick={handleRefreshFlights}
                disabled={isRefreshing}
                className="refresh-button"
              >
                {isRefreshing ? "Refreshing..." : "Refresh All Flights"}
              </button>
            </div>
          </div>

          <div className="right-panel">
            <FlightList
              flights={flights}
              onDeleteFlight={handleDeleteFlight}
              isLoading={isLoadingFlights}
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
