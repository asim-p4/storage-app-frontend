import axios from "axios";

const BASE_URL = "https://smart-storage-sys.onrender.com";

export const axiosWithCreds = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosWithoutCreds = axios.create({
  baseURL: BASE_URL,
});
