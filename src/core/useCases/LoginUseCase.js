class LoginUseCase {
    constructor(authService) {
      if (!authService || typeof authService.login !== 'function') {
        throw new Error('AuthService implementation is required');
      }
      this.authService = authService;
    }
  
    async execute(email, password) {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
  
      try {
        const authData = await this.authService.login(email, password);
        
        if (!authData || !authData.token) {
          throw new Error('Authentication failed');
        }
  
        return {
          user: {
            id: authData.user.id,
            email: authData.user.email
          },
          token: authData.token,
          expiresIn: authData.expiresIn || '1h'
        };
      } catch (error) {
        console.error('LoginUseCase error:', error);
        throw new Error('Invalid credentials');
      }
    }
  }
  
  module.exports = LoginUseCase;