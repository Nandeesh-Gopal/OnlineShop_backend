const mysql=require("mysql2")
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
module.exports=db;