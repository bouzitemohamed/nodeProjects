// src/middleware/validateResource.js
function validateResource(requiredFields) {
  return (req, res, next) => {
    const missingFields = [];

    requiredFields.forEach(field => {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: `Missing required field(s): ${missingFields.join(', ')}`
      });
    }

    next(); // tous les champs sont présents, on continue
  };
}

module.exports = validateResource;
