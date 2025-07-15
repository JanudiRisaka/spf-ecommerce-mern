import axios from 'axios';
import { User } from '@/types'; // Use the User type we already defined

const API_URL = '/api/v1/users';

// This function will fetch all users for the admin panel
export const getUsers = async (token: string): Promise<User[]> => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.users || [];
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

// This function will delete a user
export const deleteUser = async (userId: string, token: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw error;
  }
};