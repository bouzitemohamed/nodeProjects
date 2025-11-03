function validateReq(req, res, next) {
  const { title, dueDate, priority } = req.body;

  if (!title) {
    return res.status(400).json({
      message: 'Title is required'
    });
  }

  if (!dueDate) {
    return res.status(400).json({
      message: 'Due date is required'
    });
  }

  const validPriorities = ['low', 'medium', 'high'];
  if (!priority || !validPriorities.includes(priority)) {
    return res.status(400).json({
      message: 'Priority must be one of: low, medium, or high'
    });
  }

  next();
}

module.exports = validateReq;
