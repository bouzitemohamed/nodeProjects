const Order = require('../models/order.model'); // adjust path if needed

//
// No cachedOrders or JSON load anymore
//

async function getAll(query = {}) {
  const mongoQuery = {};

  if (query.orderNumber) {
    mongoQuery.orderNumber = { 
      $regex: query.orderNumber, 
      $options: 'i' 
    };
  }

  if (query.status) {
    mongoQuery.status = query.status.toLowerCase();
  }

  if (query.fromDate) {
    mongoQuery.orderDate = { 
      ...mongoQuery.orderDate, 
      $gte: new Date(query.fromDate) 
    };
  }

  if (query.toDate) {
    mongoQuery.orderDate = { 
      ...mongoQuery.orderDate, 
      $lte: new Date(query.toDate) 
    };
  }

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Order.find(mongoQuery)
         .populate('items.product')    // ✅ populate products
         .skip(skip)
         .limit(limit),

    Order.countDocuments(mongoQuery)
  ]);

  const pages = Math.ceil(total / limit);

  return { total, page, pages, data };
}

async function getById(id) {
  return Order.findOne({ id: parseInt(id) })
              .populate('items.product');
}

async function getByNumber(orderNumber) {
  return Order.findOne({ orderNumber })
              .populate('items.product');
}



async function createOne(data) {
  const neworder = new Order(data);
  return neworder.save();
}

async function updateOne(id, data) {
  return Order.findOneAndUpdate(
    { id: parseInt(id) },
    data,
    { new: true }
  ).populate('items.product');
}

async function deleteOne(id) {
  return Order.findOneAndDelete({ id: parseInt(id) });
}

module.exports = {
  getAll,
  getById,
  getByNumber,
  createOne,
  updateOne,
  deleteOne
};
