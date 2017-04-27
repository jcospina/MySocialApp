/**
 * Created by juanospina on 26/04/17.
 */
'use strict';
/*
 Se carga el módulo express
 */
var express = require('express');
/*
 Se carga el módulo body-parser
 */
var bodyParser = require('body-parser');

//Creamos una instancia de express
var app = express();

//--------------------------RUTAS----------------------------

var userApi = require('./routes/user');

//-----------------------------------------------------------

//-----------------------Configuración del Middleware--------------------------

//El tipo de parámetros que va a recibir
app.use(bodyParser.urlencoded({extended: false}));
//Se indica que trate los parámetros como un json y lo devuelva como un objeto javascript
app.use(bodyParser.json());

/*
 Para realizar la configuración de cabeceras y CORS para permitir peticiones desde el cliente REST
 */
app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
    response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

//indica a express que todas las rutas empezarán con /api y estarán en el objeto api
app.use('/api', userApi);


//--------------------------------------------------------------------------------

/*
 Se añade esta línea para indicar que se puede exportar el objeto app a otros ficheros
 */
module.exports = app;

app.get('/', function (request, response) {
    response.status(200).send("Servidor funcionando");
});