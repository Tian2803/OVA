const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/my-courses", protect, userController.getUserCourses);
router.get("/created-courses", protect, userController.getCreatedCourses);

// Rutas para CRUD de usuarios tipo estudiante
router.post("/", userController.createUser);
router.get("/", protect, userController.getUsers);
router.get("/:id", protect, userController.getUserById);
router.put("/:id", protect, userController.updateUser);
router.delete("/:id", protect, userController.deleteUser);

module.exports = router;
