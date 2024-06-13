// /backend/seedAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const readline = require("readline");
const User = require("./models/User");
const connectDB = require("./config/db");

dotenv.config();


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const askQuestion = (question) => {
  return new Promise((resolve) => rl.question(question, resolve));
};

const seedAdmin = async () => {
  try {
    await connectDB();
    const name = await askQuestion("Nombre del administrador: ");
    const email = await askQuestion("Correo electrónico del administrador: ");
    const password = await askQuestion("Contraseña del administrador: ");

    const adminExists = await User.findOne({ email });
    if (adminExists) {
      console.log("El administrador ya existe");
      rl.close();
      process.exit();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new User({
      name,
      email,
      password: hashedPassword,
      role: "administrador",
      isApproved: true,
    });

    await admin.save();
    console.log("Administrador creado con éxito");
    rl.close();
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    rl.close();
    process.exit(1);
  }
};

seedAdmin();
