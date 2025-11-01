const sendJson = require('../utils/sendJson');
const productServices = require('../services/productServeces');

const getAllProducts = (req, res) => {
    try {
        const products = productServices.getAll();
        sendJson(res, 200, products);
    } catch (e) {
        sendJson(res, 400, e.message);
    }
};
exports.getFilteredProducts = (req, res) => {
  const products = productServices.filterProducts(req.query);

  console.log(`🛠️ Requête : ${req.originalUrl}`);
  console.log(`📦 ${products.length} produits trouvés`);

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: products
  });
};
const createProduct = (req, res) => {
  try {
    const newProduct = productServices.createOne(req);
    sendJson(res, 201, newProduct);
  } catch (e) {
    sendJson(res, 400, e.message);
  }
};
const deleteProduct = (req, res) => {
  try {
    const id = req.params.id;
    const updatedList = productServices.deleteOne(id);
    sendJson(res, 204, updatedList);
  } catch (e) {
    sendJson(res, 404, e.message);
  }
};
const updateProduct = (req, res) => {
  try {
    const id = req.params.id;
    const updatedProduct = productServices.updateOne(id, req.body);
    sendJson(res, 200, updatedProduct);
  } catch (e) {
    sendJson(res, 404, e.message);
  }
};
module.exports = {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getFilteredProducts
};
