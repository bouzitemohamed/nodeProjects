const fs = require('fs').promises;
const path = require('path');

const rentalsPath = path.join(__dirname, '../data/rentals.json');
const carsPath = path.join(__dirname, '../data/cars.json');

const readRentalsFromFile = async () => {
  try {
    const data = await fs.readFile(rentalsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
};

const readCarsFromFile = async () => {
  try {
    const data = await fs.readFile(carsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
};

const writeRentalsToFile = async (rentals) => {
  await fs.writeFile(rentalsPath, JSON.stringify(rentals, null, 2));
};

const writeCarsToFile = async (cars) => {
  await fs.writeFile(carsPath, JSON.stringify(cars, null, 2));
};

const generateId = (rentals) => {
  const maxId = rentals.reduce((max, rental) => Math.max(max, parseInt(rental.id) || 0), 0);
  return (maxId + 1).toString();
};

// Check if dates overlap
const overlaps = (aFrom, aTo, bFrom, bTo) => {
  return aFrom < bTo && bFrom < aTo;
};

// Calculate days between dates
const calculateDays = (from, to) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const timeDiff = toDate.getTime() - fromDate.getTime();
  return Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
};

const getAllRentals = async (filters = {}) => {
  let rentals = await readRentalsFromFile();
  
  const { status, carId } = filters;
  
  if (status) rentals = rentals.filter(rental => rental.status === status);
  if (carId) rentals = rentals.filter(rental => rental.carId === carId);
  
  return rentals;
};

const getRentalById = async (id) => {
  const rentals = await readRentalsFromFile();
  return rentals.find(rental => rental.id === id);
};

const createRental = async (rentalData) => {
  const rentals = await readRentalsFromFile();
  const cars = await readCarsFromFile();
  const now = new Date().toISOString();
  
  const car = cars.find(c => c.id === rentalData.carId);
  if (!car) {
    throw new Error('Car not found');
  }
  
  if (!car.available) {
    throw new Error('Car is not available for rental');
  }
  
  // Check for overlapping rentals
  const overlappingRental = rentals.find(rental => 
    rental.carId === rentalData.carId && 
    rental.status === 'active' &&
    overlaps(
      new Date(rental.from),
      new Date(rental.to),
      new Date(rentalData.from),
      new Date(rentalData.to)
    )
  );
  
  if (overlappingRental) {
    throw new Error('Car is already rented during this period');
  }
  
  const days = calculateDays(rentalData.from, rentalData.to);
  const total = days * car.pricePerDay;
  
  const newRental = {
    id: generateId(rentals),
    carId: rentalData.carId,
    customer: rentalData.customer,
    from: rentalData.from,
    to: rentalData.to,
    days: days,
    dailyRate: car.pricePerDay,
    total: parseFloat(total.toFixed(2)),
    status: 'active',
    createdAt: now,
    updatedAt: now
  };
  
  // Mark car as unavailable
  car.available = false;
  car.updatedAt = now;
  
  rentals.push(newRental);
  await writeRentalsToFile(rentals);
  await writeCarsToFile(cars);
  
  return newRental;
};

const returnRental = async (id) => {
  const rentals = await readRentalsFromFile();
  const cars = await readCarsFromFile();
  const now = new Date().toISOString();
  
  const rentalIndex = rentals.findIndex(rental => rental.id === id);
  if (rentalIndex === -1) return null;
  
  const rental = rentals[rentalIndex];
  if (rental.status !== 'active') {
    throw new Error('Rental is not active');
  }
  
  // Mark car as available
  const car = cars.find(c => c.id === rental.carId);
  if (car) {
    car.available = true;
    car.updatedAt = now;
  }
  
  const updatedRental = {
    ...rental,
    status: 'returned',
    updatedAt: now
  };
  
  rentals[rentalIndex] = updatedRental;
  
  await writeRentalsToFile(rentals);
  await writeCarsToFile(cars);
  
  return updatedRental;
};

const cancelRental = async (id) => {
  const rentals = await readRentalsFromFile();
  const cars = await readCarsFromFile();
  const now = new Date().toISOString();
  
  const rentalIndex = rentals.findIndex(rental => rental.id === id);
  if (rentalIndex === -1) return null;
  
  const rental = rentals[rentalIndex];
  if (rental.status !== 'active') {
    throw new Error('Only active rentals can be cancelled');
  }
  
  // Mark car as available
  const car = cars.find(c => c.id === rental.carId);
  if (car) {
    car.available = true;
    car.updatedAt = now;
  }
  
  const updatedRental = {
    ...rental,
    status: 'cancelled',
    updatedAt: now
  };
  
  rentals[rentalIndex] = updatedRental;
  
  await writeRentalsToFile(rentals);
  await writeCarsToFile(cars);
  
  return updatedRental;
};

module.exports = {
  getAllRentals,
  getRentalById,
  createRental,
  returnRental,
  cancelRental
};