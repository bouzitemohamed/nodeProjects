const express=require('express');
const morgan=require('morgan');
const carsRoutes = require("./routes/cars.routes");
const rentalsRoutes = require("./routes/rentals.routes");
const loggerMidleware=require('./middlewares/logger');
const authRoutes=require("./routes/auth.routes");
const handelError=require('./middlewares/handelError');
const app=express();
app.use(morgan('dev'));
app.use(express.json());
//app.use(loggerMidleware);
app.use("/api/cars", carsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/rentals", rentalsRoutes);
app.use(handelError)
module.exports = app;
