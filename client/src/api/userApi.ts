import axios from 'axios';
import { User, IUserProfile } from '@/types';

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

// This function will delete a user by their ID
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

// Get current user's profile (for user-side profile page)
export const getUserProfile = async (token: string): Promise<IUserProfile> => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.user;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error;
  }
};

// Update current user's profile
export const updateUserProfile = async (data: Partial<IUserProfile>, token: string): Promise<IUserProfile> => {
  try {
    const response = await axios.put(`${API_URL}/me`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.user;
  } catch (error) {
    console.error("Failed to update user profile:", error);
    throw error;
  }
};

export const deleteUserAccount = async (userId: string) => {
  try {
    await axios.delete(`/api/v1/users/${userId}`);
  } catch (error) {
    console.error('Error deleting user account:', error);
    throw error;
  }
};
