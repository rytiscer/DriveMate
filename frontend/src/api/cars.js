import api from "./api";

export const fetchCars = async () => {
  const response = await api.get("/cars");
  return response.data;
};

export const createCar = async (newCar) => {
  const response = await api.post("/cars", newCar);
  return response.data;
};

export const deleteCar = async (carId) => {
  try {
    await api.delete(`/cars/${carId}`);
  } catch (error) {
    console.error("Error deleting car:", error);
    throw error;
  }
};

export const updateCar = async (carId, updatedCar) => {
  try {
    await api.put(`/cars/${carId}`, updatedCar);
  } catch (error) {
    console.error("Error updating car:", error);
    throw error;
  }
};

export const getCarById = async (carId) => {
  try {
    const response = await api.get(`/cars/${carId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching car by ID:", error);
    throw error;
  }
};
