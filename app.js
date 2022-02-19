const express = require('express');
const app = express();
const mysqlConnection  = require('./config/sql');
const cors = require ('cors');

//Routers
const games = require('./app/routers/games');

// Settings
let port = process.env.PORT||3000;

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


//Rutas --
app.use(games);

app.listen(port);