var mongoose = require('mongoose');

function UserModel() {
    'use strict';
    var userSchema = new mongoose.Schema({
        username: {type: String},
        password: {type: String},
        isAdmin : Boolean
    });
    return mongoose.model('user', userSchema);
}

module.exports = UserModel();
