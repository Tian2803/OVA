// /frontend/src/components/AdminStudents.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";

const AdminStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(
        "http://localhost:5000/api/admin/students",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setStudents(response.data);
    };

    fetchStudents();
  }, []);

  return (
    <Container fluid className="d-flex">
      <Container className="p-4">
        <h2>Estudiantes</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student._id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Container>
  );
};

export default AdminStudents;
