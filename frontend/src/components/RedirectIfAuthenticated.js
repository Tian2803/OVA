// /frontend/src/components/RedirectIfAuthenticated.js
import React from "react";
import { Navigate } from "react-router-dom";

const RedirectIfAuthenticated = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default RedirectIfAuthenticated;
