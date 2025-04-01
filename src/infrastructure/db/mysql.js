const mysql = require('mysql2/promise');

// Configuración del pool de conexiones a MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'auth_db'  // Asegúrate de que coincide con la base de datos creada
});

module.exports = pool;
