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
    post.likes = 0;
    post.save((err, data) => {
        if (!err) {
            response.status(200).send(data);
        } else {
            response.status(500).send("Se produjo un error");
        }
    })
}

controller.likePost = function (request, response) {
    var postId = request.params.id;
    console.log(postId);
    Post.findByIdAndUpdate(postId, {$inc: {likes: 1}},
        function (err, data) {
            if (!err) {
                response.status(200).send(data);
            } else {
                response.status(500).send('Se produjo un error');
            }
        }
    )

}

controller.deletePost = function (request, response) {
    var postId = request.params.id;
    Post.findByIdAndRemove(postId, function (err, data) {
        if (!err) {
            response.status(200).send("Post eliminado correctamente");
        } else {
            response.status(500).send("Se produjo un error");
        }
    });
}

controller.getMyPosts = function (request, response) {
    var userId = request.params.id;
    Post.find({author: {$all: userId}}, (err, data) => {
        if (!err) {
            response.status(200).send(data);
        } else {
            response.status(500).send({message: 'Se produjo un error'});
        }
    });
}

controller.getPost = function (request, response) {
    var postId = request.params.id;
    Post.findOne({_id: postId}, (err, data) => {
        if (!err) {
            response.status(200).send(data);
        } else {
            response.status(500).send({message: 'Se produjo un error'});
        }
    });
}

controller.getFeed = function (request, response) {
    var userId = request.params.id;
    User.findOne({_id: userId}, {following: 1}, (err, data) => {
        console.log(data);
        if (!err) {
            Post.find({author: {$in: data.following}}, (err, feed) => {
                if (!err) {
                    response.status(200).send(feed);
                } else {
                    response.status(500).send({message: 'Se produjo un error con el feed'});
                }
            });
        } else {
            response.status(500).send({message: 'Se produjo un error con el usuario'});
        }
    });
}

module.exports = {controller};