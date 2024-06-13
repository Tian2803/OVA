// /backend/controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Iniciar sesión
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ mensaje: "Usuario no encontrado" });
    }

    if (user.role === "profesor" && !user.isApproved) {
      return res.status(403).send({ mensaje: "El profesor no está aprobado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ mensaje: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).send({ token, user });
  } catch (error) {
    res
      .status(500)
      .send({ mensaje: "Error al iniciar sesión", detalles: error.message });
  }
};
