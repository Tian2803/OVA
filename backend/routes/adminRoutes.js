// /backend/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");

// Rutas para el administrador
router.get("/students", protect, admin, adminController.getStudents);
router.get("/professors", protect, admin, adminController.getProfessors);
router.get("/courses", protect, admin, adminController.getCourses);
router.put(
  "/approve-professor/:id",
  protect,
  admin,
  adminController.approveProfessor
);
router.get("/unapproved-professors", protect, admin, adminController.getUnapprovedProfessors),
router.post("/create-admin", protect, admin, adminController.createAdmin);

module.exports = router;