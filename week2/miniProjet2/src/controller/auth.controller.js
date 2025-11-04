const authService = require("../services/auth.service");

async function register(req, res) {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({ message: 'User registered', ...result });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}


async function login(req, res) {
  try {
    const result = await authService.login(req.body);
    res.json({
        message:"user log in successfuly",
        data:result
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

function logout(req, res) {
  const result = authService.logout();
  res.json(result);
}

module.exports = { register, login, logout };
