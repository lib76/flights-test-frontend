// API Configuration
export const API_CONFIG = {
  // Base URL for API requests
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",

  // API endpoints
  ENDPOINTS: {
    HEALTH: "/health",
    FLIGHTS: "/flights",
    REFRESH_FLIGHTS: "/flights/refresh",
  },

  // Request timeout (in milliseconds)
  TIMEOUT: 10000,

  // Retry configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000,
  },
} as const;

// Helper function to build full API URL
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
