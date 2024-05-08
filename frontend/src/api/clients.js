import api from "./api"; // Importuojame jūsų sukurta api instanciją

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
    console.log("Client deleted successfully!");
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
};

export const editClient = async (clientId, updatedClient) => {
  try {
    await api.put(`/clients/${clientId}`, updatedClient);
    console.log("Client updated successfully!");
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
