// src/services/privateApi.js
import axios from "axios";

const createPrivateApi = (token) => {
  if (!token) {
    throw new Error("No auth token provided to PrivateApi");
  }
  console.log(token)
  const instance = axios.create({
    baseURL:
      import.meta.env.PROD || import.meta.env.VITE_USE_PRODUCTION_API === "true"
        ? import.meta.env.VITE_SERVER_PRIVATE_API_URL
        : "/authApi/",
    timeout: 50000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // ✅ Always inject latest token dynamically
  instance.interceptors.request.use(
    async (config) => {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Request Method", config.method)
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.warn("Session expired or invalid. Please log in again.");
        if (typeof window !== "undefined" && window.openGlobalModel) {
          window.openGlobalModel({ for: "invalidToken" });
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createPrivateApi;
