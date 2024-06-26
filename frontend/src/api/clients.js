import api from "./api";

export const fetchClients = async () => {
  const response = await api.get("/clients");
  return response.data;
};

export const createClient = async (newClient) => {
  const response = await api.post("/clients", newClient);
  return response.data;
};

export const deleteClient = async (clientId) => {
  try {
    await api.delete(`/clients/${clientId}`);
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
};
export const updateClientCar = async (clientId, carId) => {
  try {
    await api.put(`/clients/${clientId}/update-car`, { carId });
  } catch (error) {
    console.error("Error updating client car:", error);
    throw error;
  }
};

export const updateClient = async (clientId, updatedClient) => {
  try {
    await api.put(`/clients/${clientId}`, updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
};

export const getClientById = async (clientId) => {
  try {
    const response = await api.get(`/clients/${clientId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching client by ID:", error);
    throw error;
  }
};
