import api from "./api";

export const fetchOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

export const createOrder = async (newOrder) => {
  const response = await api.post("/orders", newOrder);
  return response.data;
};

export const deleteOrder = async (orderId) => {
  try {
    await api.delete(`/orders/${orderId}`);
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

export const updateOrder = async (orderId, updatedOrder) => {
  try {
    await api.put(`/orders/${orderId}`, updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    throw error;
  }
};
