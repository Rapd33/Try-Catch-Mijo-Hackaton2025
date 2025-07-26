const express = require("express");
require("dotenv").config();
const chatRoutes = require("./src/web/rutas/chatRoutes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Asesor IA backend funcionando");
});

app.use("/api", chatRoutes );

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
