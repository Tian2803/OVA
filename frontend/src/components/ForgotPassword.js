import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import authService from "../services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.forgotPassword(email);
      setMessage(
        "Se ha enviado un enlace para restablecer la contraseña a tu correo electrónico."
      );
      setError("");
    } catch (err) {
      setError(
        "Error al enviar el enlace de restablecimiento de contraseña. Por favor, inténtalo de nuevo."
      );
      setMessage("");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form onSubmit={handleSubmit} className="border p-4 rounded">
        <h3 className="text-center">Restablecer Contraseña</h3>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Enviar Enlace
        </Button>
      </Form>
    </Container>
  );
};

export default ForgotPassword;
