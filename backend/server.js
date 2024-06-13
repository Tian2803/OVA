const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes"); 
const adminRoutes = require("./routes/adminRoutes"); 
const errorHandler = require("./middleware/errorHandler");

// Configuración de variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware para habilitar CORS
const corsOptions = {
  origin: "http://localhost:3000", // Ajusta esto según sea necesario
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"], // Añadir Authorization aquí
};

app.use(cors(corsOptions));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Middleware para manejar errores
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
