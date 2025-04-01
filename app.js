const express = require('express');
const app = express();
const authController = require('./src/interfaces/controllers/AuthController');

// Middleware para parsear JSON
app.use(express.json());

// Montar las rutas de autenticación bajo /api/auth
app.use('/api/auth', authController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
