import axios from "axios";

const API_URL = "https://lashma-server.onrender.com/api/providers"; // Update with your backend URL

// Create a new provider
export const createProvider = async (providerData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(API_URL, providerData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get all providers
export const getAllProviders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get a single provider by ID
export const getProviderById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Update a provider
export const updateProvider = async (id, providerData) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`${API_URL}/${id}`, providerData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Delete a provider
export const deleteProvider = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Bulk upload providers via Excel file
export const bulkUploadProviders = async (file) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${API_URL}/bulk-upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};