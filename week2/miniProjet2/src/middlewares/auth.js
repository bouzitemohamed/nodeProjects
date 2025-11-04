function auth(req, res, next) {
  const token = req.headers.authorization;
  if (token === process.env.TOKEN_SECRET) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized: Invalid or missing token" });
}

module.exports = auth;
