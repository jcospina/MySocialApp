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
 Para obtener todos los usuarios de la base de datos
 */
controller.getUsers = function (request, response) {
    User.find((err, data) => {
        if (!err) {
            response.status(200).send(data);
        } else {
            response.status(500).send({message: 'Se produjo un error'})
        }
    }).select({name: 1});
};

/*
 Para obtener los usuarios que puedo seguir
 */
controller.getUsersToFollow = function (request, response) {
    var userId = request.params.id;
    User.findOne({_id: userId}, {following: 1}, (err, data) => {
        if (!err) {
            var alreadyFollowing = data.following;
            alreadyFollowing.push(userId);
            User.aggregate([
                    {
                        $match: {
                            _id: {
                                $nin: alreadyFollowing
                            }
                        }
                    }, {
                        $project: {
                            name: 1
                        }
                    }
                ],
                (err, users) => {
                    if (!err) {
                        response.status(200).send(users);
                    } else {
                        response.status(500).send({message: 'Se produjo un error'})
                    }
                });
        } else {
            response.status(500).send({message: 'Se produjo un error en el servidor'});
        }
    });
};

/*
 Para obtener los usuarios que concuerden con el criterio de búsqueda
 */
controller.searchUsers = function (request, response) {
    var userId = request.params.id;
    var searchStr = request.params.search;

    User.findOne({_id: userId}, {following: 1}, (err, data) => {
        if (!err) {
            var alreadyFollowing = data.following;
            alreadyFollowing.push(userId);
            User.aggregate([
                    {
                        $match: {
                            $or: [
                                {email: searchStr},
                                {$text: {$search: searchStr}}
                            ]
                        }
                    },
                    {
                        $match: {
                            _id: {
                                $nin: alreadyFollowing
                            }
                        }
                    }, {
                        $project: {
                            name: 1
                        }
                    }
                ],
                (err, users) => {
                    if (!err) {
                        response.status(200).send(users);
                    } else {
                        response.status(500).send({message: 'Se produjo un error'})
                    }
                });
        } else {
            response.status(500).send({message: 'Se produjo un error en el servidor'});
        }
    });
};

controller.getUser = function (request, response) {
    var id = request.params.id;
    User.findOne({_id: id}, (err, data) => {
        if (!err) {
            response.status(200).send(data);
        } else {
            response.status(500).send({message: 'Se produjo un error'})
        }
    });
};


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
};

controller.loginUser = function (request, response) {
    var params = request.body;
    var email = params.email;
    var password = params.password;
    User.findOne({email: email, password: password}, {
        email: 1,
        name: 1,
        following: 1
    }).populate('following', 'name').exec((err, data) => {
        if (!err) {
            if (data != null && data != {}) {
                response.status(200).send(data)
            } else {
                response.status(400).send({message: 'El correo o la contraseña son incorrectos'})
            }
        } else {
            response.status(500).send({message: 'Se produjo un error'})
        }
    });
};


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
};

controller.unfollowUser = function (request, response) {
    var params = request.body;
    var userFollowing = params.myId;
    var userToUnfollow = params.otherId;
    User.findOneAndUpdate(
        {_id: userFollowing},
        {$pull: {following: userToUnfollow}},
        (err, data) => {
            if (!err) {
                response.status(200).send(data);
            } else {
                response.status(500).send({message: 'Se produjo un error'});
            }
        }
    );
};

controller.getFollowers = function (request, response) {
    var userId = request.params.id;
    User.find({following: {$all: userId}}, {name: 1, email: 1}, (err, data) => {
        if (!err) {
            response.status(200).send(data);
        } else {
            response.status(500).send({message: 'Se produjo un error'});
        }
    });
};


module.exports = {controller};