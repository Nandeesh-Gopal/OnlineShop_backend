const db=require("../config/db.js")
const jwt = require("jsonwebtoken");
const signup=(req,res)=>{
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
}
const login=(req,res)=>{
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
                "secretkey",
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
}
module.exports={login,signup};
