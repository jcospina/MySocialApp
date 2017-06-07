/**
 * Created by juanospina on 26/04/17.
 */
'use strict';

//Carga express
var express = require('express');

//Carga el controlador de favoritos
var userController = require('../controllers/user');

//Carga el archivo de nuestros middleware
var middleware = require('../middleware/middleware');

/*
 Permite controlar las rutas
 */
var userApi = express.Router();

userApi.get("/getUser/:id", userController.controller.getUser);
userApi.get("/getUsers", userController.controller.getUsers);
userApi.get("/getUsersToFollow/:id", userController.controller.getUsersToFollow);
userApi.get("/searchUsers/:id/:search", userController.controller.searchUsers);
userApi.post("/newUser", middleware.checkEmail, userController.controller.createUser);
userApi.post("/login", userController.controller.loginUser);
userApi.post("/followUser", userController.controller.followUser);
userApi.post("/unfollowUser", userController.controller.unfollowUser);
userApi.get("/getFollowers/:id", userController.controller.getFollowers);

/*
 Se exporta el modulo
 */

module.exports = userApi;