// /frontend/src/components/AuthenticatedLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import AuthenticatedNavbar from "./AuthenticatedNavbar";
import Sidebar from "./Sidebar";

const AuthenticatedLayout = () => {
  return (
    <>
      <AuthenticatedNavbar />
      <Container fluid className="d-flex">
        <Sidebar />
        <Container fluid className="mt-4">
          <Outlet />
        </Container>
      </Container>
    </>
  );
};

export default AuthenticatedLayout;
