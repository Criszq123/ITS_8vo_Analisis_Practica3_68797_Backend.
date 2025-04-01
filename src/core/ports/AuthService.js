// Define el contrato del servicio de autenticación
// Este archivo define la interfaz del servicio de autenticación
// que debe ser implementada por cualquier adaptador que lo use.
class AuthService {
    async register(userData) {
      throw new Error("Not implemented");
    }
    
    async login(email, password) {
      throw new Error("Not implemented");
    }
  }
  
  module.exports = AuthService;
  