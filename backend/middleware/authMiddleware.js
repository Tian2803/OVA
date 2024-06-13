// /backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).send({ mensaje: "No autorizado, token fallido" });
    }
  }

  if (!token) {
    res.status(401).send({ mensaje: "No autorizado, no hay token" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === "administrador") {
    next();
  } else {
    res.status(401).send({ mensaje: "No autorizado como administrador" });
  }
};

module.exports = { protect, admin };