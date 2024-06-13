import React, { useEffect, useState } from "react";
import { Container, Table, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCourses } from "../services/courseService";

const TeacherCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const coursesData = await getCourses(user.token);
        setCourses(coursesData);
      } catch (err) {
        setError(
          "Error al obtener los cursos. Por favor, inténtalo de nuevo más tarde."
        );
      }
    };

    fetchCourses();
  }, []);

  return (
    <Container>
      <h2>Mis Cursos</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course._id}>
              <td>{index + 1}</td>
              <td>{course.cod}</td>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>
                <Button
                  as={Link}
                  to={`/professor/course/${course._id}`}
                  variant="info"
                  className="me-2"
                >
                  Ver Detalles
                </Button>
                <Button
                  as={Link}
                  to={`/professor/edit-course/${course._id}`}
                  variant="primary"
                  className="me-2"
                >
                  Editar
                </Button>
                <Button
                  as={Link}
                  to={`/professor/add-modules/${course._id}`}
                  variant="secondary"
                >
                  Agregar Módulos
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TeacherCourses;
