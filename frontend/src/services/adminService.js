// /frontend/src/services/adminService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

const fetchProfessors = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/professors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      "Error al obtener los profesores. Por favor, inténtalo de nuevo más tarde."
    );
  }
};

const getUnapprovedProfessors = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/unapproved-professors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      "Error al obtener los profesores no aprobados. Por favor, inténtalo de nuevo más tarde."
    );
  }
};

const approveProfessor = async (id, token) => {
  try {
    await axios.put(
      `${API_URL}/approve-professor/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw new Error("Error al aprobar el profesor");
  }
};

export { fetchProfessors, getUnapprovedProfessors, approveProfessor };
