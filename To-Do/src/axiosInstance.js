import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks"; 

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
