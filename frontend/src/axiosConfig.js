import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1", // Set your base API URL
  timeout: 10000, // Set timeout (optional)
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
    } finally {
      return config;
    }
  },
  (error) => {
    console.log(error);

    return Promise.reject(error);
  }
);
export default api;
