const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (userData) => {
  const { email, password, role } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  const user = new User({ email, password, role });
  await user.save();

  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return {
    user: {
      id: user._id,
      email: user.email,
      role: user.role
    },
    token
  };
};

const loginUser = async (credentials) => {
  const { email, password } = credentials;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return {
    user: {
      id: user._id,
      email: user.email,
      role: user.role
    },
    token
  };
};

module.exports = {
  registerUser,
  loginUser
};