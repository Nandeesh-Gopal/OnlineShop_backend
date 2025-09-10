const express = require("express");
const { addProduct, getAllProducts, getProductById,searchProducts} = require("../services/productService");

const router = express.Router();

router.post("/add", addProduct);
router.get("/all", getAllProducts);
router.get("/buy/:id", getProductById);
router.get("/search",searchProducts)
module.exports = router;
