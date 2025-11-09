// errorHandler.js

function errorHandler(err, req, res, next) {
  console.error(err); // log the error for debugging

  // If the error already has a status code, use it. Otherwise, default to 500
  const status = err.status || 500;

  switch (status) {
    case 400:
      return res.status(400).json({ success: false, message: err.message || 'Bad request' });
    case 404:
      return res.status(404).json({ success: false, message: err.message || 'Not found' });
    case 409:
      return res.status(409).json({ success: false, message: err.message || 'Conflict' });
    case 500:
    default:
      return res.status(500).json({ success: false, message: err.message || 'Internal server error' });
  }
}

module.exports = errorHandler;
