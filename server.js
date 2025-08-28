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
            console.log("product fetch success")
            res.json(result)
        }
    })
})
app.post("/add-to-cart",(req,res)=>{
    const {cart_id,product_id,quantity}=req.body
    const sql="insert into cart_items (cart_id,product_id,quantity) values(?,?,?)"
    db.query(sql,[cart_id,product_id,quantity],)
})
app.listen(5000,()=>{
    console.log("server created")
})