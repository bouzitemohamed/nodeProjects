const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/rentals.json");
let cache = null;

// ✅ Load rentals from file (cached)
function load() {
  if (!cache) {
    const raw = fs.readFileSync(dataPath, "utf8");
    cache = JSON.parse(raw);
  }
  return cache;
}

// ✅ Save cache to file
function save() {
  fs.writeFileSync(dataPath, JSON.stringify(cache, null, 2));
}

// ✅ Get all rentals (with filters & pagination)
function getAll(query) {
  let rentals = load();
  const { status, carId, customerEmail, page = 1, limit = 10 } = query;

  if (status) rentals = rentals.filter(r => r.status === status);
  if (carId) rentals = rentals.filter(r => String(r.carId) === String(carId));
  if (customerEmail)
    rentals = rentals.filter(r =>
      r.customer.email.toLowerCase().includes(customerEmail.toLowerCase())
    );

  const start = (page - 1) * limit;
  const paginated = rentals.slice(start, start + Number(limit));

  return {
    total: rentals.length,
    page: Number(page),
    limit: Number(limit),
    data: paginated,
  };
}

// ✅ Get one rental by ID
function getOne(id) {
  const rentals = load();
  return rentals.find(r => String(r.id) === String(id)) || null;
}

// ✅ Create a new rental
function createOne(data) {
  const rentals = load();
  const newRental = {
    id: rentals.length ? rentals[rentals.length - 1].id + 1 : 1,
    carId: data.carId,
    customer: {
      name: data.customer?.name || "Unknown",
      email: data.customer?.email || "unknown@example.com",
    },
    from: data.from,
    to: data.to,
    days: data.days,
    dailyRate: data.dailyRate,
    total: data.total,
    status: data.status || "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  rentals.push(newRental);
  save();
  return newRental;
}

// ✅ Update a rental
function updateOne(id, data) {
  const rentals = load();
  const index = rentals.findIndex(r => String(r.id) === String(id));
  if (index === -1) return null;

  rentals[index] = {
    ...rentals[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  save();
  return rentals[index];
}

// ✅ Delete a rental
function deleteOne(id) {
  const rentals = load();
  const index = rentals.findIndex(r => String(r.id) === String(id));
  if (index === -1) return false;

  rentals.splice(index, 1);
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
