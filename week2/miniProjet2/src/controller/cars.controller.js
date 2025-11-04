const sendJson = require("../utils/sendJson");
const carService = require("../services/cars.service");

function getAll(req, res) {
  try {
    const result = carService.getAll(req.query);
    sendJson(res, 200, result);
  } catch (e) {
    sendJson(res, 500, e.message);
  }
}

function getOne(req, res) {
  try {
    const car = carService.getOne(req.params.id);
    if (!car) return sendJson(res, 404, null);
    sendJson(res, 200, car);
  } catch (e) {
    sendJson(res, 500, e.message);
  }
}

function createOne(req, res) {
  try {
    const newCar = carService.createOne(req.body);
    sendJson(res, 201, newCar);
  } catch (e) {
    sendJson(res, 500, e.message);
  }
}

function updateOne(req, res) {
  try {
    const updatedCar = carService.updateOne(req.params.id, req.body);
    if (!updatedCar) return sendJson(res, 404, null);
    sendJson(res, 200, updatedCar);
  } catch (e) {
    sendJson(res, 500, e.message);
  }
}

function deleteOne(req, res) {
  try {
    const deleted = carService.deleteOne(req.params.id);
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
