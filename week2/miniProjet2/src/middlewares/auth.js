function auth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token || token !== process.env.API_TOKEN) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized - Invalid or missing token',
      code: 401,
      timestamp: new Date().toISOString()
    });
  }
  
  next();
}

module.exports = auth;