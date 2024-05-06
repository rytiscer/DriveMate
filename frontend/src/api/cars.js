import axios from "axios";
import { API } from "./consts";

export const fetchCars = async () => {
  const response = await axios.get(`${API}/cars`);
  return await response.data;
};

export const createCar = async (newCar) => {
  const response = await axios.post(`${API}/cars`, newCar);
  return response.data;
};

export const deleteCar = async (carId) => {
  try {
    await axios.delete(`${API}/cars/${carId}`);
    console.log("Car deleted successfully!");
  } catch (error) {
    console.error("Error deleting car:", error);
    throw error;
  }
};

export const editCar = async (carId, updatedCar) => {
  try {
    await axios.put(`${API}/cars/${carId}`, updatedCar);
    console.log("Car updated successfully!");
  } catch (error) {
    console.error("Error updating car:", error);
    throw error;
  }
};
