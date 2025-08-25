const express =require("express")
const cors =require("cors")
const mysql=require("mysql2")
const { connection } = require("mongoose")
const app=express()
app.use(cors())
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
        console.log("err:",err)
    }
    else{
        console.log("success")
    }
})
app.use("/signup",require("./src/routes/signup.js"))
app.post("/signup",(req,res)=>{
    const {name,email,password,phonenumber}=req.body
    const sql="insert into users (name,email,password,phonenumber) values (?,?,?,?)"
    db.query(sql,[name,email,password,phonenumber],(err,results)=>{
        if(err){
            console.log("some err",err)
            res.json({message:"Duplicate entry"})
        }
        else{
            console.log("user inserted",results.insertId)
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
            console.log("Login successfull")
            res.json({message:"Login success"})
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
app.listen(5000,()=>{
    console.log("server created")
})