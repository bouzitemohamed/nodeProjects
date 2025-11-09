const authService = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: result
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
      code: 400
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);

    res.json({
      status: 'success',
      message: 'Login successful',
      data: result
    });
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: error.message,
      code: 401
    });
  }
};

module.exports = {
  register,
  login
};