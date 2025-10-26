import axios from 'axios';
const PROBLEM_URL = import.meta.env.VITE_API_BASE_PROBLEM || ""
const USER_URL = import.meta.env.VITE_API_USER || ""


const apiClient = axios.create({
  baseURL: PROBLEM_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Add a request interceptor to automatically attach the JWT token
 * to the Authorization header if it exists in localStorage.
 */
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from localStorage (or your preferred storage)
    const token = localStorage.getItem('jwtToken'); 
    
    if (token) {
      // If the token exists, add it to the headers
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default apiClient;
