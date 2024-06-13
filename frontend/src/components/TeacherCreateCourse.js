// /frontend/src/components/TeacherCreateCourse.js
import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { createCourse } from "../services/courseService";

const TeacherCreateCourse = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await createCourse({ name, description }, user.token);

      setSuccess("Curso creado exitosamente");
      setError(null);
      setName("");
      setDescription("");
    } catch (err) {
      setError(
        "Error al crear el curso. Por favor, inténtalo de nuevo más tarde."
      );
      setSuccess(null);
    }
  };

  return (
    <Container>
      <h2>Crear Curso</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nombre del curso</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa el nombre del curso"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="description" className="mt-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Ingresa la descripción del curso"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Crear Curso
        </Button>
      </Form>
    </Container>
  );
};

export default TeacherCreateCourse;
