import axios from "axios";
import { API } from "./consts";

const api = axios.create({
  baseURL: API,
});

// Pridėti interceptorių, kad kiekvieną užklausą būtų siunčiamas JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Gauti JWT iš localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Pridėti JWT prie užklausos antraštės
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
