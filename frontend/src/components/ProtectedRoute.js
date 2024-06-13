// /frontend/src/components/ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || (roles && !roles.includes(user.user.role))) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
