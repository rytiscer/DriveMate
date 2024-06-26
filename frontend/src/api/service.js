import api from "./api";

export const fetchServices = async () => {
  const response = await api.get("/services");
  return response.data;
};

export const createService = async (newService) => {
  const response = await api.post("/services", newService);
  return response.data;
};

export const deleteService = async (serviceId) => {
  try {
    await api.delete(`/services/${serviceId}`);
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};

export const updateService = async (serviceId, updatedService) => {
  try {
    await api.put(`/services/${serviceId}`, updatedService);
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

export const getServiceById = async (serviceId) => {
  try {
    const response = await api.get(`/services/${serviceId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching service by ID:", error);
    throw error;
  }
};
