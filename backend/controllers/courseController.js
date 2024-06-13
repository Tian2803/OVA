// /backend/controllers/courseController.js
const Course = require("../models/Course");
const User = require("../models/User");
const Module = require("../models/Module");

// Middleware para verificar la propiedad del curso
const verifyOwnership = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).send({ mensaje: "Curso no encontrado" });
    }

    if (course.professor.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .send({ mensaje: "No tienes permiso para modificar este curso" });
    }

    req.course = course;
    next();
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al verificar la propiedad del curso",
        detalles: error.message,
      });
  }
};

// Agregar un módulo a un curso
exports.addModule = [
  verifyOwnership,
  async (req, res) => {
    try {
      const { title, level, subSections } = req.body;
      const newModule = { title, level, subSections };

      req.course.modules.push(newModule);
      await req.course.save();

      res.status(201).send(newModule);
    } catch (error) {
      res
        .status(400)
        .send({
          mensaje: "Error al agregar el módulo",
          detalles: error.message,
        });
    }
  },
];

// Función para generar un código alfanumérico de 6 caracteres
const generateCourseCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

// Crear un nuevo curso
exports.createCourse = async (req, res) => {
  try {
    const { name, description } = req.body;
    const professorId = req.user._id;
    const professor = await User.findById(professorId);

    if (!professor || professor.role !== "profesor") {
      return res.status(400).send({ mensaje: "Profesor no válido" });
    }

    const course = new Course({
      name,
      description,
      professor: professorId,
      code: generateCourseCode(), // Generar código de curso
    });

    await course.save();

    professor.createdCourses.push(course._id);
    await professor.save();

    res.status(201).send(course);
  } catch (error) {
    res
      .status(400)
      .send({ mensaje: "Error al crear el curso", detalles: error.message });
  }
};

// Obtener todos los cursos
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("professor", "name email");
    res.status(200).send(courses);
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al obtener los cursos",
        detalles: error.message,
      });
  }
};

// Obtener un curso por ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "professor",
      "name email"
    );
    if (!course) {
      return res.status(404).send({ mensaje: "Curso no encontrado" });
    }
    res.status(200).send(course);
  } catch (error) {
    res
      .status(500)
      .send({ mensaje: "Error al obtener el curso", detalles: error.message });
  }
};

// Actualizar un curso por ID
exports.updateCourse = async (req, res) => {
  try {
    const { name, description } = req.body;
    const professorId = req.user._id;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { name, description, professor: professorId },
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).send({ mensaje: "Curso no encontrado" });
    }
    res.status(200).send(course);
  } catch (error) {
    res
      .status(400)
      .send({
        mensaje: "Error al actualizar el curso",
        detalles: error.message,
      });
  }
};

// Eliminar un curso por ID
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).send({ mensaje: "Curso no encontrado" });
    }

    const professor = await User.findById(course.professor);
    if (professor) {
      professor.courses = professor.courses.filter(
        (courseId) => courseId.toString() !== req.params.id
      );
      await professor.save();
    }

    res.status(200).send({ mensaje: "Curso eliminado" });
  } catch (error) {
    res
      .status(500)
      .send({ mensaje: "Error al eliminar el curso", detalles: error.message });
  }
};

// Unirse a un curso
exports.joinCourse = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user._id;

    const course = await Course.findOne({ code });

    if (!course) {
      return res.status(404).send({ mensaje: "Curso no encontrado" });
    }

    const user = await User.findById(userId);

    if (!user.courses.includes(course._id)) {
      user.courses.push(course._id);
      await user.save();
    }

    res.status(200).send(course);
  } catch (error) {
    res
      .status(500)
      .send({ mensaje: "Error al unirse al curso", detalles: error.message });
  }
};
