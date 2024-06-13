import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/login";

const login = async (email, password) => {
  const response = await axios.post(API_URL, { email, password });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;
