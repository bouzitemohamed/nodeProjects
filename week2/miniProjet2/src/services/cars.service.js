const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../data/cars.json');

const readCarsFromFile = async () => {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
};

const writeCarsToFile = async (cars) => {
  await fs.writeFile(dataPath, JSON.stringify(cars, null, 2));
};

const generateId = (cars) => {
  const maxId = cars.reduce((max, car) => Math.max(max, parseInt(car.id) || 0), 0);
  return (maxId + 1).toString();
};

const getAllCars = async (filters = {}) => {
  let cars = await readCarsFromFile();
  
  const { category, available, minPrice, maxPrice, q } = filters;
  
  if (category) cars = cars.filter(car => car.category === category);
  if (available !== undefined) cars = cars.filter(car => car.available === (available === 'true'));
  if (minPrice) cars = cars.filter(car => car.pricePerDay >= parseFloat(minPrice));
  if (maxPrice) cars = cars.filter(car => car.pricePerDay <= parseFloat(maxPrice));
  if (q) {
    const searchTerm = q.toLowerCase();
    cars = cars.filter(car => 
      car.plate.toLowerCase().includes(searchTerm) || 
      car.model.toLowerCase().includes(searchTerm)
    );
  }
  
  return cars;
};

const getCarById = async (id) => {
  const cars = await readCarsFromFile();
  return cars.find(car => car.id === id);
};

const createCar = async (carData) => {
  const cars = await readCarsFromFile();
  const now = new Date().toISOString();
  
  // Check if plate already exists
  const existingCar = cars.find(car => car.plate === carData.plate);
  if (existingCar) {
    throw new Error('Car with this plate already exists');
  }
  
  const newCar = {
    id: generateId(cars),
    brand: carData.brand,
    model: carData.model,
    category: carData.category,
    plate: carData.plate,
    pricePerDay: parseFloat(carData.pricePerDay),
    available: true,
    createdAt: now,
    updatedAt: now
  };
  
  cars.push(newCar);
  await writeCarsToFile(cars);
  return newCar;
};

const updateCar = async (id, updateData) => {
  const cars = await readCarsFromFile();
  const carIndex = cars.findIndex(car => car.id === id);
  
  if (carIndex === -1) return null;
  
  const updatedCar = { 
    ...cars[carIndex],
    ...updateData,
    updatedAt: new Date().toISOString()
  };
  
  cars[carIndex] = updatedCar;
  await writeCarsToFile(cars);
  return updatedCar;
};

const deleteCar = async (id) => {
  const cars = await readCarsFromFile();
  const carIndex = cars.findIndex(car => car.id === id);
  
  if (carIndex === -1) return false;
  
  cars.splice(carIndex, 1);
  await writeCarsToFile(cars);
  return true;
};

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
};