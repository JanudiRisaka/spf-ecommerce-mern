import axios from 'axios';
import { IOrder } from '@/types';

const API_URL = '/api/v1/orders';

export const getOrders = async (token: string): Promise<IOrder[]> => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Expects backend to return { orders: [...] }
    return response.data.data || [];
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId: string, status: string, token: string): Promise<IOrder> => {
  try {
    const response = await axios.put(`${API_URL}/${orderId}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // --- THIS IS THE CHANGE ---
    // Now expects backend to return { order: {...} } for consistency
    return response.data.data;
  } catch (error) {
    console.error("Failed to update order status:", error);
    throw error;
  }
};

export const createOrder = async (orderData: any, token: string): Promise<IOrder> => {
  try {
    const response = await axios.post(API_URL, orderData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    // Expects backend to return { order: {...} }
    return response.data.data;
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error;
  }
};