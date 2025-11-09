const ordersService = require('../services/orderService');

// --- Get all orders ---
async function getAllOrders(req, res) {
  try {
    const query = req.query;
    const result = await ordersService.getAll(query);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error", message: e.message });
  }
}

// --- Get order by ID ---
async function getOrderById(req, res) {
  try {
    const id = req.params.id;
    const order = await ordersService.getById(id);
    if (!order) return res.status(404).json({ error: "Not Found", message: `Order with ID ${id} not found` });
    res.status(200).json(order);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// --- Get order by number ---
async function getOrderByNumber(req, res) {
  try {
    const number = req.params.number;
    const order = await ordersService.getByNumber(number);
    if (!order) return res.status(404).json({ error: "Not Found", message: `Order with number ${number} not found` });
    res.status(200).json(order);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// --- Create order (admin only) ---
async function createOrder(req, res) {
  try {
    const data = req.body;
    // Attach user ID from auth middleware
    data.user = req.user._id;
    const order = await ordersService.createOne(data);
    res.status(201).json(order);
  } catch (e) {
    res.status(400).json({ error: "Bad Request", message: e.message });
  }
}

// --- Update order (admin only) ---
async function updateOrder(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;
    const updated = await ordersService.updateOne(id, data);
    res.status(200).json(updated);
  } catch (e) {
    res.status(400).json({ error: "Bad Request", message: e.message });
  }
}

// --- Delete order (admin only) ---
async function deleteOrder(req, res) {
  try {
    const id = req.params.id;
    await ordersService.deleteOne(id);
    res.status(204).send();
  } catch (e) {
    res.status(400).json({ error: "Bad Request", message: e.message });
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  getOrderByNumber,
  createOrder,
  updateOrder,
  deleteOrder,
};
