const express =require("express")
const cors =require("cors")
const mysql=require("mysql2")
const jwt =require("jsonwebtoken")
const app=express()

app.use(cors({
    origin:"http://localhost:3000"
}))
app.use(express.json())

const db =mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"",
        database:"onlineShop",
        port:3308
    }
)
db.connect(err=>{
    if(err){
        console.log("db connection err:",err)
    }
    else{
        console.log("db connection success")
    }
})
app.post("/signup",(req,res)=>{
    const {name,email,password,phonenumber}=req.body
    const sql="insert into users (name,email,password,phonenumber) values (?,?,?,?)"
    db.query(sql,[name,email,password,phonenumber],(err,results)=>{
        if(err){
            console.log("some err",err)
            res.json({message:"Duplicate entry"})
        }
        else{
            const sql ="insert into cart (user_id) values(?)"
            db.query(sql,[results.insertId],(err)=>{
                if(err){
                    console.log("err in creation of cart",err)
                }
                else{
                    console.log("success in adding cart")
                }
            })
            res.json({message:"success"})
        }
    })
})
app.post("/login",(req,res)=>{
    console.log("in backend")
    const {email,password}=req.body
    const sql="Select * from users where email= ? and password=?"
    db.query(sql,[email,password],(err,results)=>{
        if(err){
            console.log("db err:",err)
            res.json({message:"db err"})
        }
        if(results.length===1){
            const user=results[0]
            const token =jwt.sign(
                {id : user.id},
                "process.env.secretkey",
                {expiresIn:"1d"}
            )
            console.log("Login successfull")
            const sql="select id from cart where user_id=?"
            db.query(sql,[user.id],(err,cresults)=>{
                if(err){
                    console.log("fetching cart is err",err)
                }
                    const cart_id=cresults.length ?cresults[0].id:null
                    res.json({message:"Login success",token,userid:user.id,cart_id})
                })
        }
        else{
            console.log(err)
            res.json({message:"Invalid Credentials"})
        }
    })
})
app.post("/product",(req,res)=>{
    const {product,description,prize}=req.body
    const sql="insert into product (product,description,prize) values(?,?,?)"
    db.query(sql,[product,description,prize],(err)=>{
        if(err){
            console.log("err in insertion",err)
            res.json({message:"err in insertion"})
        }
        else{
            console.log("insertion sucsess")
            res.json({message:"success"})
        }
    })
})
app.get("/products",(req,res)=>{
    const sql="select * from product"
    db.query(sql,(err,result)=>{
        if(err){
            console.log("err in fetch products details from db",err)
        }
        else{
            res.json(result)
        }
    })
})
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
        res.json([])
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
  const { productId, productName, price, quantity, address, total } = req.body;

  db.query(
  "INSERT INTO orders (product_id, product_name, product_price, quantity, address, total) VALUES (?,?,?,?,?,?)",
  [order.productid, order.productname, order.productprice, order.quantity, order.address, order.total],
  (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send({ message: "Order placed successfully", orderId: result.insertId });
    }
  }
);

});

app.listen(5000,()=>{
    console.log("server created")
})