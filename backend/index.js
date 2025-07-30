const express = require("express");
const cors = require("cors");
require("dotenv").config();
const chatRoutes = require("./src/web/rutas/chatRoutes");
const simpleAuthRoutes = require("./src/web/rutas/simpleAuthRoutes");
const db = require("./src/infrastructura/database/DatabaseConnection");

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json());

// Inicializar base de datos
async function initDatabase() {
  try {
    await db.connect();
    await db.createTables();
    console.log('✅ Base de datos inicializada correctamente');
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
  }
}

app.get("/", (req, res) => {
  res.send("Asesor IA backend funcionando");
});

app.use("/api", chatRoutes);
app.use("/api/auth", simpleAuthRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  await initDatabase();
});
