// /frontend/src/components/CourseDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Alert } from "react-bootstrap";
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
          "Error al obtener los detalles del curso. Por favor, inténtalo de nuevo más tarde."
        );
      }
    };

    fetchCourse();
  }, [id]);

  return (
    <Container>
      <h2>Detalles del Curso</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {course && (
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>{course.name}</Card.Title>
            <Card.Text>Descripción: {course.description}</Card.Text>
            <Card.Text>Código: {course.cod}</Card.Text>
            {course.modules.map((module, moduleIndex) => (
              <div key={moduleIndex}>
                <h4>
                  {module.title} ({module.level})
                </h4>
                {module.subSections.map((subSection, subSectionIndex) => (
                  <div key={subSectionIndex} className="mb-3">
                    <h5>{subSection.title}</h5>
                    {subSection.points.map((point, pointIndex) => (
                      <div key={pointIndex} className="mb-2">
                        <h6>{point.title}</h6>
                        <p>{point.content}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default CourseDetails;
