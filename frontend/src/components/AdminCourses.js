// /frontend/src/components/AdminCourses.js
import React, { useEffect, useState } from "react";
import { Container, Table, Alert } from "react-bootstrap";
import { getCourses } from "../services/courseService";

const AdminCourses = () => {
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
          "Error al obtener los cursos. Por favor, inténtelo de nuevo más tarde."
        );
      }
    };

    fetchCourses();
  }, []);

  return (
    <Container className="mt-5">
      <h2>Cursos</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Profesor</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course._id}>
              <td>{index + 1}</td>
              <td>{course.cod}</td>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>{course.professor.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminCourses;
