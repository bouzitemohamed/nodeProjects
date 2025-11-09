const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'electronics',
      'furniture',
      'clothing',
      'tools',
      'books'
    ]
  },
  price: {
    type: Number,
    required: true
  },
  inStock: {
    type: Boolean,
    required: true
  }
},
{ timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
