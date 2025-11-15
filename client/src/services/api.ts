import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Request interceptor for auth
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);

// Cached GET request
export const cachedGet = async <T = any>(url: string, forceRefresh = false): Promise<T> => {
  const cacheKey = url;
  const cached = cache.get(cacheKey);
  
  if (!forceRefresh && cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const response = await api.get<T>(url);
  cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
  
  return response.data;
};

// Clear cache for specific pattern
export const clearCache = (pattern?: string) => {
  if (pattern) {
    Array.from(cache.keys()).forEach((key) => {
      if (key.includes(pattern)) {
        cache.delete(key);
      }
    });
  } else {
    cache.clear();
  }
};

// API Functions
export const getSettings = async () => {
  return cachedGet('/settings');
};

export const getDomains = async () => {
  return cachedGet('/domains');
};

export const getProjects = async () => {
  return cachedGet('/projects');
};

export const submitContact = async (data: any) => {
  const response = await api.post('/contacts', data);
  return response.data;
};

export const subscribeNewsletter = async (email: string) => {
  const response = await api.post('/newsletter/subscribe', { email });
  return response.data;
};

export default api;
