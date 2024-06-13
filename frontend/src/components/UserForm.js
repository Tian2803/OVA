// /frontend/src/components/UserForm.js
import React, { useState } from "react";
import userService from "../services/userService";

const UserForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    level: "Principiante",
    courses: [{ code: "", professor: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.createUser(user);
      alert("Usuario creado exitosamente");
      setUser({
        name: "",
        email: "",
        password: "",
        level: "Principiante",
        courses: [{ code: "", professor: "" }],
      });
    } catch (error) {
      alert("Error al crear el usuario");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Correo:</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Nivel:</label>
        <select name="level" value={user.level} onChange={handleChange}>
          <option value="Principiante">Principiante</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Experto">Experto</option>
        </select>
      </div>
      <div>
        <label>Cursos:</label>
        {user.courses.map((course, index) => (
          <div key={index}>
            <input
              type="text"
              name="code"
              placeholder="Código del curso"
              value={course.code}
              onChange={(e) => {
                const newCourses = [...user.courses];
                newCourses[index].code = e.target.value;
                setUser({ ...user, courses: newCourses });
              }}
              required
            />
            <input
              type="text"
              name="professor"
              placeholder="Profesor"
              value={course.professor}
              onChange={(e) => {
                const newCourses = [...user.courses];
                newCourses[index].professor = e.target.value;
                setUser({ ...user, courses: newCourses });
              }}
              required
            />
          </div>
        ))}
      </div>
      <button type="submit">Crear Usuario</button>
    </form>
  );
};

export default UserForm;
