import React, { useState } from "react";
import userService from "../services/userService";

const ProfessorForm = () => {
  const [professor, setProfessor] = useState({
    name: "",
    email: "",
    password: "",
    role: "profesor",
    isApproved: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfessor({ ...professor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.createUser(professor);
      alert("Profesor registrado exitosamente. Esperando aprobación.");
      setProfessor({
        name: "",
        email: "",
        password: "",
        role: "profesor",
        isApproved: false,
      });
    } catch (error) {
      alert("Error al registrar el profesor");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={professor.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Correo:</label>
        <input
          type="email"
          name="email"
          value={professor.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={professor.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Registrar Profesor</button>
    </form>
  );
};

export default ProfessorForm;
