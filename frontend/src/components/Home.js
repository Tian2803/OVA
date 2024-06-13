// /frontend/src/components/Home.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  Alert,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import userService from "../services/userService";
import { joinCourse } from "../services/courseService";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [courseCode, setCourseCode] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser.user);
        const coursesData = await userService.getUserCourses(storedUser.token);
        setCourses(coursesData);
      } catch (err) {
        setError(
          "Error al obtener los cursos. Por favor, inténtalo de nuevo más tarde."
        );
      }
    };

    fetchCourses();
  }, []);

  const handleJoinCourse = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const course = await joinCourse(courseCode, storedUser.token);
      setCourses([...courses, course]);
      setSuccess("Te has unido al curso exitosamente");
      setShowModal(false);
    } catch (err) {
      setError(
        "Error al unirse al curso. Por favor, verifica el código e inténtalo de nuevo."
      );
    }
  };

  return (
    <Container fluid className="d-flex">
      <Container className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Clases Activas</h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#0D6EFD",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => setShowModal(true)}
          >
            <FaPlusCircle size={20} />
            <span className="ms-2">Unirse a un curso</span>
          </div>
        </div>
        {user && <h4>Bienvenido, {user.name}</h4>}
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Row>
          {courses.map((course, index) => (
            <Col md={6} key={index}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{course.name}</Card.Title>
                  <Card.Text>
                    Profesor: {course.professor ? course.professor.name : "N/A"}
                  </Card.Text>
                  <Card.Text>Código del curso: {course.cod}</Card.Text>
                  <ProgressBar now={60} label="60%" />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Modal para unirse a un curso */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Unirse a un Curso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleJoinCourse}>
              <Form.Group controlId="courseCode">
                <Form.Label>Código del Curso</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el código del curso"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Unirse al Curso
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </Container>
  );
};

export default Home;
