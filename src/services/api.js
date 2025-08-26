import axios from "axios";

const api = axios.create({
    baseURL: "/api/",
    timeout: 50000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "x-api-key": import.meta.env.VITE_SERVER_API_KEY
    },
})

api.interceptors.request.use(
    (config) => {
        // Authorization header is set dynamically by AuthProvider
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // Handle authentication errors
            if (error.response.status === 401) {
                console.warn("Authentication token expired or invalid");
                // The AuthProvider will handle token refresh
            }
        }
        return Promise.reject(error);
    }
);

export default api;