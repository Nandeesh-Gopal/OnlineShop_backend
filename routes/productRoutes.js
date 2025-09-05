const express = require("express");
const { addProduct, getAllProducts, getProductById } = require("../services/productService");

const router = express.Router();

router.post("/add", addProduct);
router.get("/all", getAllProducts);
router.get("/buy/:id", getProductById);

module.exports = router;
