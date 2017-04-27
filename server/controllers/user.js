/**
 * Created by juanospina on 26/04/17.
 */
'use strict';


var controller = {};
/*
 Se carga el modelo en el controlador. En este caso Favorito actúa como un tipo de dato del cual se pueden crear instancias
 */
var User = require('../models/user');


/*
 Para obtener un usuario a partir de su id
 */
controller.getUser = function (request, response) {
    response.status(200).send("Hello");
}
/*
 Para crear un usuario
 */
controller.createUser = function (request, response) {
    //Se crea un favorito vacío
    var user = new User();
    //recibir parámetros recibidos por POST
    var params = request.body;
    //Se cargan los parámetros recibidos en el objeto favorito
    user.email = params.email;
    user.name = params.name;
    user.password = params.password;

    /*
     Para guardar se usa el método save que recibe como parámetro una función de callback. Esta función acepta dos parámetros: err (indica si hay un error) y data (cuando se almacena de forma correcta)
     */
    user.save((err, data) => {
        if (err) {
            //500 se refiere a error en el servidor
            res.status(500).send({message: 'Error al crear el usuario'})
        } else {
            response.status(200).send(data);
        }
    });
}


module.exports = {
    controller
};