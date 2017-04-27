/**
 * Created by juanospina on 26/04/17.
 */
'use strict';

//Carga express
var express = require('express');

//Carga el controlador de favoritos
var userController = require('../controllers/user');

/*
 Permite controlar las rutas
 */
var userApi = express.Router();

userApi.get("/getUser", userController.controller.getUser);
userApi.post("/newUser", userController.controller.createUser);


/*
 Se exporta el modulo
 */

module.exports = userApi;