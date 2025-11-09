const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Erreur de validation Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(error => error.message);
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors,
      code: 400
    });
  }

  // Erreur de duplication (unique constraint)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      status: 'error',
      message: `${field} already exists`,
      code: 400
    });
  }

  // Erreur JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token',
      code: 401
    });
  }

  // Erreur par défaut
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal server error',
    code: err.statusCode || 500
  });
};

module.exports = errorHandler;