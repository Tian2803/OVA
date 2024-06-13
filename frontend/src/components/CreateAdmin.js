// /frontend/src/components/CreateAdmin.js
import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";

const CreateAdmin = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const admin = JSON.parse(localStorage.getItem("user"));
      await axios.post("http://localhost:5000/api/admin/create-admin", user, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      setMessage("Administrador creado con éxito");
    } catch (err) {
      setError("Error al crear el administrador");
    }
  };

  return (
    <Container fluid className="d-flex">
      <Container className="p-4">
        <h2>Crear Administrador</h2>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Crear Administrador
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default CreateAdmin;
