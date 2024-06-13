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

// Obtener los cursos en los que el usuario está inscrito
const getUserCourses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/my-courses`, config);
  return response.data;
};

// Obtener los cursos creados por el profesor
const getCreatedCourses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/created-courses`, config);
  return response.data;
};

const userService = {
  createUser,
  getUsers,
  getUserCourses,
  getCreatedCourses,
};

export default userService;
