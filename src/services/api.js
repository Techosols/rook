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
        
        return config;
    },
    (error) => {
        console.log(error)
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    }
    , (error) => {
         
        if (error.response) {
            console.error("Response error:", error.response.data);
        } else if (error.request) {
            console.error("Request error:", error.request);
        } else {
            console.error("Error:", error.message);
        }
        return Promise.reject(error);
    }
);

export default api;