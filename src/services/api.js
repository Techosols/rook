import axios from "axios";

const api = axios.create({
    baseURL: (import.meta.env.PROD || import.meta.env.VITE_USE_PRODUCTION_API === 'true' ? import.meta.env.VITE_SERVER_BASE_URL : '/api/'),
    timeout: 50000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "x-api-key": import.meta.env.VITE_SERVER_API_KEY
    },
})

api.interceptors.request.use(
    (config) => {
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
            if (error.response.status === 401) {
                console.warn("Authentication token expired or invalid");
            }
        }
        return Promise.reject(error);
    }
);

export default api;