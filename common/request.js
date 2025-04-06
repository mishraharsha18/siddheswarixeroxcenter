import axios from 'axios';

// Create Axios instance with base configuration
const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api', // Use the base URL from .env or direct value
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add Axios interceptor to include the token
apiClient.interceptors.request.use(
    (config) => {
        // Get the token from localStorage
        const token = localStorage.getItem('authToken');
        if (token) {
            // Add Authorization header with the token
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

/**
 * Common API Call Function
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param {string} path - API endpoint path (relative to baseURL)
 * @param {object} [data] - Request body (for POST, PUT, etc.)
 * @param {object} [params] - Query parameters
 */
export const apiCall = async (method, path, data = {}, params = {}) => {
    try {
        const response = await apiClient({
            method,
            url: path,
            data,
            params,
        });
        return response.data;
    } catch (error) {
        console.error('API Call Error:', error.response || error.message);
        throw error.response ? error.response.data : error;
    }
};
