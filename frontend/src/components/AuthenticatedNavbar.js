// /frontend/src/components/AuthenticatedNavbar.js
import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const AuthenticatedNavbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="mx-auto">
          OVA SG
        </Navbar.Brand>
        <Nav className="ml-auto">
          {user && user.role === "profesor" && (
            <NavDropdown title="Cursos" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/professor/courses">
                Gestionar Cursos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/professor/create-course">
                Crear Curso
              </NavDropdown.Item>
            </NavDropdown>
          )}
          <NavDropdown
            title={<FaUserCircle size={24} />}
            id="basic-nav-dropdown"
            align="end"
          >
            <NavDropdown.Item as={Link} to="/user-profile">
              Perfil
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>
              Cerrar sesión
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AuthenticatedNavbar;
