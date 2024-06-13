// /frontend/src/components/UserProfile.js
import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import userService from "../services/userService";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const userData = await userService.getUserById(
          storedUser.user._id,
          storedUser.token
        );
        setUser(userData);
        setName(userData.name);
        setEmail(userData.email);
      } catch (err) {
        setError(
          "Error al cargar la información del usuario. Por favor, inténtalo de nuevo más tarde."
        );
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      await userService.updateUser(
        storedUser.user._id,
        { name, email, password },
        storedUser.token
      );
      setSuccess("Información del usuario actualizada exitosamente");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        "Error al actualizar la información del usuario. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

  return (
    <Container>
      <h2>Perfil de Usuario</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      {user && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Nueva Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Label>Confirmar Nueva Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Actualizar Perfil
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default UserProfile;
