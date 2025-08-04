// API service for backend communication
const API_BASE_URL = "http://localhost:3000";

export interface ApiResponse {
  status: string;
  timestamp: string;
  uptime: number;
}

export interface ApiError {
  error: string;
  message: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Generic GET request
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`API Response from ${endpoint}:`, data); // Debug log
    return data;
  }

  // Generic POST request
  async post<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Health check endpoint
  async healthCheck(): Promise<ApiResponse> {
    return this.get<ApiResponse>("/health");
  }

  // Example method for testing connection
  async testConnection(): Promise<boolean> {
    try {
      await this.healthCheck();
      return true;
    } catch (error) {
      console.error("Backend connection failed:", error);
      return false;
    }
  }
}

// Export a singleton instance
export const apiService = new ApiService();

// Export the class for testing or custom instances
export default ApiService;
