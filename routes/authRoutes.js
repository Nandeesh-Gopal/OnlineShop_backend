const express=require("express")
const {signup,login} = require("../services/authService")
const app= express.Router()
app.post("/signup",signup)
app.post("/login",login)
module.exports=app;