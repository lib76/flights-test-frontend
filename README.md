# Flight Tracker

A React application for tracking flights in real-time, built with Vite and TypeScript.

## Features

- ⚡️ **Fast Development** - Built with Vite for instant hot module replacement
- 🎯 **TypeScript** - Full TypeScript support for better development experience
- 🔗 **Backend Ready** - Configured to communicate with backend at `localhost:3000`
- 🎨 **Modern UI** - Clean, responsive design with glassmorphism effects
- 📦 **Flight Tracking** - Complete flight management system
- 💾 **LocalStorage Sync** - Persists flight data locally
- 🔄 **Real-time Updates** - Refresh flight status from backend

## Flight Tracking Features

### ✅ **Flight List Component**

- Display all tracked flights with flight number, status, and timestamps
- Color-coded status badges (AWAITING, DEPARTED, ARRIVED)
- Delete individual flights
- Responsive grid layout

### ✅ **New Flight Form**

- Add new flights to track
- Input validation for flight numbers
- Real-time form feedback

### ✅ **Refresh All Button**

- Update status of all tracked flights
- Sync with backend data

### ✅ **LocalStorage Integration**

- Persist flight list between sessions
- Automatic sync with backend on connection
- Fallback to cached data when offline

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Backend server running on `localhost:3000`

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Backend Connection

The application is configured to communicate with a backend server running on `localhost:3000`. The API URL can be customized using environment variables. Make sure your backend server is running and has the required endpoints.

## API Endpoints

### Health Check

- **GET** `/health` - Backend health status

Expected response:

```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

### Flight Management

- **GET** `/flights` - List all tracked flights
- **POST** `/flights` - Add a new flight to track
- **DELETE** `/flights/:id` - Delete a flight by ID
- **POST** `/flights/refresh` - Refresh status of all flights

### Flight Data Structure

```typescript
const FlightStatus = {
  AWAITING: "AWAITING",
  DEPARTED: "DEPARTED",
  ARRIVED: "ARRIVED",
} as const;

type FlightStatusType = (typeof FlightStatus)[keyof typeof FlightStatus];

interface Flight {
  id: string;
  flightNumber: string;
  status: FlightStatusType;
  actualDepartureTime?: string;
  actualArrivalTime?: string;
  createdAt: string;
  updatedAt: string;
}
```

## Project Structure

```
src/
├── App.tsx                    # Main application component
├── App.css                    # Main application styles
├── main.tsx                   # Application entry point
├── index.css                  # Global styles
├── config/
│   └── api.ts                # API configuration and endpoints
├── services/
│   └── api.ts                # API service for backend communication
└── components/
    ├── FlightList.tsx        # Flight list display component
    └── NewFlightForm.tsx     # Add new flight form
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

### Adding Flights

1. Enter a flight number in the "Add New Flight" form
2. Click "Add Flight" to submit
3. The flight will appear in the tracked flights list

### Managing Flights

- **View Status**: Each flight shows its current status with color-coded badges
- **Delete Flight**: Click the "Delete" button on any flight card
- **Refresh All**: Click "Refresh All Flights" to update all flight statuses

### LocalStorage

- Flight data is automatically saved to localStorage
- App loads cached data on startup, then syncs with backend
- Works offline with cached data

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3000

# Optional: Other environment variables
VITE_APP_NAME=Flight Tracker
VITE_DEBUG_MODE=true
```

### API Configuration

The app uses a centralized configuration system in `src/config/api.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  ENDPOINTS: {
    HEALTH: "/health",
    FLIGHTS: "/flights",
    REFRESH_FLIGHTS: "/flights/refresh",
  },
  TIMEOUT: 10000,
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000,
  },
};
```

## Backend Requirements

Your backend should implement:

1. **Health Check Endpoint**: `GET /health`

   - Returns: `{ status: string, timestamp: string, uptime: number }`

2. **Flight Endpoints**:

   - `GET /flights` - Returns array of Flight objects
   - `POST /flights` - Accepts `{ flightNumber: string }`
   - `DELETE /flights/:id` - Deletes flight by ID
   - `POST /flights/refresh` - Refreshes all flight statuses

3. **CORS Configuration**: Allow requests from `http://localhost:5173`

4. **Error Handling**: Proper HTTP status codes and error messages

## Development

### Adding New API Endpoints

1. Add the endpoint to `src/config/api.ts` in the `ENDPOINTS` object
2. Add the method to `src/services/api.ts` in the `ApiService` class
3. Import and use the service in your components

### Adding New Components

1. Create new components in the `src/components` directory
2. Import and use them in `App.tsx` or other components
3. Add corresponding CSS classes if needed

## Error Handling

The application includes comprehensive error handling:

- Backend connection failures
- API request errors
- Form validation errors
- LocalStorage errors
- Network timeouts

All errors are displayed to the user with dismissible error messages.
