const sendJson = require('../utils/sendJson');

function errorHandler(err, req, res, next) {
  console.error(`[${new Date().toISOString()}] Error on ${req.method} ${req.originalUrl}:`, err.message);
  const statusCode = err.statusCode || 500;
  sendJson(res, responseData, statusCode);
}

module.exports = errorHandler;
