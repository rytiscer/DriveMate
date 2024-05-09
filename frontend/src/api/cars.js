import api from "./api";

// export const fetchCars = async () => {
//   const response = await axios.get(`${API}/cars`);
//   return await response.data;
// };

// export const createCar = async (newCar) => {
//   const response = await axios.post(`${API}/cars`, newCar);
//   return response.data;
// };

// export const deleteCar = async (carId) => {
//   try {
//     await axios.delete(`${API}/cars/${carId}`);
//     console.log("Car deleted successfully!");
//   } catch (error) {
//     console.error("Error deleting car:", error);
//     throw error;
//   }
// };

// export const editCar = async (carId, updatedCar) => {
//   try {
//     await axios.put(`${API}/cars/${carId}`, updatedCar);
//     console.log("Car updated successfully!");
//   } catch (error) {
//     console.error("Error updating car:", error);
//     throw error;
//   }
// };

// export const getCarById = async (carId) => {
//   try {
//     const response = await axios.get(`${API}/cars/${carId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching car by ID:", error);
//     throw error;
//   }
// };

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

export const editCar = async (carId, updatedCar) => {
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
