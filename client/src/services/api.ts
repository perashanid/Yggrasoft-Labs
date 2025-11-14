import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL } from '../utils/constants';
import type {
  ApiResponse,
  Domain,
  ContactFormData,
  NewsletterSubscription,
  Settings,
} from '../types';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// API Functions

// Get all domains
export const getDomains = async (): Promise<Domain[]> => {
  const response = await apiClient.get<ApiResponse<Domain[]>>('/domains');
  return response.data.data || [];
};

// Get single domain
export const getDomainById = async (id: string): Promise<Domain> => {
  const response = await apiClient.get<ApiResponse<Domain>>(`/domains/${id}`);
  return response.data.data!;
};

// Submit contact form
export const submitContact = async (data: ContactFormData): Promise<ApiResponse<any>> => {
  const response = await apiClient.post<ApiResponse<any>>('/contacts', data);
  return response.data;
};

// Subscribe to newsletter
export const subscribeNewsletter = async (
  data: NewsletterSubscription
): Promise<ApiResponse<any>> => {
  const response = await apiClient.post<ApiResponse<any>>('/newsletter/subscribe', data);
  return response.data;
};

// Get site settings
export const getSettings = async (): Promise<Settings> => {
  const response = await apiClient.get<ApiResponse<Settings>>('/settings');
  return response.data.data!;
};

export default apiClient;
