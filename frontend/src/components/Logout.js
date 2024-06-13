// /frontend/src/components/Logout.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user"); // Eliminar el usuario del almacenamiento local
    navigate("/login"); // Redirigir a la página de login
  }, [navigate]);

  return null; // No necesitamos renderizar nada
};

export default Logout;
