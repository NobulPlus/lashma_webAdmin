import axios from "axios";

const API_URL = "https://lashma-server.onrender.com/api/agents"; // Update with your backend URL

// Create a new agent
export const createAgent = async (agentData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(API_URL, agentData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get all agents
export const getAllAgents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get a single agent by ID
export const getAgentById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Update an agent
export const updateAgent = async (id, agentData) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`${API_URL}/${id}`, agentData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Delete an agent
export const deleteAgent = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};