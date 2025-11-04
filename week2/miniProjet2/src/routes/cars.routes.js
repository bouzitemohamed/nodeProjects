const express = require("express");
const router = express.Router();
const carsController = require('../controller/cars.controller');
const authMiddleware=require('../middlewares/auth');

// ✅ Routes for cars
router.get("/", carsController.getAll);   
router.get("/:id", carsController.getOne);  
router.post("/", carsController.createOne);  
router.put("/:id",authMiddleware, carsController.updateOne); 
router.delete("/:id",authMiddleware, carsController.deleteOne); 

module.exports = router;
