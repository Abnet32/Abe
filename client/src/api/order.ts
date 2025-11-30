// src/api/order.ts
import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

export interface CreateOrderData {
  customerId: string;
  vehicleId: string;
  employeeId: string;
  serviceIds: string[];
  description: string;
}

export interface UpdateStatusData {
  status: "Pending" | "In Progress" | "Completed" | "Canceled";
}

// GET all orders
export const getOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// CREATE new order
export const createOrder = async (data: CreateOrderData) => {
  const response = await axios.post(`${API_URL}/add`, data);
  return response.data;
};

// UPDATE order status
export const updateOrderStatus = async (id: string, data: UpdateStatusData) => {
  const response = await axios.put(`${API_URL}/${id}/status`, data);
  return response.data;
};

// DELETE order
export const deleteOrder = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
