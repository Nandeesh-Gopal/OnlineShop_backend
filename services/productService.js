const db=require("../config/db.js")
const addproduct=(req,res)=>{
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
}
const fetchproduct=(req,res)=>{
    const sql="select * from product"
    db.query(sql,(err,result)=>{
        if(err){
            console.log("err in fetch products details from db",err)
        }
        else{
            res.json(result)
        }
    })
}
module.exports={addproduct,fetchproduct}