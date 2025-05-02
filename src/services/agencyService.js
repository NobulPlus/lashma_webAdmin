import axios from "axios";

const API_URL = "http://localhost:5000/api/agencies"; // Update with your backend URL

// Create a new agency
export const createAgency = async (agencyData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(API_URL, agencyData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get all agencies
export const getAllAgencies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get a single agency by ID
export const getAgencyById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Update an agency (placeholder, as backend doesn't have this endpoint yet)
export const updateAgency = async (id, agencyData) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`${API_URL}/${id}`, agencyData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Delete an agency
export const deleteAgency = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Bulk upload agencies via Excel file
export const bulkUploadAgencies = async (file) => {
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