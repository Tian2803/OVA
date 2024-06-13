// /frontend/src/components/UserProfileIcon.js
import React from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserProfileIcon = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="link" id="dropdown-user">
        <i
          className="bi bi-person-circle"
          style={{ fontSize: "1.5rem", color: "#007bff" }}
        ></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => navigate("/user-profile")}>
          Perfil
        </Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserProfileIcon;
