const db = require("../config/db");

const placeOrder = (req, res) => {
  const { productid, productname, productprice, quantity, address, total, phone } = req.body;

  const sql = `
    INSERT INTO orders (productid, productname, productprice, quantity, address, total, phone)
    VALUES (?,?,?,?,?,?,?)`;

  db.query(sql, [productid, productname, productprice, quantity, address, total, phone], (err, result) => {
    if (err) {
      console.log("Error placing order:", err);
      return res.status(500).json({ message: "Error placing order" });
    }
    return res.json({ message: "Order placed successfully", orderId: result.insertId });
  });
};

module.exports = { placeOrder };
