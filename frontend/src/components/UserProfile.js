// /frontend/src/components/UserProfile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(
        `http://localhost:5000/api/users/${storedUser.user._id}`
      );
      setUser({
        ...response.data,
        password: "",
        confirmPassword: "",
      });
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      const updatedUser = { ...user };
      delete updatedUser.confirmPassword;
      await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        updatedUser
      );
      setMessage("Información actualizada correctamente");
    } catch (err) {
      setError("Error al actualizar la información");
    }
  };

  return (
    <Container fluid className="d-flex">
      <Container className="p-4">
        <h2>Actualizar Información del Usuario</h2>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={user.name || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleChange}
              required
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={user.password || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={user.confirmPassword || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Actualizar
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default UserProfile;
