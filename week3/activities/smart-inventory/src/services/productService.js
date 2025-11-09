const Product = require('../models/product.model'); // adjust the path if needed

// No more cachedProducts or JSON load
function loadProducts() {
  return Product.find();
}

async function getAll(query = {}) {
  const mongoQuery = {};

  if (query.q) {
    mongoQuery.name = { $regex: query.q, $options: 'i' };
  }

  if (query.category) {
    mongoQuery.category = query.category.toLowerCase();
  }

  if (query.minPrice) {
    mongoQuery.price = { ...mongoQuery.price, $gte: parseFloat(query.minPrice) };
  }

  if (query.maxPrice) {
    mongoQuery.price = { ...mongoQuery.price, $lte: parseFloat(query.maxPrice) };
  }

  if (query.inStock) {
    mongoQuery.inStock = query.inStock.toLowerCase() === 'true';
  }

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Product.find(mongoQuery).skip(skip).limit(limit),
    Product.countDocuments(mongoQuery)
  ]);

  const pages = Math.ceil(total / limit);

  return { total, page, pages, data };
}

async function getById(id) {
  return Product.findOne({ id: parseInt(id) });
}

async function getBySku(sku) {
  return Product.findOne({ sku });
}

async function getByCategory(category) {
  return Product.find({ category: category.toLowerCase() });
}

function getRawData() {
  return Product.find();
}



// Create a new product
async function createOne(data) {
  const product = new Product(data);
  return product.save();
}

// Update a product by id (the numeric id, not Mongo _id)
async function updateOne(id, data) {
  return Product.findOneAndUpdate(
    { id: parseInt(id) },
    data,
    { new: true } // return updated document
  );
}

// Delete a product by id
async function deleteOne(id) {
  return Product.findOneAndDelete({ id: parseInt(id) });
}

module.exports = {
  getAll,
  getById,
  getBySku,
  getByCategory,
  getRawData,
  createOne,
  updateOne,
  deleteOne
};
