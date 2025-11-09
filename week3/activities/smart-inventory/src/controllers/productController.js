const productsService = require('../services/productService');

// --- Get all products ---
async function getAllProduct(req, res) {
  try {
    const query = req.query;
    const result = await productsService.getAll(query);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error", message: e.message });
  }
}

// --- Get product by ID ---
async function getProductByid(req, res) {
  try {
    const id = req.params.id;
    const product = await productsService.getById(id);
    if (!product) return res.status(404).json({ error: "Not Found", message: `Product with ID ${id} not found` });
    res.status(200).json(product);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// --- Get product by SKU ---
async function getProductBySku(req, res) {
  try {
    const sku = req.params.sku;
    const product = await productsService.getBySku(sku);
    if (!product) return res.status(404).json({ error: "Not Found", message: `Product with SKU ${sku} not found` });
    res.status(200).json(product);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// --- Get product by category ---
async function getProductByCategory(req, res) {
  try {
    const category = req.params.category;
    const data = await productsService.getByCategory(category);
    if (!data || data.length === 0) return res.status(404).json({ error: "Not Found", message: `No products found in category ${category}` });
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// --- Create product (admin only) ---
async function createProduct(req, res) {
  try {
    const data = req.body;
    const product = await productsService.createOne(data);
    res.status(201).json(product);
  } catch (e) {
    res.status(400).json({ error: "Bad Request", message: e.message });
  }
}

// --- Update product (admin only) ---
async function updateProduct(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;
    const updated = await productsService.updateOne(id, data);
    res.status(200).json(updated);
  } catch (e) {
    res.status(400).json({ error: "Bad Request", message: e.message });
  }
}

// --- Delete product (admin only) ---
async function deleteProduct(req, res) {
  try {
    const id = req.params.id;
    await productsService.deleteOne(id);
    res.status(204).send();
  } catch (e) {
    res.status(400).json({ error: "Bad Request", message: e.message });
  }
}

module.exports = {
  getAllProduct,
  getProductByid,
  getProductBySku,
  getProductByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};
