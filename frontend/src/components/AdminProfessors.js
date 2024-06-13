// /frontend/src/components/AdminProfessors.js
import React, { useEffect, useState } from "react";
import { Container, Table, Button, Alert } from "react-bootstrap";
import { fetchProfessors, approveProfessor } from "../services/adminService";

const AdminProfessors = () => {
  const [professors, setProfessors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProfessors = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const data = await fetchProfessors(user.token);
        setProfessors(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getProfessors();
  }, []);

  const handleApproveProfessor = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await approveProfessor(id, user.token);
      setProfessors(
        professors.map((professor) =>
          professor._id === id ? { ...professor, isApproved: true } : professor
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container fluid className="d-flex">
      <Container className="p-4">
        <h2>Profesores</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Aprobado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {professors.map((professor, index) => (
              <tr key={professor._id}>
                <td>{index + 1}</td>
                <td>{professor.name}</td>
                <td>{professor.email}</td>
                <td>{professor.isApproved ? "Sí" : "No"}</td>
                <td>
                  {!professor.isApproved && (
                    <Button
                      variant="success"
                      onClick={() => handleApproveProfessor(professor._id)}
                    >
                      Aprobar
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Container>
  );
};

export default AdminProfessors;
