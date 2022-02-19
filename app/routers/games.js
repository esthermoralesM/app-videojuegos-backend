const express = require('express');
const routers = express.Router();
const mysqlConnection  = require('../../config/sql');


routers.get("/games",
        function(request, response){
            let sql;
            var id = request.query.id
            if(id==null)
            sql="SELECT * FROM games";
            else
            sql="SELECT * FROM games WHERE id="+id;
           
            mysqlConnection.query(sql, function(err, result){

                if(err)
                console.log(err);
                else{
                    response.send(result);
                }

            })
        });

        routers.post("/games",
        function(request, response){
            console.log(request.body)
            
           let sql="INSERT INTO games (title, description, image) VALUES ('" +request.body.title +"', '"+
                                                                                    request.body.description +"', '"+
                                                                                    request.body.image+"')";
            console.log(sql);
     
            mysqlConnection.query(sql, function(err, result){
        
                if(err)
                console.log(err);
                else{
         
                    if(result.insertId)
                    response.send(String(result.insertId));
          
                    else
                    response.send("-1");
                }
            })
        });

        routers.put("/games",
        function(request, response){
        
           
            let params=[request.body.title,
                request.body.description,
                request.body.image,
                request.body.id];
            
           let sql="UPDATE games SET title = COALESCE(?, title) ,"+
                    "description = COALESCE(?, description) ,"+
                    "image = COALESCE(?, image) WHERE id=?";
                                                                                  
                                                                                   
            console.log(sql);
          
            mysqlConnection.query(sql, params, function(err, result){
        
                if(err)
                console.log(err);
                else{
                    if(result.affectedRows==1){
                        response.send(String(result.affectedRows));
                        }
                       else
                       console.log(result)  
                }
            })
        });

        routers.delete("/games",
        function(request, response){
            var id = request.body.id;
            console.log(id);
           let sql="DELETE FROM games WHERE id="+id;


           mysqlConnection.query(sql, function(err, result){
    
                if(err)
                console.log(err);
                else{
                    if(result.affectedRows==1)
                    response.send(String(result.affectedRows));
                   else
                     response.send("0");
                }
            })


        });

 module.exports = routers;