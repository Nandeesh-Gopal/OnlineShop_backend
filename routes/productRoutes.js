const express=require("express")
const app=express.Router()
const {addproduct,fetchproduct}=require("../services/productService")
app.post("/add",addproduct)
app.get("/fetch",fetchproduct)
module.exports=app