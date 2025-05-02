import axios from "axios";

const API_URL = "https://lashma-server.onrender.com/api/pharmacies"; // Update with your backend URL

// Create a new pharmacy
export const createPharmacy = async (pharmacyData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(API_URL, pharmacyData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get all pharmacies
export const getAllPharmacies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get a single pharmacy by ID
export const getPharmacyById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Update a pharmacy
export const updatePharmacy = async (id, pharmacyData) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`${API_URL}/${id}`, pharmacyData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Delete a pharmacy
export const deletePharmacy = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Bulk upload pharmacies via Excel file
export const bulkUploadPharmacies = async (file) => {
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