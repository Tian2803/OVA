// /backend/routes/courseRoutes.js
const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { protect } = require("../middleware/authMiddleware");

router.post("/join", protect, courseController.joinCourse);
router.post("/:id/modules", protect, courseController.addModule);
// Rutas para CRUD de cursos
router.post("/", protect, courseController.createCourse);
router.get("/", protect, courseController.getCourses);
router.get("/:id", protect, courseController.getCourseById);
router.put("/:id", protect, courseController.updateCourse);
router.delete("/:id", protect, courseController.deleteCourse);

module.exports = router;
