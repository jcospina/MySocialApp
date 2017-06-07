/**
 * Created by juanospina on 26/04/17.
 */
'use strict';

var mongoose = require('mongoose');
/*
 Schema permite crear los objetos que se van a almacenar en la base de datos. Es similar a un constructor
 */
var Schema = mongoose.Schema;

var PostSchema = Schema({
    text: String,
    date: Date,
    author: {
        type: Schema.ObjectId,
        ref: 'user'
    },
    likes: [
        {
            type: Schema.ObjectId,
            ref: 'user'
        }
    ]
});

module.exports = mongoose.model('post', PostSchema);