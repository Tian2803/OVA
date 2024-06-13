// /frontend/src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // Importar Bootstrap

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
