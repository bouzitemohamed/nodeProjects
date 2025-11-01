// src/middleware/auth.js
function auth(req, res, next) {
  const token = req.headers.authorization;

  if (token === "1234") {
    next(); // token correct, on continue
  } else {
    res.status(401).json({
      status: "error",
      message: "Unauthorized: invalid token"
    });
  }
}

module.exports = auth;
