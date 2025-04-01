const { sequelize, connectDB } = require("./config/db");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("¡API funcionando!");
});

// Iniciar servidor


const startServer = async () => {
  await connectDB();
  await sequelize.sync();  // Esto sincroniza los modelos con la DB
  console.log("Modelos sincronizados");
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
};

startServer();


