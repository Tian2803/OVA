import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav, NavDropdown } from "react-bootstrap";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Container
      fluid
      className="d-flex flex-column p-3 bg-light"
      style={{ height: "100vh", width: "250px" }}
    >
      <Nav
        className="flex-column"
        style={{ fontSize: "1.2em", fontWeight: "bold" }}
      >
        <Nav.Item>
          <Nav.Link as={Link} to="/home" className="text-primary">
            Inicio
          </Nav.Link>
        </Nav.Item>
        {user.user.role === "administrador" && (
          <NavDropdown title="Admin Dashboard" id="admin-dashboard-dropdown">
            <NavDropdown.Item as={Link} to="/admin/students">
              Ver Estudiantes
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/admin/professors">
              Ver Profesores
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/admin/approve-professor">
              Aprobar Profesor
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/admin/create-admin">
              Agregar Administrador
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/admin/courses">
              Ver Cursos
            </NavDropdown.Item>
          </NavDropdown>
        )}
        {user.user.role === "profesor" && (
          <NavDropdown title="Cursos" id="professor-courses-dropdown">
            <NavDropdown.Item as={Link} to="/professor/courses">
              Gestionar Cursos
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/professor/create-course">
              Crear Curso
            </NavDropdown.Item>
          </NavDropdown>
        )}
        {user.user.role !== "administrador" && (
          <Nav.Item>
            <Nav.Link as={Link} to="/my-learning" className="text-primary">
              Aprendizaje
            </Nav.Link>
          </Nav.Item>
        )}
        <Nav.Item>
          <Nav.Link as={Link} to="/statistics" className="text-primary">
            Estadisticas
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/logout" className="text-primary">
            Cerrar Sesion
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
};

export default Sidebar;
