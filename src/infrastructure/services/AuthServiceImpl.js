const AuthService = require('../../core/ports/AuthService');
const pool = require('../db/mysql');
const User = require('../../core/domain/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // Para generar UUID

/// Implementación del servicio de autenticación
/// Esta clase implementa la interfaz AuthService y proporciona

class AuthServiceImpl extends AuthService {
    /// Constructor de la clase AuthServiceImpl
    async register(userData) {
        console.log('Registrando usuario:', userData); // ← Agrega esto
        try {
          const id = uuidv4();
          const hashedPassword = await bcrypt.hash(userData.password, 10);
          
          console.log('Ejecutando query SQL...'); // ← Agrega esto
          await pool.query(
            'INSERT INTO users (id, email, password, name, lastName) VALUES (?, ?, ?, ?, ?)',
            [id, userData.email, hashedPassword, userData.name ,userData.lastName]
          );
          
          console.log('Usuario registrado exitosamente'); // ← Agrega esto
          return new User(id, userData.email, hashedPassword, userData.name);
          
        } catch (error) {
          console.error('Error en AuthServiceImpl.register:', error); // ← Mejora este log
          throw error;
        }
      }

      // verifica si el correo electrónico ya existe en la base de datos
      // y devuelve un booleano indicando si el usuario ya existe. 
        //en caso de que ya exista, lanza un error.
      async checkUserExists(email) {
        const [rows] = await pool.query(
          'SELECT 1 FROM users WHERE email = ? LIMIT 1',
          [email]
        );
        return rows.length > 0;
      }
  
      /// Método para iniciar sesión
        /// Este método recibe las credenciales del usuario y devuelve un token JWT si las credenciales son válidas.
        /// Debe ser implementado por el adaptador correspondiente.

  async login(email, password) {
    // Buscar el usuario por email
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      throw new Error("Usuario no encontrado");
    }
    // Obtener el primer registro (debería ser único por email)
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
