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
    email: String,
    name: String,
    password: String
});

/*
 Exporta el modelo Favorito usando la función model de mongoose. Esta función toma dos parámetros, el primero es el nombre singular de la colección y el segundo el esquema.
 Al guardar un registro, mongoose automáticamente busca el plural del nombre de la colección.
 Ej:
 mongoose.model('user', UserSchema);

 En la base de datos se crea la colección 'users'

 */
module.exports = mongoose.model('user', UserSchema);