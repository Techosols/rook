import axios from "axios";

const createFileServiceApi = (token) => {
    if (!token) {
        throw new Error("No auth token provided to FileServiceApi");
    }
    const instance = axios.create({
        baseURL: (import.meta.env.PROD || import.meta.env.VITE_USE_PRODUCTION_API === 'true' ? import.meta.env.VITE_SERVER_PRIVATE_FILE_API_URL : '/fileApi/'),
        timeout: 50000,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    instance.interceptors.request.use(
        async (config) => {
            config.headers["Authorization"] = `Bearer ${token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
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

    return instance;
};

export default createFileServiceApi;