import { API_CONFIG } from "../config/api";
import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";

export const FlightStatus = {
  AWAITING: "AWAITING",
  DEPARTED: "DEPARTED",
  ARRIVED: "ARRIVED",
} as const;

export type FlightStatusType = (typeof FlightStatus)[keyof typeof FlightStatus];

export interface ApiResponse {
  status: string;
  timestamp: string;
  uptime: number;
}

export interface ApiError {
  error: string;
  message: string;
}

// Flight interfaces
export interface Flight {
  id: string;
  flightNumber: string;
  status: FlightStatusType;
  actualDepartureTime?: string;
  actualArrivalTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FlightStats {
  totalFlights: number;
  awaitingCount: number;
  departedCount: number;
  arrivedCount: number;
}

export interface FlightsResponse {
  flights: Flight[];
  stats: FlightStats;
  count: number;
}

export interface CreateFlightRequest {
  flightNumber: string;
}

export interface CreateFlightResponse {
  flight: Flight;
  message: string;
}

export interface RefreshFlightsResponse {
  message: string;
  updatedCount: number;
}

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor for logging
    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log(
          `Making ${config.method?.toUpperCase()} request to: ${config.url}`
        );
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for logging
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`API Response from ${response.config.url}:`, response.data);
        return response;
      },
      (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  // Generic GET request
  async get<T>(endpoint: string): Promise<T> {
    const response = await this.axiosInstance.get<T>(endpoint);
    return response.data;
  }

  // Generic POST request
  async post<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
    const response = await this.axiosInstance.post<T>(endpoint, data);
    return response.data;
  }

  // Generic DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.axiosInstance.delete<T>(endpoint);
    return response.data;
  }

  // Health check endpoint
  async healthCheck(): Promise<ApiResponse> {
    return this.get<ApiResponse>(API_CONFIG.ENDPOINTS.HEALTH);
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

  // Flight tracking endpoints
  async getFlights(): Promise<FlightsResponse> {
    return this.get<FlightsResponse>(API_CONFIG.ENDPOINTS.FLIGHTS);
  }

  async createFlight(flightNumber: string): Promise<CreateFlightResponse> {
    return this.post<CreateFlightResponse>(API_CONFIG.ENDPOINTS.FLIGHTS, {
      flightNumber,
    });
  }

  async deleteFlight(id: string): Promise<{ message: string }> {
    return this.delete<{ message: string }>(
      `${API_CONFIG.ENDPOINTS.FLIGHTS}/${id}`
    );
  }

  async refreshFlights(): Promise<RefreshFlightsResponse> {
    return this.post<RefreshFlightsResponse>(
      API_CONFIG.ENDPOINTS.REFRESH_FLIGHTS,
      {}
    );
  }
}

// Export a singleton instance
export const apiService = new ApiService();

// Export the class for testing or custom instances
export default ApiService;
