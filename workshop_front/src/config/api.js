// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    GET_USER: `${API_BASE_URL}/auth/user`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  },
  
  // Users
  USERS: {
    BASE: `${API_BASE_URL}/users`,
    BY_ID: (id) => `${API_BASE_URL}/users/${id}`,
    BY_ROLE: (roleId) => `${API_BASE_URL}/users/role/${roleId}`,
  },
  
  // Warehouses
  WAREHOUSES: {
    BASE: `${API_BASE_URL}/warehouses`,
    BY_ID: (id) => `${API_BASE_URL}/warehouses/${id}`,
    ACTIVE: `${API_BASE_URL}/warehouses/active`,
    WITH_RENTALS: (id) => `${API_BASE_URL}/warehouses/${id}/rentals`,
  },
  
  // Companies
  COMPANIES: {
    BASE: `${API_BASE_URL}/companies`,
    BY_ID: (id) => `${API_BASE_URL}/companies/${id}`,
  },
  
  // Rentals
  RENTALS: {
    BASE: `${API_BASE_URL}/rentals`,
    BY_ID: (id) => `${API_BASE_URL}/rentals/${id}`,
    BY_COMPANY: (companyId) => `${API_BASE_URL}/rentals/company/${companyId}`,
    CANCEL: (id) => `${API_BASE_URL}/rentals/${id}/cancel`,
  },
  
  // Employees
  EMPLOYEES: {
    BASE: `${API_BASE_URL}/employees`,
    BY_ID: (id) => `${API_BASE_URL}/employees/${id}`,
    ACTIVE: `${API_BASE_URL}/employees/active`,
  },
  
  // CIM
  CIM: {
    BASE: `${API_BASE_URL}/cim`,
    BY_ID: (id) => `${API_BASE_URL}/cim/${id}`,
  },
};

// Helper function to get authorization header
export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Helper function for API calls
export const apiCall = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
      ...options.headers,
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

export default API_BASE_URL;
