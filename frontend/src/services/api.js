import axios from "axios";

const api = axios.create({
  baseURL: "https://gigflow-backend-b9fu.onrender.com/api",
  withCredentials: true,
});

// Add token to every request
api.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user) {
    const parsedUser = JSON.parse(user);
    if (parsedUser.token) {
      config.headers.Authorization = `Bearer ${parsedUser.token}`;
    }
  }
  return config;
});

export default api;
