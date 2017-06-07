/**
 * Created by juanospina on 26/04/17.
 */
'use strict';

var mongoose = require('mongoose');
/*
 Schema permite crear los objetos que se van a almacenar en la base de datos. Es similar a un constructor
 */
var Schema = mongoose.Schema;

var UserSchema = Schema({
    email: {
        type: String,
        index: true
    },
    name: {
        type: String,
        index: true
    },
    password: String,
    following: [
        {
            type: Schema.ObjectId,
            ref: 'user'
        }
    ]
});

module.exports = mongoose.model('user', UserSchema);