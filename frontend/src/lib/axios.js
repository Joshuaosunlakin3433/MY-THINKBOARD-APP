import axios from "axios";
import { auth } from "../config/firebase";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api/";

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const token = await currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error getting auth token:", error);
    }
    return config;
  }
);