/**
 * Created by juanospina on 5/05/17.
 */
"use strict";

var middleware = {};

var User = require('../models/user');

middleware.checkEmail = function (request, response, next) {
    var params = request.body;
    var email = params.email;
    User.find({email: email}, (err, data) => {
        if (!err) {
            if (data.length > 0) {
                response.status(400).send({message: 'Ya existe un usuario con ese correo'})
            } else {
                next();
            }
        } else {
            response.status(500).send({message: 'Se produjo un error'})
        }
    });
}

module.exports = middleware;