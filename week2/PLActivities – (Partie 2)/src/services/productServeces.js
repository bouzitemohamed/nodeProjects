const fs = require('fs');
const path = require('path');
const products = require('../data/products.json');

const filePath = path.join(__dirname, '..', 'data', 'products.json');

// Get all products
function getAll() {
  return products;
}

// Create a new product
function createOne(req) {
  const productsList = [...products]; // create a copy of the array
  const lastId = productsList.length > 0 ? productsList[productsList.length - 1].id : 0;

  const newProduct = {
    id: lastId + 1,
    name: req.body.name,
    price: req.body.price,
    dateCreation: new Date().toISOString(),
    category: req.body.category,
  };

  productsList.push(newProduct);

  const data = JSON.stringify(productsList, null, 2); // pretty JSON

  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error('❌ Error writing file:', err);
    } else {
      console.log('✅ products.json updated successfully at:', filePath);
    }
  });

  return newProduct;
}
function deleteOne(id) {
  const productId = parseInt(id);
  const isProduct = products.find(p => p.id === productId);

  if (!isProduct) {
    throw new Error(`Product with id=${id} not found`);
  }

  // Filter out the product to delete
  const newProductList = products.filter(p => p.id !== productId);

  // Convert to JSON
  const data = JSON.stringify(newProductList, null, 2);

  // Write updated list back to file
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error('❌ Error writing file:', err);
    } else {
      console.log('✅ products.json updated successfully at:', filePath);
    }
  });

  // Return the updated list
  return newProductList;
}

function updateOne(id, updateData) {
  const productId = parseInt(id);
  const productIndex = products.findIndex(p => p.id === productId);

  if (productIndex === -1) {
    throw new Error(`Product with id=${id} not found`);
  }

  // Merge existing product with new data
  const updatedProduct = {
    ...products[productIndex],
    ...updateData,
    dateCreation: products[productIndex].dateCreation // keep original dateCreation
  };

  products[productIndex] = updatedProduct;

  const data = JSON.stringify(products, null, 2);
  fs.writeFile(filePath, data, (err) => {
    if (err) console.error('❌ Error writing file:', err);
    else console.log('✅ products.json updated successfully at:', filePath);
  });

  return updatedProduct;
};
function filterProducts(query) {
  let products = getAllProducts();

  const { category, minPrice, maxPrice, sort } = query;

  if (category) {
    products = products.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (minPrice) {
    products = products.filter(p => p.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    products = products.filter(p => p.price <= parseFloat(maxPrice));
  }

  if (sort) {
    if (sort === 'asc') products.sort((a, b) => a.price - b.price);
    if (sort === 'desc') products.sort((a, b) => b.price - a.price);
  }

  return products;
}

module.exports = {
  getAll,
  createOne,
  deleteOne,
  updateOne,
  filterProducts
};
