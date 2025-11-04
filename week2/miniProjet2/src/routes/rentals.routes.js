const express = require("express");
const router = express.Router();
const rentalsController = require('../controller/rentals.controller');
router.get("/", rentalsController.getAll);
router.get("/:id", rentalsController.getOne);
router.post("/", rentalsController.createOne);
router.put("/:id", rentalsController.updateOne);
router.delete("/:id", rentalsController.deleteOne);

module.exports = router;
