import axios from "axios";

// Determine base URL
const baseURL =
  import.meta.env.PROD ||
  import.meta.env.VITE_USE_PRODUCTION_API === "true"
    ? "/api/" // in production, /api is handled by Azure
    : "/api/"; // local proxy also forwards to localhost:7071

const api = axios.create({
  baseURL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

// Optional: request/response interceptors
api.interceptors.request.use(
  async (config) => {
    console.log('Request made with config:', config);   
    return config;
  },
  (error) => {
    console.error('Error fetching user external ID:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Authentication token expired or invalid");
    }
    return Promise.reject(error);
  }
);

export default api;
