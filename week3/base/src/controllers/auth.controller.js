const authService = require('../services/auth.service');

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const data=await authService.login({email, password});
    res.status(200).json({
        message:'login with success',
        data:data
    })
  }
  catch(err) {
    next(err);
  }
}

async function register(req, res, next) {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: "Les champs 'email' et 'password' sont requis",
      });
    }

    const result = await authService.register({ email, password, role });

    res.status(201).json({
      status: 'success',
      data: result.user,
      token: result.token,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { register,login }