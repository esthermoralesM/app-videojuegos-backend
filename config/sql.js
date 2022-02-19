const mysql=require("mysql2");

const  mysqlConnection=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "videojuegos"
});

mysqlConnection.connect(function(error){
    if(error){
        console.log(error);
    }else{
        console.log("conexión correcta");
    }
});

module.exports = mysqlConnection;