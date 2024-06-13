// /backend/controllers/userController.js
const User = require("../models/User");
const Course = require("../models/Course");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, courses } = req.body;

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({ mensaje: "El usuario ya existe" });
    }

    // Cifrar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Transformar los códigos de curso en ObjectId
    let courseIds = [];
    if (courses) {
      for (let i = 0; i < courses.length; i++) {
        let course = await Course.findOne({ code: courses[i].code });
        if (course) {
          courseIds.push(course._id);
        }
      }
    }

    // Crear y guardar el nuevo usuario
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      courses: courseIds,
    });

    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res
      .status(400)
      .send({ mensaje: "Error al crear el usuario", detalles: error.message });
  }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("courses");
    res.status(200).send(users);
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al obtener los usuarios",
        detalles: error.message,
      });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("courses");
    if (!user) {
      return res.status(404).send({ mensaje: "Usuario no encontrado" });
    }
    res.status(200).send(user);
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al obtener el usuario",
        detalles: error.message,
      });
  }
};

// Actualizar un usuario por ID
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, role, courses } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send({ mensaje: "Usuario no encontrado" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.courses = courses
      ? await Promise.all(
          courses.map(async (course) => {
            let foundCourse = await Course.findOne({ code: course.code });
            return foundCourse ? foundCourse._id : null;
          })
        )
      : user.courses;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res
      .status(400)
      .send({
        mensaje: "Error al actualizar el usuario",
        detalles: error.message,
      });
  }
};

// Eliminar un usuario por ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ mensaje: "Usuario no encontrado" });
    }
    res.status(200).send({ mensaje: "Usuario eliminado" });
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al eliminar el usuario",
        detalles: error.message,
      });
  }
};

// Obtener los cursos en los que el usuario está inscrito
exports.getUserCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'courses',
      populate: { path: 'professor', select: 'name' },
    });

    if (!user) {
      return res.status(404).send({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).send(user.courses);
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al obtener los cursos', detalles: error.message });
  }
};

// Obtener los cursos creados por el profesor
exports.getCreatedCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('createdCourses');
    if (!user) {
      return res.status(404).send({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).send(user.createdCourses);
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al obtener los cursos creados', detalles: error.message });
  }
};
