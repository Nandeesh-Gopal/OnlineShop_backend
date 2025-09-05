const express = require("express");
const { placeOrder } = require("../services/orderService");

const router = express.Router();

router.post("/place", placeOrder);

module.exports = router;
