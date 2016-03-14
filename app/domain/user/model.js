var mongoose = require('mongoose');

function UserModel() {
    'use strict';
    var userSchema = new mongoose.Schema({
        username: {type: String},
        password: {type: String}
    });

    return mongoose.model('user', userSchema);
}

module.exports = UserModel();
