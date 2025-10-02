import axios from "axios";

const createPrivateApi = (token) => {
    if (!token) {
        throw new Error("No auth token provided to PrivateApi");
    }
    const instance = axios.create({
        baseURL: (import.meta.env.PROD || import.meta.env.VITE_USE_PRODUCTION_API === 'true' ? import.meta.env.VITE_SERVER_PRIVATE_API_URL : '/authApi/'),
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
                    if(typeof window !== 'undefined' && window.openGlobalModel) {
                        window.openGlobalModel({for: 'invalidToken'})
                    }
                }   
            }
            return Promise.reject(error);
        }
    );
``
    return instance;
};

export default createPrivateApi;