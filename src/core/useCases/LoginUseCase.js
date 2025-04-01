// este archivo define el caso de uso de inicio de sesión
// y utiliza el servicio de autenticación para realizar la lógica de negocio.

class LoginUseCase {
    /// Constructor del caso de uso de inicio de sesión
    constructor(authService) {
        //verifica que el servicio de autenticación esté implementado
      // y que tenga el método login definido.
      if (!authService || typeof authService.login !== 'function') {
        throw new Error('AuthService implementation is required');
      }
      this.authService = authService;
    }
   /// Método para iniciar sesión
    /// Este método recibe el email y la contraseña del usuario,
    async execute(email, password) {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
  
      try {
        const authData = await this.authService.login(email, password);
        
        if (!authData || !authData.token) {
          throw new Error('Authentication failed');
        }
  
        // Devuelve el token y los datos del usuario
        // Aquí puedes ajustar los datos que deseas devolver según tu modelo de usuario

        return {
          user: {
            id: authData.user.id,
            email: authData.user.email
          },
          token: authData.token,
          expiresIn: authData.expiresIn || '1h'
        };
        
      } catch (error) {
        // Manejo de errores
        console.error('LoginUseCase error:', error);
        throw new Error('Invalid credentials');
      }
    }
  }
  
  module.exports = LoginUseCase;