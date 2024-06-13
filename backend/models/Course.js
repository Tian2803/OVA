// /backend/models/Course.js
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  professor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  contentBasic: { type: String }, // Contenido HTML para nivel básico
  contentIntermediate: { type: String }, // Contenido HTML para nivel intermedio
  contentAdvanced: { type: String }, // Contenido HTML para nivel avanzado
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
