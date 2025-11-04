function logger(req, res, next) {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl} ${res.statusCode}`);
  next();
}

module.exports = logger;
