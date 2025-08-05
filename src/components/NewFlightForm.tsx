import React, { useState } from "react";

interface NewFlightFormProps {
  onSubmit: (flightNumber: string) => void;
  isLoading: boolean;
}

const NewFlightForm: React.FC<NewFlightFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [flightNumber, setFlightNumber] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!flightNumber.trim()) {
      setError("Flight number is required");
      return;
    }

    if (flightNumber.length < 3) {
      setError("Flight number must be at least 3 characters");
      return;
    }

    // Submit the flight number
    onSubmit(flightNumber.trim().toUpperCase());
    setFlightNumber("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlightNumber(e.target.value);
    if (error) setError("");
  };

  return (
    <div className="new-flight-form">
      <h2>Add New Flight</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="flightNumber">Flight Number:</label>
          <input
            type="text"
            id="flightNumber"
            value={flightNumber}
            onChange={handleInputChange}
            placeholder="e.g., AA123, BA456"
            disabled={isLoading}
            className={error ? "error" : ""}
          />
          {error && <div className="error-message">{error}</div>}
        </div>

        <button
          type="submit"
          disabled={isLoading || !flightNumber.trim()}
          className="submit-button"
        >
          {isLoading ? "Adding..." : "Add Flight"}
        </button>
      </form>
    </div>
  );
};

export default NewFlightForm;
