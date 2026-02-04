import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth API
export const authAPI = {
  register: (email: string, password: string) =>
    api.post('/api/auth/register', { email, password }),
  
  login: (email: string, password: string) =>
    api.post('/api/auth/login', { email, password }),
  
  getMe: () => api.get('/api/auth/me'),
};

// Profile API
export const profileAPI = {
  create: (data: any) => api.post('/api/profile', data),
  get: () => api.get('/api/profile'),
  update: (data: any) => api.put('/api/profile', data),
};

// Course API
export const courseAPI = {
  getAll: (params?: any) => api.get('/api/courses', { params }),
  getById: (id: string) => api.get(`/api/courses/${id}`),
};

// Enrollment API
export const enrollmentAPI = {
  enroll: (courseId: string) => api.post('/api/enrollments', { course_id: courseId }),
  getAll: () => api.get('/api/enrollments'),
  checkStatus: (courseId: string) => api.get(`/api/enrollments/${courseId}/status`),
};

// Quiz API
export const quizAPI = {
  getByCourse: (courseId: string) => api.get(`/api/quizzes/course/${courseId}`),
  getById: (id: string) => api.get(`/api/quizzes/${id}`),
  submit: (id: string, answers: number[]) => 
    api.post(`/api/quizzes/${id}/attempt`, { quiz_id: id, answers }),
  getResults: () => api.get('/api/quizzes/results'),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get('/api/dashboard'),
};
