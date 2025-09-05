const express = require("express");
const { addToCart, fetchCart } = require("../services/cartService");

const router = express.Router();

router.post("/add", addToCart);
router.get("/fetch", fetchCart);

module.exports = router;
