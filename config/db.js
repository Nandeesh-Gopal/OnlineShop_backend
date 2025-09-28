const mysql=require("mysql2")
const db = mysql.createConnection({
    host: "mysql",
    user: "root",
    password: "helllo",
    database: "onlineshop",
    port: 3306
});


db.connect(err=>{
    if(err){
        console.log("db connection err:",err)
    }
    else{
        console.log("db connection success")
    }
})
module.exports=db;