// utils/AppError.js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = 'error';
    this.statusCode = statusCode || 500;
    this.timestamp = new Date().toISOString();
  }
}

module.exports = AppError;
