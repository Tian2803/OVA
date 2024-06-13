// /backend/controllers/adminController.js
const User = require("../models/User");
const Course = require("../models/Course");
const bcrypt = require("bcryptjs");

// Obtener todos los estudiantes
exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "estudiante" });
    res.status(200).send(students);
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al obtener los estudiantes",
        detalles: error.message,
      });
  }
};

// Obtener todos los profesores
exports.getProfessors = async (req, res) => {
  try {
    const professors = await User.find({ role: "profesor" });
    res.status(200).send(professors);
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al obtener los profesores",
        detalles: error.message,
      });
  }
};

// Obtener todos los cursos
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
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

// Aprobar un profesor
exports.approveProfessor = async (req, res) => {
  try {
    const professor = await User.findById(req.params.id);

    if (!professor) {
      return res.status(404).send({ mensaje: "Profesor no encontrado" });
    }

    professor.isApproved = true;
    await professor.save();
    res.status(200).send({ mensaje: "Profesor aprobado", professor });
  } catch (error) {
    res
      .status(400)
      .send({
        mensaje: "Error al aprobar el profesor",
        detalles: error.message,
      });
  }
};

// Crear un nuevo administrador
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({ mensaje: "El usuario ya existe" });
    }

    // Cifrar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear y guardar el nuevo administrador
    const admin = new User({
      name,
      email,
      password: hashedPassword,
      role: "administrador",
      isApproved: true,
    });

    await admin.save();
    res.status(201).send(admin);
  } catch (error) {
    res
      .status(400)
      .send({
        mensaje: "Error al crear el administrador",
        detalles: error.message,
      });
  }
};

exports.getUnapprovedProfessors = async (req, res) => {
  try {
    const professors = await User.find({ role: "profesor", isApproved: false });
    res.status(200).send(professors);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener los profesores no aprobados",
      detalles: error.message,
    });
  }
};
