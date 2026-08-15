const {getProducts, getProduct, createProduct } = require("../controllers/fakeStoreController.js");
const express = require("express");
const router = express.Router();

//get all products
router.get("/", getProducts);

//get product by id
router.get("/:id", getProduct);

//create product
router.post("/", createProduct);

module.exports = router;