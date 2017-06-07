/**
 * Created by juanospina on 11/05/17.
 */
/**
 * Created by juanospina on 26/04/17.
 */
'use strict';


var controller = {};
/*
 Se carga el modelo en el controlador. En este caso Favorito actúa como un tipo de dato del cual se pueden crear instancias
 */
var Post = require('../models/post');
var User = require('../models/user');


controller.newPost = function (request, response) {
    var params = request.body;
    var post = new Post();
    post.text = params.text;
    post.date = params.date;
    post.author = params.author;
    post.likes = [];
    post.save((err, data) => {
        if (!err) {
            response.status(200).send(data);
        } else {
            console.log(err);
            response.status(500).send({message: "Se produjo un error"});
        }
    })
};

controller.likePost = function (request, response) {
    var params = request.body;
    var postId = params.id;
    var userId = params.userId;

    Post.findByIdAndUpdate(postId, {$addToSet: {likes: userId}},
        function (err, data) {
            if (!err) {
                response.status(200).send(data);
            } else {
                response.status(500).send(err);
            }
        }
    )

};

controller.dislikePost = function (request, response) {
    var params = request.body;
    var postId = params.id;
    var userId = params.userId;

    Post.findByIdAndUpdate(postId, {$pull: {likes: userId}},
        function (err, data) {
            if (!err) {
                response.status(200).send(data);
            } else {
                response.status(500).send(err);
            }
        }
    )

};

controller.deletePost = function (request, response) {
    var postId = request.params.id;
    Post.findByIdAndRemove(postId, function (err, data) {
        if (!err) {
            if (!data) {
                response.status(400).send({message: "No existe el post con id: " + postId});
            } else {
                response.status(200).send({message: "Post eliminado correctamente"});
            }
        } else {
            response.status(500).send("Se produjo un error");
        }
    });
};

controller.getMyPosts = function (request, response) {
    var userId = request.params.id;
    Post.find({author: {$all: userId}}).sort('-date').populate('author', 'name').exec((err, data) => {
        if (!err) {
            response.status(200).send(data);
        } else {
            response.status(500).send({message: 'Se produjo un error'});
        }
    });
};

controller.getPost = function (request, response) {
    var postId = request.params.id;
    Post.findOne({_id: postId}, (err, data) => {
        if (!err) {
            response.status(200).send(data);
        } else {
            response.status(500).send({message: 'Se produjo un error'});
        }
    });
};

controller.getFeed = function (request, response) {
    var userId = request.params.id;
    User.findOne({_id: userId}, {following: 1}, (err, data) => {
        if (!err) {
            var feedUsers = data.following;
            feedUsers.push(userId);
            Post.find({author: {$in: feedUsers}}).sort('-date').populate('author', 'name').exec(
                (err, feed) => {
                    if (!err) {
                        response.status(200).send(feed);
                    } else {
                        response.status(501).send({message: 'Se produjo un error cargando los mensajes'});
                    }
                });
        } else {
            response.status(500).send({message: 'Se produjo un error en el servidor'});
        }
    });
};

module.exports = {controller};