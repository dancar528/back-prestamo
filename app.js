var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var sql = require('mssql');

var sqlConfig = {
  user: 'sa',
  password: 'Verano2018**',
  server: 'localhost',
  database: 'prestamo',
  port: '1401',
}

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.get('/clientes', function(req, res){

  sql.connect(sqlConfig, function(err){
    if (err)  {
    //  console.log(err);
    }

    var request = new sql.Request();
    request.query('select * from clientes', function(err, recorset){
      if (err) {
      //  console.log(err)
      }
      res.end(JSON.stringify(recorset));
      sql.close();
    })
  });
});

app.post('/clientes', function(req, res){

  sql.connect(sqlConfig, function(err){

    if (err)  {
    //  console.log(err);
    }

    var request = new sql.Request();
    request.query(`insert into clientes (identificacion, nombre, apellido) values ('${req.body.identificacion}', '${req.body.nombre}', '${req.body.apellido}')`, function(err, recorset){

      if (err) {
      //  console.log(err)
      }
      res.send(JSON.stringify(recorset));
      sql.close();
    })
  });
});

var server = app.listen(8081, function(){
  var host = server.address().address
  var port = server.address().port

  console.log("app listening at http://%s:%s", host, port)
})
