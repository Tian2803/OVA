// /frontend/src/components/CourseDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Tab, Tabs, Alert } from "react-bootstrap";
import { getCourseById } from "../services/courseService";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const courseData = await getCourseById(id, user.token);
        setCourse(courseData);
      } catch (err) {
        setError(
          "Error al obtener el curso. Por favor, inténtalo de nuevo más tarde."
        );
      }
    };

    fetchCourse();
  }, [id]);

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container className="mt-5">
        <Alert variant="info">Cargando curso...</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>{course.name}</h2>
      <p>{course.description}</p>
      <h4>Profesor: {course.professor.name}</h4>
      <Tabs defaultActiveKey="basic" id="course-tabs" className="mb-3">
        <Tab eventKey="basic" title="Básico">
          <div
            className="course-content"
            dangerouslySetInnerHTML={{ __html: course.contentBasic }}
          />
        </Tab>
        <Tab eventKey="intermediate" title="Intermedio">
          <div
            className="course-content"
            dangerouslySetInnerHTML={{ __html: course.contentIntermediate }}
          />
        </Tab>
        <Tab eventKey="advanced" title="Avanzado">
          <div
            className="course-content"
            dangerouslySetInnerHTML={{ __html: course.contentAdvanced }}
          />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default CourseDetails;
