const express = require("express");
const cors = require("cors");
require("dotenv").config();
const chatRoutes = require("./src/web/rutas/chatRoutes");

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: true, // Permite cualquier origin en desarrollo
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Asesor IA backend funcionando");
});

app.use("/api", chatRoutes );

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
