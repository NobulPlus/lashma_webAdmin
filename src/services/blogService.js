import axios from "axios";

const API_URL = "http://localhost:5000/api/blogs"; // Update with your backend URL

export const createBlog = async (blogData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(API_URL, blogData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getAllBlogs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getBlogById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateBlog = async (id, blogData) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`${API_URL}/${id}`, blogData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteBlog = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};