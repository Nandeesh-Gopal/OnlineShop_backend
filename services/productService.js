const db = require("../config/db");

const addProduct = (req, res) => {
  const { product, description, prize } = req.body;
  const sql = "INSERT INTO product (product, description, prize) VALUES (?,?,?)";

  db.query(sql, [product, description, prize], (err) => {
    if (err) {
      console.log("err in insertion", err);
      return res.json({ message: "err in insertion" });
    }
    console.log("insertion success");
    res.json({ message: "success" });
  });
};

const getAllProducts = (req, res) => {
  const sql = "SELECT * FROM product";
  db.query(sql, (err, result) => {
    if (err) {
      console.log("err in fetch products", err);
      return res.json({ message: "error in fetching products" });
    }
    res.json(result);
  });
};

const getProductById = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM product WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("err in fetch the product", err);
      return res.json({ message: "err in fetching the product" });
    }
    if (result.length === 0) {
      return res.json({ message: "product not found" });
    }
    res.json(result[0]);
  });
};
const searchProducts = (req, res) => {
  const { q = "", min, max } = req.query;

  let sql = "SELECT * FROM product WHERE 1=1";
  const params = [];

  if (q) {
    sql += " AND (product LIKE ? OR description LIKE ?)";
    const like = `%${q}%`;
    params.push(like, like);
  }

  if (min) {
    sql += " AND prize >= ?";
    params.push(Number(min));
  }

  if (max) {
    sql += " AND prize <= ?";
    params.push(Number(max));
  }

  db.query(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(rows);
  });
};


module.exports = { addProduct, getAllProducts, getProductById ,searchProducts};
