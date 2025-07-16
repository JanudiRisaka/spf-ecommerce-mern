// ----------------- START OF CORRECTED userApi.ts -----------------

import axios from 'axios';
import { User } from '@/types';

const API_URL = '/api/v1/users';

// --- For Admin Panel ---
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


// --- For User Profile Page (for the currently logged-in user) ---
export const getMyProfile = async (token: string): Promise<User> => {
  try {
    // This calls GET /api/v1/users/profile
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.user;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error;
  }
};

export const updateMyProfile = async (profileData: Partial<User>, token: string): Promise<User> => {
  try {
    // This calls PUT /api/v1/users/profile
    const response = await axios.put(`${API_URL}/profile`, profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.user;
  } catch (error) {
    console.error("Failed to update user profile:", error);
    throw error;
  }
};

// ----------------- END OF CORRECTED userApi.ts -----------------