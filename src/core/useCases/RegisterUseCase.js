class RegisterUseCase {
    constructor(authService) {
      if (!authService || typeof authService.register !== 'function') {
        throw new Error('AuthService implementation is required');
      }
      this.authService = authService;
    }
  

    
    async execute(userData) {
        console.log('RegisterUseCase execute called with:', userData);
      const requiredFields = ['name', 'email', 'password'];
      const missingFields = requiredFields.filter(field => !userData[field]);
  
      console.log("campos faltantes", missingFields)
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }
  
      if (userData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
  
      try {
        const existingUser = await this.authService.checkUserExists(userData.email);
        if (existingUser) {
          throw new Error('User already exists');
        }
  
        const newUser = await this.authService.register(userData);
        
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