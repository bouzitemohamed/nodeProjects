const Joi = require('joi');

const validateRegistration = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('user', 'admin')
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
      code: 400
    });
  }
  
  next();
};

const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
      code: 400
    });
  }
  
  next();
};

const validateTodo = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(1).max(255).required(),
    completed: Joi.boolean(),
    priority: Joi.string().valid('low', 'medium', 'high'),
    dueDate: Joi.date().iso().greater('now')
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
      code: 400
    });
  }
  
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateTodo
};