const carService = require('../services/cars.service');

const getAllCars = async (req, res, next) => {
  try {
    const filters = req.query;
    const cars = await carService.getAllCars(filters);
    res.json(cars);
  } catch (error) {
    next(error);
  }
};

const getCarById = async (req, res, next) => {
  try {
    const car = await carService.getCarById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    next(error);
  }
};

const createCar = async (req, res, next) => {
  try {
    const { brand, model, category, plate, pricePerDay } = req.body;
    
    // Validation
    if (!brand || !model || !category || !plate || !pricePerDay) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (!['eco', 'sedan', 'suv', 'van'].includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    
    if (pricePerDay <= 0) {
      return res.status(400).json({ error: 'Price per day must be positive' });
    }
    
    const newCar = await carService.createCar(req.body);
    res.status(201).json(newCar);
  } catch (error) {
    next(error);
  }
};

const updateCar = async (req, res, next) => {
  try {
    const updatedCar = await carService.updateCar(req.params.id, req.body);
    if (!updatedCar) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(updatedCar);
  } catch (error) {
    next(error);
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const deleted = await carService.deleteCar(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
};