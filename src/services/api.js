import axios from "axios";

const api = axios.create({
    baseURL: "/api/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "x-api-key": "Ey9463b13yjs8tInHPn3STMcojwYJzwW5I63EsRR"
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
        
        console.log('API Response: ', response)
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