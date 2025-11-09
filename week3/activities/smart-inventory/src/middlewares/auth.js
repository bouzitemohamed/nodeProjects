// middlewares/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user.model');

const auth = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Unauthorized", message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ error: "Unauthorized", message: "User not found" });
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized", message: "Invalid token" });
  }
};

// Accepts one or more roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized", message: "No user found" });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden", message: "You do not have access to this resource" });
    }
    next();
  };
};

module.exports = { auth, authorize };
