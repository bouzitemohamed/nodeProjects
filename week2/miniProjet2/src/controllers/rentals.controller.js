const rentalService = require('../services/rentals.service');

const getAllRentals = async (req, res, next) => {
  try {
    const filters = req.query;
    const rentals = await rentalService.getAllRentals(filters);
    res.json(rentals);
  } catch (error) {
    next(error);
  }
};

const getRentalById = async (req, res, next) => {
  try {
    const rental = await rentalService.getRentalById(req.params.id);
    if (!rental) {
      return res.status(404).json({ error: 'Rental not found' });
    }
    res.json(rental);
  } catch (error) {
    next(error);
  }
};

const createRental = async (req, res, next) => {
  try {
    const { carId, customer, from, to } = req.body;
    
    // Validation
    if (!carId || !customer || !from || !to) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (!customer.name || !customer.email) {
      return res.status(400).json({ error: 'Customer name and email are required' });
    }
    
    if (new Date(from) >= new Date(to)) {
      return res.status(400).json({ error: 'End date must be after start date' });
    }
    
    const newRental = await rentalService.createRental(req.body);
    res.status(201).json(newRental);
  } catch (error) {
    if (error.message.includes('not available') || error.message.includes('already rented')) {
      return res.status(409).json({ error: error.message });
    }
    next(error);
  }
};

const returnRental = async (req, res, next) => {
  try {
    const updatedRental = await rentalService.returnRental(req.params.id);
    if (!updatedRental) {
      return res.status(404).json({ error: 'Rental not found' });
    }
    res.json(updatedRental);
  } catch (error) {
    next(error);
  }
};

const cancelRental = async (req, res, next) => {
  try {
    const cancelledRental = await rentalService.cancelRental(req.params.id);
    if (!cancelledRental) {
      return res.status(404).json({ error: 'Rental not found' });
    }
    res.json(cancelledRental);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRentals,
  getRentalById,
  createRental,
  returnRental,
  cancelRental
};