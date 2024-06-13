// /frontend/src/components/EditCourse.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { getCourseById, updateCourse } from "../services/courseService";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    name: "",
    description: "",
    contentBasic: "", // Contenido HTML para nivel básico
    contentIntermediate: "", // Contenido HTML para nivel intermedio
    contentAdvanced: "", // Contenido HTML para nivel avanzado
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const courseData = await getCourseById(id, storedUser.token);
        setCourse(courseData);
      } catch (err) {
        setError(
          "Error al cargar la información del curso. Por favor, inténtalo de nuevo más tarde."
        );
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      await updateCourse(id, course, storedUser.token);
      setSuccess("Curso actualizado exitosamente");
      setTimeout(() => navigate(`/professor/course/${id}`), 2000);
    } catch (err) {
      setError(
        "Error al actualizar el curso. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

  return (
    <Container>
      <h2>Editar Curso</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Nombre del Curso</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={course.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={course.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formContentBasic" className="mb-3">
          <Form.Label>Contenido HTML - Nivel Básico</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            name="contentBasic"
            value={course.contentBasic}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formContentIntermediate" className="mb-3">
          <Form.Label>Contenido HTML - Nivel Intermedio</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            name="contentIntermediate"
            value={course.contentIntermediate}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formContentAdvanced" className="mb-3">
          <Form.Label>Contenido HTML - Nivel Avanzado</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            name="contentAdvanced"
            value={course.contentAdvanced}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Actualizar Curso
        </Button>
      </Form>
    </Container>
  );
};

export default EditCourse;
