const AuthUseCase = require("../core/useCases/AuthUseCase");

const register = async (req, res) => {
  try {
    const user = await AuthUseCase.register(req.body.name, req.body.email, req.body.password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { token } = await AuthUseCase.login(req.body.email, req.body.password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { register, login };
