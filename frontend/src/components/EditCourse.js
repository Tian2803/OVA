import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { getCourseById, updateCourse } from "../services/courseService";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const courseData = await getCourseById(id, user.token);
        setCourse(courseData);
        setName(courseData.name);
        setDescription(courseData.description);
      } catch (err) {
        setError(
          "Error al obtener el curso. Por favor, inténtalo de nuevo más tarde."
        );
      }
    };

    fetchCourse();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await updateCourse(id, { name, description }, user.token);
      setSuccess("Curso actualizado exitosamente");
      navigate("/professor/courses");
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
        <Form.Group controlId="formCourseName" className="mb-3">
          <Form.Label>Nombre del Curso</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre del curso"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formCourseDescription" className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Ingrese la descripción del curso"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
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
