// /frontend/src/components/StudentRegister.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";

const RegisterStudent = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    courses: [{ code: "" }],
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleCourseChange = (index, e) => {
    const newCourses = [...user.courses];
    newCourses[index].code = e.target.value;
    setUser({ ...user, courses: newCourses });
  };

  const validateEmail = (email) => {
    return email.endsWith("@unicartagena.edu.co");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateEmail(user.email)) {
      setErrors({
        email: "El correo debe pertenecer al dominio @unicartagena.edu.co",
      });
      return;
    }

    if (user.password !== user.confirmPassword) {
      setErrors({ confirmPassword: "Las contraseñas no coinciden" });
      return;
    }

    try {
      await userService.createUser(user);
      setSubmitted(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setErrors({ submit: "Error al registrar el usuario" });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col md={12}>
          <h3 className="text-center">Registro estudiantes</h3>
          {submitted ? (
            <Alert variant="success">
              Registro exitoso! Redirigiendo al inicio de sesión...
            </Alert>
          ) : (
            <Form onSubmit={handleSubmit} className="border p-4 rounded">
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su nombre completo"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Correo electronico"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCourse">
                <Form.Label>Clase</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Codigo de la clase"
                  value={user.courses[0].code}
                  onChange={(e) => handleCourseChange(0, e)}
                />
                <Form.Text className="text-muted">No es obligatorio</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirmar Contraseña"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleChange}
                  required
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="I agree to the Terms of use and Privacy policy"
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Registrarse
              </Button>

              {errors.submit && (
                <Alert variant="danger" className="mt-3">
                  {errors.submit}
                </Alert>
              )}
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterStudent;
