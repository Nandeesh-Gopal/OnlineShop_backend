const express =require("express")
const cors =require("cors")
const mysql=require("mysql2")
const jwt =require("jsonwebtoken")
const app=express()
const authRoutes=require("./routes/authRoutes")
const productRoutes=require("./routes/productRoutes")
app.use(cors({
    origin:"http://localhost:3000"
}))
app.use(express.json())
const db=require("./config/db.js")

app.use("/auth",authRoutes)
app.use("/product",productRoutes)

app.post("/add-to-cart",(req,res)=>{
    const {cartid,productid,quantity}=req.body
    const sql="insert into cart_items (cart_id,product_id,quantity) values(?,?,?)"
    db.query(sql,[cartid,productid,quantity],err=>{
        if(err){
            console.log("Error in insertion")
            res.json({message:"Error adding to cart"})
        }
        else{
            res.json({message:"product added to cart"})
        }
    })
})
app.get("/fetch-cart",(req,res)=>{
    const cartid=req.query.cartid
    if(!cartid){
        return res.json([])
    }
    const sql=`select p.id,p.product, p.description, p.prize, ci.quantity 
                from cart_items ci 
                join product p on ci.product_id = p.id 
                where ci.cart_id =?`
    db.query(sql,[cartid],(err,result)=>{
        if(err){
            console.log(err);
            return res.json({message:"err in fetching cart items"})
        }
        res.json(result);
    })
})
app.post("/place-order", (req, res) => {
  const { productid, productname, productprice, quantity, address, total, phone } = req.body;

  db.query(
    "INSERT INTO orders (productid, productname, productprice, quantity, address, total, phone) VALUES (?,?,?,?,?,?,?)",
    [productid, productname, productprice, quantity, address, total, phone],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Error placing order" });
      } else {
        res.json({ message: "Order placed successfully", orderId: result.insertId });
      }
    }
  );
});

app.get("/fetch-product-to-buy/:id",(req,res)=>{
    const id=req.params.id;
    const sql="select * from product where id=?";
    db.query(sql,[id],(err,result)=>{
        if(err){
            console.log("err in fetch the product",err);
            return res.json({message:"err in fetching the product"})
        }
        if(result.length===0){
            console.log("invalid product id")
            return res.json({message:"product not found in the database"})
        }
        res.json(result[0]);
    })
})

app.listen(5000,()=>{
    console.log("server created")
})