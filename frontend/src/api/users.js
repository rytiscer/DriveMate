import axios from "axios";
import { API } from "./consts";

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
    const token = response.data.token;
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const checkExistingUser = async (email) => {
  try {
    const response = await axios.get(`${API}/users/${email}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};
