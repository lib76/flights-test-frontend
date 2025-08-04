# React Boilerplate

A basic React application built with Vite and TypeScript, ready for development with backend communication.

## Features

- ⚡️ **Fast Development** - Built with Vite for instant hot module replacement
- 🎯 **TypeScript** - Full TypeScript support for better development experience
- 🔗 **Backend Ready** - Configured to communicate with backend at `localhost:3000`
- 🎨 **Modern UI** - Clean, responsive design with glassmorphism effects
- 📦 **API Service** - Organized API communication with reusable service class

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

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

The application is configured to communicate with a backend server running on `localhost:3000`. Make sure your backend server is running and has a health check endpoint at `/health`.

Expected backend response format:

```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

## Project Structure

```
src/
├── App.tsx              # Main application component
├── App.css              # Main application styles
├── main.tsx             # Application entry point
├── index.css            # Global styles
├── services/
│   └── api.ts          # API service for backend communication
└── assets/             # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customization

### Adding New API Endpoints

1. Open `src/services/api.ts`
2. Add new methods to the `ApiService` class
3. Import and use the service in your components

Example:

```typescript
// In api.ts
async getUsers(): Promise<User[]> {
  return this.get<User[]>('/api/users')
}

// In your component
const users = await apiService.getUsers()
```

### Adding New Components

1. Create new components in the `src` directory
2. Import and use them in `App.tsx` or other components
3. Add corresponding CSS files if needed

## Development

This is a basic boilerplate designed to be easily customizable. The main areas to modify are:

- `src/App.tsx` - Main application logic
- `src/App.css` - Main application styles
- `src/services/api.ts` - Backend communication
- `src/components/` - Add new components here

## Backend Requirements

Your backend should implement:

1. **Health Check Endpoint**: `GET /health`

   - Returns: `{ status: string, timestamp: string, uptime: number }`

2. **CORS Configuration**: Allow requests from `http://localhost:5173`

3. **Error Handling**: Proper HTTP status codes and error messages

## License

MIT
