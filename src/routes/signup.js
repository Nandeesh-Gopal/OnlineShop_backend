const express= require("express")
const router=express()
router.post("/signup",(req,res)=>{
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
    })})
