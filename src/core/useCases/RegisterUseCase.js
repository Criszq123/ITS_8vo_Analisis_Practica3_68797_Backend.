//metodo para registrar un nuevo usuario
// este archivo define el caso de uso de registro

class RegisterUseCase {
    constructor(authService) {
        /// Verifica que el servicio de autenticación esté implementado
      // y que tenga el método register definido.
      if (!authService || typeof authService.register !== 'function') {
        throw new Error('AuthService implementation is required');
      }
      this.authService = authService;
    }
  

    /// Método para registrar un nuevo usuario
    /// Este método recibe un objeto con los datos del usuario y lo registra en el sistema.
    async execute(userData) {
        console.log('RegisterUseCase execute called with:', userData);
        // Verifica que los datos del usuario contengan los campos requeridos
      // y que la contraseña tenga al menos 6 caracteres.
      const requiredFields = ['name', 'email', 'password'];
      const missingFields = requiredFields.filter(field => !userData[field]);
  
      console.log("campos faltantes", missingFields)
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }
  //     Verifica que la contraseña tenga al menos 6 caracteres
      if (userData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
  
      try {
        const existingUser = await this.authService.checkUserExists(userData.email);
        if (existingUser) {
          throw new Error('User already exists');
        }
  
        const newUser = await this.authService.register(userData);
        // Log de éxito
        //retorna el nuevo usuario registrado
        return {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          createdAt: newUser.createdAt
        };
      } catch (error) {
        console.error('RegisterUseCase error:', error);
        throw new Error('Registration failed');
      }
    }
  }
  
  module.exports = RegisterUseCase;