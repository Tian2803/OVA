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

const Module = mongoose.model("Module", moduleSchema);
module.exports = Module;
