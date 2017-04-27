/**
 * Created by juanospina on 26/04/17.
 */
'use strict';

/*
 Para configurar MongoDB desde NodeJS, primero se carga la librería de Mongoose
 */
var mongoose = require('mongoose');
/*
 Carga la configuración de express disponible en el archivo app.js. El archivo app.js debe tener la configuración module.exports
 */
var app = require('./app');

/*
 Verifica si existe una variable de entorno para el puerto, de lo contrario usa un valor definido por el usuario
 */
var port = process.env.PORT || 3366;


/*
 Una vez cargada la librería, se procede a conectarse a al servidor de Mongo que por defecto se inicia en el puerto 27017 y se indica en la url la base de datos a la cual nos queremos conectar.
 Para que el servidor NodeJs se inicie solo cuando se ha realizado la conexión correctamente a la base de datos, se incluye el app.listen dentro del callback de mongoose
 */
mongoose.connect('mongodb://localhost:27017/social-app', (err, response) => {
    //Si hay error lanza una excepción, de lo contrario lanza el servidor
    if (err) {
        throw err;
    } else {
        console.log("Conexión a MongoDB exitosa");
        app.listen(port, function () {
            console.log(`API Rest Favoritos funcionando en http://localhost:${port}`);
        });
    }
});


