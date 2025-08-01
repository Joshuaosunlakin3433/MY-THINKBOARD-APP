import axios from "axios";

//in production there's nothing called local host
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api":"/api/"
export const api = axios.create({
    baseURL: BASE_URL
})