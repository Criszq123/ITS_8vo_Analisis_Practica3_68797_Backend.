// Representa la entidad Usuario
// Este archivo define la estructura del objeto Usuario
// y puede incluir métodos relacionados con la entidad, como validaciones o transformaciones de datos.
class User {
    constructor(id, email, password, name) {
      this.id = id;
      this.email = email;
      this.password = password;
      this.name = name;
    }
  }
  
  module.exports = User;
  