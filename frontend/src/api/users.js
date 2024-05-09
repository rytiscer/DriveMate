import axios from "axios";
import { API } from "./consts";

// Funkcija, skirta registruoti naujus vartotojus
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    if (error.response) {
      console.error("Server responded with:", error.response.data);
    }
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API}/login`, userData);
    const token = response.data.token; // Gauti JWT iš atsakymo duomenų
    localStorage.setItem("token", token); // Išsaugoti JWT į localStorage
    return token;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
