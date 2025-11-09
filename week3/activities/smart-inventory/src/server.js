const express = require('express');
const helmet=require('helmet');
const cors=require('cors');
require('dotenv').config();
const connectToMongoDb = require('../config/database');
const routes = require('./routes'); // new Express router

const app = express();
const PORT = process.env.PORT;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors({origin:CORS_ORIGIN}));

// Use your routes
app.use(routes);

async function start() {
  try {
    await connectToMongoDb(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

start();
