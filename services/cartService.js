const db = require("../config/db");

const addToCart = (req, res) => {
  const { cartid, productid, quantity } = req.body;
  const sql = "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?,?,?)";

  db.query(sql, [cartid, productid, quantity], (err) => {
    if (err) {
      console.log("Error in insertion", err);
      return res.status(500).json({ message: "Error adding to cart" });
    }
    return res.json({ message: "Product added to cart" });
  });
};

const fetchCart = (req, res) => {
  const cartid = req.query.cartid;
  if (!cartid) {
    return res.json([]);
  }

  const sql = `
    SELECT p.id, p.product, p.description, p.prize, ci.quantity
    FROM cart_items ci
    JOIN product p ON ci.product_id = p.id
    WHERE ci.cart_id = ?`;

  db.query(sql, [cartid], (err, result) => {
    if (err) {
      console.log("Error fetching cart:", err);
      return res.status(500).json({ message: "Error fetching cart items" });
    }
    return res.json(result);
  });
};

module.exports = { addToCart, fetchCart };
