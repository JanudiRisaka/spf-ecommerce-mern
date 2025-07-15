import axios from 'axios';
import { IOrder } from '@/types';

const API_URL = '/api/v1/orders';

export const getOrders = async (token: string): Promise<IOrder[]> => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.orders || [];
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId: string, status: string, token: string): Promise<IOrder> => {
  try {
    // Note: This endpoint will need to be created on the backend
    const response = await axios.put(`${API_URL}/${orderId}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update order status:", error);
    throw error;
  }
};