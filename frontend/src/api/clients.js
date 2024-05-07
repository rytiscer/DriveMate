import axios from "axios";
import { API } from "./consts";

export const fetchClients = async () => {
  const response = await axios.get(`${API}/clients`);
  return response.data;
};

export const createClient = async (newClient) => {
  const response = await axios.post(`${API}/clients`, newClient);
  return response.data;
};

export const deleteClient = async (clientId) => {
  try {
    await axios.delete(`${API}/clients/${clientId}`);
    console.log("Client deleted successfully!");
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
};

export const editClient = async (clientId, updatedClient) => {
  try {
    await axios.put(`${API}/clients/${clientId}`, updatedClient);
    console.log("Client updated successfully!");
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
};

export const getClientById = async (clientId) => {
  try {
    const response = await axios.get(`${API}/clients/${clientId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching client by ID:", error);
    throw error;
  }
};
