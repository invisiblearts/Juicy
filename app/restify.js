var mongoose = require('mongoose');
var restify = require('..');
var userModel = require('./model/user')(mongoose);
var beatModel = require('./model/beat')(mongoose);

function Restify(app, uri) {
    'use strict';

    run();

    ///////////

    function run() {
        mongoose.connect(uri);
        restify.serve(app, userModel);
        restify.serve(app, beatModel);
    }
}

module.exports = Restify;
