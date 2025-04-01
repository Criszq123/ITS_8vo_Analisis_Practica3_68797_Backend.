const AuthService = require('../../core/ports/AuthService');
const pool = require('../db/mysql');
const User = require('../../core/domain/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // Para generar UUID

class AuthServiceImpl extends AuthService {
  async register(userData) {
    // Generar un UUID para el id del usuario
    const id = uuidv4();
    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    // Insertar el usuario en la base de datos
    await pool.query(
      'INSERT INTO users (id, email, password, name) VALUES (?, ?, ?, ?)',
      [id, userData.email, hashedPassword, userData.name]
    );
    
    const user = new User(id, userData.email, hashedPassword, userData.name);
    return user;
  }
  
  async login(email, password) {
    // Buscar el usuario por email
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      throw new Error("Usuario no encontrado");
    }
    
    const userRecord = rows[0];
    // Comparar la contraseña ingresada con la almacenada
    const valid = await bcrypt.compare(password, userRecord.password);
    if (!valid) {
      throw new Error("Credenciales inválidas");
    }
    
    // Generar un token JWT (la clave secreta debe ser almacenada en una variable de entorno)
    const token = jwt.sign(
      { id: userRecord.id, email: userRecord.email },
      'claveSecreta',
      { expiresIn: '1h' }
    );
    
    return { token, user: { id: userRecord.id, email: userRecord.email, name: userRecord.name } };
  }
}

module.exports = AuthServiceImpl;
