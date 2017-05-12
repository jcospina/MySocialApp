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
controller.getUsers = function (request, response) {
    User.find((err, data) => {
        if (!err) {
            response.status(200).send(data);
        } else {
            response.status(500).send({message: 'Se produjo un error'})
        }
    });
}

controller.getUser = function (request, response) {
    var id = request.params.id;
    User.findOne({_id: id}, (err, data) => {
        if (!err) {
            response.status(200).send(data);
        } else {
            response.status(500).send({message: 'Se produjo un error'})
        }
    });
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

    user.save((err, data) => {
        if (!err) {
            response.status(200).send(data);
        } else {
            response.status(500).send({message: 'Error al crear el usuario'})
        }
    });
}

controller.loginUser = function (request, response) {
    var params = request.body;
    var email = params.email;
    var password = params.password;
    User.findOne({email: email, password: password}, (err, data) => {
        if (!err) {
            if (data.length > 0) {
                response.status(200).send(data)
            } else {
                response.status(400).send({message: 'El correo o la contraseña son incorrectos'})
            }
        } else {
            response.status(500).send({message: 'Se produjo un error'})
        }
    });
}


controller.followUser = function (request, response) {
    var params = request.body;
    var userFollowing = params.myId;
    var userToFollow = params.otherId;
    User.findOneAndUpdate(
        {_id: userFollowing},
        {$addToSet: {following: userToFollow}},
        (err, data) => {
            if (!err) {
                response.status(200).send(data);
            } else {
                response.status(500).send({message: 'Se produjo un error'});
            }
        }
    );
}

controller.unfollowUser = function (request, response) {
    var params = request.body;
    var userFollowing = params.myId;
    var userToFollow = params.otherId;
    User.findOneAndUpdate(
        {_id: userFollowing},
        {$pull: {following: userToFollow}},
        (err, data) => {
            if (!err) {
                response.status(200).send(data);
            } else {
                response.status(500).send({message: 'Se produjo un error'});
            }
        }
    );
}

controller.getFollowers = function (request, response) {
    var userId = request.params.id;
    User.find({following: {$all: userId}}, {name: 1, email: 1}, (err, data) => {
        if (!err) {
            response.status(200).send(data);
        } else {
            response.status(500).send({message: 'Se produjo un error'});
        }
    });
}


module.exports = {controller};