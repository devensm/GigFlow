import axios from "axios";

const api = axios.create({
  baseURL: "https://gigflow-backend-b9fu.onrender.com/api",
  withCredentials: true,
});

export default api;
