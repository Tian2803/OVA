import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = `${username}@unicartagena.edu.co`;
      const data = await authService.login(email, password);
      const role = data.user.role;
      if (role === "administrador") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      alert("Error al iniciar sesión");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col md={12}>
          <h3 className="text-center mb-4">Iniciar sesión</h3>
          <Form onSubmit={handleSubmit} className="border p-4 rounded">
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Usuario</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="flex-grow-1"
                />
                <span className="align-self-center ms-2">
                  @unicartagena.edu.co
                </span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Iniciar sesión
            </Button>

            <div className="d-flex justify-content-between mt-3">
              <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
            </div>
            <div className="mt-3">
              Registro de estudiantes{" "}
              <a href="/register-student">Presiona aquí</a> o profesor{" "}
              <a href="/register-professor">Presiona aquí</a>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
