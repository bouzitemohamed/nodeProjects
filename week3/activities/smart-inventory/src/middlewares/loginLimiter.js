const rateLimit = require('express-rate-limit');

// Limit login attempts to 10 per hour per IP
const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    error: "Too many login attempts",
    message: "You have exceeded the maximum number of login attempts. Please try again after an hour."
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the old `X-RateLimit-*` headers
});

module.exports = loginLimiter;
