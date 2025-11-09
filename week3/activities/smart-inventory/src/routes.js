const express = require('express');
const router = express.Router();
const productsController = require('./controllers/productController');
const ordersController = require('./controllers/orderController');
const authController = require('./controllers/authController');
const loginLimiter=require('./middlewares/loginLimiter');
const auth = require('./middlewares/auth');

// --- Health ---
router.get('/health', (req, res) => {
  res.json({ status: "ok", uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// --- Auth ---
router.post('/api/auth/register', authController.registerUser);
router.post('/api/auth/login',loginLimiter, authController.loginUser);

// --- Products ---
router.get('/api/products', productsController.getAllProduct);
router.get('/api/products/:id', productsController.getProductByid);
router.get('/api/products/sku/:sku', productsController.getProductBySku);
router.get('/api/products/category/:category', productsController.getProductByCategory);

// Protected Product Routes
router.post('/api/products', auth.auth, auth.authorize('admin'), productsController.createProduct);
router.put('/api/products/:id', auth.auth, auth.authorize('admin'), productsController.updateProduct);
router.delete('/api/products/:id', auth.auth, auth.authorize('admin'), productsController.deleteProduct);

// Export products
//router.get('/api/export.gz', productsController.exportProducts);

// --- Orders ---
router.get('/api/orders', ordersController.getAllOrders);
router.get('/api/orders/:id', ordersController.getOrderById);
router.get('/api/orders/number/:number', ordersController.getOrderByNumber);

// Protected Order Routes
router.post('/api/orders', auth.auth, auth.authorize('admin'), ordersController.createOrder);
router.put('/api/orders/:id', auth.auth, auth.authorize('admin'), ordersController.updateOrder);
router.delete('/api/orders/:id', auth.auth, auth.authorize('admin'), ordersController.deleteOrder);
//dashbord
// routes.js or in your Express router file

router.get(
  '/api/dashboard',
  auth.auth, // first check token
  auth.authorize('admin', 'manager'), // only these roles allowed
  (req, res) => {
    res.json({
      message: `Welcome to the dashboard, ${req.user.name}!`,
      user: { name: req.user.name, role: req.user.role }
    });
  }
);



module.exports = router;
