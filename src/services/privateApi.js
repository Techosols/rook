import axios from "axios";

const token = localStorage.getItem('RKT');

const PrivateApi = axios.create({
    baseURL: (import.meta.env.PROD || import.meta.env.VITE_USE_PRODUCTION_API === 'true' ? import.meta.env.VITE_SERVER_PRIVATE_API_URL : '/authApi/'),
    timeout: 50000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
    },
})

PrivateApi.interceptors.request.use(
    async (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

PrivateApi.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.warn("Authentication token expired or invalid");
                localStorage.removeItem('RKT');
                window.location.reload();
            }
        }   
        return Promise.reject(error);
    }
)

export default PrivateApi;