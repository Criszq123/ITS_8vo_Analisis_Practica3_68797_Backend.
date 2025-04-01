const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserRepository = require("../../infrastructure/repositories/UserRepository");

class AuthUseCase {
  async register(name, email, password) {
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) throw new Error("El usuario ya existe");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserRepository.create({ name, email, password: hashedPassword });
    return user;
  }

  async login(email, password) {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("Credenciales incorrectas");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error("Credenciales incorrectas");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return { token };
  }
}

module.exports = new AuthUseCase();
