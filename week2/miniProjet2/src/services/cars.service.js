const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/cars.json");
let cache = null;

// ✅ Load data (cached)
function load() {
  if (!cache) {
    const raw = fs.readFileSync(dataPath, "utf8");
    cache = JSON.parse(raw);
  }
  return cache;
}

// ✅ Save data
function save() {
  fs.writeFileSync(dataPath, JSON.stringify(cache, null, 2));
}

// ✅ Get all cars (with filters and pagination)
function getAll(query) {
  let cars = load();
  const { category, brand, available, page = 1, limit = 10 } = query;

  if (category) cars = cars.filter(c => c.category === category);
  if (brand) cars = cars.filter(c => c.brand.toLowerCase().includes(brand.toLowerCase()));
  if (available !== undefined)
    cars = cars.filter(c => String(c.available) === String(available));

  const start = (page - 1) * limit;
  const paginated = cars.slice(start, start + Number(limit));

  return {
    total: cars.length,
    page: Number(page),
    limit: Number(limit),
    data: paginated,
  };
}

// ✅ Get one car
function getOne(id) {
  const cars = load();
  return cars.find(c => String(c.id) === String(id)) || null;
}

// ✅ Create a new car
function createOne(data) {
  const cars = load();
  const newCar = {
    id: cars.length ? cars[cars.length - 1].id + 1 : 1,
    brand: data.brand,
    model: data.model,
    category: data.category,
    plate: data.plate,
    pricePerDay: data.pricePerDay,
    available: data.available ?? true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  cars.push(newCar);
  save();
  return newCar;
}

// ✅ Update a car
function updateOne(id, data) {
  const cars = load();
  const index = cars.findIndex(c => String(c.id) === String(id));
  if (index === -1) return null;

  cars[index] = {
    ...cars[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  save();
  return cars[index];
}

// ✅ Delete a car
function deleteOne(id) {
  const cars = load();
  const index = cars.findIndex(c => String(c.id) === String(id));
  if (index === -1) return false;

  cars.splice(index, 1);
  save();
  return true;
}

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  load,
};
