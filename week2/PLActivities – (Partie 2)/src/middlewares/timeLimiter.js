// src/middleware/timeLimiter.js
function timeLimiter(req, res, next) {
  const hour = new Date().getHours(); // 0-23

  if (hour >= 22 || hour < 6) {
    return res.status(403).json({
      status: "error",
      message: "Access denied: outside allowed hours (06:00-22:00)"
    });
  }

  next(); // dans l'horaire autorisé, on continue
}

module.exports = timeLimiter;
