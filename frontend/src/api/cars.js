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
