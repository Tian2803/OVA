// /frontend/src/components/AdminDashboard.js
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
  return (
    <Container fluid className="d-flex">
      <Container className="p-4">
        <h2>Admin Dashboard</h2>
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Ver Estudiantes</Card.Title>
                <Card.Text>Ver y gestionar todos los estudiantes.</Card.Text>
                <Card.Link href="/admin/students">Ver Estudiantes</Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Ver Profesores</Card.Title>
                <Card.Text>Ver y gestionar todos los profesores.</Card.Text>
                <Card.Link href="/admin/professors">Ver Profesores</Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Aprobar Profesor</Card.Title>
                <Card.Text>Aprobar profesores pendientes.</Card.Text>
                <Card.Link href="/admin/approve-professor">
                  Aprobar Profesor
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Agregar Administrador</Card.Title>
                <Card.Text>Agregar un nuevo administrador.</Card.Text>
                <Card.Link href="/admin/create-admin">
                  Agregar Administrador
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Ver Cursos</Card.Title>
                <Card.Text>Ver y gestionar todos los cursos.</Card.Text>
                <Card.Link href="/admin/courses">Ver Cursos</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default AdminDashboard;
