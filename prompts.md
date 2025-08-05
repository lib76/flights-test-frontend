# AI Prompts Used in Flight Tracker Development

This document contains all the AI prompts used during the development of the Flight Tracker application.

## 1. Create Boilerplate of This Project

Create a React TypeScript boilerplate project referred to as flights-test-frontend with the following specifications:

Requirements:

- Framework: React 18+ with TypeScript
- Build Tool: Vite
- Clean, minimal boilerplate without domain-specific code
- Health check endpoint integration (/health)
- Error handling for API communication
- TypeScript strict mode enabled
- ESLint and Prettier configuration
- README with setup instructions

## 2. Create Flight Status Enum

create and use enums

export enum FlightStatus {
AWAITING = 'AWAITING',
DEPARTED = 'DEPARTED',
ARRIVED = 'ARRIVED',
}

## 3. Flight Tracking Interface Enhancement

Enhance my existing React app to implement a flight tracking interface that connects to the backend at the following endpoints:

- `GET /flights` → List all tracked flights
- `POST /flights` → Add a new flight to track
- `DELETE /flights/:id` → Delete a flight by ID
- `POST /flights/refresh` → Refresh the status of all tracked flights

🔧 Functional Requirements:

1. ✅ **Flight List Component**

   - Display a list of tracked flights with:
     - `flightNumber`
     - `status` (AWAITING, DEPARTED, ARRIVED)
     - `actualDepartureTime`, `actualArrivalTime`
     - A "Delete" button to remove a flight

2. ✅ **New Flight Form**

   - Input for `flightNumber`
   - Button to submit and call `POST /flights`
   - On success, update the local list

3. ✅ **Refresh All Button**

   - Calls `POST /flights/refresh`
   - On success, fetches updated flight list

4. ✅ **LocalStorage Sync**

   - Persist the flight list in `localStorage`
   - On app load, first try to use `localStorage`, then sync with backend
   - Keep `localStorage` updated when list changes

5. ✅ **API Abstraction**

   - Create a reusable `api.ts` file that exports:
     - `getFlights()`
     - `createFlight(flightNumber: string)`
     - `deleteFlight(id: string)`
     - `refreshFlights()`

6. 🧪 Add basic error handling for all calls

## 4. Flight Tracking App Styling

Transform the current UI to look like a professional flight tracking application used by airlines and aviation companies.

## 5. Axios Implementation

Migrate the current fetch-based API service to use axios for HTTP requests.

---
