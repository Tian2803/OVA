// /frontend/src/components/NotFound.js
import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const NotFound = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-4">404 - Página no encontrada</h1>
      <p className="mb-4">
        Lo sentimos, la página que estás buscando no existe.
      </p>
      <Button as={Link} to="/home" variant="primary">
        Volver al Inicio
      </Button>
    </Container>
  );
};

export default NotFound;
