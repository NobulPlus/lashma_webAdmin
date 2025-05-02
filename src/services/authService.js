import axios from "axios";

const API_URL = "https://lashma-server.onrender.com/api/auth"; // Update with your backend URL

export const register = async (adminData) => {
  const response = await axios.post(`${API_URL}/register`, adminData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token); // Store JWT
    localStorage.setItem("role", response.data.role); // Store role
  }
  return response.data;
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};