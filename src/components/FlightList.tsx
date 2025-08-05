import React from "react";
import type { Flight } from "../services/api";
import { FlightStatus } from "../services/api";

interface FlightListProps {
  flights: Flight[];
  onDeleteFlight: (id: string) => void;
  isLoading: boolean;
}

const FlightList: React.FC<FlightListProps> = ({
  flights,
  onDeleteFlight,
  isLoading,
}) => {
  const getStatusColor = (status: Flight["status"]) => {
    switch (status) {
      case FlightStatus.AWAITING:
        return "bg-yellow-500";
      case FlightStatus.DEPARTED:
        return "bg-blue-500";
      case FlightStatus.ARRIVED:
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="flight-list">
        <h2>Tracked Flights</h2>
        <div className="loading">Loading flights...</div>
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <div className="flight-list">
        <h2>Tracked Flights</h2>
        <div className="empty-state">
          <p>No flights are being tracked yet.</p>
          <p>Add a flight number to start tracking!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flight-list">
      <h2>Tracked Flights ({flights.length})</h2>
      <div className="flights-grid">
        {flights.map((flight) => (
          <div key={flight.id} className="flight-card">
            <div className="flight-header">
              <h3 className="flight-number">{flight.flightNumber}</h3>
              <span className={`status-badge ${getStatusColor(flight.status)}`}>
                {flight.status}
              </span>
            </div>

            <div className="flight-details">
              <div className="detail-row">
                <span className="label">Departure:</span>
                <span className="value">
                  {formatDateTime(flight.actualDepartureTime)}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Arrival:</span>
                <span className="value">
                  {formatDateTime(flight.actualArrivalTime)}
                </span>
              </div>
            </div>

            <div className="flight-actions">
              <button
                onClick={() => onDeleteFlight(flight.id)}
                className="delete-button"
                title="Delete flight"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightList;
