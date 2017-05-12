/**
 * Created by juanospina on 26/04/17.
 */
'use strict';

//Carga express
var express = require('express');

//Carga el controlador de favoritos
var postController = require('../controllers/post');


/*
 Permite controlar las rutas
 */
var postApi = express.Router();

postApi.post("/newPost", postController.controller.newPost);
postApi.delete("/deletePost/:id", postController.controller.deletePost);
postApi.get("/getMyPosts/:id", postController.controller.getMyPosts);
postApi.get("/getPost/:id", postController.controller.getPost);
postApi.get("/getFeed/:id", postController.controller.getFeed);
postApi.put("/likePost/:id", postController.controller.likePost);


/*
 Se exporta el modulo
 */

module.exports = postApi;