// src/utils/axios.ts

import axios from "axios";

const API_BASE_URL = "/api";

// Create Axios Instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Handle API Errors Globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error(
        "API Error: service unreachable. Ensure Next app and backend API are running.",
      );
    } else {
      console.error("API Error:", error.response.data || error.message);
    }
    return Promise.reject(error);
  },
);

export default api;
