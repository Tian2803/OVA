// /frontend/src/services/courseService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/courses";

const createCourse = async (courseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, courseData, config);
  return response.data;
};

const getCourses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const getCourseById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${id}`, config);
  return response.data;
};

const updateCourse = async (id, courseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/${id}`, courseData, config);
  return response.data;
};

const deleteCourse = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

const joinCourse = async (code, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/join`, { code }, config);
  return response.data;
};

const addModulesToCourse = async (id, modules, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}/${id}/modules`,
    { modules },
    config
  );
  return response.data;
};

export {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  joinCourse,
  addModulesToCourse,
};
