import axios from "axios";

export const axiosWithCreds = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  withCredentials: true,
});

export const axiosWithoutCreds = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});
