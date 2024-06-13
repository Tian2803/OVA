// /backend/models/Course.js
const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const subSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  points: [pointSchema],
});

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subSections: [subSectionSchema],
  level: {
    type: String,
    enum: ["basico", "intermedio", "avanzado"],
    required: true,
  },
});

const courseSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  professor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  modules: [moduleSchema],
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
