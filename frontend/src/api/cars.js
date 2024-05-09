import api from "./api";

export const fetchCars = async () => {
  const response = await api.get("/cars"); // Pakeičiame axios.get() į api.get()
  return response.data;
};

export const createCar = async (newCar) => {
  const response = await api.post("/cars", newCar); // Pakeičiame axios.post() į api.post()
  return response.data;
};

export const deleteCar = async (carId) => {
  try {
    await api.delete(`/cars/${carId}`); // Pakeičiame axios.delete() į api.delete()
    console.log("Car deleted successfully!");
  } catch (error) {
    console.error("Error deleting car:", error);
    throw error;
  }
};

export const updateCar = async (carId, updatedCar) => {
  try {
    await api.put(`/cars/${carId}`, updatedCar); // Pakeičiame axios.put() į api.put()
    console.log("Car updated successfully!");
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
