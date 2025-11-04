const sendJson = require('../utils/sendJson');
const rentalService = require("../services/rentals.service");

function getAll(req, res) {
  try {
    const result = rentalService.getAll(req.query);
    sendJson(res, 200, result);
  } catch (e) {
    sendJson(res, 500, e.message);
  }
}

function getOne(req, res) {
  try {
    const rental = rentalService.getOne(req.params.id);
    if (!rental) return sendJson(res, 404, null);
    sendJson(res, 200, rental);
  } catch (e) {
    sendJson(res, 500, e.message);
  }
}

function createOne(req, res) {
  try {
    const newRental = rentalService.createOne(req.body);
    sendJson(res, 201, newRental);
  } catch (e) {
    sendJson(res, 500, e.message);
  }
}

function updateOne(req, res) {
  try {
    const updated = rentalService.updateOne(req.params.id, req.body);
    if (!updated) return sendJson(res, 404, null);
    sendJson(res, 200, updated);
  } catch (e) {
    sendJson(res, 500, e.message);
  }
}

function deleteOne(req, res) {
  try {
    const deleted = rentalService.deleteOne(req.params.id);
    if (!deleted) return sendJson(res, 404, null);
    sendJson(res, 204);
  } catch (e) {
    sendJson(res, 500, e.message);
  }
}

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
