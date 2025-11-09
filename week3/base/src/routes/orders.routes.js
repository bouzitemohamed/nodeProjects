const express = require('express');
const ordersController = require('../controllers/orders.controller');
const auhMiddleware=require('../middlewares/auth');
const authorize=require('../middlewares/authorize');
const router = express.Router();
router.get('/', ordersController.getOrders);
router.get('/:id', ordersController.getOrder);
router.post('/', ordersController.createOrder);
/*router.put('/:id', ordersController.updateOrder);
router.delete('/:id', ordersController.deleteOrder);*/
module.exports = router;
