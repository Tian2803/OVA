// /frontend/src/services/userService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const createUser = (user) => {
  return axios.post(API_URL, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getUsers = () => {
  return axios.get(API_URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getUserById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${id}`, config);
  return response.data;
};

const updateUser = async (id, userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/${id}`, userData, config);
  return response.data;
};

const getUserCourses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/my-courses`, config);
  return response.data;
};

const userService = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  getUserCourses,
};

export default userService;
