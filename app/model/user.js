function UserSchema(mongoose) {
    'use strict';
    var userSchema = new mongoose.Schema({
        username: {type: String},
        password: {type: String}
    });
    var user = mongoose.model('user', userSchema);

    return user;
}

module.exports = UserSchema;
