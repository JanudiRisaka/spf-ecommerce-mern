import axios from 'axios';
import { IInquiry } from '@/types';

const API_URL = '/api/v1/inquiries';

export const getInquiries = async (token: string): Promise<IInquiry[]> => {
  const response = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
  return response.data.inquiries || [];
};

export const updateInquiryStatus = async (inquiryId: string, status: string, token: string): Promise<IInquiry> => {
  const response = await axios.put(`${API_URL}/${inquiryId}/status`, { status }, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};