// /backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Ruta para iniciar sesión
router.post("/login", authController.loginUser);

module.exports = router;
